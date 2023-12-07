import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const FAQ: NextPage = () => {
  return (
    <>
      <MetaHeader title="FAQ - MantaCare" description="Frequently asked questions about MantaCare" />

      <main className="pt-24">
        <div className="relative max-w-screen-2xl mx-auto px-4">
          <h1 className="text-4xl text-center font-bold mb-4" style={{ color: "#b38945" }}>
            FAQ - MantaCare
          </h1>
          <h2 className="text-xl text-center mb-20">Frequently asked questions about MantaCare</h2>

          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">What is MantaCare?</h3>
            <p>
              MantaCare is a Web3 donation platform on the DeFi Metachain EVM that allows users to quickly and easily
              donate cryptocurrencies to various aid projects.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">How does donating via MantaCare work?</h3>
            <p>
              Users can connect to their web wallet (like MetaMask) and then donate to specific organizations or spread
              their donation evenly across all projects. In the future it will be possible to donate to specific
              categories lie education, health, etc.
            </p>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold">Which cryptocurrencies can I use?</h3>
            <p>
              MantaCare supports donations in DFI and other ERC20 tokens, depending on the current list of supported
              tokens. Initially the following tokens are supported: DUSD, USDC, USDT and jUSD. Changes to this list will
              be announced promptly on the social media channels.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">What are the fees for a donation?</h3>
            <p>
              MantaCare charges an initial fee of 1% of the donated amount, which is intended for the development work
              already done, maintenance of the service and future updates. The fee can vary in 0.1% steps between 0% and
              a maximum of 2%. It is not technically possible to increase the fee further.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">Will changes to the fee structure be announced?</h3>
            <p>
              Yes, it will be announced in advance on all social media channels, such as X (Twitter) or Telegram, when
              the fee changes. As the primary goal is to support the projects, the goal is to reduce the fee to 0% as
              soon as a sufficient amount of donations has been collected.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">How are my donations distributed?</h3>
            <p>
              Donations in DFI and ERC20 tokens are transferred indirectly after deduction of the fee (keyword:
              reentrancy attack), but immediately to the selected project.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">How does MantaCare protect against reentrancy attacks?</h3>
            <p>
              MantaCare uses OpenZeppelin&apos;s ReentrancyGuard, which ensures that no nested calls to the same
              function can be made in order to guarantee the security of transactions.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">Can I track my donations?</h3>
            <p>
              Every donation emits a so called &quot;event&quot;, later it will be possible to track that. However, your
              MantaCare Tokens are displayed on the dashboard.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">Is there a limit to the number of projects supported?</h3>
            <p>
              As the focus is on small aid organizations, the platform only supports up to 20 projects at any one time,
              but projects can be removed at any time following a vote. This ensures that there are no &quot;dead
              bodies&quot; in the project pool and that every organization is actively and consciously supported.{" "}
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">What happens if a project is removed?</h3>
            <p>
              Donations that have already been made remain with the project, but no further donations can be made via
              the platform. The project can be re-added at any time by a vote.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">Can I donate anonymously?</h3>
            <p>
              Yes, apart from your web wallet address. MantaCare reserves the right to collect statistics on the number
              of users, total donations and other publicly available metrics.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">Can I get a donation receipt?</h3>
            <p>
              Yes, all projects are able to issue donation receipts. Contact the respective projects with your details
              and transaction number and they will issue you with a receipt.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">What happens in the event of technical faults?</h3>
            <p>
              The smart contract can be paused and resumed in an emergency to stop transactions during a malfunction.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">Can users vote on adding or removing projects?</h3>
            <p>
              Yes, it is planned that users of the platform will later be able to vote on the addition or removal of
              projects. Initially, suggestions from the community will be voted on via voting forms, after which the
              developer will add or remove projects. This increases the community&apos;s involvement in the
              decision-making process.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">Will MantaCare become a DAO?</h3>
            <p>
              It is planned to turn MantaCare into a DAO (Decentralized Autonomous Organization). This will allow users
              to vote decentrally on new projects and important platform changes.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">How does the MantaCare token work for voting?</h3>
            <p>
              It is planned to introduce a MantaCare Token for voting. Users can collect this token through donations.
              For every 10$ donated to one of the projects, the user receives 1 MantaCare Token. When voting, the tokens
              are used to vote for a project and then get burned. This creates an incentive for active participation and
              ensures fair and transparent decision-making.
            </p>
          </div>
          <div className="text-left mb-10">
            <h3 className="text-xl font-bold">
              I have found an interesting project or organization that I would like to support. How can I suggest it?
            </h3>
            <p>
              In the near future it will be possible to make project suggestions on the site, which can then initially
              be voted on by means of a survey.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default FAQ;
