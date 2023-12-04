import React, { useState, useEffect } from 'react';
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
import CustomDropdown from './CustomDropdown';

type DonateModalProps = {
  projectId: number;
  onClose: () => void;
};

const DonateModal: React.FC<DonateModalProps> = ({ projectId, onClose }) => {
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState('DFI'); // Standardmäßig DFI ausgewählt
  const [isApproveNeeded, setIsApproveNeeded] = useState(false);

  const toWei = (ether: string) => BigInt(ether) * BigInt(10 ** 18);

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

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Donate to: Medical Response Crew</h2>
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
            type="number"
            placeholder="e.g. 1.83"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
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
