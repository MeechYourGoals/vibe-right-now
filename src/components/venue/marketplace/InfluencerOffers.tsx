
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, DollarSign, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InfluencerOffersProps {
  venueName?: string;
}

type OfferStatus = 'active' | 'pending' | 'completed' | 'expired';

interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  date: string;
  time: string;
  status: OfferStatus;
}

const InfluencerOffers: React.FC<InfluencerOffersProps> = ({ venueName = "Your Venue" }) => {
  const { toast } = useToast();
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: "1",
      title: "Weekend DJ Promotion",
      description: "Looking for a popular influencer to promote our weekend DJ event and post content from the night.",
      price: 5000,
      location: "Main Floor",
      date: "2025-05-15",
      time: "10:00 PM",
      status: 'active'
    },
    {
      id: "2",
      title: "Happy Hour Feature",
      description: "Seeking influencer to showcase our new happy hour menu and post about the experience.",
      price: 2500,
      location: "Bar & Lounge",
      date: "2025-04-20",
      time: "5:00 PM",
      status: 'pending'
    }
  ]);
  
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      date: "",
      time: ""
    }
  });
  
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const onSubmit = (data: any) => {
    const newOffer: Offer = {
      id: Math.random().toString(36).substring(2, 9),
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      location: data.location,
      date: data.date,
      time: data.time,
      status: 'active'
    };
    
    setOffers([...offers, newOffer]);
    setDialogOpen(false);
    form.reset();
    
    toast({
      title: "Offer Created",
      description: "Your influencer opportunity has been posted to the marketplace."
    });
  };
  
  const handleDelete = (id: string) => {
    setOffers(offers.filter(offer => offer.id !== id));
    toast({
      title: "Offer Removed",
      description: "The offer has been removed from the marketplace."
    });
  };
  
  const statusColors = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    pending: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    completed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    expired: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Posted Opportunities</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-500 hover:bg-amber-600">
              <Plus className="h-4 w-4 mr-2" /> New Offer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Influencer Opportunity</DialogTitle>
              <DialogDescription>
                Post a new opportunity for influencers to promote {venueName}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Weekend DJ Promotion" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what you're looking for..." 
                          {...field} 
                          required
                          className="min-h-[100px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget (USD)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="5000"
                            min="1"
                            {...field} 
                            required 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Main Floor" {...field} required />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} required />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} required />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter>
                  <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
                    Post Opportunity
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {offers.length === 0 ? (
        <div className="bg-muted p-8 rounded-lg text-center">
          <h4 className="font-medium">No Posted Offers</h4>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Create your first influencer opportunity to attract talent to your venue.
          </p>
          <Button 
            onClick={() => setDialogOpen(true)}
            className="bg-amber-500 hover:bg-amber-600"
          >
            <Plus className="h-4 w-4 mr-2" /> New Offer
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{offer.title}</h4>
                    <Badge className={statusColors[offer.status]}>
                      {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-xl font-semibold text-amber-600">${offer.price.toLocaleString()}</div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                    {offer.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                    {offer.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-gray-500" />
                    {offer.time}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 px-4 py-2 flex justify-between">
                <span className="text-xs">
                  {offer.status === 'active' ? '0 applications' : 
                   offer.status === 'pending' ? '2 applications' : 
                   offer.status === 'completed' ? 'Completed' : 'Expired'}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDelete(offer.id)}
                  className="h-7 text-red-500 hover:text-red-700 hover:bg-red-100 p-1"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfluencerOffers;
