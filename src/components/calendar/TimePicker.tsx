import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface TimePickerProps {
  date: Date;
  onChange: (hours: number, minutes: number) => void;
}

export default function TimePicker({ date, onChange }: TimePickerProps) {
  const [hours, setHours] = useState(date.getHours());
  const [minutes, setMinutes] = useState(date.getMinutes());
  const [period, setPeriod] = useState<'AM' | 'PM'>(hours >= 12 ? 'PM' : 'AM');

  useEffect(() => {
    const adjustedHours = period === 'PM' ? (hours % 12) + 12 : hours % 12;
    onChange(adjustedHours, minutes);
  }, [hours, minutes, period]);

  return (
    <div className="mt-4 p-4 border-t">
      <div className="flex items-center space-x-2">
        <select
          value={hours % 12 || 12}
          onChange={(e) => setHours(parseInt(e.target.value))}
          className="rounded border-gray-300"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <span>:</span>
        <select
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
          className="rounded border-gray-300"
        >
          {Array.from({ length: 60 }, (_, i) => i).map(m => (
            <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
          ))}
        </select>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as 'AM' | 'PM')}
          className="rounded border-gray-300"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
}