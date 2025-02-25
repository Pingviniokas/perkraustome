import { NextApiRequest, NextApiResponse } from 'next';

// Cache holidays in memory to reduce API calls
let holidaysCache: {
  [key: string]: {
    data: any[];
    timestamp: number;
  };
} = {};

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { year } = req.query;
  
  // Check cache first
  if (holidaysCache[year as string]) {
    const cache = holidaysCache[year as string];
    if (Date.now() - cache.timestamp < CACHE_DURATION) {
      return res.status(200).json(cache.data);
    }
  }

  const calendarId = 'lt.lithuanian#holiday@group.v.calendar.google.com';
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'Google Calendar API key not configured' });
  }

  const timeMin = `${year}-01-01T00:00:00Z`;
  const timeMax = `${year}-12-31T23:59:59Z`;

  try {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?` +
      new URLSearchParams({
        key: apiKey,
        timeMin,
        timeMax,
        singleEvents: 'true',
        orderBy: 'startTime'
      });
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch holidays: ${response.status}`);
    }

    const data = await response.json();
    
    const holidays = data.items?.map((item: any) => ({
      date: item.start?.date || item.start?.dateTime?.split('T')[0],
      name: item.summary,
      type: 'holiday'
    })).filter((holiday: any) => holiday.date && holiday.name) || [];

    // Update cache
    holidaysCache[year as string] = {
      data: holidays,
      timestamp: Date.now()
    };

    res.setHeader('Cache-Control', 'public, s-maxage=86400');
    res.status(200).json(holidays);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: 'Failed to fetch holidays', error: errorMessage });
  }
} 