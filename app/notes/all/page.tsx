"use client";

import NotesCard from "@/components/common/notes-card";
import { useAllSavedNotesByUserId } from "@/hooks/useAllSavedNotes";
import React from "react";

const AllNotes = () => {
  const { allSavedNotes, loading, error } = useAllSavedNotesByUserId();

  return (
    <main className="min-h-[95vh] py-20 px-4 md:px-8">
      <h1 className="text-center text-2xl text-primary font-bold my-4">
        All Saved Notes
      </h1>
      {loading && <p>Loading notes...</p>}
      {error && <p className="py-2 text-center text-red-500">Error: {error}</p>}
      {allSavedNotes && allSavedNotes.length === 0 ? (
        <section className="w-full flex items-center justify-center py-2">
          <h2>You have not saved any notes!</h2>
        </section>
      ) : null}
      {allSavedNotes && allSavedNotes.length > 0 ? (
        <section className="w-full mt-6">
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allSavedNotes.map((notes) => (
              <li key={notes.id} className="w-full">
                <NotesCard notes={notes} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
};

export default AllNotes;
