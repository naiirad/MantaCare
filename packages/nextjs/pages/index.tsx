import { useState } from "react";
import type { NextPage } from "next";
import DonateModal from "~~/components/DonateModal";
import Image from 'next/image';

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const openDonateModal = (projectId: number) => {
    setSelectedProject(projectId);
    setShowModal(true);
  };

  const projects = [
    { id: 0, name: "Medical Response Crew", imageUrl: "/mrc.jpg" },
    { id: 1, name: "Crisis Relief Team", imageUrl: "/crt.png" },
    { id: 2, name: "Humanitas in Centro", imageUrl: "/hic.jpg" },
    // Weitere Projekte hinzufügen mit ihren Bildpfaden
  ];

  return (
    <div className="relative max-w-screen-xl mx-auto">
      <div className="background-container">
        <Image 
          src="/MantaCare_Hintergrund.png" 
          alt="Hintergrund" 
          layout="fill" 
          objectFit="cover" 
          className="background-image" 
        />
      </div>
      
      <div className="text-over-image absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4">
        <div className="max-w-md mx-auto text-left">
          <h1 className="text-4xl font-bold text-white">Dein Spenden-Hub</h1>
          <h2 className="text-xl text-white">Willkommen zurück!</h2>
        </div>
      </div>

      <main className="container mx-auto my-8 relative mt-64">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
          {projects.map(project => (
            <div key={project.id} className="bg-project-square p-4 rounded-xl shadow-md">
              <Image
                src={project.imageUrl}
                alt={`Project ${project.name}`}
                width={500}  
                height={300} 
                className="rounded-md"
              />
              <h2 className="text-xl font-semibold text-white mt-4">{project.name}</h2>
              <div className="mt-4">
                <button
                  className="btn-primary text-white p-2 rounded btn-hover-donate"
                  onClick={() => openDonateModal(project.id)}
                >
                  Donate
                </button>
                <button className="btn-secondary text-black p-2 rounded ml-2 btn-hover-details">Details</button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {showModal && selectedProject !== null && (
        <DonateModal projectId={selectedProject} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Home;
