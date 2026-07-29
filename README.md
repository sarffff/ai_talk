# 🤖 AI Talk - 智能角色扮演聊天应用

<div align="center">

一个功能强大的 AI 角色扮演聊天应用前端项目，提供流畅的语音交互、智能对话和历史记录管理。

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-Private-blue.svg)](LICENSE)

</div>

---

## ✨ 功能特性

### 🎯 核心功能

- **🎭 角色扮演系统**
  - 多样化的 AI 角色选择
  - 角色卡片可视化展示
  - 自定义角色配置

- **💬 智能对话**
  - 实时流式响应
  - Markdown 格式支持
  - 代码高亮显示
  - 多轮对话上下文管理

- **🎙️ 语音交互**
  - 语音实时录制
  - 语音识别转文字
  - 文本转语音播放 (TTS)
  - 语音合成自定义

- **📚 历史管理**
  - 对话历史保存
  - 历史记录浏览
  - 会话快速切换
  - 对话搜索功能

### 🎨 用户体验

- **响应式设计**：完美适配桌面和移动设备
- **流畅动画**：Framer Motion 驱动的交互动画
- **现代 UI**：基于 Tailwind CSS 的精美界面
- **暗色主题**：护眼的视觉体验

---

## 🛠️ 技术栈

### 核心技术

| 技术                     | 版本   | 说明           |
| ------------------------ | ------ | -------------- |
| **React**                | 18.3.1 | 前端框架       |
| **Vite**                 | 5.4.0  | 构建工具       |
| **React Router DOM**     | 6.23.1 | 路由管理       |
| **Zustand**              | 4.5.2  | 状态管理       |
| **TanStack React Query** | 5.37.1 | 数据获取和缓存 |

### UI & 样式

| 技术              | 版本    | 说明      |
| ----------------- | ------- | --------- |
| **Tailwind CSS**  | 3.4.14  | CSS 框架  |
| **Framer Motion** | 11.2.12 | 动画库    |
| **Lucide React**  | 0.422.0 | 图标库    |
| **Shadcn UI**     | latest  | UI 组件库 |

### 内容渲染

| 技术                 | 版本    | 说明                  |
| -------------------- | ------- | --------------------- |
| **React Markdown**   | 10.1.0  | Markdown 渲染         |
| **Highlight.js**     | 11.11.1 | 代码高亮              |
| **Rehype Highlight** | 7.0.2   | Markdown 代码高亮插件 |
| **Remark GFM**       | 4.0.1   | GitHub 风格 Markdown  |

### 开发工具

- **Axios** - HTTP 客户端
- **ESLint** - 代码检查
- **PostCSS** - CSS 处理
- **Autoprefixer** - CSS 前缀自动添加

---

## 📁 项目结构

```
frontend/
├── public/                     # 静态资源目录
│   ├── logo.svg               # 应用 Logo
│   └── vite.svg               # Vite Logo
│
├── src/
│   ├── assets/                # 资源文件
│   │
│   ├── components/            # 可复用组件
│   │   ├── AudioRecorder.jsx      # 🎙️ 语音录制组件
│   │   ├── ChatMessage.jsx        # 💬 聊天消息组件
│   │   ├── RoleCard.jsx           # 🎭 角色卡片组件
│   │   ├── message/               # 消息相关
│   │   │   ├── Message.jsx            # 消息展示
│   │   │   └── MessageProvider.jsx    # 消息上下文
│   │   └── sidebar/               # 侧边栏
│   │       ├── SideBar.jsx            # 侧边栏主组件
│   │       └── sidebar.css            # 侧边栏样式
│   │
│   ├── hooks/                 # 自定义 Hooks
│   │   ├── useRecorder.js         # 🎤 音频录制 Hook
│   │   ├── useSpeechRecognition.js # 🗣️ 语音识别 Hook
│   │   ├── useSpeechSynthesis.js   # 🔊 语音合成 Hook
│   │   └── useTTS.js              # 📢 TTS Hook
│   │
│   ├── pages/                 # 页面组件
│   │   ├── Home.jsx               # 🏠 首页
│   │   ├── NewChat.jsx            # ✨ 新建对话页
│   │   ├── HistoryChat.jsx        # 📜 历史对话页
│   │   ├── Profile.jsx            # 👤 个人资料页
│   │   └── refactor-chat.jsx      # 🔧 重构对话页
│   │
│   ├── services/              # API 服务层
│   │   └── chat.js                # 💬 聊天 API
│   │
│   ├── utils/                 # 工具函数
│   │
│   ├── App.jsx                # 🎯 主应用组件
│   ├── main.jsx               # 🚀 应用入口
│   └── index.css              # 🎨 全局样式
│
├── .vscode/                   # VS Code 配置
├── .git/                      # Git 仓库
├── node_modules/              # 依赖包
│
├── .gitignore                 # Git 忽略配置
├── eslint.config.js           # ESLint 配置
├── postcss.config.js          # PostCSS 配置
├── tailwind.config.js         # Tailwind 配置
├── vite.config.js             # Vite 配置
├── package.json               # 项目配置
├── pnpm-lock.yaml             # pnpm 锁文件
└── README.md                  # 项目文档
```

