import { useState, useEffect } from "react";
import { NotesService } from "@/services/notesService";
import { NotesData, UseNotesGeneratorProps } from "@/types";

export const useNotesGenerator = (
  videoId: string,
): UseNotesGeneratorProps => {
    
  const [notes, setNotes] = useState<NotesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateNotes = async (id: string) => {
    if (!id) {
      setError("Video ID is required to generate notes");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const notesData = await NotesService.generateNotes(id);
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