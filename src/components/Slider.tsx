import { useEffect, useState } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface DateSliderProps {
  defaultValue: string;
  onChange: (value: number | string) => void;
}

const DateSlider = ({ defaultValue, onChange }: DateSliderProps) => {
  const [value, setValue] = useState(0);

  const MINUTES_IN_DAY = 1440;
  const MIN = 0;
  const MAX = MINUTES_IN_DAY;
  const STEP = 1;

  // Convert time string to minutes for slider positioning
  const timeToMinutes = (timeStr: string) => {
    // Check if time is in 24h or 12h format
    let hours = 0;
    let minutes = 0;
    
    if (timeStr.includes('AM') || timeStr.includes('PM')) {
      // 12h format: "06:27 PM"
      const [timePart, meridiem] = timeStr.split(' ');
      const [hoursStr, minutesStr] = timePart.split(':');
      
      hours = parseInt(hoursStr, 10);
      minutes = parseInt(minutesStr, 10);
      
      // Convert 12h to 24h format for calculations
      if (meridiem === 'PM' && hours < 12) {
        hours += 12;
      } else if (meridiem === 'AM' && hours === 12) {
        hours = 0;
      }
    } else {
      // 24h format: "18:27"
      const [hoursStr, minutesStr] = timeStr.split(':');
      hours = parseInt(hoursStr, 10);
      minutes = parseInt(minutesStr, 10);
    }
    
    return hours * 60 + minutes;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Parse the default value and set the slider position
    if (defaultValue) {
      const minutes = timeToMinutes(defaultValue);
      setValue(minutes);
    }
  }, [defaultValue]);

  const handleChange = (newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
      onChange(formatTime(newValue));
    }
  };

  return (
    <div className="slider-container w-full px-3 h-10">
      {/* <div className="flex justify-between pointer-events-none">
        {Array.from({ length: (MINUTES_IN_DAY / 30) + 2 }, (_, i) => i).map((i) => (
          <div key={i} className="w-[1px] h-[8px] -mb-[9px] bg-white opacity-50"></div>
        ))}
      </div> */}

      <Slider
        min={MIN}
        max={MAX}
        step={STEP}
        value={value}
        onChange={handleChange}
        marks={{
          0: '00', // '00:00',
          360: '06', // '06:00',
          720: '12', // '12:00',
          1080: '18', // '18:00',
          1440: '24' // '24:00'
        }}
        included={false}
        trackStyle={{ backgroundColor: '#3b82f6' }}
        handleStyle={{
          borderColor: '#8c8c8c',
          backgroundColor: '#fff',
          width: '24px',
          height: '24px',
          marginTop: '-10px'
        }}
        railStyle={{ backgroundColor: '#ffffff1c' }}
      />
    </div>
  );
};

export default DateSlider;