---

## 🚀 快速开始

### 📋 环境要求

在开始之前，请确保你的开发环境满足以下要求：

- **Node.js**: >= 18.0.0
- **包管理器**: pnpm (推荐) / npm / yarn
- **浏览器**: 支持现代 ES6+ 特性的浏览器

### 📦 安装依赖

推荐使用 pnpm 作为包管理器：

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 🔧 开发环境

启动开发服务器：

```bash
pnpm dev
```

服务器启动后，在浏览器中访问：

```
http://localhost:5173
```

开发服务器支持：

- ⚡ 热模块替换 (HMR)
- 🔍 错误覆盖显示
- 📝 实时代码更新

### 🏗️ 构建生产版本

```bash
# 构建优化后的生产版本
pnpm build

# 构建产物位于 dist/ 目录
```

构建特性：

- 📦 代码压缩和优化
- 🎯 Tree-shaking
- 📊 Bundle 分析
- 🔒 Source map 生成

### 👀 预览生产版本

```bash
# 本地预览构建后的生产版本
pnpm preview
```

### 🔍 代码检查

```bash
# 运行 ESLint 检查
pnpm lint

# 自动修复可修复的问题
pnpm lint --fix
```

---

## 📖 使用指南

### 1️⃣ 启动应用

```bash
pnpm dev
```

### 2️⃣ 选择角色

- 在侧边栏浏览可用的 AI 角色
- 点击角色卡片查看详细信息
- 选择你想要对话的角色

### 3️⃣ 开始对话

- **文字输入**：在输入框中输入消息
- **语音输入**：点击麦克风按钮录制语音
- **查看回复**：AI 会实时生成回复

### 4️⃣ 管理历史

- 在侧边栏查看历史对话列表
- 点击历史记录恢复之前的对话
- 继续与 AI 进行多轮对话

---

## 🔌 API 接口

### 角色列表

```javascript
GET / api / ai / roleList;
```

获取所有可用的 AI 角色。

### 对话历史列表

```javascript
GET / api / ai / history / list;
```

获取用户的所有对话历史记录。

### 对话详情

```javascript
GET /api/ai/history/:conversationId
```

获取指定对话的详细消息记录。

---

## 🎯 核心组件说明

### AudioRecorder

语音录制组件，支持：

- 实时录音
- 音频波形可视化
- 录音控制（开始/停止/取消）

### ChatMessage

聊天消息展示组件，支持：

- Markdown 格式渲染
- 代码块语法高亮
- 消息时间戳显示
- 角色头像展示

### RoleCard

角色卡片组件，用于：

- 展示角色基本信息
- 角色选择交互
- 角色详情预览

---

## 🔧 配置说明

### Vite 配置

在 `vite.config.js` 中配置开发服务器、构建选项和插件。

### Tailwind 配置

在 `tailwind.config.js` 中自定义主题、颜色、字体等样式。

### ESLint 配置

在 `eslint.config.js` 中配置代码规范和检查规则。

---

## 🤝 开发规范

### 代码风格

- 使用 ESLint 进行代码检查
- 遵循 React Hooks 规范
- 组件使用函数式编程
- 优先使用箭头函数

### 提交规范

```
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
test: 测试相关
chore: 构建/工具链相关
```

---

## 📝 待办事项

- [ ] 添加单元测试
- [ ] 实现主题切换功能
- [ ] 优化移动端体验
- [ ] 添加消息搜索功能
- [ ] 支持多语言国际化
- [ ] 增强语音识别准确度
- [ ] 添加表情和贴纸功能

---

## 🐛 问题反馈

如果你在使用过程中遇到问题，请通过以下方式反馈：

1. 查看控制台错误信息
2. 检查网络请求状态
3. 确认后端 API 服务正常
4. 联系开发团队

---

## 📄 许可证

本项目为私有项目，未经授权不得使用。

---

## 👥 开发团队

**Seven Bulls Cloud** - 秋季技巧项目组

---

<div align="center">

**[⬆ 回到顶部](#-ai-talk---智能角色扮演聊天应用)**

Made with ❤️ by Seven Bulls Cloud Team

</div>
