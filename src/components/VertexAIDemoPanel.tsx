import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { VertexAIHub } from '@/services/VertexAI';

const VertexAIDemoPanel = () => {
  const [textInput, setTextInput] = useState('');
  const [textResult, setTextResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('text');

  const handleTextGeneration = async () => {
    if (!textInput.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await VertexAIHub.generateText(textInput);
      setTextResult(result);
    } catch (error) {
      console.error('Error generating text:', error);
      setTextResult('Error: Failed to generate text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeechGeneration = async () => {
    if (!textInput.trim()) return;
    
    setIsLoading(true);
    try {
      const audioContent = await VertexAIHub.textToSpeech(textInput);
      
      if (audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
        audio.play();
        setTextResult('Speech generated successfully!');
      } else {
        setTextResult('Error: Failed to generate speech.');
      }
    } catch (error) {
      console.error('Error generating speech:', error);
      setTextResult('Error: Failed to generate speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentSafety = async () => {
    if (!textInput.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await VertexAIHub.checkContentSafety(textInput);
      
      if (result.safe) {
        setTextResult('Content is safe.');
      } else {
        setTextResult(`Content may not be safe. Reasons: ${result.reasons?.join(', ') || 'Unknown'}`);
      }
    } catch (error) {
      console.error('Error checking content safety:', error);
      setTextResult('Error: Failed to check content safety. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextAnalysis = async () => {
    if (!textInput.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await VertexAIHub.analyzeText(textInput);
      setTextResult(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Error analyzing text:', error);
      setTextResult('Error: Failed to analyze text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Perplexity AI Demo</CardTitle>
        <CardDescription>
          Test various Perplexity AI capabilities
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mx-4">
          <TabsTrigger value="text">Text Generation</TabsTrigger>
          <TabsTrigger value="speech">Text to Speech</TabsTrigger>
          <TabsTrigger value="safety">Content Safety</TabsTrigger>
          <TabsTrigger value="analysis">Text Analysis</TabsTrigger>
        </TabsList>
        
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Textarea
                placeholder="Enter your prompt or text here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={4}
                className="w-full"
              />
            </div>
            
            <Button 
              onClick={
                activeTab === 'text' ? handleTextGeneration :
                activeTab === 'speech' ? handleSpeechGeneration :
                activeTab === 'safety' ? handleContentSafety :
                handleTextAnalysis
              }
              disabled={isLoading || !textInput.trim()}
              className="w-full"
            >
              {isLoading ? 'Processing...' : 
                activeTab === 'text' ? 'Generate Text' :
                activeTab === 'speech' ? 'Generate Speech' :
                activeTab === 'safety' ? 'Check Safety' :
                'Analyze Text'
              }
            </Button>
            
            {textResult && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Result:</h3>
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                  {textResult}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Powered by Perplexity
        </p>
      </CardFooter>
    </Card>
  );
};

export default VertexAIDemoPanel;
