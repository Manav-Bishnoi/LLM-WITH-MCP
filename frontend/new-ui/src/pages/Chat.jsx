import { useEffect, useRef, useState } from 'react';
import { chatApi, toolsApi } from '../lib/api';
import { Loader, Send, Bot, User } from 'lucide-react';

export default function Chat() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);


  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await chatApi.sendMessage(undefined, input);
      setMessages((m) => [...m, { role: 'bot', content: res.data.response }]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'bot', content: 'Error', isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const bubbleClasses = (msg) =>
    `max-w-[75%] px-4 py-3 rounded-2xl whitespace-pre-wrap break-words ` +
    (msg.role === 'user'
      ? 'bg-accent text-white rounded-br-md'
      : msg.isError
      ? 'bg-red-600 text-white'
      : 'bg-card text-text');

  return (
    <div className="w-full max-w-3xl flex flex-col flex-1">
      {/* toolbar */}
      <div className="flex gap-3 mb-4">
        <select
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value)}
          className="flex-1 bg-card border border-border rounded-lg p-2 text-sm"
        >
          <option value="">Select a tool…</option>
          {tools.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={bubbleClasses(m)}>
              <div className="flex items-center gap-2 mb-1 text-xs opacity-60">
                {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-card text-text px-4 py-3 rounded-2xl flex items-center gap-2">
              <Loader className="animate-spin" size={16} /> Thinking…
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* input */}
      <div className="mt-4 flex gap-2 items-end">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Type a message"
          className="flex-1 bg-card border border-border rounded-lg p-3 resize-none"
        />
        <button className="btn-primary rounded-full p-3" onClick={send} disabled={!input.trim()}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
