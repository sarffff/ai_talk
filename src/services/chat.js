export const getRolesList = async () => {
  const response = await fetch('/api/ai/roleList', {
    method: 'GET'
  });
  const data = await response.json();
  return data;
};

export const getChatHistoryList = async () => {
  const response = await fetch('/api/ai/history/list', {
    method: 'GET',
  });
  const data = await response.json();

  return data.data;
}

export const getChatHistory = async (conversationId) => {
  const response = await fetch(`/api/ai/history/${conversationId}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}
