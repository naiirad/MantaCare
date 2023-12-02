import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const MRC: NextPage = () => {
  return (
    <>
      <MetaHeader title="MRC - MantaCare" description="Mecial Response Crew" />

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

export default MRC;
