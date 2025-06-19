import { NotesData } from "@/types";
import { convertMarkdownToJson } from "@/utils/notes";


export class NotesService {
  static async generateNotes(videoId: string): Promise<NotesData> {
    if (!videoId) {
      throw new Error("Video ID is required to generate notes");
    }

    try {
      const response = await fetch("/api/notes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate notes");
      }

      const data = await response.json();
      
      if (!data.notes) {
        throw new Error("No notes data found in response");
      }

      // Convert markdown to JSON
      const json = convertMarkdownToJson(data.notes);
      
      if (!json) {
        throw new Error("Failed to convert markdown to JSON");
      }

      return json;
    } catch (error) {
      console.error("Error in NotesService.generateNotes:", error);
      throw error;
    }
  }
}