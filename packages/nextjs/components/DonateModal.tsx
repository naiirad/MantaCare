import React, { useState, useEffect } from 'react';
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
import CustomDropdown from './CustomDropdown';

type DonateModalProps = {
  projectId: number;
  projectName: string;
  onClose: () => void;
};

const DonateModal: React.FC<DonateModalProps> = ({ projectId, projectName, onClose }) => {
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState('DFI'); // Standardmäßig DFI ausgewählt
  const [isApproveNeeded, setIsApproveNeeded] = useState(false);

  const toWei = (ether: string) => {
    const parsed = parseFloat(ether);
    if (isNaN(parsed)) {
      return BigInt(0);
    }
    return BigInt(Math.floor(parsed * 10 ** 18));
  };

  const projectIdBigInt = BigInt(projectId);

  const { writeAsync: donate, isMining } = useScaffoldContractWrite({
    contractName: "MantaCare_DonationHub",
    functionName: selectedToken === 'DFI' ? "donateDFI" : "donateWithToken",
  args: selectedToken === 'DFI' ? [projectIdBigInt] : [projectIdBigInt, selectedToken, BigInt(toWei(donationAmount))],
  value: selectedToken === 'DFI' ? BigInt(toWei(donationAmount)) : undefined,
});

  useEffect(() => {
    setIsApproveNeeded(selectedToken !== 'DFI');
  }, [selectedToken]);

  const handleDonateClick = async () => {
    try {
      await donate();
      onClose();
    } catch (error) {
      console.error("Error during donation: ", error);
    }
  };

  const handleOverlayClick = (e: { target: { classList: { contains: (arg0: string) => any; }; }; }) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  const handleDonationAmountChange = (e) => {
    const value = e.target.value.replace(',', '.');
    
    // Ermöglicht die Eingabe von Dezimalzahlen mit bis zu drei Nachkommastellen
    const regexPattern = /^(?:\d+(?:[.,]\d{0,3})?|\d*[.,]\d{1,3})$/;
  
    // Überprüfen, ob der eingegebene Wert dem Muster entspricht
    if (regexPattern.test(value) || value === '') {
      const numericValue = parseFloat(value);
      // Stellt sicher, dass der Wert im zulässigen Bereich liegt, wenn er eine gültige Zahl ist
      if (isNaN(numericValue) || (numericValue >= 0 && numericValue <= 42000000)) {
        setDonationAmount(value);
      }
    }
  };
  
  

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Donate to: <span className="project-name">{projectName}</span></h2>
        </div>
        <div className="modal-body">
          <CustomDropdown
            selected={selectedToken}
            onChange={(value) => setSelectedToken(value)}
            options={[
              { value: 'DFI', label: 'DFI', imagePath: '/dfi.png' },
              { value: 'USDT', label: 'USDT', imagePath: '/usdt.png' },
              { value: 'USDC', label: 'USDC', imagePath: '/usdc.png' },
              { value: 'JUSD', label: 'jUSD', imagePath: '/jusd.png' },
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
            {isApproveNeeded ? 'Approve & Donate' : 'Donate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
