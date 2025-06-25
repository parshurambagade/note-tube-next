import { YOUTUBE_TRANSCRIPT_API_URL } from "@/constants";
import { TranscriptItem } from "@/types";
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

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            process.env.NEXT_YOUTUBE_TRANSCRIPT_RAPID_API_KEY || "",
          "x-rapidapi-host":
            process.env.NEXT_YOUTUBE_TRANSCRIPT_RAPID_API_HOST || "",
        },
      };
      const url = `${YOUTUBE_TRANSCRIPT_API_URL}${videoId.trim()}`;
      const response = await fetch(url, options);
      const json = await response.json();
      const result = json?.transcript as TranscriptItem[];

      const formattedTranscript = result
        ?.map((entry: TranscriptItem) => entry.text)
        .join(" ");

      if (!formattedTranscript) {
        throw new Error("No transcript available for this video");
      }

      return formattedTranscript;
    } catch (error: any) {
      console.error("Error fetching transcript (server-side):", error);
      throw new Error(`Failed to fetch transcript: ${error.message || error}`);
    }
  }
}
