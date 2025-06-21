import React from 'react';

interface VoiceActivityBarProps {
  level: number; // 0 to 1
  isActive?: boolean;
}

const BAR_COUNT = 5;

const VoiceActivityBar: React.FC<VoiceActivityBarProps> = ({ level, isActive }) => {
  const activeBars = Math.round(level * BAR_COUNT);

  return (
    <div className="flex items-end h-4 gap-[2px] ml-2">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-green-500 transition-opacity ${isActive && i < activeBars ? 'opacity-100' : 'opacity-20'}`}
          style={{ height: `${((i + 1) / BAR_COUNT) * 100}%` }}
        />
      ))}
    </div>
  );
};

export default VoiceActivityBar;
