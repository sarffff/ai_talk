import { useRef, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import RoleCard from '../components/RoleCard';
import AudioRecorder from '../components/AudioRecorder';
import ChatMessage from '../components/ChatMessage';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { getRolesList } from '../services/chat';
import { Message } from '../components/message/MessageProvider';

const baseUrl = '/api/ai/chat';
const Chat = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const queryClient = useQueryClient();

  // SSE streaming state
  const bufferRef = useRef('');
  const isStreamingRef = useRef(false);
  const retryCountRef = useRef(0);
  const abortControllerRef = useRef(null);
  const maxRetries = 4;

  // 获取角色列表
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
  }, [input, selectedRole]);

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

  // 生成并保存一次 chatId（组件生命周期内不变）
  const [chatId] = useState(() =>
    Date.now().toString(36) + Math.random().toString(36).substring(2)
  );

  // AI回复（SSE）
  const simulateAIReply = async (prompt) => {
    if (!selectedRole) return;

    const params = new URLSearchParams({
      prompt,
      roleId: selectedRole.id || '',
      chatId,
    });
    const fullUrl = `${baseUrl}?${params.toString()}`;

    // 插入占位消息
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    
    // 重置状态
    bufferRef.current = '';
    isStreamingRef.current = true;
    retryCountRef.current = 0;

    const streamWithRetry = async (retryAttempt = 0) => {
      abortControllerRef.current = new AbortController();
      
      try {
        const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            Accept: 'text/event-stream',
          },
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (isStreamingRef.current) {
          const { done, value } = await reader.read();
          
          if (done) {
            isStreamingRef.current = false;
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          const fullChunk = bufferRef.current + chunk;
          
          // 处理粘包和半包
          const events = fullChunk.split('\n\n');
          
          // 保留最后一个不完整的块（半包）
          bufferRef.current = events.pop() || '';

          for (const event of events) {
            if (!event.trim()) continue;
            
            // 解析SSE格式
            const lines = event.split('\n');
            for (const line of lines) {
              if (line.startsWith('data:')) {
                const data = line.substring(5).trim();
                if (data) {
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && lastMessage.role === 'assistant') {
                      lastMessage.content += data;
                    }
                    return newMessages;
                  });
                }
              }
            }
          }
        }

        reader.releaseLock();
        retryCountRef.current = 0; // 重置重试计数

      } catch (error) {
        if (error.name === 'AbortError') {
          return; // 主动取消，不重试
        }

        console.error('Stream error:', error);
        
        if (retryAttempt < maxRetries) {
          const delay = Math.pow(2, retryAttempt) * 1000; // 指数退避
          retryCountRef.current = retryAttempt + 1;
          Message.error(`连接断开，${delay / 1000}秒后重试... (${retryAttempt + 1}/${maxRetries})`);
          
          await new Promise(resolve => setTimeout(resolve, delay));
          bufferRef.current = ''; // 清空缓冲区
          await streamWithRetry(retryAttempt + 1);
        } else {
          Message.error('连接失败，请稍后重试');
          isStreamingRef.current = false;
        }
      }
    };

    await streamWithRetry();
  };

  // 发送消息
  const sendMessage = () => {
    if (!input.trim() || !selectedRole) return;
    const newMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMsg]);
    simulateAIReply(input);
    setInput('');
  };

  // 滚动逻辑：只在用户处于底部时才自动滚动
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  // 监听用户是否在底部
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;
    const isBottom = scrollHeight - scrollTop <= clientHeight + 50;
    setAutoScroll(isBottom);
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      isStreamingRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-50 relative px-10">
      <h2 className="text-xl font-bold mb-2">💬 AI 聊天室</h2>

      {!selectedRole ? (
        <button
          className="text-lg font-semibold mb-2 cursor-pointer"
          onClick={() => setShowRoleModal(true)}
        >
          请选择您要对话的角色
        </button>
      ) : (
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
            <AudioRecorder selectedRole={selectedRole} chatId={chatId} />
          </div>
        </>
      )}

      {/* 角色选择弹窗 */}
      {showRoleModal && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
            <h3 className="text-lg font-semibold mb-2">请选择角色</h3>
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.name}
                  onClick={() => {
                    setSelectedRole(role);
                    setShowRoleModal(false);
                  }}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  <RoleCard name={role.name} description={role.description} />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowRoleModal(false)}
              className="mt-4 w-full bg-gray-300 text-gray-700 p-2 rounded"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
