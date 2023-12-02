import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const suggestions: NextPage = () => {
  return (
    <>
      <MetaHeader title="Suggestions - MantaCare" description="Suggest new Projects" />
      <main className="pt-64">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl text-center font-bold">Coming soon!</h1>
        </div>
      </main>
    </>
  );
};

export default suggestions;
