import { useRouter } from "next/navigation";
import { useYouTubeVideoId } from "./useYouTubeVideoId";
import type { UseNotesGeneratorProps, UseNotesGeneratorReturn } from "@/types";

export const useNotesGenerator = ({ 
  url, 
  onNavigate 
}: UseNotesGeneratorProps): UseNotesGeneratorReturn => {
  const router = useRouter();
  const { videoId, error, isValidVideoId } = useYouTubeVideoId(url);

  const handleGenerateNotes = (): void => {
    if (!isValidVideoId) return;

    const navigateToNotes = () => router.push(`/notes/generate/${videoId}`);

    if (onNavigate) {
      onNavigate(videoId);
    } else {
      navigateToNotes();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isValidVideoId) {
      handleGenerateNotes();
    }
  };

  return {
    videoId,
    error,
    isValidVideoId,
    handleSubmit
  };
};