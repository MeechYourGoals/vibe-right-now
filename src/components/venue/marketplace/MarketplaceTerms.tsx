
import React from "react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Shield, CreditCard, Check } from "lucide-react";

const MarketplaceTerms: React.FC = () => {
  return (
    <div className="space-y-4">
      <Alert className="bg-amber-900 border-amber-800 text-amber-100">
        <Info className="h-4 w-4 text-amber-400" />
        <AlertTitle className="text-amber-50 font-medium">Platform Fee Information</AlertTitle>
        <AlertDescription className="text-amber-200">
          VRN charges a 3% platform fee on all successful marketplace transactions.
          This covers payment processing, escrow services, and dispute resolution.
        </AlertDescription>
      </Alert>
      
      <Card className="overflow-hidden bg-amber-950 border-amber-800">
        <CardContent className="p-4 pb-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-3">
              <div className="flex justify-center mb-2">
                <div className="bg-amber-800 rounded-full p-3">
                  <Shield className="h-6 w-6 text-amber-300" />
                </div>
              </div>
              <h3 className="text-sm font-medium mb-1 text-amber-100">Secure Escrow</h3>
              <p className="text-xs text-amber-300">
                Payments are held securely until content is posted and verified
              </p>
            </div>
            
            <div className="p-3">
              <div className="flex justify-center mb-2">
                <div className="bg-amber-800 rounded-full p-3">
                  <CreditCard className="h-6 w-6 text-amber-300" />
                </div>
              </div>
              <h3 className="text-sm font-medium mb-1 text-amber-100">Simple Payments</h3>
              <p className="text-xs text-amber-300">
                Multiple payment options with automatic invoicing and receipts
              </p>
            </div>
            
            <div className="p-3">
              <div className="flex justify-center mb-2">
                <div className="bg-amber-800 rounded-full p-3">
                  <Check className="h-6 w-6 text-amber-300" />
                </div>
              </div>
              <h3 className="text-sm font-medium mb-1 text-amber-100">Verified Content</h3>
              <p className="text-xs text-amber-300">
                All sponsored content is properly labeled for transparency
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Accordion type="single" collapsible className="w-full bg-amber-950 rounded-md border border-amber-800">
        <AccordionItem value="how-it-works" className="border-amber-800 px-4">
          <AccordionTrigger className="text-amber-100 hover:text-amber-50">How It Works</AccordionTrigger>
          <AccordionContent className="text-amber-200">
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Post an offer or browse available talent</li>
              <li>Send an offer with your proposed rate and details</li>
              <li>Negotiate terms with the influencer if needed</li>
              <li>Once terms are agreed, funds are placed in escrow</li>
              <li>Influencer visits your venue and creates content</li>
              <li>Content is posted with proper sponsorship disclosure</li>
              <li>Funds are released to the influencer after posting</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="fees" className="border-amber-800 px-4">
          <AccordionTrigger className="text-amber-100 hover:text-amber-50">Fee Structure</AccordionTrigger>
          <AccordionContent className="text-amber-200">
            <div className="space-y-3 text-sm">
              <p>VRN charges a flat 3% platform fee based on the final negotiated rate. This fee helps support:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Secure payment processing</li>
                <li>Escrow services</li>
                <li>Influencer verification</li>
                <li>Dispute resolution</li>
                <li>Platform maintenance</li>
              </ul>
              <p className="text-xs text-amber-300 mt-2">
                Example: For a $10,000 influencer deal, the platform fee would be $300.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="content-guidelines" className="border-amber-800 px-4">
          <AccordionTrigger className="text-amber-100 hover:text-amber-50">Content Guidelines</AccordionTrigger>
          <AccordionContent className="text-amber-200">
            <div className="space-y-3 text-sm">
              <p>All sponsored content must:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Clearly disclose the sponsored nature of the content</li>
                <li>Include the #VRNPartner hashtag</li>
                <li>Comply with all applicable advertising regulations</li>
                <li>Be posted within 48 hours of the venue visit</li>
                <li>Remain on the influencer's profile for at least 30 days</li>
              </ul>
              <p className="mt-2">
                VRN provides automated disclosure tags that comply with FTC guidelines.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="cancellations" className="border-amber-800 px-4">
          <AccordionTrigger className="text-amber-100 hover:text-amber-50">Cancellations & Disputes</AccordionTrigger>
          <AccordionContent className="text-amber-200">
            <div className="space-y-3 text-sm">
              <p>Our cancellation policy:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cancellations 7+ days before: 100% refund</li>
                <li>Cancellations 3-7 days before: 75% refund</li>
                <li>Cancellations 1-3 days before: 50% refund</li>
                <li>Cancellations within 24 hours: 25% refund</li>
              </ul>
              <p className="mt-2">
                Disputes are handled by our dedicated marketplace support team. Most disputes are resolved within 48 hours.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MarketplaceTerms;
