import { BookOpen, Clock, Save } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface VideoData {
  title: string;
  duration: string;
  channel: string;
}
interface NotesVideoHeadProps {
  handleSave: () => void;
  isSaved: boolean;
  videoData: VideoData;
}

const NotesVideoHead: React.FC<NotesVideoHeadProps> = ({
  handleSave,
  isSaved,
  videoData,
}) => {
  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-col md:flex-row  gap-3 items-start md:items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
            {videoData.title}
          </h1>
          <div className="flex w-full sm:w-max justify-between sm:justify-normal items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1 ">
              <Clock className="w-3 md:w-4 h-3 md:h-4" />
              <span>{videoData.duration}</span>
            </div>
            <div className="flex items-center gap-1 ">
              <BookOpen className="w-3 md:w-4 h-3 md:h-4" />
              <span>{videoData.channel}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:flex w-full sm:w-max justify-between sm:justify-normal items-center gap-2">
          {/* TODO: Add download, share and edit notes functionality in future updates */}

          <Button
            onClick={handleSave}
            className={
              "text-base " + (isSaved ? "bg-green-600 hover:bg-green-700" : "")
            }
          >
            <Save className="w-3 md:w-4 h-3 md:h-4 mr-2" />
            {isSaved ? "Saved!" : "Save Notes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotesVideoHead;
