// Component-related type definitions

import type { VideoData } from './video';

export interface NotesGeneratorProps {
  onNavigate?: (videoId: string) => void;
}

export interface NotesGeneratorFormProps {
  onNavigate?: (videoId: string) => void;
}

export interface NotesVideoHeadProps {
  handleSave: () => void;
  isSaved: boolean;
  videoData: VideoData;
}

// Notes content types
export interface NoteSection {
  title: string;
  content: string;
  subsections?: string[];
  timestamp: string;
}

export interface NotesData {
  summary: string;
  keyPoints: string[];
  sections: NoteSection[];
}

export interface KeyPointsProps {
  keyPoints: string[];
}

export interface DetailedNotesProps {
  sections: NoteSection[];
}

export interface VideoPlayerProps {
  title: string;
  videoId: string;
}

// Composition types for Notes component
export interface NotesComponent {
  Head: React.ComponentType<React.PropsWithChildren>;
  Body: React.ComponentType<React.PropsWithChildren>;
  KeyPoints: React.ComponentType<KeyPointsProps>;
  DetailedNotes: React.ComponentType<DetailedNotesProps>;
  VideoHead: React.ComponentType<NotesVideoHeadProps>;
  VideoPlayer: React.ComponentType<VideoPlayerProps>;
}