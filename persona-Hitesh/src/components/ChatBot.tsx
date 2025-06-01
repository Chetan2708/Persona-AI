import { useState } from "react";
import axios from "axios";
import type { StepContent } from "./types";
import Hitesh from "../assets/Hitesh.png";
type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatBot = ({
  setSteps,
}: {
  setSteps: (steps: StepContent[]) => void;
}) => {
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<Message[]>([]);
  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;

    const newHistory: Message[] = [
      ...history,
      { role: "user", content: input },
    ];
    setHistory(newHistory);
    setInput("");

    try {
      const res = await axios.post<{ response: string }>(
        "http://localhost:8000/chat",
        {
          user_message: input,
          history: newHistory,
        }
      );
      const cleaned = res.data.response.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned) as StepContent[];
      const chaiStep = parsed.find((item) => item.step === "chai_pe_charcha");

      if (chaiStep) {
        setHistory([
          ...newHistory,
          { role: "assistant", content: chaiStep.content },
        ]);
      }
      setSteps(parsed);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 bg-white border rounded-xl shadow-xl p-3 flex flex-col">
      <div className="overflow-y-auto max-h-64 mb-2">
        {history.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-1 text-sm flex items-start ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" ? (
              <>
                <img
                  src={Hitesh}
                  alt="Hitesh"
                  className="w-6 h-6 rounded-full mr-2 mt-1"
                />
                <div>
                  <b className="font-bold text-gray-800">Histesh:</b>{" "}
                  <span>{msg.content}</span>
                </div>
              </>
            ) : (
              
                <div>
                  <b className="font-bold text-gray-800">You:</b>{" "}
                  <span>{msg.content}</span>
                </div>
              
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        <input
          value={input}
          onChange={handleInputChange}
          className="flex-grow border px-2 py-1 rounded-md text-sm"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 rounded-md text-sm hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
