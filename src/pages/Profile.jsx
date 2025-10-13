const Profile = () => {
  // 扩展的静态用户数据
  const user = {
    name: "Alex Chen",
    email: "alex.chen@example.com",
    avatar: "https://s1.aigei.com/prevfiles/fe0c75404d6b4776aa95df8f2fa876d7.png?e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:c8p1DpbBA8zmuDJPShjFAbE6gQk=",
    location: "San Francisco, CA",
    joinDate: "2023-05-15",
    rolesPlayed: ["Harry Potter", "Socrates", "Albert Einstein", "Cleopatra"],
    interests: ["Philosophy", "Sci-Fi", "History", "Gaming"],
    bio: "Passionate about exploring the universe through conversations with historical figures and fictional characters. Always curious, always learning!",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span role="img" aria-label="用户图标">👤</span> 用户中心
        </h1>

        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <img
            src={user.avatar}
            alt={`${user.name} 的头像`}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">📍 {user.location}</p>
            <p className="text-sm text-gray-500">
              加入日期: {new Date(user.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700">关于我</h3>
          <p className="text-gray-600 leading-relaxed">{user.bio}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700">最近聊天角色</h3>
          <ul className="grid grid-cols-2 gap-2">
            {user.rolesPlayed.map((role) => (
              <li
                key={role}
                className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-medium text-center"
              >
                {role}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700">兴趣</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg py-2 px-4 hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
            aria-label="编辑个人资料"
          >
            编辑资料
          </button>
          <button
            className="flex-1 bg-gray-200 text-gray-800 rounded-lg py-2 px-4 hover:bg-gray-300 transition-all"
            aria-label="注销账户"
          >
            注销
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
