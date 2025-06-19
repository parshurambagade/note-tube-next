import { useState, useEffect } from "react";
import { VideoService } from "@/services/videoService";
import type { UseVideoDataReturn, VideoData } from "@/types";

export const useVideoData = (videoId: string | string[] | undefined): UseVideoDataReturn => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideoData = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await VideoService.getVideoDetails(id);
      setVideoData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch video data';
      setError(errorMessage);
      console.error('Error fetching video details:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (!videoId) return;
    const id = Array.isArray(videoId) ? videoId[0] : videoId;
    if (id) {
      fetchVideoData(id);
    }
  };

  useEffect(() => {
    if (!videoId) return;
    
    const id = Array.isArray(videoId) ? videoId[0] : videoId;
    if (id) {
      fetchVideoData(id);
    }
  }, [videoId]);

  return {
    videoData,
    loading,
    error,
    refetch
  };
};