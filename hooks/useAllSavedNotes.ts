import { useState, useEffect } from "react";
import { NotesService } from "@/services/notesService";
import { useAuth } from "@/contexts/authContext";
import { SavedNote } from "@/types";

export const useAllSavedNotesByUserId = () => {
  const [allSavedNotes, setAllSavedNotes] = useState<SavedNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  const fetchAllSavedNotes = async (userId: string) => {
    try {
      if (!user) {
        setError("User ID is required to fetch saved notes");
        return;
      }
      setLoading(true);
      setError(null);

      const notes = await NotesService.getAllSavedNotes(userId);

      setAllSavedNotes(notes);
    } catch (err) {
      console.error("Error fetching saved notes:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch saved notes"
      );
      setAllSavedNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Don't fetch if auth is still loading or no videoId
    if (authLoading) {
      return;
    }

    fetchAllSavedNotes(user?.id as string);
  }, [authLoading, user?.id]);

  const refetch = () => {
    if (user?.id) {
      fetchAllSavedNotes(user?.id);
    }
  };

  return {
    allSavedNotes,
    loading,
    error,
    refetch,
  };
};
