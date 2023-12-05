import React, { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdown";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type DonateModalProps = {
  projectId: number;
  projectName: string;
  onClose: () => void;
};

const tokenAddresses = {
  USDT: "0x...",
  USDC: "0x...",
  JUSD: "0x5E709AA98290844D6E8D593c599f31fdDB0B37F3",
  EURC: "0x...",
};

const DonateModal: React.FC<DonateModalProps> = ({ projectId, projectName, onClose }) => {
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState("DFI"); // Standardmäßig DFI ausgewählt
  const [isApproveNeeded, setIsApproveNeeded] = useState(false);

  const toWei = (ether: string) => {
    const parsed = parseFloat(ether);
    if (isNaN(parsed)) {
      return BigInt(0);
    }
    return BigInt(Math.floor(parsed * 10 ** 18));
  };

  const projectIdBigInt = BigInt(projectId);

  if (selectedToken !== "DFI" && !tokenAddresses.hasOwnProperty(selectedToken)) {
    throw new Error("Invalid token selected");
  }

  let selectedTokenAddress;
  if (selectedToken !== "DFI") {
    selectedTokenAddress = tokenAddresses[selectedToken as keyof typeof tokenAddresses];
  }

  let writeConfig;

  if (selectedToken === "DFI") {
    writeConfig = {
      contractName: "MantaCare_DonationHub" as const,
      functionName: "donateDFI" as const,
      args: [projectIdBigInt] as const,
      value: BigInt(toWei(donationAmount)),
    };
  } else {
    writeConfig = {
      contractName: "MantaCare_DonationHub" as const,
      functionName: "donateWithToken" as const,
      args: [projectIdBigInt, selectedTokenAddress, BigInt(toWei(donationAmount))] as const,
      value: undefined,
    };
  }

  const { writeAsync: donate, isMining } = useScaffoldContractWrite(writeConfig);

  useEffect(() => {
    setIsApproveNeeded(selectedToken !== "DFI");
  }, [selectedToken]);

  const handleDonateClick = async () => {
    try {
      await donate();
      onClose();
    } catch (error) {
      console.error("Error during donation: ", error);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleDonationAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(",", ".");

    // Ermöglicht die Eingabe von Dezimalzahlen mit bis zu drei Nachkommastellen
    const regexPattern = /^(?:\d+(?:[.,]\d{0,3})?|\d*[.,]\d{1,3})$/;

    // Überprüfen, ob der eingegebene Wert dem Muster entspricht
    if (regexPattern.test(value) || value === "") {
      const numericValue = parseFloat(value);
      // Stellt sicher, dass der Wert im zulässigen Bereich liegt, wenn er eine gültige Zahl ist
      if (isNaN(numericValue) || (numericValue >= 0 && numericValue <= 42000000)) {
        setDonationAmount(value);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            Donate to: <span className="project-name">{projectName}</span>
          </h2>
        </div>
        <div className="modal-body">
          <CustomDropdown
            selected={selectedToken}
            onChange={value => setSelectedToken(value)}
            options={[
              { value: "DFI", label: "DFI", imagePath: "/dfi.png" },
              { value: "USDT", label: "USDT", imagePath: "/usdt.png" },
              { value: "USDC", label: "USDC", imagePath: "/usdc.png" },
              { value: "JUSD", label: "jUSD", imagePath: "/jusd.png" },
              { value: "EURC", label: "EURC", imagePath: "/eurc.png" },
            ]}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Enter amount"
            value={donationAmount}
            onChange={handleDonationAmountChange}
            min="0"
            max="42000000"
          />
        </div>
        <div className="modal-footer">
          <button className="modal-button button-gradient-hover" onClick={handleDonateClick} disabled={isMining}>
            {isApproveNeeded ? "Approve & Donate" : "Donate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
