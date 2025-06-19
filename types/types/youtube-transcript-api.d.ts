declare module 'youtube-transcript-api' {
  interface TranscriptItem {
    text: string;
    start: number;
    dur: number;
  }

  interface TranscriptTrack {
    transcript: TranscriptItem[];
  }

  interface TranscriptResponse {
    tracks: TranscriptTrack[];
  }

  class TranscriptClient {
    ready: Promise<void>;
    getTranscript(videoId: string): Promise<TranscriptResponse>;
  }

  export default TranscriptClient;
}