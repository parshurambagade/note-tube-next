import React from "react";

const Notes = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="py-12 md:py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-2 md:px-4 py-4 lg:py-6">
        {children}
      </div>
    </main>
  );
};

export default Notes;
