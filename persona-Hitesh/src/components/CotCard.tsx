import type { StepContent } from './types';
import  Hitesh from '../assets/Hitesh.png';
const CotCard = ({ steps }: { steps: StepContent[] }) => {
  const filteredSteps = steps.filter((step) => step.step !== 'chai_pe_charcha');

  if (filteredSteps.length === 0) return null; 
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto my-4">
      <h3 className="text-lg font-semibold mb-3">Chain Of Thought Steps:</h3>
      <ul className="space-y-2">
        {filteredSteps.map(({ step, content }) => (
          <li key={step} className="border-l-4 border-blue-500 pl-3">
            <div className='flex items-center mb-1'>
              <img src={Hitesh} alt="Hitesh" className="w-6 h-6 rounded-full mr-2" />
            <p className="font-medium capitalize">{step.replace(/_/g, ' ')}</p>
            </div>
            <p className="text-gray-700 text-lg">{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CotCard;
