import { BookOpen, Clock, Save } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import type { NotesVideoHeadProps } from "@/types";
import DeleteConfirmationDialog from "./delete-confirmation-dialog";
import { useSaveNotes } from "@/hooks/useSaveNotes";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

const NotesVideoHead: React.FC<NotesVideoHeadProps> = ({
  videoData,
  notes,
}) => {
  const router = useRouter();

    const { user } = useAuth();
  // Custom hook to handle saving notes
    const {
      saveNotes,
      isSaving,
      isSaved,
      checkIfSaved,
    } = useSaveNotes();    

   
    const handleSave = async () => {
    if (!videoData || !notes) {
      toast.error("Cannot save: Missing video data or notes");
      return;
    }

    await saveNotes(videoData, notes);

    router.push(`/notes/${videoData.videoId}`);
  };

  
    // Check if notes are already saved when component mounts
  useEffect(() => {
    if (user && videoData?.videoId) {
   checkIfSaved(videoData?.videoId as string);
    }
  }, [user, videoData?.videoId, checkIfSaved]);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-col-reverse md:flex-row  gap-3 items-start md:items-center justify-between">
        <div className="w-full sm:flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
            {videoData.title}
          </h1>
          <div className="flex w-full sm:w-max justify-between sm:justify-normal items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1 ">
              <Clock className="w-3 md:w-4 h-3 md:h-4" />
              <span>{videoData.duration}</span>
            </div>
            <div className="flex items-center gap-1 ">
              <BookOpen className="w-3 md:w-4 h-3 md:h-4" />
              <span>{videoData.channel}</span>
            </div>
          </div>
        </div>
        <div className="flex w-full sm:w-max justify-end sm:justify-normal items-center gap-2">
          {/* TODO: Add download, share and edit notes functionality in future updates */}

          {isSaved ? (
            <DeleteConfirmationDialog videoId={videoData?.videoId || ""} />
          ) : (
            <><Button
            onClick={handleSave}
            disabled={isSaving || isSaved}
            className={
              "hidden sm:flex text-base cursor-pointer" +
              (isSaved ? "bg-green-600 hover:bg-green-700" : "")
            }
          >
            <Save className="w-3 md:w-4 h-3 md:h-4 mr-2" />
            {isSaved ? "Saved!" : isSaving ? "Saving Notes" :  "Save Notes"}
          </Button>

          {/* Button for small devices */}
          <Button
            onClick={handleSave}
            size="sm"
            disabled={isSaving || isSaved}
            className={
              " sm:hidden text-sm cursor-pointer" +
              (isSaved ? "bg-green-600 hover:bg-green-700" : "")
            }
          >
            <Save className="w-3 md:w-4 h-3 md:h-4 mr-2" />
            {isSaved ? "Saved!" : isSaving ? "Saving Notes" : "Save Notes"}
          </Button>
          </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default NotesVideoHead;
