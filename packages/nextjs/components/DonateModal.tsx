import React, { useState } from "react";

// Stellen Sie sicher, dass React importiert wird

type DonateModalProps = {
  projectId: number;
  onClose: () => void;
};

const DonateModal: React.FC<DonateModalProps> = ({ projectId, onClose }) => {
  const [currency, setCurrency] = useState<string>("DFI");
  const [amount, setAmount] = useState<string>("");
  const [isApproved, setIsApproved] = useState<boolean>(true);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
    setIsApproved(e.target.value === "DFI"); // Setze isApproved auf false für ERC20-Token
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleApprove = async () => {
    // Füge hier die Logik für die Token-Genehmigung hinzu
    setIsApproved(true); // Nach erfolgreicher Genehmigung
  };

  const handleDonate = async () => {
    if (currency === "DFI") {
      // Rufe hier die donateDFI Funktion auf
    } else {
      // Rufe hier die donateWithToken Funktion auf
    }
    onClose(); // Schließe das Modal nach der Transaktion
  };

  return (
    <div className="modal">
      <div>Projekt-ID: {projectId}</div>
      <div className="modal-content">
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="DFI">DFI</option>
          <option value="USDT">USDT</option>
          <option value="USDC">USDC</option>
          <option value="EURC">EURC</option>
          <option value="jUSD">jUSD</option>
        </select>
        <input type="text" value={amount} onChange={handleAmountChange} placeholder="Betrag" />
        {isApproved ? <button onClick={handleDonate}>Senden</button> : <button onClick={handleApprove}>Approve</button>}
        <button onClick={onClose}>Schließen</button>
      </div>
    </div>
  );
};

export default DonateModal;
