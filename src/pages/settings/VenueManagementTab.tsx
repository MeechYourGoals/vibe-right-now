
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { 
  Building2, 
  Users, 
  Clock, 
  ImageIcon, 
  Calendar, 
  FileText,
  CheckCircle,
  XCircle,
  Edit,
  UserPlus
} from "lucide-react";
import InfluencerMarketplace from "@/components/venue/marketplace/InfluencerMarketplace";

interface VenueManagementTabProps {
  onSave: () => void;
  isVenueMode: boolean;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const VenueManagementTab: React.FC<VenueManagementTabProps> = ({ 
  onSave, 
  isVenueMode, 
  subscriptionTier 
}) => {
  const form = useForm({
    defaultValues: {
      venueName: "The Rooftop",
      venueDescription: "Upscale rooftop bar and lounge with city views",
      autoApproveContent: true,
      notificationsEnabled: true,
      marketingEmails: true
    }
  });
  
  if (!isVenueMode) {
    return (
      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-center h-60">
          <div className="text-center">
            <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Venue Management</h3>
            <p className="text-muted-foreground mb-4">
              Please switch to Venue Mode to access venue management settings.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Venue Management</CardTitle>
          <CardDescription>
            Configure settings for managing your venue, including staff access, hours of operation, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="staff">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="staff" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Staff Access</span>
              </TabsTrigger>
              <TabsTrigger value="posting" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>Content Posting</span>
              </TabsTrigger>
              <TabsTrigger value="hours" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Hours & Events</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Reports</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="staff">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Staff Members</h3>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Staff
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>John Doe</div>
                            <div className="text-xs text-muted-foreground">john@example.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Manager</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell>Full Access</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>Jane Smith</div>
                            <div className="text-xs text-muted-foreground">jane@example.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Marketing</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell>Content Only</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>MW</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>Mike Wilson</div>
                            <div className="text-xs text-muted-foreground">mike@example.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Events</TableCell>
                      <TableCell>
                        <Badge className="bg-gray-100 text-gray-800">Invited</Badge>
                      </TableCell>
                      <TableCell>Events Only</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="posting">
              <div className="space-y-4">
                <Form {...form}>
                  <form className="space-y-4" onSubmit={form.handleSubmit(onSave)}>
                    <FormField
                      control={form.control}
                      name="venueName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Venue Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="venueDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Venue Description</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="autoApproveContent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Auto-Approve Content</FormLabel>
                            <FormDescription>
                              Automatically approve content posted by authorized staff
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <h3 className="text-lg font-medium mb-2 mt-4">Authorized Posters</h3>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-2 rounded-md bg-white shadow-sm dark:bg-gray-800">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">John Doe</div>
                            <div className="text-xs text-muted-foreground">Manager</div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        
                        <div className="flex items-center gap-3 p-2 rounded-md bg-white shadow-sm dark:bg-gray-800">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">Jane Smith</div>
                            <div className="text-xs text-muted-foreground">Marketing</div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        
                        <div className="flex items-center gap-3 p-2 rounded-md bg-white shadow-sm dark:bg-gray-800">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>MW</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">Mike Wilson</div>
                            <div className="text-xs text-muted-foreground">Events</div>
                          </div>
                          <XCircle className="h-5 w-5 text-red-500" />
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="mt-4">Save Changes</Button>
                  </form>
                </Form>
              </div>
            </TabsContent>
            
            <TabsContent value="hours">
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-2">Hours of Operation</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Monday</span>
                      <span>5:00 PM - 2:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Tuesday</span>
                      <span>5:00 PM - 2:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Wednesday</span>
                      <span>5:00 PM - 2:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Thursday</span>
                      <span>5:00 PM - 3:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Friday</span>
                      <span>4:00 PM - 4:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Saturday</span>
                      <span>4:00 PM - 4:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                      <span className="font-medium">Sunday</span>
                      <span>4:00 PM - 12:00 AM</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-2 mt-4">Upcoming Events</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-md bg-white shadow-sm dark:bg-gray-800">
                    <Calendar className="h-10 w-10 text-amber-500" />
                    <div className="flex-1">
                      <div className="font-medium">Weekend DJ Night</div>
                      <div className="text-xs text-muted-foreground">Saturday, April 12, 2025 • 9:00 PM</div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-md bg-white shadow-sm dark:bg-gray-800">
                    <Calendar className="h-10 w-10 text-amber-500" />
                    <div className="flex-1">
                      <div className="font-medium">Happy Hour Special</div>
                      <div className="text-xs text-muted-foreground">Monday-Friday, April 14-18, 2025 • 5:00 PM</div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-2">Available Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base md:text-lg">Visitor Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Track visitor check-ins, demographics, and trends
                      </p>
                      <Button size="sm" variant="outline">View Report</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base md:text-lg">Engagement Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Analyze customer engagement with posts and promotions
                      </p>
                      <Button size="sm" variant="outline">View Report</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base md:text-lg">Staff Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Review content posting and event management metrics
                      </p>
                      <Button size="sm" variant="outline">View Report</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base md:text-lg">Custom Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Build custom reports for specific business needs
                      </p>
                      <Button size="sm" variant="outline">Create Report</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <InfluencerMarketplace subscriptionTier={subscriptionTier} />
    </div>
  );
};

export default VenueManagementTab;
