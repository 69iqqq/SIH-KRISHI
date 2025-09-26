import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudSun, Thermometer, Droplets, Wind, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

const mockWeatherData = {
  location: 'Thiruvananthapuram, Kerala',
  locationML: 'തിരുവനന്തപുരം, കേരളം',
  temperature: 28,
  humidity: 78,
  windSpeed: 12,
  condition: 'Partly Cloudy',
  conditionML: 'ഭാഗികമായി മേഘങ്ങൾ',
  forecast: [
    { day: 'Today', dayML: 'ഇന്ന്', temp: 28, condition: 'Partly Cloudy' },
    { day: 'Tomorrow', dayML: 'നാളെ', temp: 30, condition: 'Sunny' },
    { day: 'Day 3', dayML: '3-ാം ദിവസം', temp: 27, condition: 'Rainy' },
  ]
};

const mockMarketData = [
  { crop: 'Rice', cropML: 'അരി', price: 2500, change: 5.2, unit: 'per quintal' },
  { crop: 'Coconut', cropML: 'തെങ്ങ്', price: 15, change: -2.1, unit: 'per piece' },
  { crop: 'Pepper', cropML: 'കുരുമുളക്', price: 45000, change: 8.5, unit: 'per quintal' },
  { crop: 'Cardamom', cropML: 'ഏലം', price: 120000, change: 12.3, unit: 'per quintal' },
  { crop: 'Rubber', cropML: 'റബ്ബർ', price: 18500, change: -1.8, unit: 'per quintal' },
  { crop: 'Coffee', cropML: 'കാപ്പി', price: 8500, change: 3.7, unit: 'per quintal' },
];

export default function WeatherMarket() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshData = () => {
    setLastUpdated(new Date());
    // TODO: Implement actual data refresh
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Weather & Market Prices
          </h1>
          <p className="text-xl text-muted-foreground malayalam mb-4">
            കാലാവസ്ഥയും മാർക്കറ്റ് വിലയും
          </p>
          <p className="text-lg text-muted-foreground">
            Live weather updates and daily mandi prices for Kerala farmers
          </p>
          <p className="text-muted-foreground malayalam">
            കേരളത്തിലെ കർഷകർക്കായി തത്സമയ കാലാവസ്ഥാ അപ്‌ഡേറ്റുകളും ദൈനംദിന മണ്ഡി വിലകളും
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleString()} / അവസാനമായി അപ്‌ഡേറ്റ് ചെയ്തത്: {lastUpdated.toLocaleTimeString()}
          </p>
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh / പുതുക്കുക
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weather Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudSun className="h-5 w-5 text-accent" />
                  Current Weather
                  <span className="text-sm font-normal text-muted-foreground malayalam">
                    / നിലവിലെ കാലാവസ്ഥ
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {mockWeatherData.temperature}°C
                  </div>
                  <div className="text-muted-foreground">
                    {mockWeatherData.condition}
                  </div>
                  <div className="text-sm text-muted-foreground malayalam">
                    {mockWeatherData.conditionML}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {mockWeatherData.location}
                  </div>
                  <div className="text-xs text-muted-foreground malayalam">
                    {mockWeatherData.locationML}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Thermometer className="h-5 w-5 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">Temperature / താപനില</div>
                    <div className="text-lg font-bold text-foreground">{mockWeatherData.temperature}°C</div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm font-medium">Humidity / ഈർപ്പം</div>
                    <div className="text-lg font-bold text-foreground">{mockWeatherData.humidity}%</div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Wind className="h-5 w-5 text-crop mx-auto mb-2" />
                    <div className="text-sm font-medium">Wind / കാറ്റ്</div>
                    <div className="text-lg font-bold text-foreground">{mockWeatherData.windSpeed} km/h</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3-Day Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>
                  3-Day Forecast / 3 ദിവസത്തെ പ്രവചനം
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockWeatherData.forecast.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-medium">{day.day}</div>
                        <div className="text-sm text-muted-foreground malayalam">{day.dayML}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">{day.condition}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{day.temp}°C</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Prices Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-harvest" />
                  Market Prices
                  <span className="text-sm font-normal text-muted-foreground malayalam">
                    / മാർക്കറ്റ് വിലകൾ
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMarketData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{item.crop}</div>
                        <div className="text-sm text-muted-foreground malayalam">{item.cropML}</div>
                        <div className="text-xs text-muted-foreground">{item.unit}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">
                          ₹{item.price.toLocaleString()}
                        </div>
                        <div className={`flex items-center text-sm font-medium ${
                          item.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(item.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    Prices are indicative and may vary by location and market conditions.
                  </p>
                  <p className="text-xs text-muted-foreground malayalam text-center mt-1">
                    വിലകൾ സൂചനാപരമാണ്, സ്ഥലവും മാർക്കറ്റ് സാഹചര്യങ്ങളും അനുസരിച്ച് വ്യത്യാസപ്പെടാം.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Weather Alerts / കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-accent/20 border-l-4 border-accent rounded">
                  <div className="font-medium text-accent-foreground">Heavy Rain Expected</div>
                  <div className="text-sm text-muted-foreground malayalam">കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Heavy rainfall expected in the next 48 hours. Protect young crops.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Insights / മാർക്കറ്റ് സൂചനകൾ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-950 border-l-4 border-green-500 rounded">
                  <div className="font-medium text-green-700 dark:text-green-300">Pepper Prices Rising</div>
                  <div className="text-sm text-muted-foreground malayalam">കുരുമുളകിന്റെ വില വർധിക്കുന്നു</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Good time to sell pepper stocks. Demand is increasing in export markets.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}