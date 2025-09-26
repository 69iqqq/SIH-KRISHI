import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface ChatSession {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export const useChatHistory = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's chat sessions
  const fetchSessions = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for a specific session
  const fetchMessages = async (sessionId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []).map(msg => ({
        ...msg,
        role: msg.role as 'user' | 'assistant'
      })));
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new chat session
  const createSession = async (title?: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          user_id: user.id,
          title: title || 'New Chat',
        })
        .select()
        .single();

      if (error) throw error;
      
      const newSession = data as ChatSession;
      setSessions(prev => [newSession, ...prev]);
      setCurrentSession(newSession);
      setMessages([]);
      
      return newSession;
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  };

  // Add a message to the current session
  const addMessage = async (content: string, role: 'user' | 'assistant', sessionId?: string) => {
    if (!user) return null;

    const targetSessionId = sessionId || currentSession?.id;
    if (!targetSessionId) return null;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: targetSessionId,
          user_id: user.id,
          role,
          content,
        })
        .select()
        .single();

      if (error) throw error;

      const newMessage = data as ChatMessage;
      setMessages(prev => [...prev, newMessage]);

      // Update session's updated_at timestamp
      await supabase
        .from('chat_sessions')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', targetSessionId);

      return newMessage;
    } catch (error) {
      console.error('Error adding message:', error);
      return null;
    }
  };

  // Delete a chat session
  const deleteSession = async (sessionId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('chat_sessions')
        .delete()
        .eq('id', sessionId)
        .eq('user_id', user.id);

      if (error) throw error;

      setSessions(prev => prev.filter(s => s.id !== sessionId));
      
      if (currentSession?.id === sessionId) {
        setCurrentSession(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  // Load a specific session
  const loadSession = (session: ChatSession) => {
    setCurrentSession(session);
    fetchMessages(session.id);
  };

  useEffect(() => {
    if (user) {
      fetchSessions();
    } else {
      setSessions([]);
      setCurrentSession(null);
      setMessages([]);
    }
  }, [user]);

  return {
    sessions,
    currentSession,
    messages,
    loading,
    createSession,
    addMessage,
    deleteSession,
    loadSession,
    fetchSessions,
  };
};