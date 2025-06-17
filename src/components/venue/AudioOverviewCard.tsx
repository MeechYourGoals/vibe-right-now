
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Download, Volume2, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface AudioOverviewCardProps {
  venueId: string;
  venueName: string;
  audioUrl?: string;
  scriptText?: string;
  generatedAt?: string;
  isUserPremium: boolean;
  onGenerateAudio?: () => void;
}

const AudioOverviewCard: React.FC<AudioOverviewCardProps> = ({
  venueId,
  venueName,
  audioUrl,
  scriptText,
  generatedAt,
  isUserPremium,
  onGenerateAudio
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

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
  }, [audioUrl]);

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
        
        // Analytics event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'audio_overview_play', {
            venue_id: venueId,
            venue_name: venueName
          });
        }
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      toast.error('Failed to play audio');
    }
  };

  const handleDownload = () => {
    if (!audioUrl || !isUserPremium) return;
    
    const link = document.createElement('a');
    link.href = audioUrl;
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

  if (!isUserPremium) {
    return (
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-purple-600" />
            AI Audio Overview
            <Badge variant="outline" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              Premium Feature
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Get AI-powered audio summaries of venue reviews and vibes. Perfect for discovering places on-the-go.
          </p>
          <Button disabled className="w-full">
            Upgrade to Premium to Access Audio Summaries
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-purple-400" />
            AI Audio Overview
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
        {!audioUrl ? (
          <div className="text-center py-4">
            <p className="text-zinc-400 mb-4">
              Audio coming soon – summarising reviews now 🌀
            </p>
            {onGenerateAudio && (
              <Button 
                onClick={onGenerateAudio} 
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? 'Generating...' : 'Generate Audio Summary'}
              </Button>
            )}
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

            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
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
