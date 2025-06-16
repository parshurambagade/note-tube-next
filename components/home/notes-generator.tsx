import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NotesGenerator = () => {
  return (
    <section
      aria-label="Notes generator"
      className="max-w-xl w-full flex flex-col sm:flex-row items-center gap-2"
    >
      {/* TODO: Add value and onChange  */}
      <Input
        aria-label="Youtube video url"
        placeholder="Youtube video url"
        className="bg-accent w-full sm:flex-3/4"
      />
      {/* TODO: OnClick Navigate to the create notes page  */}
      <Button className="w-full sm:flex-1/4">Generate Notes</Button>
    </section>
  );
};

export default NotesGenerator;
