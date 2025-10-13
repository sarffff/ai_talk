import { useState, useEffect } from 'react';

// 图标映射
const icons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  loading: '⏳',
};

// 单个消息组件
const MessageItem = ({
  content,
  type = 'info',
  duration = 3000,
  position = 'top',
  id,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // 动画样式根据位置
  const positionStyles = {
    top: 'top-4',
    bottom: 'bottom-4',
    center: 'top-1/2 -translate-y-1/2',
  };

  // 类型样式
  const typeStyles = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    loading: 'bg-gray-100 text-gray-800 border-gray-300 animate-pulse',
  };

  return visible ? (
    <div
      className={`fixed left-1/2 -translate-x-1/2 ${positionStyles[position]} max-w-md w-full mx-auto p-4 rounded-lg shadow-lg border flex items-center gap-3 transition-all duration-300 animate-slide-in ${typeStyles[type]}`}
      role="alert"
      aria-live="assertive"
      aria-label={`${type} 消息: ${content}`}
      onKeyDown={(e) => e.key === 'Escape' && setVisible(false)}
      tabIndex={0}
    >
      <span className="text-lg" role="img" aria-hidden="true">
        {icons[type]}
      </span>
      <p className="flex-1">{content}</p>
    </div>
  ) : null;
};

export default MessageItem;
