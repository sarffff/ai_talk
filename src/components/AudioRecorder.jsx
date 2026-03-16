import { useEffect } from 'react';
import { Message } from './message/MessageProvider';
import { useRecorder } from '../hooks/useRecorder';
import { useTTS } from '../hooks/useTTS';

const AudioRecorder = ({ selectedRole, chatId }) => {
  const { playBase64, stop: stopTTS } = useTTS();
  const { isRecording, volume, startRecording, stopRecording } = useRecorder({
    chatId,
    selectedRole,
    onTranscript: (text) => setTranscript((p) => p + ' ' + text),
    onTTS: (base64) => playBase64(base64),
  });

  const handleStop = () => {
    stopRecording();
    stopTTS(); // 同时停掉 TTS
  };

  useEffect(() => {
    return () => {
      stopRecording();
      stopTTS();
    };
  }, []);
  return (
    <>
      <div className="flex items-center space-x-3">
        <button
          onClick={isRecording ? handleStop : startRecording}
          className={`p-3 rounded text-white flex items-center space-x-2 ${
            isRecording ? 'bg-red-500' : 'bg-blue-500'
          }`}
          aria-pressed={isRecording}
        >
          <span>{isRecording ? '停止录音' : '开始录音'}</span>
          <span
            className={`w-3 h-3 rounded-full ${
              isRecording ? 'bg-red-300 animate-pulse' : 'bg-white/30'
            }`}
            aria-hidden
          />
        </button>
      </div>

      {isRecording && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => {
            if (window.confirm('确定停止录音？')) handleStop();
          }}
          role="dialog"
          aria-label="录音中，点击停止"
        >
          <div className="relative w-44 h-44 md:w-56 md:h-56">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-40 animate-ping"
              style={{
                transform: `scale(${1 + volume * 1.6})`,
                transition: 'transform 0.12s ease-out',
              }}
            ></div>
            <div
              className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 opacity-80 animate-pulse shadow-lg flex items-center justify-center"
              style={{
                transform: `scale(${1 + volume * 0.9})`,
                transition: 'transform 0.12s ease-out',
              }}
            >
              <div className="text-white text-4xl font-bold">
                <span role="img" aria-label="麦克风">
                  🎙️
                </span>
              </div>
            </div>

            {/* 音量环 */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(96,165,250,0.6)"
                strokeWidth={4 + volume * 12}
                fill="none"
                style={{
                  opacity: 0.2 + volume * 0.6,
                  transition: 'stroke-width 0.12s, opacity 0.12s',
                }}
              />
            </svg>

            {/* 实时转写 */}
            {/* <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-80 max-w-[90vw] text-center">
              <div className="bg-white/90 text-black rounded p-3 shadow-md">
                <div className="text-sm text-gray-700 truncate">{transcript || '正在倾听...'}</div>
                <div className="text-xs text-gray-400 mt-1">
                  音量: {(volume * 100).toFixed(0)}%
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default AudioRecorder;
