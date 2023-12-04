import React, { useState } from 'react';
import Image from 'next/image';

type OptionType = {
  value: string;
  label: string;
  imagePath: string;
};

type CustomDropdownProps = {
  selected: string;
  onChange: (value: string) => void;
  options: OptionType[];
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({ selected, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown" tabIndex={0} onBlur={() => setIsOpen(false)}>
      <div className="dropdown-selected" onClick={toggleDropdown}>
        <Image src={options.find((option) => option.value === selected)?.imagePath || '/placeholder.png'}
               alt={selected}
               width={24}
               height={24} />
        <span className="p-1">{selected}</span>
        <span className="dropdown-symbol">▾</span>
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option) => (
              <div key={option.value} className="dropdown-option" onClick={() => handleOptionClick(option.value)}>
                  <Image src={option.imagePath} alt={option.label} width={24} height={24} />
                  <span className="p-1">{option.label}</span>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
