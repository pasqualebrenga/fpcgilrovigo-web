"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, MessageCircle, Send, Sparkles, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STARTERS = [
  "Voglio parlare con Riccardo Mantovan",
  "Abbiamo convenzioni con il mare?",
  "Quali sono le ultime news FP CGIL?",
  "Voglio iscrivermi",
];

const WELCOME: Message = {
  role: "assistant",
  content:
    "Ciao, sono Quadrato Rosso. Dimmi cosa ti serve: posso orientarti tra contatti, referenti, convenzioni, iscrizione, formazione e ultime news FP CGIL.",
};

function linkify(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+|\/[a-z0-9-/]+)/gi);

  return parts.map((part, index) => {
    if (/^https?:\/\//i.test(part)) {
      return (
        <a key={`${part}-${index}`} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    }

    if (/^\/[a-z0-9-/]+/i.test(part)) {
      return (
        <a key={`${part}-${index}`} href={part}>
          {part}
        </a>
      );
    }

    return part;
  });
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const canSend = input.trim().length > 0 && !loading;
  const apiMessages = useMemo(() => messages.filter((message) => message !== WELCOME), [messages]);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
      messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    });
  }, [messages, loading, open]);

  async function sendMessage(text: string) {
    const cleanText = text.trim();
    if (!cleanText || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: cleanText }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...apiMessages, { role: "user", content: cleanText }] }),
      });
      const data = (await response.json()) as { answer?: string };
      setMessages([...nextMessages, { role: "assistant", content: data.answer || "Non riesco a rispondere ora. Contatta FP CGIL Rovigo al 0425 377311." }]);
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: "Non riesco a rispondere ora. Contatta FP CGIL Rovigo al 0425 377311 o scrivi a fp.rovigo@veneto.cgil.it." }]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSend) void sendMessage(input);
  }

  return (
    <div className="fpChat">
      <style>{`
        .fpChat {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 70;
          font-family: inherit;
        }
        .fpChatToggle {
          border: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #d40000 0%, #9d0000 100%);
          color: #fff;
          min-width: 58px;
          height: 58px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 900;
          box-shadow: 0 18px 45px rgba(212,0,0,0.30), 0 10px 28px rgba(0,0,0,0.22);
          cursor: pointer;
          transition: transform 140ms ease, box-shadow 140ms ease;
        }
        .fpChatToggle:hover {
          transform: translateY(-1px);
          box-shadow: 0 22px 52px rgba(212,0,0,0.34), 0 12px 30px rgba(0,0,0,0.24);
        }
        .fpChatToggleLabel {
          display: inline;
        }
        .fpChatPanel {
          width: min(390px, calc(100vw - 24px));
          height: min(590px, calc(100vh - 36px));
          background: #fff;
          border: 1px solid rgba(0,0,0,0.14);
          border-radius: 16px;
          box-shadow: 0 24px 70px rgba(0,0,0,0.30);
          overflow: hidden;
          display: grid;
          grid-template-rows: auto 1fr auto;
        }
        .fpChatHead {
          background:
            linear-gradient(135deg, rgba(212,0,0,0.92) 0%, rgba(17,17,17,1) 54%, rgba(17,17,17,1) 100%),
            #111;
          color: #fff;
          padding: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .fpChatTitle {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .fpChatTitle strong {
          display: block;
          font-size: 15px;
          line-height: 1.1;
        }
        .fpChatTitle span {
          display: block;
          font-size: 12px;
          color: rgba(255,255,255,0.72);
          margin-top: 2px;
        }
        .fpChatMark {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #e30613;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          box-shadow: inset 0 0 0 2px rgba(255,255,255,0.18), 0 10px 24px rgba(0,0,0,0.22);
          font-size: 12px;
          font-weight: 1000;
          line-height: 0.9;
          text-align: center;
          letter-spacing: 0;
        }
        .fpChatAiBadge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          padding: 4px 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.16);
          color: rgba(255,255,255,0.86);
          font-size: 11px;
          font-weight: 850;
          width: fit-content;
        }
        .fpChatClose {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.08);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .fpChatBody {
          padding: 14px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background:
            repeating-linear-gradient(135deg, rgba(212,0,0,0.035) 0px, rgba(212,0,0,0.035) 4px, transparent 4px, transparent 10px),
            linear-gradient(180deg, #fff 0%, #fafafa 100%);
        }
        .fpChatMessage {
          max-width: 92%;
          border-radius: 14px;
          padding: 10px 12px;
          font-size: 14px;
          line-height: 1.4;
          border: 1px solid rgba(0,0,0,0.08);
        }
        .fpChatMessage a {
          color: inherit;
          font-weight: 900;
          text-decoration: underline;
        }
        .fpChatMessageAssistant {
          align-self: flex-start;
          background: #fff;
          color: #111827;
          box-shadow: 0 8px 18px rgba(0,0,0,0.05);
        }
        .fpChatMessageUser {
          align-self: flex-end;
          background: #d40000;
          color: #fff;
          border-color: rgba(212,0,0,0.25);
        }
        .fpChatStarters {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 2px;
        }
        .fpChatStarter {
          border: 1px solid rgba(212,0,0,0.22);
          color: #d40000;
          background: #fff;
          border-radius: 999px;
          padding: 7px 10px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          transition: transform 120ms ease, background 120ms ease;
        }
        .fpChatStarter:hover {
          background: rgba(212,0,0,0.07);
          transform: translateY(-1px);
        }
        .fpChatLoading {
          align-self: flex-start;
          color: rgba(0,0,0,0.62);
          background: rgba(255,255,255,0.8);
          border-radius: 999px;
          padding: 7px 10px;
          font-size: 12px;
          font-weight: 800;
        }
        .fpChatFoot {
          border-top: 1px solid rgba(0,0,0,0.10);
          background: #fff;
          padding: 10px;
        }
        .fpChatForm {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
        }
        .fpChatInput {
          width: 100%;
          border: 1px solid rgba(0,0,0,0.14);
          border-radius: 999px;
          padding: 11px 13px;
          font: inherit;
          font-size: 14px;
          outline: none;
        }
        .fpChatInput:focus {
          border-color: rgba(212,0,0,0.48);
          box-shadow: 0 0 0 3px rgba(212,0,0,0.10);
        }
        .fpChatSend {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 0;
          background: #d40000;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 120ms ease, transform 120ms ease;
        }
        .fpChatSend:not(:disabled):hover {
          background: #b80000;
          transform: translateY(-1px);
        }
        .fpChatSend:disabled {
          opacity: 0.45;
          cursor: default;
        }
        .fpChatNote {
          margin-top: 8px;
          font-size: 11px;
          line-height: 1.35;
          color: rgba(0,0,0,0.58);
        }
        .fpChatNote a {
          font-weight: 850;
          color: #d40000;
        }
        @media (max-width: 520px) {
          .fpChat {
            right: 12px;
            bottom: 12px;
          }
          .fpChatToggleLabel {
            display: none;
          }
          .fpChatPanel {
            width: calc(100vw - 24px);
            height: calc(100vh - 24px);
          }
        }
      `}</style>

      {open ? (
        <section className="fpChatPanel" aria-label="Quadrato Rosso, assistente FP CGIL Rovigo">
          <div className="fpChatHead">
            <div className="fpChatTitle">
              <span className="fpChatMark" aria-hidden="true">
                FP
                <br />
                AI
              </span>
              <div>
                <strong>Quadrato Rosso</strong>
                <span>Chiedi al Quadrato: ti orienta nel sito</span>
                <span className="fpChatAiBadge">
                  <Sparkles size={12} /> Risponde su FP CGIL Rovigo e news nazionali
                </span>
              </div>
            </div>
            <button className="fpChatClose" type="button" onClick={() => setOpen(false)} aria-label="Chiudi chat">
              <X size={18} />
            </button>
          </div>

          <div ref={bodyRef} className="fpChatBody" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`fpChatMessage fpChatMessage${message.role === "assistant" ? "Assistant" : "User"}`}>
                {linkify(message.content)}
              </div>
            ))}

            {messages.length === 1 ? (
              <div className="fpChatStarters">
                {STARTERS.map((starter) => (
                  <button key={starter} className="fpChatStarter" type="button" onClick={() => void sendMessage(starter)}>
                    {starter}
                  </button>
                ))}
              </div>
            ) : null}

            {loading ? <div className="fpChatLoading">Sto cercando la risposta...</div> : null}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>

          <div className="fpChatFoot">
            <form className="fpChatForm" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                className="fpChatInput"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Scrivi qui..."
                maxLength={700}
                aria-label="Messaggio per Quadrato Rosso"
              />
              <button className="fpChatSend" type="submit" disabled={!canSend} aria-label="Invia messaggio">
                <Send size={18} />
              </button>
            </form>
            <div className="fpChatNote">
              Non inserire dati sensibili. Per casi personali usa i contatti ufficiali. <a href="/contatti">Vai a Contatti</a> <ExternalLink size={11} aria-hidden="true" />
            </div>
          </div>
        </section>
      ) : (
        <button className="fpChatToggle" type="button" onClick={() => setOpen(true)} aria-label="Apri Quadrato Rosso">
          <MessageCircle size={22} />
          <span className="fpChatToggleLabel">Chiedi al Quadrato</span>
        </button>
      )}
    </div>
  );
}
