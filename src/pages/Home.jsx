import React from "react";
import { roles } from "../utils/rolesData";
const Home = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <span role="img" aria-label="角色扮演图标">🎭</span> AI 角色扮演
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          进入一个充满无限可能的对话世界！与历史名人、虚构角色或奇幻人物互动，体验他们的独特视角和个性，开启沉浸式的聊天之旅。
        </p>
      </header>

      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">核心特色</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">🗣️</div>
            <h3 className="text-lg font-medium text-gray-800">沉浸式对话</h3>
            <p className="text-gray-600 mt-2">
              每个角色都拥有独特的语言风格和背景故事，让你仿佛置身于他们的世界。
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">🌍</div>
            <h3 className="text-lg font-medium text-gray-800">多样化角色</h3>
            <p className="text-gray-600 mt-2">
              从历史伟人到科幻英雄，选择你感兴趣的角色，探索不同的思维方式。
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-lg font-medium text-gray-800">实时互动</h3>
            <p className="text-gray-600 mt-2">
              基于先进的 AI 技术，角色会即时回应，提供流畅自然的对话体验。
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">精选角色</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ">
          {roles.map((role) => (
            <div
              key={role.name}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 flex items-start gap-3 hover:scale-105 transition-transform"
            >
              <span className="text-2xl" role="img" aria-label={`${role.name} 图标`}>
                {role.avatar}
              </span>
              <div>
                <h3 className="text-lg font-medium text-gray-800">{role.name}</h3>
                <p className="text-sm text-gray-600">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          立即开始你的角色扮演之旅！
        </h2>
        <p className="text-gray-600 mb-6">
          选择一个角色，开启一段独特的对话体验，探索历史、科幻或奇幻的无限可能。
        </p>
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all"
          aria-label="开始体验"
        >
          立即体验
        </button>
      </section>
    </div>
  );
};

export default Home;
