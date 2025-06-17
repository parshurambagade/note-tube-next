import { useState, useEffect } from "react";
import { parseYouTubeUrl, isValidYouTubeVideoId } from "../utils/youtube";

interface UseYouTubeVideoIdReturn {
  videoId: string;
  error: boolean;
  isValidVideoId: boolean;
}

export const useYouTubeVideoId = (url: string): UseYouTubeVideoIdReturn => {
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url.trim()) {
      setVideoId("");
      setError(false);
      return;
    }

    const extractedVideoId = parseYouTubeUrl(url);
    
    if (extractedVideoId && isValidYouTubeVideoId(extractedVideoId)) {
      setVideoId(extractedVideoId);
      setError(false);
    } else {
      setVideoId("");
      setError(true);
    }
  }, [url]);

  const isValidVideoId = videoId.length === 11 && !error;

  return {
    videoId,
    error,
    isValidVideoId
  };
};