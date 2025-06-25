import { useState, useEffect } from "react";
import { NotesService } from "@/services/notesService";
import { NotesData, UseNotesGeneratorProps } from "@/types";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import useRecentlyGeneratedNotesStore from "@/stores/recently-generated-notes-store";
import { useVideoData } from "./useVideoData";

export const useNotesGenerator = (
  videoId: string,
): UseNotesGeneratorProps => {
    
  const [notes, setNotes] = useState<NotesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const router = useRouter();
  
  // Get video data for caching
  const { videoData } = useVideoData(videoId);
  
  // Recently generated notes store
  const {
    getCachedNotes,
    addGeneratedNote,
    hasGeneratedNotes,
    cleanupOldEntries
  } = useRecentlyGeneratedNotesStore();

  const generateNotes = async (videoId: string) => {
    if (!videoId) {
      setError("Video ID is required to generate notes");
      return;
    }

    // Check if we have cached notes first
    const cachedNotes = getCachedNotes(videoId);
    if (cachedNotes) {
      setNotes(cachedNotes.notesData);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check if notes already exist in saved notes for this videoId
      if (user) {
        const existingNotes = await NotesService.getNotesByVideoId(videoId, user.id);

        if (existingNotes) {
          setLoading(false);
          router.push(`/notes/${existingNotes.video_id}`);
          return;
        }
      }
      
      const notesData = await NotesService.generateNotes(videoId);
      setNotes(notesData);
      
      // Cache the generated notes
      addGeneratedNote(videoId, notesData, videoData);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate notes";
      setError(errorMessage);
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    if (videoId && videoId.length === 11) {
      await generateNotes(videoId);
    }
  };

  useEffect(() => {
    if (videoId && videoId.length === 11) {
      // Check cache first before generating
      const cachedNotes = getCachedNotes(videoId);
      if (cachedNotes) {
        setNotes(cachedNotes.notesData);
        setLoading(false);
        setError(null);
      } else {
        generateNotes(videoId);
      }
    }
  }, [videoId]);

  // Cleanup old entries periodically
  useEffect(() => {
    cleanupOldEntries();
  }, []);

  return {
    notes,
    loading,
    error,
    generateNotes,
    refetch,
  };
};