
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LightbulbIcon } from "lucide-react";

const VernonVenueAssistant: React.FC = () => {
  return (
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/50 dark:to-background">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <LightbulbIcon className="h-5 w-5 mr-2 text-amber-500" />
          <h3 className="font-medium">Vernon AI Assistant</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm">
            I can help you learn more about this venue and plan your visit!
          </p>
          
          <div className="space-y-2">
            <p className="text-xs font-medium">Try asking:</p>
            <ul className="text-xs space-y-1">
              <li className="flex items-center">
                <div className="w-1 h-1 rounded-full bg-amber-500 mr-2"></div>
                <span>What's the best time to visit?</span>
              </li>
              <li className="flex items-center">
                <div className="w-1 h-1 rounded-full bg-amber-500 mr-2"></div>
                <span>Is this venue good for groups?</span>
              </li>
              <li className="flex items-center">
                <div className="w-1 h-1 rounded-full bg-amber-500 mr-2"></div>
                <span>What's special about this place?</span>
              </li>
            </ul>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600">
            Ask Vernon
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VernonVenueAssistant;
