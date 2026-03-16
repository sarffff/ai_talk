import { useRef, useState } from "react";

export const useSpeechRecognition = (onResult, onEnd) => {
  const recognitionRef = useRef(null);
  const [recognizing, setRecognizing] = useState(false);

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("当前浏览器不支持语音识别");
      return;
    }

    // 防止重复启动
    if (recognitionRef.current) {
      console.warn("语音识别正在进行中...");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "zh-CN";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setRecognizing(true);
    };

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (onResult) onResult(transcript);
    };

    recognition.onerror = (err) => {
      console.error("语音识别错误:", err);
      setRecognizing(false);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      setRecognizing(false);
      recognitionRef.current = null;
      if (onEnd) onEnd();
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // onend 会负责清理
    }
  };

  return {
    recognizing,
    startRecognition,
    stopRecognition,
  };
};
