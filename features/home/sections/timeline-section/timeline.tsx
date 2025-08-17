// App.tsx
import React from 'react';
import Timeline from './components/process-timeline';

const App = () => {
  const timelineSteps = [
    {
      title: "Research an Idea",
      description: "Explore concepts, validate assumptions, and gather insights to shape the project direction.",
      stats: [
        { label: "Ideas Researched", value: 10, suffix: "+" },
        { label: "Articles Read", value: 200, suffix: "+" },
        // { label: "Hours Spent", value: 40, suffix: "+" }
      ]
    },
    {
      title: "Build MVP",
      description: "Develop a minimum viable product with core features to test the concept in real-world scenarios.",
      stats: [
        { label: "Projects Built", value: 10 },
        // { label: "Prototypes Created", value: 15 },
        { label: "Features Implemented", value: 80, suffix: "+" }
      ]
    },
    {
      title: "Testing & Enhancing",
      description: "Gather feedback, identify improvements, and refine the product based on user insights.",
      stats: [
        { label: "Tests Conducted", value: 50 , suffix: "+" },
        // { label: "Iterations", value: 12 },
        { label: "Improvements Made", value: 30 , suffix: "+" }
      ]
    },
    {
      title: "Publish the Journey",
      description: "Share the process, lessons learned, and final results with the community.",
      stats: [
        { label: "Articles Published", value: 10 },
        // { label: "Readers Reached", value: 10000, suffix: "+" },
        { label: "Feedback Received", value: 100, suffix: "+" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-16">My Development Journey</h1>
        <Timeline steps={timelineSteps} />
      </div>
    </div>
  );
};

export default App;
