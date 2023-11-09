import React, { useState } from 'react';

interface CopyToClipboardButtonProps {
  value: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch(error => {
        console.error('Error copying to clipboard:', error);
      });
  };

  return (
    <div className='flex space-x-2'>
      <button onClick={handleCopy} className="hover:underline">
        Copy to Clipboard
      </button>
      {copied && <span className="text-primary">Copied</span>}
    </div>
  );
};

export default CopyToClipboardButton;
