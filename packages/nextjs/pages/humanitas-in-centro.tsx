import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const HIC: NextPage = () => {
  return (
    <>
      <MetaHeader title="HIC - MantaCare" description="Humanitas in Centro" />

      <main>
        <h1>Häufig gestellte Fragen</h1>
        <section>
          <h2>Frage 1</h2>
          <p>Antwort auf Frage 1...</p>
        </section>

        <section>
          <h2>Frage 2</h2>
          <p>Antwort auf Frage 2...</p>
        </section>

        {/* Weitere Fragen und Antworten hinzufügen */}
      </main>
    </>
  );
};

export default HIC;
