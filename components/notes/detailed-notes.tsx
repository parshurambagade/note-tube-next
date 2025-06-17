import React from "react";
import { Badge } from "../ui/badge";

interface Section {
  title: string;
  timestamp: string;
  content: string;
  subsections?: string[];
}
interface DetailedNotesProps {
  sections: Section[];
}

const DetailedNotes: React.FC<DetailedNotesProps> = ({ sections }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Detailed Notes</h3>
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="border-l-4 border-blue-200 pl-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-900">
                {section.title}
              </h4>
              <Badge variant="outline" className="text-xs">
                {section.timestamp}
              </Badge>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {section.content}
            </p>
            {section.subsections && (
              <ul className="space-y-2 ml-4">
                {section.subsections.map((subsection, subIndex) => (
                  <li key={subIndex} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm leading-relaxed">
                      {subsection}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedNotes;
