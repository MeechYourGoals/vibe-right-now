
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { BusinessHours as BusinessHoursType } from '@/types';
import { formatHoursForDisplay } from '@/utils/businessHoursUtils';

interface BusinessHoursProps {
  hours: BusinessHoursType;
  compact?: boolean;
}

const BusinessHours: React.FC<BusinessHoursProps> = ({ 
  hours,
  compact = false
}) => {
  // Current day of week to highlight
  const today = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' });
  
  if (compact) {
    return (
      <div className="text-sm">
        <div className="grid grid-cols-2 gap-1">
          {Object.entries(hours).map(([day, hourObj]) => (
            <div 
              key={day} 
              className={`flex justify-between px-2 py-1 rounded ${
                day === today ? 'bg-primary/10 font-medium' : ''
              }`}
            >
              <span className="capitalize">{day}</span>
              <span>{formatHoursForDisplay(hourObj)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Day</TableHead>
          <TableHead>Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className={today === 'monday' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Monday</TableCell>
          <TableCell>{formatHoursForDisplay(hours.monday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'tuesday' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Tuesday</TableCell>
          <TableCell>{formatHoursForDisplay(hours.tuesday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'wednesday' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Wednesday</TableCell>
          <TableCell>{formatHoursForDisplay(hours.wednesday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'thursday' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Thursday</TableCell>
          <TableCell>{formatHoursForDisplay(hours.thursday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'friday' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Friday</TableCell>
          <TableCell>{formatHoursForDisplay(hours.friday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'saturday' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Saturday</TableCell>
          <TableCell>{formatHoursForDisplay(hours.saturday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'sunday' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Sunday</TableCell>
          <TableCell>{formatHoursForDisplay(hours.sunday)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default BusinessHours;
