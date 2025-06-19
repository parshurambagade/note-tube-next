import { NextResponse } from "next/server";
import TranscriptClient from "youtube-transcript-api";
import type { TranscriptItem, TranscriptRouteParams } from "@/types";

const client = new TranscriptClient();

export async function GET(
  request: Request, 
  { params }: TranscriptRouteParams
) {
  try {
    const { videoId } = await params;
    // Validate videoId
    if (!videoId || videoId.trim() === '') {
      return NextResponse.json(
        { error: 'Video ID is required' }, 
        { status: 400 }
      );
    }

    await client.ready; // wait for client initialization
    const transcript = await client.getTranscript(videoId);
    
    if (!transcript || !transcript.tracks || transcript.tracks.length === 0 || !transcript.tracks[0].transcript) {
      return NextResponse.json(
        { error: 'No transcript available for this video' }, 
        { status: 404 }
      );
    }

    // Format the transcript
    const formattedTranscript = transcript?.tracks[0]?.transcript?.map((entry: TranscriptItem) => entry.text).join(' ');
    
    if (!formattedTranscript) {
      return NextResponse.json(
        { error: 'Transcript is empty or not available' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      videoId,
      transcript: formattedTranscript,
      rawTranscript: transcript?.tracks[0]?.transcript,
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching transcript:', error);
    
    // Return proper error response instead of null
    return NextResponse.json(
      { error: 'Failed to fetch transcript. Video may not have captions available.' },
      { status: 500 }
    );
  }
}