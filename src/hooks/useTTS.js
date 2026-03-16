import { useRef, useState, useEffect } from 'react';

export const useTTS = () => {
  const audioRef = useRef(null);
  // const [isSpeaking, setIsSpeaking] = useState(false);

  const playBase64 = (base64Data) => {
    try {
      const binary = atob(base64Data);
      const len = binary.length;
      const buffer = new Uint8Array(len);
      for (let i = 0; i < len; i++) buffer[i] = binary.charCodeAt(i);
      const blob = new Blob([buffer], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);

      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.addEventListener('ended', () => setIsSpeaking(false));
      }
      audioRef.current.src = url;
      audioRef.current
        .play()
        .then(() => setIsSpeaking(true))
        .catch((err) => {
          console.error('播放失败', err);
          setIsSpeaking(false);
        });
    } catch (e) {
      console.error('播放 base64 失败', e);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // 从头停止
      } catch {}
      setIsSpeaking(false);
    }
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
        } catch {}
        audioRef.current = null;
      }
    };
  }, []);

  return { playBase64, stop };
};
