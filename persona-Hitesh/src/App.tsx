import { useState } from 'react';
import FloatingButton from './components/FloatingButton.tsx';
import ChatBot from './components/ChatBot.tsx';
import CoTCard from './components/CotCard.tsx';
import type { StepContent } from './components/types.ts';

function App() {
  
  const [showChat, setShowChat] = useState(false);
  const [steps, setSteps] = useState<StepContent[]>([]); 
  return (
    <div className="w-full h-screen bg-gray-800 relative overflow-hidden">
      {showChat && <ChatBot setSteps={setSteps} />}
      {steps.length > 0 && <CoTCard steps={steps} />}
      <FloatingButton onClick={() => setShowChat((prev) => !prev)} />
    </div>
  );
}

export default App;
