import { FaEthereum, FaStripe } from 'react-icons/fa';
import { FaPaypal } from 'react-icons/fa6';
import { GrBitcoin } from 'react-icons/gr';

export default function Footer() {
  return (
    <div className="flex justify-between items-center bg-stone-700 p-8">
      <div className="text-sm text-gray-300">
        &#169;2023 Agent, Inc. All Rights Reserved.
      </div>
      <div className="hidden md:flex md:gap-x-4 md:items-center">
        <FaEthereum color="#716b94" size="1.5rem" />
        <div className="bg-white rounded-full">
          <GrBitcoin color="#f7931a" size="1.5rem" />
        </div>
        <FaPaypal color="white" />
        <FaStripe color="#6772E5" size="2rem" />
      </div>
    </div>
  );
}
