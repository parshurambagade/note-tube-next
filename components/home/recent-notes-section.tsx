"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSavedNotesStore from "@/stores/saved-notes-store";
import { useAllSavedNotesByUserId } from "@/hooks/useAllSavedNotes";
import NotesCard from "../common/notes-card";

const RecentNotesSection = () => {
  const [isClient, setIsClient] = useState(false);
  const { allSavedNotes } = useSavedNotesStore();

  useAllSavedNotesByUserId();

  useEffect(() => {
    setIsClient(true); // Mark as client-side
  }, []);

  if (!isClient) return null;

  return (
    <section className="flex container mx-auto flex-col gap-4 mt-8">
      <h2 className="text-2xl font-[700] text-center">
        Recently Generate Notes
      </h2>
      <div className="max-w-2xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
        {allSavedNotes && allSavedNotes.length > 0 ? (
          allSavedNotes
            ?.slice(0, 3)
            ?.map((notes) => <NotesCard key={notes.id} notes={notes} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No recent notes available. Create your first note!
          </p>
        )}
      </div>
      <Link
        href={`/notes/all`}
        className="w-max mx-auto lg:ml-auto text-primary font-semibold underline"
      >
        See all notes here
      </Link>{" "}
    </section>
  );
};

export default RecentNotesSection;
