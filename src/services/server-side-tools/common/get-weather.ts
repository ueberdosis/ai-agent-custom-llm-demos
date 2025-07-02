/**
 * Dummy implementation of a weather API. Simulates an external data source.
 * 
 * @param location The location to get the weather for
 * @returns The weather data for the given location
 */
export async function getWeather(location: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Dummy weather data
  const weather =  {
    temperature: "20°C",
    condition: "Sunny",
    humidity: "70%",
  };

  return `Weather in ${location}: ${weather.temperature}, ${weather.condition}, Humidity: ${weather.humidity}`;
}