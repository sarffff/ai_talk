import { useState } from "react";
import { createRoot } from "react-dom/client";
import MessageItem from "./Message";

// 全局消息管理
let globalAddMessage = null;
let messageRoot = null;

const GlobalMessageProvider = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (msg) => {
    const id = Math.random().toString(36).slice(2);
    setMessages((prev) => [...prev, { ...msg, id }]);
  };

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  globalAddMessage = addMessage;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          {...msg}
          onClose={() => removeMessage(msg.id)}
        />
      ))}
    </div>
  );
};

const initGlobalMessage = () => {
  if (!messageRoot) {
    const container = document.createElement("div");
    document.body.appendChild(container);
    messageRoot = createRoot(container);
    messageRoot.render(<GlobalMessageProvider />);
  }
};

export const Message = {
  success: (content, duration = 3000, position = "top") => {
    initGlobalMessage();
    globalAddMessage?.({ content, type: "success", duration, position });
  },
  error: (content, duration = 3000, position = "top") => {
    initGlobalMessage();
    globalAddMessage?.({ content, type: "error", duration, position });
  },
  warning: (content, duration = 3000, position = "top") => {
    initGlobalMessage();
    globalAddMessage?.({ content, type: "warning", duration, position });
  },
  info: (content, duration = 3000, position = "top") => {
    initGlobalMessage();
    globalAddMessage?.({ content, type: "info", duration, position });
  },
  loading: (content, duration = 0, position = "top") => {
    initGlobalMessage();
    globalAddMessage?.({ content, type: "loading", duration, position });
  },
};

