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
      {steps.length < 1 && <>
     <div className=" w-full h-full flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Welcome to the Chatbot App</h1>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
        <p className="text-lg">Click the button to chat with Hitesh!</p>
      </div> 
      </>}
      <FloatingButton onClick={() => setShowChat((prev) => !prev)} />
    </div>
  );
}

export default App;
