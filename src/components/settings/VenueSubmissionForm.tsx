import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { z } from 'zod';

// Zod Schema for validation
const venueSchema = z.object({
  venueName: z.string().min(3, { message: "Venue/Event name must be at least 3 characters." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  businessHours: z.string().min(5, { message: "Business hours must be at least 5 characters." }),
  preferenceTags: z.string().optional(),
  proofLink: z.string().url({ message: "Please enter a valid URL for the proof link." }).optional().or(z.literal('')), // Allow empty string or valid URL
  contactEmail: z.string().email({ message: "Please enter a valid email address." }),
  contactPhone: z.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$|^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/, { message: "Please enter a valid phone number." }).optional().or(z.literal('')), // Basic North American phone format, optional
});

// Type for Zod error messages
type FormErrors = z.ZodError<typeof venueSchema>['formErrors']['fieldErrors'];

const VenueSubmissionForm: React.FC = () => {
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [preferenceTags, setPreferenceTags] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofLink, setProofLink] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProofFile(event.target.files[0]);
      // Clear proofLink if a file is chosen, as they are mutually exclusive for validation
      setProofLink(''); 
      setErrors(prev => ({ ...prev, proofLink: undefined, proofFile: undefined })); // Clear related errors
    } else {
      setProofFile(null);
    }
  };
  
  const handleProofLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProofLink(event.target.value);
    if (event.target.value) {
      setProofFile(null); // Clear proofFile if a link is entered
      setErrors(prev => ({ ...prev, proofLink: undefined, proofFile: undefined })); // Clear related errors
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({}); // Clear previous errors

    const currentFormData = {
      venueName,
      address,
      businessHours,
      preferenceTags,
      proofLink,
      contactEmail,
      contactPhone,
    };

    const validationResult = venueSchema.safeParse(currentFormData);

    if (!validationResult.success) {
      setErrors(validationResult.error.formErrors.fieldErrors);
      return;
    }
    
    // Additional validation for proof: one of file or link must be present
    if (!proofFile && !validationResult.data.proofLink) {
        setErrors(prev => ({ 
            ...prev, 
            proofFile: ["Please provide either a file or a link for proof of representation."],
            proofLink: ["Please provide either a file or a link for proof of representation."] 
        }));
        return;
    }
    if (proofFile && proofFile.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, proofFile: ["File size must be less than 5MB."] }));
        return;
    }


    // If validation passes
    const finalFormData = {
      ...validationResult.data,
      proof: proofFile 
        ? { type: 'file', name: proofFile.name, fileType: proofFile.type, size: proofFile.size } 
        : { type: 'link', url: validationResult.data.proofLink },
    };
    
    // Remove proofLink from top level if file was provided
    if (proofFile) {
      delete finalFormData.proofLink;
    }

    console.log("Form Data Submitted:", finalFormData);
    // TODO: Send formData to Supabase function or backend API
    // Example: const { data, error } = await supabase.functions.invoke('submit-venue', { body: finalFormData })
    
    // Reset form fields (optional)
    // setVenueName(''); setAddress(''); /* ... and so on for all fields */
    // setProofFile(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-neutral-800 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Submit Your Venue/Event for Vetting</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="venueName" className="text-neutral-300">Venue/Event Name</Label>
            <Input
              id="venueName"
              type="text"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              className={`mt-1 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:ring-primary ${errors.venueName ? 'border-red-500' : ''}`}
              placeholder="e.g., The Grand Concert Hall, Annual Tech Summit"
            />
            {errors.venueName && <p className="text-red-500 text-sm mt-1">{errors.venueName[0]}</p>}
          </div>

          <div>
            <Label htmlFor="address" className="text-neutral-300">Address</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`mt-1 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:ring-primary ${errors.address ? 'border-red-500' : ''}`}
              placeholder="123 Main Street, Anytown, USA 12345"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>}
          </div>

          <div>
            <Label htmlFor="businessHours" className="text-neutral-300">Business Hours</Label>
            <Textarea
              id="businessHours"
              value={businessHours}
              onChange={(e) => setBusinessHours(e.target.value)}
              className={`mt-1 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:ring-primary ${errors.businessHours ? 'border-red-500' : ''}`}
              placeholder="e.g., Mon-Fri: 9 AM - 10 PM, Sat-Sun: 12 PM - 11 PM"
            />
            {errors.businessHours && <p className="text-red-500 text-sm mt-1">{errors.businessHours[0]}</p>}
          </div>

          <div>
            <Label htmlFor="preferenceTags" className="text-neutral-300">Preference Tags (comma-separated)</Label>
            <Input
              id="preferenceTags"
              type="text"
              value={preferenceTags}
              onChange={(e) => setPreferenceTags(e.target.value)}
              className={`mt-1 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:ring-primary ${errors.preferenceTags ? 'border-red-500' : ''}`}
              placeholder="e.g., live music, rooftop bar, family-friendly, tech talks"
            />
            {errors.preferenceTags && <p className="text-red-500 text-sm mt-1">{errors.preferenceTags[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-neutral-300">Proof of Representation</Label>
            <div>
              <Label htmlFor="proofFile" className="text-xs text-neutral-400 sr-only">Upload File</Label>
              <Input
                id="proofFile"
                type="file"
                onChange={handleFileChange}
                className={`mt-1 block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 ${errors.proofFile ? 'border-red-500 rounded-md border' : ''}`}
              />
              {errors.proofFile && <p className="text-red-500 text-sm mt-1">{errors.proofFile[0]}</p>}
            </div>
            <div>
              <Label htmlFor="proofLink" className="text-xs text-neutral-400 sr-only">Or Link to Proof/ID</Label>
              <Input
                id="proofLink"
                type="text"
                value={proofLink}
                onChange={handleProofLinkChange}
                className={`mt-1 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:ring-primary ${errors.proofLink ? 'border-red-500' : ''}`}
                placeholder="Or link to proof/ID (e.g., business registration, LinkedIn profile)"
              />
              {errors.proofLink && !errors.proofFile && <p className="text-red-500 text-sm mt-1">{errors.proofLink[0]}</p>} 
            </div>
             <p className="text-xs text-neutral-500">
              Provide either a file (e.g., business license, utility bill, max 5MB) or a link to verify your affiliation.
            </p>
          </div>

          <div>
            <Label htmlFor="contactEmail" className="text-neutral-300">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className={`mt-1 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:ring-primary ${errors.contactEmail ? 'border-red-500' : ''}`}
              placeholder="you@example.com"
            />
            {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail[0]}</p>}
          </div>

          <div>
            <Label htmlFor="contactPhone" className="text-neutral-300">Contact Phone (Optional)</Label>
            <Input
              id="contactPhone"
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className={`mt-1 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:ring-primary ${errors.contactPhone ? 'border-red-500' : ''}`}
              placeholder="(123) 456-7890"
            />
            {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone[0]}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold"
          >
            <Send className="mr-2 h-4 w-4" />
            Submit for Vetting
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default VenueSubmissionForm;
