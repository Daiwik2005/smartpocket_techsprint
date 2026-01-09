import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function sendChatMessage(message: string) {
  const res = await axios.post(`${API_URL}/api/chat`, {
    message
  });
  return res.data.reply;
}
