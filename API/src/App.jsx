import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAiTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();
      const aiMessage = { sender: "ai", text: data.reply };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error: Haiwezekani kupata jibu kwa sasa." },
      ]);
    }

    setAiTyping(false);
  };

  return (
    <div className="min-h-screen bg-[url('/smoke-bg.jpg')] bg-cover bg-center backdrop-blur-sm p-4">
      <div className="max-w-3xl mx-auto py-10 px-4 bg-white/30 backdrop-blur-xl shadow-xl rounded-3xl border border-white/40">
        
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src="/logo-yasser-gpt.png" alt="Logo" className="w-12 h-12 rounded-xl shadow" />
            <div>
              <h1 className="text-2xl font-semibold">Yasser GPT</h1>
              <p className="text-sm text-slate-700">AI Chat Powered by OpenAI</p>
            </div>
          </div>
        </header>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto p-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2 rounded-xl max-w-[70%] ${
                msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white/70 backdrop-blur text-black"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {aiTyping && (
            <div className="text-slate-700">Yasser GPT inaandika...</div>
          )}
        </div>

        <div className="mt-6 flex gap-2">
          <input
            className="flex-grow p-3 rounded-xl border bg-white/70 backdrop-blur"
            placeholder="Andika ujumbe wako..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold"
          >
            Tuma
          </button>
        </div>
      </div>
    </div>
  );
}
