import { NEXTAUTH_URL } from "@/constants";
import TranscriptClient from "youtube-transcript-api";

export class TranscriptService {
  private static client = new TranscriptClient();

  // Server-side method - direct API call
  static async fetchYouTubeTranscript(videoId: string): Promise<string | null> {
    try {
      // Validate videoId
      if (!videoId || videoId.trim() === "") {
        throw new Error("Video ID is required and cannot be empty");
      }

      const transcript = await fetch(
        `${NEXTAUTH_URL}/api/transcript/${videoId.trim()}`
      );

      return transcript.text();
    } catch (error: any) {
      console.error("Error fetching transcript (server-side):", error);
      throw new Error(`Failed to fetch transcript: ${error.message || error}`);
    }
  }
}
