
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
import { formatHoursForDisplay, formatDayOfWeek } from '@/utils/businessHoursUtils';

interface BusinessHoursProps {
  hours: BusinessHoursType;
  compact?: boolean;
  venue?: any; // Added to match usage in VenueProfileHeader
}

const BusinessHours: React.FC<BusinessHoursProps> = ({ 
  hours,
  compact = false
}) => {
  // Current day of week to highlight
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
  
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
              <span>{formatHoursForDisplay(day, hourObj)}</span>
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
        <TableRow className={today === 'mon' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Monday</TableCell>
          <TableCell>{formatHoursForDisplay('monday', hours.monday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'tue' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Tuesday</TableCell>
          <TableCell>{formatHoursForDisplay('tuesday', hours.tuesday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'wed' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Wednesday</TableCell>
          <TableCell>{formatHoursForDisplay('wednesday', hours.wednesday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'thu' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Thursday</TableCell>
          <TableCell>{formatHoursForDisplay('thursday', hours.thursday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'fri' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Friday</TableCell>
          <TableCell>{formatHoursForDisplay('friday', hours.friday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'sat' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Saturday</TableCell>
          <TableCell>{formatHoursForDisplay('saturday', hours.saturday)}</TableCell>
        </TableRow>
        <TableRow className={today === 'sun' ? 'bg-primary/10' : ''}>
          <TableCell className="font-medium">Sunday</TableCell>
          <TableCell>{formatHoursForDisplay('sunday', hours.sunday)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default BusinessHours;
