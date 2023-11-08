import React, { useState } from 'react';

interface ToggleButtonProps {
  initialVisibility: boolean;
  onToggle: (visibility: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ initialVisibility, onToggle }) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    onToggle(newVisibility);
  };

  return (
    <div className="flex flex-col items-start">
      <span
        onClick={toggleVisibility}
        className={`w-8 h-4 rounded-full relative transition-colors duration-300 ease-in-out ${
          isVisible ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white absolute top-0 left-0 transition-transform duration-300 ease-in-out transform ${
            isVisible ? 'translate-x-full' : ''
          }`}
        />
      </span>
      <p className="text-xs mt-1">
        {isVisible ? 'Public' : 'Private'}
      </p>
    </div>
  );
};

export default ToggleButton;
