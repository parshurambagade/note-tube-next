

export class TranscriptService {
    static async fetchYouTubeTranscript(videoId: string): Promise<string | null> {
        try {
            if(!videoId || videoId.length !== 11) {
                throw new Error("Invalid YouTube video ID");
            }
            const response = await fetch(`/api/transcript/${videoId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch transcript");
            }

            if(!data || !data?.transcript) {
                throw new Error("Transcript not found or invalid response");
            }
            return data.transcript;

        } catch (error) {
            console.error('Error fetching transcript:', error);
            throw new Error("Failed to fetch transcript");
        }

    }
}