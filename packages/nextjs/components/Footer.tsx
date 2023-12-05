import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Site footer
 */
export const Footer = () => {
  const isLocalNetwork = getTargetNetwork().id === hardhat.id;

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto"></div>
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      </div>
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="text-center">
              <a href="https://t.me/MantaCare" target="_blank" rel="noreferrer" className="link">
                Telegram
              </a>
            </div>
            <span>·</span>
            <div className="text-center">
              <a href="https://twitter.com/Manta_Care" target="_blank" rel="noreferrer" className="link">
                X
              </a>
            </div>
            <span>·</span>
            <div className="text-center">
              <Link href="/imprint" className="link">
                Imprint
              </Link>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
