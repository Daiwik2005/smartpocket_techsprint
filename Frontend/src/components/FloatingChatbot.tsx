import { useState } from "react";
import Chatbot from "./Chatbot";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        aria-label="Open finance assistant"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-80 bg-white shadow-2xl rounded-xl">
          <div className="flex justify-between items-center p-3 border-b">
            <h3 className="font-semibold text-sm">
              Finance Assistant
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          <Chatbot />
        </div>
      )}
    </>
  );
}
