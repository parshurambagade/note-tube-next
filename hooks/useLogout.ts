import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabase/client";
import { toast } from "sonner";
import useSavedNotesStore from "@/stores/saved-notes-store";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { clearSavedNotes } = useSavedNotesStore();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }

      clearSavedNotes();

      // Show success toast
      toast.success("Logged out successfully", {
        description: "You have been logged out. See you next time!",
        duration: 3000,
      });

      // Redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);

      // Show error toast
      toast.error("Logout failed", {
        description: "There was an error logging you out. Please try again.",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogout,
    isLoading,
  };
};
