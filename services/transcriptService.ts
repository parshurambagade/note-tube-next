// services/transcriptService.ts
import TranscriptClient from "youtube-transcript-api";

export class TranscriptService {
    private static client = new TranscriptClient();

    // Server-side method - direct API call
    static async fetchYouTubeTranscriptServer(videoId: string): Promise<string | null> {
        try {
            // Validate videoId
            if (!videoId || videoId.trim() === '') {
                throw new Error("Video ID is required and cannot be empty");
            }

            console.log('Fetching transcript for videoId (server-side):', videoId);

            await this.client.ready; // wait for client initialization
            const transcript = await this.client.getTranscript(videoId);
            
            if (!transcript || !transcript.tracks || transcript.tracks.length === 0 || !transcript.tracks[0].transcript) {
                throw new Error('No transcript available for this video');
            }

            // Extract and format transcript text
            const transcriptItems = transcript.tracks[0].transcript;
            const transcriptText = transcriptItems
                .map((item: any) => item.text)
                .join(' ')
                .replace(/\s+/g, ' ')
                .trim();

            console.log('Transcript fetched successfully (server-side)');
            return transcriptText;

        } catch (error: any) {
            console.error('Error fetching transcript (server-side):', error);
            throw new Error(`Failed to fetch transcript: ${error.message || error}`);
        }
    }

    // Client-side method - HTTP request to API route
    static async fetchYouTubeTranscriptClient(videoId: string): Promise<string | null> {
        try {
            // Validate videoId
            if (!videoId || videoId.trim() === '') {
                throw new Error("Video ID is required and cannot be empty");
            }

            console.log('Fetching transcript for videoId (client-side):', videoId);

            const response = await fetch(`/api/transcript/${videoId.trim()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch transcript`);
            }
            
            const data = await response.json();

            if (!data || !data.transcript) {
                throw new Error("Transcript not found or invalid response from API");
            }

            console.log('Transcript fetched successfully (client-side)');
            return data.transcript;

        } catch (error: any) {
            console.error('Error fetching transcript (client-side):', error);
            throw new Error(`Failed to fetch transcript: ${error.message || error}`);
        }
    }
}