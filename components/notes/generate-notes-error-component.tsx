import { GenerateNotesErrorComponentProps } from "@/types";

const GenerateNotesErrorComponent = ({
  videoError,
  notesError,
  refetchNotes,
  refetchVideo,
}: GenerateNotesErrorComponentProps) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-red-600 mb-4">{videoError || notesError}</p>
        <button
          onClick={() => {
            refetchVideo();
            refetchNotes();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default GenerateNotesErrorComponent;
