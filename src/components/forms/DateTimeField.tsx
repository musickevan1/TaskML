import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import Calendar from '../calendar/Calendar';
import { addYears } from 'date-fns';

interface DateTimeFieldProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function DateTimeField({ value, onChange, required }: DateTimeFieldProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (date: Date | null) => {
    onChange(date ? date.toISOString() : '');
    setShowCalendar(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-cyber-white mb-1">
        Due Date
      </label>
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-electric-500/50" />
          </div>
          <input
            type="text"
            value={value ? new Date(value).toLocaleString() : ''}
            readOnly
            required={required}
            placeholder="Select date and time"
            className="block w-full pl-10 pr-3 py-2 
                     bg-space-800 border border-electric-500/20 
                     rounded-md text-cyber-white placeholder-cyber-white/30
                     focus:border-electric-500/50 focus:ring-1 focus:ring-electric-500/50
                     cursor-pointer transition-all duration-200"
            onClick={() => setShowCalendar(!showCalendar)}
          />
        </div>
        
        {showCalendar && (
          <div className="absolute z-50 mt-1">
            <Calendar
              selectedDate={value ? new Date(value) : null}
              onChange={handleDateSelect}
              maxDate={addYears(new Date(), 1)}
            />
          </div>
        )}
      </div>
    </div>
  );
}