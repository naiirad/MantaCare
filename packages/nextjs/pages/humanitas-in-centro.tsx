import Head from "next/head";
import type { NextPage } from "next";

const FAQ: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FAQ - Unsere Organisation</title>
        <meta name="description" content="Häufig gestellte Fragen zu unserer Organisation" />
      </Head>

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
    </div>
  );
};

export default FAQ;
