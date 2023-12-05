import React, { useState, useEffect } from 'react';
import { ethers } from './ethers';
import deployedContracts from '../contracts/deployedContracts';
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
import CustomDropdown from './CustomDropdown';

type DonateModalProps = {
  projectId: number;
  projectName: string;
  onClose: () => void;
};

const tokenAddresses = {
  USDT: "0x...",
  USDC: "0x...", 
  JUSD: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  EURC: "0x..." 
};

const DonateModal: React.FC<DonateModalProps> = ({ projectId, projectName, onClose }) => {
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState('JUSD');

  const toWei = (ether: string) => {
    const parsed = parseFloat(ether);
    if (isNaN(parsed)) {
      return BigInt(0);
    }
    return BigInt(Math.floor(parsed * 10 ** 18));
  };

  const projectIdBigInt = BigInt(projectId);

  let selectedTokenAddress;
  if (selectedToken !== 'DFI') {
    selectedTokenAddress = tokenAddresses[selectedToken as keyof typeof tokenAddresses];
  }

  let writeConfig;

  if (selectedToken === 'DFI') {
    writeConfig = {
      contractName: "MantaCare_DonationHub",
      functionName: "donateDFI",
      args: [projectIdBigInt],
      value: BigInt(toWei(donationAmount))
    };
  } else {
    writeConfig = {
      contractName: "MantaCare_DonationHub",
      functionName: "donateWithToken",
      args: [projectIdBigInt, selectedTokenAddress, BigInt(toWei(donationAmount))],
      value: undefined
    };
  }

  const { writeAsync: donate, isMining } = useScaffoldContractWrite(writeConfig);

  // Funktion zum Erteilen der Genehmigung (Approval)
  const approveTokens = async () => {
    if (selectedToken !== 'DFI') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const jUSDAddress = deployedContracts[31337].jUSD.address; 
      const jUSDABI = deployedContracts[31337].jUSD.abi;
      const tokenContract = new ethers.Contract(jUSDAddress, jUSDABI, signer);
      const amountToApprove = ethers.utils.parseUnits(donationAmount, 18);
      await tokenContract.approve(deployedContracts[31337].MantaCare_DonationHub.address, amountToApprove);
    }
  };

  const handleDonateClick = async () => {
    try {
      if (selectedToken !== 'DFI') {
        await approveTokens();
      }
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
              { value: 'EURC', label: 'EURC', imagePath: '/eurc.png' },
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
