import React from "react";
import Link from "next/link";

const RecentNotesSection = () => {
  return (
    <section className="flex flex-col gap-4 mt-8">
      <h2 className="text-2xl font-[700] text-center">
        Recently Generate Notes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
        {/* TODO: Fetch latest notes and map the notes cards  */}
        {/* <NotesCard notes={mockNote} /> */}
        {/* <NotesCard notes={mockNote} /> */}
        {/* <NotesCard notes={mockNote} /> */}
        <p className="col-span-full text-center text-gray-500">
          No recent notes available. Create your first note!
        </p>
      </div>
      {/* TODO: replace 1 with actual notes id */}
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
