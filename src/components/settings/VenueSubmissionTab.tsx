
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Building2, Calendar, CheckCircle, Clock, Mail, MapPin, Phone, Globe } from "lucide-react";

interface VenueSubmissionTabProps {
  onSave?: () => void;
}

const VenueSubmissionTab: React.FC<VenueSubmissionTabProps> = ({ onSave }) => {
  const { toast } = useToast();
  const [submissionType, setSubmissionType] = useState<'venue' | 'event'>('venue');
  const [formData, setFormData] = useState({
    name: '',
    businessEmail: '',
    contactEmail: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    category: '',
    description: '',
    businessLicense: '',
    // Event specific fields
    eventDate: '',
    eventTime: '',
    eventDuration: '',
    ticketPrice: '',
    capacity: ''
  });

  const venueCategories = [
    'restaurant',
    'bar',
    'nightclub',
    'cafe',
    'hotel',
    'theater',
    'museum',
    'sports',
    'attraction',
    'other'
  ];

  const eventCategories = [
    'concert',
    'comedy',
    'sports',
    'theater',
    'festival',
    'conference',
    'party',
    'other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateBusinessEmail = (email: string) => {
    // Basic business email validation - exclude common personal email providers
    const personalProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    return domain && !personalProviders.includes(domain);
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.businessEmail || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!validateBusinessEmail(formData.businessEmail)) {
      toast({
        title: "Invalid Business Email",
        description: "Please use a business email address (not Gmail, Yahoo, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Simulate submission
    toast({
      title: "Submission Received",
      description: `Your ${submissionType} submission has been received and is under review. You'll receive a verification email within 24-48 hours.`,
    });

    // Reset form
    setFormData({
      name: '',
      businessEmail: '',
      contactEmail: '',
      phone: '',
      website: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      category: '',
      description: '',
      businessLicense: '',
      eventDate: '',
      eventTime: '',
      eventDuration: '',
      ticketPrice: '',
      capacity: ''
    });

    if (onSave) {
      onSave();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-4">
        <div className="flex items-start space-x-3">
          <Building2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">Submit Your Venue or Event</h3>
            <p className="text-sm mt-1">
              Submit your venue or event for verification and inclusion on our platform. 
              All submissions go through a verification process that includes business email validation.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submission Type</CardTitle>
          <CardDescription>
            Choose whether you're submitting a venue or an event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={submissionType === 'venue' ? 'default' : 'outline'}
              onClick={() => setSubmissionType('venue')}
              className="flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              Venue
            </Button>
            <Button
              variant={submissionType === 'event' ? 'default' : 'outline'}
              onClick={() => setSubmissionType('event')}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Event
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {submissionType === 'venue' ? 'Venue Information' : 'Event Information'}
          </CardTitle>
          <CardDescription>
            Provide detailed information about your {submissionType}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">
                {submissionType === 'venue' ? 'Venue Name' : 'Event Name'} *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={submissionType === 'venue' ? 'Enter venue name' : 'Enter event name'}
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {(submissionType === 'venue' ? venueCategories : eventCategories).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={`Describe your ${submissionType} in detail...`}
              className="min-h-[100px]"
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact & Verification
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessEmail">Business Email *</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  value={formData.businessEmail}
                  onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                  placeholder="business@company.com"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Must be a business email (not Gmail, Yahoo, etc.)
                </p>
              </div>
              
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="contact@company.com (optional)"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location Information
            </h4>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="City"
                  />
                </div>
                
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="State"
                  />
                </div>
                
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>
          </div>

          {submissionType === 'event' && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Event Details
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="eventTime">Event Time</Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={formData.eventTime}
                    onChange={(e) => handleInputChange('eventTime', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="capacity">Expected Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    placeholder="100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="ticketPrice">Ticket Price</Label>
                  <Input
                    id="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                    placeholder="$25 or Free"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Verification Process</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Review process takes 24-48 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Verification email sent to business email</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Manual review by our team</span>
              </div>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Submit {submissionType === 'venue' ? 'Venue' : 'Event'} for Review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueSubmissionTab;
