import React from "react";
import History from "@/components/main/History";
import { Upload } from "@/app/types/upload";

const Projects = () => {
  // Replace with actual data as needed
  const dummyUploads: Upload[] = [
    { id: 1, title: 'Result 1', timestamp: '2024-10-01', details: 'Detailed info about upload 1' },
    { id: 2, title: 'Result 2', timestamp: '2024-10-02', details: 'Detailed info about upload 2' },
    // Additional entries
  ];

  return (
    <div className="flex flex-col items-center justify-center py-20" id="projects">
      <History uploads={dummyUploads} />
    </div>
  );
};

export default Projects;
