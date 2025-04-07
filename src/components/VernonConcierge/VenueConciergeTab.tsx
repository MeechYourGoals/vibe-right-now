
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Coffee, Utensils, Music, Ticket, Hotel, Crown } from "lucide-react";

const offeringSuggestions = [
  { id: "premium_seating", label: "Premium/VIP Seating", icon: <Crown className="h-4 w-4 mr-2" /> },
  { id: "bottle_service", label: "Discounted Bottle Service", icon: <Utensils className="h-4 w-4 mr-2" /> },
  { id: "special_menu", label: "Special Menu Items", icon: <Coffee className="h-4 w-4 mr-2" /> },
  { id: "show_tickets", label: "Preferred Show Tickets", icon: <Ticket className="h-4 w-4 mr-2" /> },
  { id: "private_suites", label: "Private Suite Access", icon: <Hotel className="h-4 w-4 mr-2" /> },
  { id: "vip_entry", label: "VIP Entry (Skip the Line)", icon: <Music className="h-4 w-4 mr-2" /> },
];

const VenueConciergeTab = () => {
  const [offeringDescription, setOfferingDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [venueType, setVenueType] = useState("");
  
  const handleSaveSettings = () => {
    console.log("Saving venue concierge settings", {
      offeringDescription,
      contactName,
      contactTitle,
      contactPhone,
      contactEmail,
      venueType
    });
    // Here you would save these settings to your backend
  };

  return (
    <div className="space-y-4">
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 rounded-md p-4 flex items-start space-x-3">
        <Crown className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium">Premium Venue Feature</h3>
          <p className="text-sm">
            Vernon Concierge participation is exclusive to premium subscribed venues. This gives your venue priority placement in recommendations.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Concierge Offerings</CardTitle>
          <CardDescription>
            Define what special offerings your venue provides through Vernon Concierge
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="venue-type">Venue Type</Label>
            <Select value={venueType} onValueChange={setVenueType}>
              <SelectTrigger id="venue-type">
                <SelectValue placeholder="Select venue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="bar">Bar / Nightclub</SelectItem>
                <SelectItem value="event_venue">Event Venue</SelectItem>
                <SelectItem value="theater">Theater</SelectItem>
                <SelectItem value="stadium">Stadium / Arena</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="spa">Spa / Wellness</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="offering-description">Special Offerings Description</Label>
              <div className="flex">
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => document.getElementById("suggestions-accordion")?.click()}
                  className="text-xs flex items-center h-6 px-2"
                >
                  <HelpCircle className="h-3 w-3 mr-1" />
                  See what others offer
                </Button>
              </div>
            </div>
            <Textarea 
              id="offering-description"
              placeholder="Describe what special deals, preferred seating, menu items, or other offerings your venue can provide to Vernon Concierge customers."
              value={offeringDescription}
              onChange={(e) => setOfferingDescription(e.target.value)}
              className="min-h-[120px]"
            />
            
            <Accordion type="single" collapsible className="mt-2">
              <AccordionItem value="suggestions">
                <AccordionTrigger id="suggestions-accordion" className="text-xs text-muted-foreground py-2">
                  What other venues are offering
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
                    {offeringSuggestions.map((suggestion) => (
                      <Badge 
                        key={suggestion.id} 
                        variant="outline" 
                        className="justify-start py-1.5 px-3 cursor-pointer hover:bg-secondary/10"
                        onClick={() => setOfferingDescription(prev => 
                          prev + (prev ? "\n\n" : "") + suggestion.label + ": "
                        )}
                      >
                        {suggestion.icon}
                        {suggestion.label}
                      </Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Dedicated Contact Person</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This information will only be shared with Vernon Concierge staff to coordinate bookings.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-name">Name</Label>
                <Input 
                  id="contact-name" 
                  placeholder="Full name" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="contact-title">Position/Title</Label>
                <Input 
                  id="contact-title" 
                  placeholder="e.g. Maitre d', Manager" 
                  value={contactTitle}
                  onChange={(e) => setContactTitle(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="contact-phone">Direct Phone</Label>
                <Input 
                  id="contact-phone" 
                  placeholder="Phone number" 
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input 
                  id="contact-email" 
                  placeholder="Email address" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-6" 
            size="lg"
            onClick={handleSaveSettings}
          >
            Save Concierge Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueConciergeTab;
