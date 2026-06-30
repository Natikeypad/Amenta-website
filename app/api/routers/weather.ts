import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { createRouter, publicQuery, authedQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";

// Open-Meteo API integration
async function fetchWeatherData(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=Africa/Nairobi&forecast_days=3`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("Weather API request failed");
  return resp.json();
}

export const weatherRouter = createRouter({
  // Public: Get current weather for Amenta location (South Omo)
  current: publicQuery
    .input(
      z.object({
        lat: z.number().default(5.2759),
        lon: z.number().default(36.1875),
      }).optional()
    )
    .query(async ({ input }) => {
      const coords = input ?? { lat: 5.2759, lon: 36.1875 };
      
      // Check cache first (cache for 30 minutes)
      const cached = await getDb()
        .select()
        .from(schema.weatherData)
        .where(eq(schema.weatherData.location, "South Omo, Ethiopia"))
        .orderBy(desc(schema.weatherData.fetchedAt))
        .limit(1);

      if (cached.length > 0) {
        const ageMs = Date.now() - new Date(cached[0].fetchedAt).getTime();
        if (ageMs < 30 * 60 * 1000) {
          return cached[0];
        }
      }

      // Fetch fresh data
      try {
        const data = await fetchWeatherData(coords.lat, coords.lon) as any;
        const current = data.current;
        
        const weatherRecord = {
          location: "South Omo, Ethiopia",
          latitude: String(coords.lat),
          longitude: String(coords.lon),
          temperature: String(current.temperature_2m),
          humidity: current.relative_humidity_2m,
          rainfall: String(current.rain ?? 0),
          windSpeed: String(current.wind_speed_10m),
          condition: getWeatherCondition(current.rain, current.wind_speed_10m),
          forecast: JSON.stringify(data.daily),
        };

        await getDb().insert(schema.weatherData).values(weatherRecord);
        
        return weatherRecord;
      } catch (error) {
        // Return cached data if available, even if stale
        if (cached.length > 0) return cached[0];
        throw error;
      }
    }),

  // Authed: Get weather history
  history: authedQuery
    .input(
      z.object({
        location: z.string().default("South Omo, Ethiopia"),
        limit: z.number().min(1).max(100).default(24),
      }).optional()
    )
    .query(async ({ input }) => {
      const params = input ?? { location: "South Omo, Ethiopia", limit: 24 };
      const items = await getDb()
        .select()
        .from(schema.weatherData)
        .where(eq(schema.weatherData.location, params.location))
        .orderBy(desc(schema.weatherData.fetchedAt))
        .limit(params.limit);
      return items;
    }),
});

function getWeatherCondition(rain: number, windSpeed: number): string {
  if (rain > 5) return "Heavy Rain";
  if (rain > 0) return "Light Rain";
  if (windSpeed > 20) return "Windy";
  if (windSpeed > 10) return "Breezy";
  return "Clear";
}
