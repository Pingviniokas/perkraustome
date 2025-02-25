"use client";

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { lt } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";

// Register Lithuanian locale
registerLocale('lt', lt);

interface Holiday {
  date: string;
  name: string;
  type: string;
}

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date, isHoliday: boolean, isWeekend: boolean) => void;
  onWarningChange?: (message: string) => void;
  className?: string;
  showWarningInline?: boolean;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const DatePicker = ({ selectedDate, onDateChange, onWarningChange, className, showWarningInline = true }: DatePickerProps) => {
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setIsLoading(true);
        const currentYear = new Date().getFullYear();
        const years = [currentYear, currentYear + 1];
        
        // Check localStorage first
        const cachedData = years.map(year => {
          const cached = localStorage.getItem(`holidays_${year}`);
          if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
              return { year, data };
            }
          }
          return null;
        }).filter((item): item is { year: number; data: Holiday[] } => item !== null);

        if (cachedData.length === years.length) {
          setHolidays(cachedData.flatMap(item => item.data));
          setIsLoading(false);
          return;
        }

        // Fetch only missing years
        const yearsToFetch = years.filter(year => 
          !cachedData.find(item => item?.year === year)
        );

        const newHolidayData = await Promise.all(
          yearsToFetch.map(async year => {
            const response = await fetch(`/api/holidays?year=${year}`);
            if (!response.ok) throw new Error(`Failed to fetch holidays for ${year}`);
            const data = await response.json();
            
            // Cache the new data
            localStorage.setItem(`holidays_${year}`, JSON.stringify({
              data,
              timestamp: Date.now()
            }));
            
            return { year, data };
          })
        );

        // Combine cached and new data
        const allHolidays = [...cachedData, ...newHolidayData]
          .flatMap(item => item.data);
        
        setHolidays(allHolidays);
      } catch (error) {
        console.error('Failed to fetch holidays:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  const isHoliday = (date: Date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(12, 0, 0, 0);
    const dateString = normalizedDate.toISOString().split('T')[0];
    return holidays.some(holiday => holiday.date === dateString);
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const getHolidayName = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return holidays.find(h => h.date === dateString)?.name || '';
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    
    const normalizedDate = new Date(date);
    normalizedDate.setHours(12, 0, 0, 0);
    
    const holiday = isHoliday(normalizedDate);
    const weekend = isWeekend(normalizedDate);
    
    let message = '';
    if (holiday) {
      const dateString = normalizedDate.toISOString().split('T')[0];
      const holidayInfo = holidays.find(h => h.date === dateString);
      message = `Pasirinkote šventinę dieną (${holidayInfo?.name}), todėl įkainis skaičiuojamas 1.5 karto`;
    } else if (weekend) {
      message = 'Pasirinkote savaitgalio dieną, todėl įkainis skaičiuojamas 1.5 karto';
    }
    
    setWarningMessage(message);
    if (onWarningChange) onWarningChange(message);
    onDateChange(date, holiday, weekend);
  };

  // Set minimum date to today
  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 1);

  return (
    <div className={`space-y-1 relative z-50 ${className || ''}`}>
      <div className="relative group">
        <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 ${
          isLoading ? 'text-gray-300 animate-pulse' : 'text-red-500'
        } w-4 h-4 z-10`} />
        <ReactDatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          locale="lt"
          minDate={today}
          maxDate={maxDate}
          placeholderText="Pasirinkite datą"
          className="w-full pl-10 pr-3 h-10 text-sm rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          disabled={isLoading}
          calendarClassName="custom-calendar"
          dayClassName={(date) => {
            if (isHoliday(date)) return "holiday-date";
            if (isWeekend(date)) return "weekend-date";
            return "";
          }}
        />
      </div>
      {showWarningInline && warningMessage && (
        <div className="h-4">
          <p className="text-red-500 text-xs font-medium">{warningMessage}</p>
        </div>
      )}
      <style jsx global>{`
        .react-datepicker {
          font-family: var(--font-poppins);
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }
        .react-datepicker__header {
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          padding-top: 0.5rem;
        }
        .react-datepicker__current-month {
          font-weight: 600;
          font-size: 0.875rem;
          color: #111827;
        }
        .react-datepicker__day-name {
          color: #6b7280;
          font-weight: 500;
        }
        .react-datepicker__day {
          color: #374151;
          border-radius: 0.375rem;
        }
        .react-datepicker__day:hover {
          background-color: #fee2e2;
          color: #ef4444;
        }
        .react-datepicker__day--selected {
          background-color: #ef4444 !important;
          color: white !important;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: #fecaca;
          color: #ef4444;
        }
        .react-datepicker__day--disabled {
          color: #d1d5db;
        }
        .react-datepicker__navigation {
          top: 0.75rem;
        }
        .react-datepicker__navigation-icon::before {
          border-color: #ef4444;
        }
        .react-datepicker__day--outside-month {
          color: #9ca3af;
        }
        .holiday-date {
          background-color: #fee2e2 !important;
          color: #ef4444 !important;
          font-weight: 600 !important;
        }
        .weekend-date {
          color: #ef4444 !important;
        }
        .holiday-date:hover,
        .weekend-date:hover {
          background-color: #fecaca !important;
        }
      `}</style>
    </div>
  );
};

export default DatePicker; 