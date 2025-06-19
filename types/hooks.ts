// Hook-related type definitions

export interface UseYouTubeVideoIdReturn {
  videoId: string;
  error: boolean;
  isValidVideoId: boolean;
}

export interface UseVideoDataReturn {
  videoData: VideoData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseVideoTranscriptReturn {
  transcript: string;
  loading: boolean;
  error: string | null;
}

export interface UseNotesGeneratorProps {
  url: string;
  onNavigate?: (videoId: string) => void;
}

export interface UseNotesGeneratorReturn {
  videoId: string;
  error: boolean;
  isValidVideoId: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

// Import video types
import type { VideoData } from './video';