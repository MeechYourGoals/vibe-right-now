
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Download, Volume2, Clock, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useUserSubscription } from "@/hooks/useUserSubscription";

interface AudioOverviewCardProps {
  venueId: string;
  venueName: string;
  audioUrl?: string;
  scriptText?: string;
  generatedAt?: string;
  onGenerateAudio?: () => void;
}

// Mock audio and script data for demo venues
const getMockAudioData = (venueId: string, venueName: string) => {
  const mockData = {
    "1": {
      scriptText: `Welcome to ${venueName}, the iconic desert music festival that transforms the California desert into a musical paradise. From electronic beats that pulse through the night to indie rock that energizes the afternoon crowds, this festival offers an unparalleled experience. Attendees consistently praise the incredible artist lineup and the magical desert atmosphere, though many suggest arriving early to secure better parking and bringing extra shade for those sunny California days. Check VRN for live vibes and real-time crowd updates!`
    },
    "3": {
      scriptText: `Welcome to ${venueName}, where artisan coffee meets community in the heart of the city. This local favorite consistently delivers exceptional single-origin brews and expert latte art that'll make your Instagram pop. Coffee enthusiasts rave about the knowledgeable baristas and cozy atmosphere, though some note that seating fills up fast during morning rush. Whether you're a coffee connoisseur or just need your daily caffeine fix, this spot delivers quality in every cup. Check VRN for live vibes and current crowd levels!`
    }
  };
  
  return mockData[venueId] || null;
};

const AudioOverviewCard: React.FC<AudioOverviewCardProps> = ({
  venueId,
  venueName,
  audioUrl,
  scriptText,
  generatedAt,
  onGenerateAudio
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mockAudioUrl, setMockAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { canAccessFeature } = useUserSubscription();
  
  const isPremium = canAccessFeature('premium');
  const isDemoVenue = venueId === "1" || venueId === "3";
  const showMockData = isPremium && isDemoVenue;

  useEffect(() => {
    const handleSubscriptionChange = () => {
      setMockAudioUrl(null);
      setIsPlaying(false);
      setCurrentTime(0);
    };

    window.addEventListener('subscriptionTierChanged', handleSubscriptionChange);
    return () => window.removeEventListener('subscriptionTierChanged', handleSubscriptionChange);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [mockAudioUrl]);

  const generateMockAudio = async () => {
    if (!showMockData) return;
    
    setIsLoading(true);
    const mockData = getMockAudioData(venueId, venueName);
    
    if (mockData) {
      try {
        const response = await fetch('/supabase/functions/v1/generate-audio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: mockData.scriptText,
            voice: 'Sarah'
          })
        });

        if (response.ok) {
          const data = await response.json();
          const audioBlob = new Blob([Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
          const url = URL.createObjectURL(audioBlob);
          setMockAudioUrl(url);
          toast.success('Audio summary generated!');
        } else {
          toast.error('Audio generation failed, showing placeholder');
        }
      } catch (error) {
        console.error('Audio generation failed:', error);
        toast.error('Audio generation failed, showing placeholder');
      }
    }
    
    setIsLoading(false);
  };

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    const audioSrc = mockAudioUrl || audioUrl;
    if (!audio || !audioSrc) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      toast.error('Failed to play audio');
    }
  };

  const handleDownload = () => {
    const audioSrc = mockAudioUrl || audioUrl;
    if (!audioSrc || !isPremium) return;
    
    const link = document.createElement('a');
    link.href = audioSrc;
    link.download = `${venueName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_audio_summary.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Audio download started');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isPremium) {
    return (
      <Card className="bg-zinc-900 border-zinc-800 text-white h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-purple-400" />
            Audio Overviews
            <Badge variant="outline" className="bg-purple-900 text-purple-300 border-purple-700">
              Premium Feature
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-zinc-400 mb-4">
              Upgrade to premium to access audio summaries
            </p>
            <Button disabled className="w-full">
              Upgrade to Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isDemoVenue) {
    return (
      <Card className="bg-zinc-900 border-zinc-800 text-white h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-purple-400" />
            Audio Overviews
            <Badge variant="outline" className="bg-purple-900 text-purple-300 border-purple-700">
              Premium
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-zinc-400 mb-4">
              Premium feature available for select venues
            </p>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const audioSrc = mockAudioUrl || audioUrl;

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-purple-400" />
            Audio Overviews
            <Badge variant="outline" className="bg-purple-900 text-purple-300 border-purple-700">
              Premium
            </Badge>
          </div>
          {generatedAt && (
            <span className="text-xs text-zinc-400">
              <Clock className="h-3 w-3 inline mr-1" />
              {new Date(generatedAt).toLocaleDateString()}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!audioSrc ? (
          <div className="text-center py-6">
            <p className="text-zinc-400 mb-4">
              Audio coming soon – summarising reviews now 🌀
            </p>
            <Button 
              onClick={generateMockAudio} 
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 w-full"
            >
              {isLoading ? 'Generating...' : 'Generate Audio Summary'}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <Button
                onClick={handlePlayPause}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <span className="text-sm text-zinc-400">≈2 min listen</span>
              <div className="ml-auto flex items-center gap-2">
                {duration > 0 && (
                  <span className="text-xs text-zinc-500">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                )}
                <Button
                  onClick={handleDownload}
                  size="sm"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {audioSrc && (
              <audio
                ref={audioRef}
                src={audioSrc}
                className="w-full"
                preload="metadata"
              />
            )}

            {duration > 0 && (
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioOverviewCard;
