import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import DonateModal from "~~/components/DonateModal";

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

  const getProjectPath = (name: string) => {
    return `/${name.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <div className="relative max-w-screen-2xl mx-auto">
      <div className="background-container">
        <Image
          src="/MantaCare_Hintergrund.png"
          alt="Hintergrund"
          width={572} // Ersetzen Sie dies durch die tatsächliche Breite Ihres Bildes
          height={572} // Ersetzen Sie dies durch die tatsächliche Höhe Ihres Bildes
          layout="responsive"
        />
      </div>

      <div className="text-over-image absolute top-1/3 -left-96 right-32 transform -translate-y-1/2">
        <div className="max-w-md mx-auto text-left">
          <h1 className="text-4xl font-bold dark:text-white text-black">Dein Spenden-Hub</h1>
          <h2 className="text-xl dark:text-white text-black">Willkommen zurück!</h2>
        </div>
      </div>

      <main className="container mx-auto -my-32 p-16 relative mb-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.id} className="bg-secondary p-4 rounded-xl shadow-md w-3/4 mx-auto">
              <img
                src={project.imageUrl}
                alt={`Project ${project.name}`}
                className="rounded-md w-full h-auto" // Tailwind CSS Klassen für Breite und Höhe
                // style={{ width: '100%', height: 'auto' }} // Alternativ Inline-Style
              />
              <h2 className="text-xl font-semibold dark:text-white text-black mt-4">{project.name}</h2>
              <div className="mt-4">
                <button
                  className="bg-accent dark:text-white text-black p-2 rounded hover:bg-primary"
                  onClick={() => openDonateModal(project.id)}
                >
                  Donate
                </button>
                <Link
                  href={getProjectPath(project.name)}
                  className="bg-primary dark:text-white text-black p-2 rounded ml-2 hover:bg-accent"
                >
                  Details
                </Link>
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
