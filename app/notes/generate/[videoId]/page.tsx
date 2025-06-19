"use client";

import { useState } from "react";
import Notes from "@/components/notes/index";
import NotesLoading from "@/components/notes/notes-loading";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useVideoData } from "@/hooks/useVideoData";
import { NoteSection } from "@/types";
import { useNotesGenerator } from "@/hooks/useNotesGenerator";
import GenerateNotesErrorComponent from "@/components/notes/generate-notes-error-component";

const Generate = () => {
  const [isSaved, setIsSaved] = useState(false);
  const { videoId } = useParams();
  const {
    videoData,
    loading: videoLoading,
    error: videoError,
    refetch: refetchVideo,
  } = useVideoData(videoId);

  const {
    notes,
    loading: notesLoading,
    error: notesError,
    refetch: refetchNotes,
  } = useNotesGenerator(videoId as string);

  const handleSave = () => {
    setIsSaved(true);
    //TODO: Implement save functionality
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Show loading component while notes are being generated
  if (notesLoading) {
    return <NotesLoading videoData={videoData || undefined} />;
  }

  // Show simple loading for video data only
  if (videoLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen my-20">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading video details...</p>
        </div>
      </div>
    );
  }

  if (videoError || notesError) {
    return (
      <GenerateNotesErrorComponent
        videoError={videoError}
        notesError={notesError}
        refetchNotes={refetchNotes}
        refetchVideo={refetchVideo}
      />
    );
  }

  if (!videoData) {
    return <div className="text-center py-8">No video data available</div>;
  }

  if (!notes) {
    return <div className="text-center py-8">No notes available</div>;
  }

  return (
    <Notes>
      <Notes.Head>
        <Notes.VideoHead
          videoData={videoData}
          handleSave={handleSave}
          isSaved={isSaved}
        />
        <Notes.VideoPlayer
          title={videoData?.title}
          videoId={videoData?.videoId}
        />
      </Notes.Head>
      <Notes.Body>
        {notes.summary && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Summary</h2>
              <p className="text-gray-700">{notes.summary}</p>
            </div>
            <Separator className="my-8" />
          </>
        )}
        <Notes.KeyPoints keyPoints={notes?.keyPoints} />
        <Separator className="my-8" />
        <Notes.DetailedNotes sections={notes?.sections as NoteSection[]} />
      </Notes.Body>
    </Notes>
  );
};

export default Generate;
