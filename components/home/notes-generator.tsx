import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NotesGenerator = () => {
  return (
    <section
      aria-label="Notes generator"
      className="max-w-xl w-full flex flex-col md:flex-row items-center gap-2"
    >
      <Input
        aria-label="Youtube video url"
        placeholder="Youtube video url"
        className="w-full md:flex-3/4"
      />
      <Button className="w-full md:flex-1/4">Generate Notes</Button>
    </section>
  );
};

export default NotesGenerator;
