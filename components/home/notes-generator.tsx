"use client";

import React from "react";
import NotesGeneratorForm from "./notes-generator-form";

interface NotesGeneratorProps {
  onNavigate?: (videoId: string) => void;
}

const NotesGenerator: React.FC<NotesGeneratorProps> = ({ onNavigate }) => {
  return (
    <section aria-label="Notes generator" className="max-w-xl w-full">
      <NotesGeneratorForm onNavigate={onNavigate} />
    </section>
  );
};

export default NotesGenerator;
