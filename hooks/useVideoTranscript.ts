import { useState, useEffect } from "react";
import { TranscriptService } from "@/services/transcriptService";

interface UseVideoTranscriptReturn {
  transcript: string;
  loading: boolean;
  error: string | null;
}

export const useVideoTranscript = (videoId: string | string[] | undefined): UseVideoTranscriptReturn => {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideoTranscript = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await TranscriptService.fetchYouTubeTranscript(id);
      setTranscript(data as string);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch transcript';
      setError(errorMessage);
      console.error('Error fetching video transcript:', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!videoId) return;
    
    const id = Array.isArray(videoId) ? videoId[0] : videoId;
    if (id) {
      fetchVideoTranscript(id);
    }
  }, [videoId]);

  return {
    transcript,
    loading,
    error,
  };
};