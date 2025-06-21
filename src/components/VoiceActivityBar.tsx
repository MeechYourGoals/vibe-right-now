import React from 'react';

interface VoiceActivityBarProps {
  level: number;
  isActive?: boolean;
}

const VoiceActivityBar: React.FC<VoiceActivityBarProps> = ({ level, isActive }) => {
  const width = Math.min(Math.max(level, 0), 1) * 100;
  return (
    <div className={`h-1 w-20 bg-gray-300 rounded overflow-hidden ml-2 ${isActive ? '' : 'opacity-50'}`}>
      <div
        className="h-full bg-blue-500 transition-all"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default VoiceActivityBar;
