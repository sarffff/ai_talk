import { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getChatHistoryList } from '../../services/chat';
import './sidebar.css';

const Sidebar = () => {
  const [newHistories, setNewHistories] = useState([]);
  const navigate = useNavigate();

  // 用 react-query 拉取会话列表
  const {
    data: histories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: getChatHistoryList,
    refetchOnWindowFocus: false,
  });

  const reverseArray = (arr) => {
    return arr.slice().map((_, index, array) => array[array.length - 1 - index]);
  }


  return ( 
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col p-4">
      {/* 新建会话按钮 */}
      <div className="flex-none">
        <div className="my-4 h-12">
          <Link
            to="/newchat"
            className="block w-full h-full text-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-500 flex items-center justify-center"
          >
            新建会话
          </Link>
        </div>

        {/* 标题 + 刷新按钮 */}
        <div className="flex items-center justify-between my-8">
          <h2 className="text-lg font-semibold">历史会话</h2>
          <button
            className="text-sm px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
            onClick={() => refetch()}
            aria-label="刷新会话列表"
          >
            刷新
          </button>
        </div>
      </div>

      {/* 会话列表 */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {isLoading ? (
          <div className="text-sm text-gray-300">加载中...</div>
        ) : reverseArray(histories).length === 0 && newHistories.length === 0 ? (
          <div className="text-sm text-gray-400">暂无历史会话</div>
        ) : (
          <ul className="space-y-2 px-1">
            {reverseArray(histories).map((h) => (
              <li key={h.conversationId}>
                <button
                  className="w-full text-left p-2 rounded hover:bg-gray-700 flex items-center justify-between"
                  onClick={() => navigate(`/historychat/${h.conversationId}`)}
                >
                  <div className="truncate">
                    <div className="font-medium">{h.title || '无标题会话'}</div>
                    <div className="text-xs text-gray-400">
                      {h.updatedAt
                        ? new Date(h.updatedAt).toLocaleString()
                        : ''}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
