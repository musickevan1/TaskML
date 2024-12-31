import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isPast } from 'date-fns';
import TimePicker from './TimePicker';

interface CalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

export default function Calendar({ selectedDate, onChange, minDate = new Date(), maxDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  return (
    <div className="w-full max-w-md bg-space-800 border border-electric-500/20 rounded-lg shadow-neon">
      <div className="flex items-center justify-between p-4 border-b border-electric-500/10">
        <button
          onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}
          className="p-2 hover:bg-space-700 rounded-full text-cyber-white/70 
                   hover:text-cyber-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="font-semibold text-cyber-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
          className="p-2 hover:bg-space-700 rounded-full text-cyber-white/70 
                   hover:text-cyber-white transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-electric-500/10">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center py-2 text-xs text-cyber-white/70">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-electric-500/10">
        {days.map(day => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isDisabled = isPast(day) && !isSameDay(day, new Date());
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => !isDisabled && onChange(day)}
              disabled={isDisabled}
              className={`
                h-10 text-sm relative hover:bg-space-700
                ${!isSameMonth(day, currentMonth) && 'text-cyber-white/30'}
                ${isSelected && 'bg-electric-500/20 text-electric-500'}
                ${isToday(day) && 'text-electric-500 font-semibold'}
                ${isDisabled && 'text-cyber-white/30 cursor-not-allowed hover:bg-transparent'}
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>

      {showTimePicker && selectedDate && (
        <TimePicker
          date={selectedDate}
          onChange={(hours, minutes) => {
            const newDate = new Date(selectedDate);
            newDate.setHours(hours, minutes);
            onChange(newDate);
          }}
        />
      )}

      <div className="p-4 border-t border-electric-500/10 flex justify-end">
        <button
          onClick={() => onChange(null)}
          className="text-sm text-cyber-white/70 hover:text-electric-500"
        >
          Clear
        </button>
      </div>
    </div>
  );
}