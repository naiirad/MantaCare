import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const CRT: NextPage = () => {
  return (
    <>
      <MetaHeader title="CRT - MantaCare" description="Crisis Relief Team Germany" />

      <main className="py-10">
        <div className="relative max-w-screen-2xl mx-auto px-4">
          {/* Überschrift */}
          <h1 className="text-3xl font-bold text-center mb-6">Crisis Relief Team Germany (CRT)</h1>

          {/* Abschnitt 1 */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Unsere Mission</h2>
            <p className="mb-4">
              Gegründet im Jahr 2021 während des Hochwassers im Ahrtal, widmet sich die Medical Response Crew (MRC) der
              medizinischen Hilfe in Kriegs- und Krisengebieten. Unsere Hauptaufgabe besteht darin, Zivilisten in der
              Ukraine zu unterstützen und Personal auszubilden.
            </p>
            <div className="pl-32 pr-32">
              <Image
                src="/beispielbild.jpeg"
                alt="Bild der MRC-Aktion"
                width={572}
                height={572}
                layout="responsive"
                className="mb-4"
              />
            </div>
            <p>
              Neben unserer Arbeit im Ausland bieten wir auch TECC (Tactical Emergency Casualty Care) Kurse in
              Deutschland an, um die medizinische Erstversorgung in extremen Situationen zu verbessern.
            </p>
          </section>

          {/* Abschnitt 2 */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Unsere Projekte</h2>
            <div className="flex flex-col md:flex-row">
              <Image
                src="/beispielbild2.jpeg"
                alt="MRC-Projektbild"
                width={572}
                height={572}
                layout="responsive"
                className="md:w-1/2 md:mr-4 mb-4 md:mb-0"
              />
              <p>
                In der Ukraine konzentrieren wir uns auf die Ausbildung medizinischen Personals und die direkte Hilfe
                für Verletzte und Kranke. Unser Team setzt sich aus erfahrenen Ärzten, Krankenpflegern und
                Rettungskräften zusammen, die in diesen schwierigen Umgebungen unermüdlich arbeiten.
              </p>
            </div>
          </section>

          {/* Abschnitt 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Mitmachen und Unterstützen</h2>
            <p className="mb-4">
              Ihre Unterstützung kann viele Formen annehmen - von Spenden bis hin zur aktiven Teilnahme an unseren
              Kursen und Projekten. Jede Hilfe zählt und ermöglicht es uns, dort einzugreifen, wo es am dringendsten
              benötigt wird.
            </p>
            <Image
              src="/beispielbild.jpeg"
              alt="MRC-Spendenaktion"
              width={572}
              height={572}
              layout="responsive"
              className="mb-4"
            />
            <p>
              Für weitere Informationen zu unseren Projekten, Spendenmöglichkeiten oder Teilnahme an unseren Kursen
              besuchen Sie bitte unsere Website oder kontaktieren Sie uns direkt.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default CRT;
