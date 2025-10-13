import { useRef, useState } from 'react';
import { Message } from '../components/message/MessageProvider';
import { useQueryClient } from '@tanstack/react-query';

export const useRecorder = ({ chatId, selectedRole, onTranscript, onTTS }) => {
  const wsRef = useRef(null);
  const audioCtxRef = useRef(null);
  const processorRef = useRef(null);
  const inputRef = useRef(null);
  const analyserRef = useRef(null);
  const rafRef = useRef(null);
  const streamRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(0);

  const queryClient = useQueryClient();

  const startRecording = async () => {
    if (isRecording) return;

    // 1. 建立 WebSocket
    try {
      wsRef.current = new WebSocket(
        `ws://c.xiaoqiang.xyz/ws/asr?conversationId=${chatId || ''}&roleId=${selectedRole?.id || ''}`
      );
      wsRef.current.binaryType = 'arraybuffer';
      wsRef.current.onmessage = (event) => {
        const text = typeof event.data === 'string' ? event.data : '';
        if (text.startsWith('[TTS结果]')) {
          const base64 = text.replace('[TTS结果]', '').trim();
          onTTS?.(base64);
        } else if (text) {
          onTranscript?.(text);
        }
        queryClient.invalidateQueries(['conversations']);
      };
      wsRef.current.onopen = () => console.log('ASR websocket opened');
      wsRef.current.onerror = (e) => {
        console.error('WebSocket error', e);
        Message.error('语音通道异常');
      };
    } catch (e) {
      Message.error('无法连接语音识别服务');
      return;
    }

    // 2. 打开麦克风
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContext = window.AudioContext;
      audioCtxRef.current = new AudioContext({ sampleRate: 16000 });
      inputRef.current = audioCtxRef.current.createMediaStreamSource(stream);

      // analyser 检测音量
      const analyser = audioCtxRef.current.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      inputRef.current.connect(analyser);

      // processor 采集 PCM
      const processor = audioCtxRef.current.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      processor.onaudioprocess = (e) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const data = e.inputBuffer.getChannelData(0);
          const pcm = floatTo16BitPCM(data);
          wsRef.current.send(pcm);
        }
      };

      const silentGain = audioCtxRef.current.createGain();
      silentGain.gain.value = 0;
      processor.connect(silentGain);
      silentGain.connect(audioCtxRef.current.destination);
      inputRef.current.connect(processor);

      // 实时更新音量
      const dataArray = new Uint8Array(analyser.fftSize);
      const updateVolume = () => {
        analyserRef.current?.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const v = dataArray[i] - 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / dataArray.length) / 128;
        setVolume(Math.min(1, rms));
        rafRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();

      setIsRecording(true);
    } catch (err) {
      Message.error('无法获取麦克风，请检查权限');
      try { wsRef.current?.close(); } catch {}
      wsRef.current = null;
    }
  };

  const stopRecording = () => {
    try {
      processorRef.current?.disconnect();
      processorRef.current = null;
      inputRef.current?.disconnect();
      inputRef.current = null;
      analyserRef.current?.disconnect();
      analyserRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
      streamRef.current?.getTracks().forEach((t) => t.stop());
    } catch {}

    try {
      wsRef.current?.close();
      wsRef.current = null;
    } catch {}

    setIsRecording(false);
    setVolume(0);
  };

  return { isRecording, volume, startRecording, stopRecording };
};

// 工具函数
const floatTo16BitPCM = (float32Array) => {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
};
