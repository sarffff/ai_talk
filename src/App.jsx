import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewChat from './pages/NewChat';
import HistoryChat from './pages/HistoryChat';
import Sidebar from './components/sidebar/SideBar';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Routes>
            <Route path="/newchat" element={<NewChat />}/>
            <Route path="/historychat/:conversationId" element={<HistoryChat />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
