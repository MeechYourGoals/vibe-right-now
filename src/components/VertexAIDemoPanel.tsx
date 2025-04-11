
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { VertexAIHub } from '@/services/VertexAIHub';
import { Mic, Send, Volume2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const VertexAIDemoPanel = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  
  // Generate text with Vertex AI
  const handleGenerateText = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text first');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await VertexAIHub.generateText(text);
      setResponse(result);
    } catch (error) {
      console.error('Error generating text:', error);
      toast.error('Failed to generate text');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate speech from text
  const handleTextToSpeech = async () => {
    if (!response.trim()) {
      toast.error('No response to read');
      return;
    }
    
    setIsLoading(true);
    try {
      const audioContent = await VertexAIHub.textToSpeech(response);
      if (audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
        audio.play();
      } else {
        toast.error('Failed to generate speech');
      }
    } catch (error) {
      console.error('Error converting text to speech:', error);
      toast.error('Failed to generate speech');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Analyze text for entities
  const handleAnalyzeText = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text first');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await VertexAIHub.analyzeText(text);
      
      if (result) {
        // Format the analysis results
        const entities = result.entities || [];
        let analysisText = 'Entities found:\n\n';
        
        entities.forEach((entity: any, index: number) => {
          analysisText += `${index + 1}. ${entity.name} (${entity.type})\n`;
          if (entity.metadata && Object.keys(entity.metadata).length > 0) {
            analysisText += `   Metadata: ${JSON.stringify(entity.metadata)}\n`;
          }
          analysisText += `   Salience: ${(entity.salience * 100).toFixed(2)}%\n\n`;
        });
        
        if (entities.length === 0) {
          analysisText = 'No entities found in the text.';
        }
        
        setResponse(analysisText);
      } else {
        setResponse('No analysis results returned');
      }
    } catch (error) {
      console.error('Error analyzing text:', error);
      toast.error('Failed to analyze text');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Vertex AI Demo Panel</CardTitle>
        <CardDescription>
          Explore Google's Vertex AI capabilities
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Text Generation</TabsTrigger>
            <TabsTrigger value="analyze">Text Analysis</TabsTrigger>
            <TabsTrigger value="speech">Speech</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6">
          <TabsContent value="text">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Enter a prompt for Vertex AI to generate text
                </p>
                <Textarea
                  placeholder="Enter your prompt here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="h-24"
                />
              </div>
              <Button 
                onClick={handleGenerateText} 
                disabled={isLoading || !text.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Generate Text
                  </>
                )}
              </Button>
              {response && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Response:</p>
                  <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
                    {response}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={handleTextToSpeech}
                    disabled={isLoading}
                  >
                    <Volume2 className="mr-2 h-4 w-4" />
                    Read Aloud
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analyze">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Enter text to analyze for entities and sentiment
                </p>
                <Textarea
                  placeholder="Enter text to analyze..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="h-24"
                />
              </div>
              <Button 
                onClick={handleAnalyzeText} 
                disabled={isLoading || !text.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Analyze Text
                  </>
                )}
              </Button>
              {response && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Analysis Results:</p>
                  <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
                    {response}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="speech">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Enter text to convert to speech
                </p>
                <Textarea
                  placeholder="Enter text for speech synthesis..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="h-24"
                />
              </div>
              <Button 
                onClick={async () => {
                  if (!text.trim()) {
                    toast.error('Please enter some text first');
                    return;
                  }
                  
                  setIsLoading(true);
                  try {
                    const audioContent = await VertexAIHub.textToSpeech(text);
                    if (audioContent) {
                      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
                      audio.play();
                      setResponse('Speech generated successfully');
                    } else {
                      setResponse('Failed to generate speech');
                    }
                  } catch (error) {
                    console.error('Error converting text to speech:', error);
                    setResponse('Error: ' + (error instanceof Error ? error.message : String(error)));
                  } finally {
                    setIsLoading(false);
                  }
                }} 
                disabled={isLoading || !text.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Speech...
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2 h-4 w-4" />
                    Generate Speech
                  </>
                )}
              </Button>
              {response && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Status:</p>
                  <div className="p-4 bg-muted rounded-md">
                    {response}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Powered by Google Vertex AI
        </p>
      </CardFooter>
    </Card>
  );
};

export default VertexAIDemoPanel;
