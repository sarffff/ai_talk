# AI 角色扮演前端

这是一个基于 React 的 AI 角色扮演聊天应用前端项目，提供语音交互、聊天历史管理和角色扮演功能。

## 功能特性

- **语音交互**：支持语音录制、语音识别和文本转语音 (TTS)
- **聊天界面**：实时聊天消息显示，支持 Markdown 渲染
- **角色管理**：角色卡片展示和选择
- **历史记录**：聊天历史查看和管理
- **响应式设计**：使用 Tailwind CSS 实现现代化 UI
- **动画效果**：集成 Framer Motion 提供流畅动画

## 技术栈

- **前端框架**：React 18
- **构建工具**：Vite
- **样式**：Tailwind CSS
- **状态管理**：Zustand
- **数据获取**：TanStack React Query + Axios
- **路由**：React Router DOM
- **动画**：Framer Motion
- **Markdown 渲染**：React Markdown + Highlight.js
- **图标**：Lucide React
- **代码检查**：ESLint

## 项目结构

```
frontend/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   ├── components/        # 组件
│   │   ├── AudioRecorder.jsx    # 语音录制组件
│   │   ├── ChatMessage.jsx      # 聊天消息组件
│   │   ├── RoleCard.jsx         # 角色卡片组件
│   │   ├── message/             # 消息相关组件
│   │   │   ├── Message.jsx
│   │   │   └── MessageProvider.jsx
│   │   └── sidebar/             # 侧边栏组件
│   │       ├── sidebar.css
│   │       └── SideBar.jsx
│   ├── hooks/             # 自定义 Hooks
│   │   ├── useRecorder.js       # 录制 Hook
│   │   ├── useSpeechRecognition.js  # 语音识别 Hook
│   │   ├── useSpeechSynthesis.js    # 语音合成 Hook
│   │   └── useTTS.js              # TTS Hook
│   ├── pages/             # 页面组件
│   │   ├── HistoryChat.jsx       # 历史聊天页面
│   │   ├── Home.jsx              # 首页
│   │   ├── NewChat.jsx           # 新聊天页面
│   │   └── Profile.jsx           # 个人资料页面
│   ├── services/          # 服务层
│   │   └── chat.js               # 聊天服务
│   ├── utils/             # 工具函数
│   ├── App.jsx            # 主应用组件
│   ├── main.jsx           # 应用入口
│   └── index.css          # 全局样式
├── eslint.config.js       # ESLint 配置
├── postcss.config.js      # PostCSS 配置
├── tailwind.config.js     # Tailwind 配置
├── vite.config.js         # Vite 配置
├── package.json           # 项目配置
└── README.md              # 项目说明
```

## 安装与运行

### 环境要求

- Node.js 18+
- pnpm (推荐) 或 npm

### 安装依赖

```bash
pnpm install
```

### 开发环境运行

```bash
pnpm dev
```

应用将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint
```

## 使用说明

1. 启动开发服务器后，在浏览器中打开应用
2. 在首页选择或创建角色
3. 开始新的聊天会话
4. 使用语音录制或文本输入与 AI 进行对话
5. 查看聊天历史和管理会话

