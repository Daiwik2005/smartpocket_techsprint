import { useState } from "react";
import { sendChatMessage } from "../utils/chatApi";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { user: string; bot: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setLoading(true);

    const reply = await sendChatMessage(userMsg);

    setMessages(prev => [
      ...prev,
      { user: userMsg, bot: reply }
    ]);

    setLoading(false);
  }

  return (
    <div className="max-w-md p-4 border rounded-lg">
      <h2 className="font-bold mb-2">Finance Assistant</h2>

      <div className="space-y-2 mb-3 max-h-64 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i}>
            <p className="text-sm"><b>You:</b> {m.user}</p>
            <p className="text-sm text-blue-600">
              <b>Bot:</b> {m.bot}
            </p>
          </div>
        ))}
        {loading && <p className="text-sm">Thinking...</p>}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask finance questions..."
        />
        <button
          className="bg-black text-white px-3 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
