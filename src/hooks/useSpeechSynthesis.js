import { useEffect, useRef, useState } from "react";

export const useSpeechSynthesis = () => {
    const synthRef = useRef(window.speechSynthesis);
    const [playingIndex, setPlayingIndex] = useState(null); // 当前播放的消息下标

    const utteranceRef = useRef(null);
    const [speaking, setSpeaking] = useState(false);

    const speak = (text, index) => {
        if (!synthRef.current) {
            alert("当前浏览器不支持语音合成");
            return;
        }

        if (playingIndex === index) {
            stop();
        } else {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "zh-CN";
            utterance.rate = 1; // 语速
            utterance.pitch = 1; // 音高

            // 可以选择声音（中文通常用华语/普通话）
            const voices = synthRef.current.getVoices();
            const matched = voices.find((v) => v.name.includes("Microsoft Zira Desktop - English (United States)"));
            if (matched) {
                utterance.voice = matched;
            }
            else {
                utterance.voice = voices[0];
            }

            setPlayingIndex(index);

            utterance.onstart = () => setSpeaking(true);
            utterance.onend = () => {
                setSpeaking(false);
                setPlayingIndex(null);
            };
            utterance.onerror = () => setSpeaking(false);

            utteranceRef.current = utterance;
            synthRef.current.speak(utterance);
        }
    };

    const stop = () => {
        if (synthRef.current.speaking) {
            synthRef.current.cancel();
        }
        setSpeaking(false);
    };

    // 组件卸载时清理
    useEffect(() => {
        return () => {
            stop();
        };
    }, []);

    return {
        speaking,
        speak,
        stop,
        playingIndex,
    };
};
