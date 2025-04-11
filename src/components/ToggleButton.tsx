import { useState } from 'react';

interface ToggleButtonProps {
  values: Array<{
    label: string;
    value: boolean;
  }>;
  onChange?: (value: boolean) => void;
  defaultValue?: boolean;
}

const ToggleButton = ({ values, onChange, defaultValue }: ToggleButtonProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || values[0].value);
  
  const handleToggle = () => {
    const currentIndex = values.findIndex(item => item.value === selectedValue);
    const nextIndex = (currentIndex + 1) % values.length;
    setSelectedValue(values[nextIndex].value);
    
    if (onChange) {
      onChange(values[nextIndex].value);
    }
  };
  
  return (
    <div 
      className="toggle-button bg-blackLight h-[29px] w-[60px] text-gray px-[3px] text-sm rounded-full relative flex items-center justify-between cursor-pointer"
      onClick={handleToggle}
    >
      <div 
        className='toggle-button-handle w-[24px] h-[24px] rounded-full bg-white absolute z-10'
        style={{
          left: selectedValue === values[0].value ? '3px' : 'calc(100% - 27px)',
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'left 0.3s ease-in-out'
        }}
      ></div>
      {values.map((item) => (
        <span 
          className='z-20 flex-1 h-full flex items-center justify-center'
          key={item.label}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default ToggleButton;
