"use client";

import { useState } from "react";
import Notes from "@/components/notes/index";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useVideoData } from "@/hooks/useVideoData";

const Generate = () => {
  const [isSaved, setIsSaved] = useState(false);
  const { videoId } = useParams();
  const { videoData, loading, error, refetch } = useVideoData(videoId);

  // Mock data - in real app, this would come from props or API
  const notes = {
    summary:
      "This comprehensive introduction to machine learning covers fundamental concepts, algorithms, and practical applications for beginners.",
    keyPoints: [
      "Machine Learning is a subset of Artificial Intelligence that enables computers to learn without explicit programming",
      "Three main types: Supervised Learning, Unsupervised Learning, and Reinforcement Learning",
      "Common algorithms include Linear Regression, Decision Trees, and Neural Networks",
      "Data preprocessing is crucial for model performance",
      "Cross-validation helps prevent overfitting",
    ],
    sections: [
      {
        title: "What is Machine Learning?",
        content:
          "Machine Learning (ML) is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns and make decisions with minimal human intervention.",
        timestamp: "0:00 - 8:30",
      },
      {
        title: "Types of Machine Learning",
        content:
          "There are three primary types of machine learning approaches:",
        subsections: [
          "Supervised Learning: Uses labeled training data to learn a mapping function",
          "Unsupervised Learning: Finds hidden patterns in data without labeled examples",
          "Reinforcement Learning: Learns through interaction with an environment",
        ],
        timestamp: "8:30 - 18:45",
      },
      {
        title: "Common Algorithms",
        content: "Popular machine learning algorithms include:",
        subsections: [
          "Linear Regression: Predicts continuous values",
          "Decision Trees: Creates a model that predicts target values",
          "Random Forest: Combines multiple decision trees",
          "Support Vector Machines: Finds optimal decision boundaries",
          "Neural Networks: Mimics the human brain's structure",
        ],
        timestamp: "18:45 - 32:10",
      },
      {
        title: "Data Preprocessing",
        content:
          "Before applying ML algorithms, data must be cleaned and prepared. This includes handling missing values, scaling features, encoding categorical variables, and splitting data into training and testing sets.",
        timestamp: "32:10 - 40:15",
      },
    ],
  };

  const handleSave = () => {
    setIsSaved(true);
    // In real app, implement save functionality
    setTimeout(() => setIsSaved(false), 2000);
  };

  if (loading) {
    return <div>Loading video details...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  if (!videoData) {
    return <div>No video data available</div>;
  }

  return (
    <Notes>
      <Notes.Head>
        <Notes.VideoHead
          videoData={videoData}
          handleSave={handleSave}
          isSaved={isSaved}
        />
        <Notes.VideoPlayer
          title={videoData.title}
          videoId={videoData.videoId}
        />
      </Notes.Head>
      <Notes.Body>
        <Notes.KeyPoints keyPoints={notes.keyPoints} />
        <Separator className="my-8" />
        <Notes.DetailedNotes sections={notes.sections} />
      </Notes.Body>
    </Notes>
  );
};

export default Generate;
