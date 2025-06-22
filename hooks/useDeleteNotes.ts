import { useState } from 'react';
import { NotesService } from '@/services/notesService';
import { useAuth } from '@/contexts/authContext';
import { toast } from 'sonner';

export const useDeleteNotes = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { user } = useAuth();

  const deleteNotes = async (videoId: string) => {
    if (!user) {
      toast.error("You must be logged in to delete notes.");
      return false;
    }
    if (!videoId) {
      toast.error("Missing video ID to delete.");
      return false;
    }
    setIsDeleting(true);

    try {
      const deletedNotes = await NotesService.deleteNotes(videoId);
      
      setIsDeleted(true);
      toast.success("Notes deleted successfully!", {
        description: "Your notes have been deleted.",});

      return deletedNotes;
    } catch (error) {
      console.error('Error Deleting notes:', error);
      toast.error("Failed to delete notes", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };


  return {
    deleteNotes,
    isDeleting,
    isDeleted,
    setIsDeleted,
  };
};