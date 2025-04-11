import * as React from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface DateSliderProps {
  onChange: (value: number | string) => void;
}

const DateSlider = ({ onChange }: DateSliderProps) => {
  const [value, setValue] = React.useState(0);

  const MINUTES_IN_DAY = 1440;
  const MIN = 0;
  const MAX = MINUTES_IN_DAY;
  const STEP = 15;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

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
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f6',
          width: '20px',
          height: '20px',
          marginTop: '-8px'
        }}
        railStyle={{ backgroundColor: '#ffffff1c' }}
      />
    </div>
  );
};

export default DateSlider;