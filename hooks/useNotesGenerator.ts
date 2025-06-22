import { useState, useEffect } from "react";
import { NotesService } from "@/services/notesService";
import { NotesData, UseNotesGeneratorProps } from "@/types";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export const useNotesGenerator = (
  videoId: string,
): UseNotesGeneratorProps => {
    
  const [notes, setNotes] = useState<NotesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {user} = useAuth();

  const router = useRouter();

  const generateNotes = async (videoId: string) => {
    if (!videoId) {
      setError("Video ID is required to generate notes");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      
      // check if notes already exist for this videoId
      if(user){
        const existingNotes = await NotesService.getNotesByVideoId(videoId, user.id);

      if (existingNotes) {
        setLoading(false);
        router.push(`/notes/${existingNotes.video_id}`);
        return;
      }
      }
      const notesData = await NotesService.generateNotes(videoId);
      setNotes(notesData);
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
      generateNotes(videoId);
    }
  }, [videoId]);

  return {
    notes,
    loading,
    error,
    generateNotes,
    refetch,
  };
};