import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const mantacare: NextPage = () => {
  return (
    <>
      <MetaHeader title="MantaCare" description="Connect. Donate. Transform." />

      <main className="py-16">
        <div className="relative max-w-screen-2xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-10">MantaCare</h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">The origins of MantaCare</h2>
            <p>
              MantaCare is a personal initiative born out of my experience as part of the Medical Response Crew. was
              born. In October 2023, the world of humanitarian aid opened up to me in a new light. In the midst of the
              war in Kharkiv, Eastern Ukraine, the idea of a decentralized Web3 donation platform was born on the DeFi
              metachain - MantaCare.
            </p>
            <div className="flex flex-col md:flex-row">
              <p className="pr-8">
                In Kharkiv, I saw the suffering, but also the unwavering will of the people, both on the side of the of
                the population as well as on the side of the volunteers. I met committed Ukrainians and people from all
                over the world who helped tirelessly despite the constant threat of great danger. Their stories and
                direct confrontation with the challenges faced by small aid organizations left a deep impression on me.
                These organizations, often unknown and without much financial backing, are characterized by their
                selflessness and willingness to go beyond their limits - people who voluntarily leave their loved ones
                to get under artillery fire for the first time in their lives just to determine the needs of foreign
                children in a frontline village.
              </p>
              <Image
                src="/Ukraine_MantaCare1.jpg"
                alt="Bild der MRC-Aktion"
                width={572}
                height={572}
                layout="responsive"
                style={{ maxWidth: "50%" }}
              />
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Challenges and goals</h2>
            <p>
              These experiences revealed to me the greatest strength, but also the greatest weakness of small aid
              organizations: Their agility and concrete action benefits the population in direct transfer. At the same
              time, their financial resources and therefore their reach are very limited.
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
                This is exactly where MantaCare comes in. Our core philosophy is based on supporting small but effective
                projects that can have an immediate impact. We want to raise the profile of these organizations, raise
                awareness of their potential and provide them with the resources that they need. Such organizations
                exist in all areas, education, environmental protection, research or humanitarian work.
              </p>
            </div>
            <p>
              MantaCare is intended to be a bridge between those who want to help and those who need help to help
              others. We strive to promote civil courage again, to treat fellow human beings as neighbors across borders
              and to feel responsible for events that do not happen right in front of our eyes. It is important to us to
              make everything as decentralized, transparent and uncomplicated as possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Mission and guiding principles</h2>
            <p className="mb-4">
              Our mission at MantaCare is to create connections, mobilize support and bring about positive change
              through targeted actions. The community should serve as mouthpiece and driving force. New projects should
              come from the community and then be supported by the community. This is summarized by our simple but
              powerful guiding principle:
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

export default mantacare;
