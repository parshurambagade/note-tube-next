import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNotesGenerator } from "@/hooks/useNotesGenerator";
import type { NotesGeneratorFormProps } from "@/types";


const NotesGeneratorForm: React.FC<NotesGeneratorFormProps> = ({
  onNavigate,
}) => {
  const [url, setUrl] = useState(
    "https://youtu.be/dRXq81Om2a4?si=40mhJXnYtcLoRNk1"
  );
  const { error, isValidVideoId, handleSubmit } = useNotesGenerator({
    url,
    onNavigate,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-2"
      aria-label="YouTube video URL input form"
      role="form"
      autoComplete="off"
    >
      <div className="w-full sm:flex-3/4">
        <Input
          id="youtube-url"
          aria-label="Youtube video url"
          placeholder="Youtube video url"
          className="bg-accent w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-invalid={error}
          aria-describedby={error && url.trim() ? "url-error" : undefined}
          required
        />
        {error && url.trim() && (
          <span id="url-error" className="text-red-500 text-sm mt-1 block">
            Please enter a valid YouTube URL
          </span>
        )}
      </div>
      <Button
        type="submit"
        disabled={!isValidVideoId}
        className="w-full sm:flex-1/4"
        aria-label="Generate notes from YouTube video"
      >
        Generate Notes
      </Button>
    </form>
  );
};

export default NotesGeneratorForm;
