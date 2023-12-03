import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const MRC: NextPage = () => {
  return (
    <>
      <MetaHeader title="MantaCare" description="Connect. Donate. Transform." />

      <main className="py-16">
        <div className="relative max-w-screen-2xl mx-auto px-4">
          {/* Überschrift */}
          <h1 className="text-5xl font-bold text-center mb-10">MantaCare</h1>

          {/* Abschnitt 1 */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Entstehung von MantaCare</h2>
            <p>
              MantaCare ist eine persönliche Initiative, geboren aus meinen Erfahrungen als Teil der „Medical Response
              Crew“ in Kharkiv, Ostukraine. Im Oktober 2023. Es eröffnete sich mir die Welt der humanitären Hilfe in
              einem neuen Licht. Dort, inmitten des Krieges, entstand die Idee einer dezentralen Web3-Spendenplattform
              auf der DeFi Metachain – MantaCare.
            </p>
            <div className="flex flex-col md:flex-row">
              <p className="pr-8">
                In Kharkiv sah ich das Leid, aber auch den unerschütterlichen Geist der Menschen, sowohl auf der Seite
                der Bevölkerung, aber auch auf der Seite der „Volunteers“. Ich traf engagierte Ukrainer und Menschen aus
                der ganzen Welt, die trotz großer Gefahr unermüdlich halfen. Ihre Geschichten und die unmittelbare
                Konfrontation mit den Herausforderungen kleiner Hilfsorganisationen prägten mich tief. Diese
                Organisationen, oft unbekannt und ohne große finanzielle Rückendeckung, zeichnen sich durch ihre
                Selbstlosigkeit und die Bereitschaft aus, über ihre Grenzen hinauszugehen – Menschen, die freiwillig
                ihre Liebsten verlassen, um das erste Mal in ihrem Leben unter Artilleriebeschuss zu stehen, um dann den
                Bedarf bei Kindern in einem Frontdorf zu ermitteln.
              </p>
              <Image
                src="/beispielbild.jpeg"
                alt="Bild der MRC-Aktion"
                width={572}
                height={572}
                layout="responsive"
                style={{ maxWidth: "50%" }}
              />
            </div>
          </section>

          {/* Abschnitt 2 */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Herausforderungen und Ziele</h2>
            <p>
              Diese Erfahrungen offenbarten die größte Stärke, aber auch die größte Schwäche kleiner
              Hilfsorganisationen: Ihre Agilität und ihr direktes Handeln im Gegensatz zu der oft begrenzten Reichweite
              und den finanziellen Einschränkungen. Es wurde mir klar, dass nicht der Wille, sondern die finanziellen
              Möglichkeiten das größte Hindernis darstellen.
            </p>
            <div className="flex flex-col md:flex-row">
              <Image
                src="/Ukraine_MantaCare2.jpg"
                alt="Ukraine_Wand"
                width={547}
                height={364}
                layout="responsive"
                style={{ maxWidth: "50%" }}
              />
              <p className="pl-8">
                Genau hier setzt MantaCare an. Unsere Kernphilosophie basiert darauf, kleine, aber wirkungsvolle
                Projekte zu unterstützen, die einen weitreichenden Einfluss haben können. Wir wollen die Bekanntheit
                dieser Organisationen erhöhen, über ihre Potenziale aufklären und ihnen die Mittel zur Verfügung
                stellen, die sie benötigen. Solche Organisationen gibt es in allen Bereichen, Bildung, Umweltschutz,
                Forschung oder eben humanitär.
              </p>
            </div>
            <p>
              MantaCare soll eine Brücke sein zwischen denen, die helfen wollen, und jenen, die Hilfe benötigen, um dann
              wiederum anderen helfen zu können. Wir streben danach, die Welt Schritt für Schritt zu einem besseren,
              gerechteren Ort zu machen und das nicht nach dem Prinzip „mehr ist mehr“, sondern mit „gezielt ist mehr“.
              Dabei ist es uns wichtig, alles so dezentral, transparent und unkompliziert wie möglich zu gestalten.
              Keine Bürokratie, keine ungenutzten oder unnötig Verschwendeten Ressourcen, keine Abhängigkeiten.
            </p>
          </section>

          {/* Abschnitt 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Mission und Leitsatz</h2>
            <p className="mb-4">
              Unsere Mission bei MantaCare ist es, Verbindungen zu schaffen, Unterstützung zu mobilisieren und durch
              gezielte Aktionen positive Veränderungen zu bewirken. Dabei soll die Community als Sprachrohr und als
              treibende Kraft dienen. Neue Projekte sollen aus der Community kommen, um dann von der Community
              unterstützt zu werden. Dies wird durch unseren einfachen, aber kraftvollen Leitsatz zusammengefasst:
            </p>
            <p className="text-2xl text-center">Connect. Donate. Transform.</p>
            <Image
              src="/Ukraine_MantaCare3.jpg"
              alt="MantaCare_DeFighter"
              width={572}
              height={572}
              layout="responsive"
              className="mb-4"
            />
          </section>
        </div>
      </main>
    </>
  );
};

export default MRC;
