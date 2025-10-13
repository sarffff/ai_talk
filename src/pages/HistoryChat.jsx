import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AudioRecorder from '../components/AudioRecorder';
import ChatMessage from '../components/ChatMessage';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { getRolesList, getChatHistory } from '../services/chat';
import { Message } from '../components/message/MessageProvider';

const baseUrl = '/api/ai/chat';

const Chat = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [roles, setRoles] = useState([]);
  const [currentRole, setCurrentRole] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const eventSourceRef = useRef(null);

  // 加载历史对话
  useEffect(() => {
    if (conversationId) {
      getChatHistory(conversationId).then(({ code, data }) => {
        if (Number(code) === 200) {
          setMessages(data || []);
          setCurrentRole(data?.[0]?.systemRole || null);
        } else {
          Message.error('无法获取历史对话，请稍后重试。');
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    getRolesList().then(({ code, data }) => {
      if (Number(code) === 200) {
        setRoles(data);
      } else {
        Message.error('无法获取角色列表，请稍后重试。');
      }
    });
  }, []);

  // 输入框回车发送消息
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  // 语音输入
  const { recognizing, startRecognition, stopRecognition } =
    useSpeechRecognition(
      (text) => {
        setMessages((prev) => [...prev, { role: 'user', content: text }]);
        simulateAIReply(text);
      },
      () => {
        console.log('识别完成');
      }
    );

  // 当前选择的角色
  const selectedRole = roles.find((role) => role.id === Number(currentRole));
  const chatId = conversationId ;

  // AI 回复（流式）
  const simulateAIReply = (prompt) => {
    if (!selectedRole) return;

    // 关闭旧连接
    if (eventSourceRef.current) {
      try {
        eventSourceRef.current.close();
      } catch (e) {}
      eventSourceRef.current = null;
    }

    const params = new URLSearchParams({
      prompt,
      roleId: selectedRole.id || '',
      chatId,
    });
    const fullUrl = `${baseUrl}?${params.toString()}`;

    // 插入占位消息
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    const es = new EventSource(fullUrl);
    eventSourceRef.current = es;

    es.onopen = () => Message.info('等待 AI 回复...');

    es.onmessage = (event) => {
      const chunk = event.data;

      setMessages((prev) => {
        // 如果最后一条是 assistant，就更新它
        if (prev.length && prev[prev.length - 1].role === 'assistant') {
          return [
            ...prev.slice(0, -1),
            {
              ...prev[prev.length - 1],
              content: prev[prev.length - 1].content + chunk,
            },
          ];
        }
        // 否则直接新增一条 assistant 消息
        return [...prev, { role: 'assistant', content: chunk }];
      });
    };

    es.addEventListener('end', () => {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last.role === 'assistant' && !last.content.trim()) {
          last.content = '[无响应]';
        }
        return updated;
      });
      try {
        es.close();
      } catch (e) {}
      eventSourceRef.current = null;
    });

    es.onerror = (err) => {
      console.error('SSE 错误:', err);
      try {
        es.close();
      } catch (e) {}
      eventSourceRef.current = null;
    };
  };

  // 卸载时关闭 SSE
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        try {
          eventSourceRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  // 发送消息
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMsg]);
    simulateAIReply(input);
    setInput('');
  };

  // 滚动逻辑
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;
    const isBottom = scrollHeight - scrollTop <= clientHeight + 50;
    setAutoScroll(isBottom);
  };

  if (loading) {
    return <div className="p-4">加载中...</div>;
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-50 relative px-10">
      <h2 className="text-xl font-bold mb-2">💬 AI 聊天室</h2>
      <>
        {/* 消息列表 */}
        <div
          className="flex-1 overflow-y-auto bg-white p-3 rounded shadow space-y-2"
          ref={messagesContainerRef}
          onScroll={handleScroll}
        >
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} content={m.content} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入框 */}
        <div className="mt-2 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入消息..."
            className="flex-1 border px-3 py-2 outline-none"
          />
          {!recognizing ? (
            <button
              className="bg-green-500 text-white mx-1 px-3 py-1 rounded"
              onClick={startRecognition}
            >
              🎤 语音输入
            </button>
          ) : (
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={stopRecognition}
            >
              ⏹ 停止
            </button>
          )}
          <AudioRecorder selectedRole={selectedRole} chatId={conversationId} />
        </div>
      </>
    </div>
  );
};

export default Chat;
