"use client";

import { useEffect } from 'react';
import * as SpeechToTextModule from 'react-hook-speech-to-text';

export const SpeechToTextWrapper = ({ isRecording, setParentData }) => {
  // Import the hook directly from the module
  const useSpeechToText = SpeechToTextModule.default || SpeechToTextModule.useSpeechToText;
  
  const {
    error,
    interimResult,
    isRecording: speechIsRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  // Sync recording state with parent component
  useEffect(() => {
    if (isRecording && !speechIsRecording) {
      startSpeechToText();
    } else if (!isRecording && speechIsRecording) {
      stopSpeechToText();
    }
  }, [isRecording, speechIsRecording, startSpeechToText, stopSpeechToText]);

  // Pass data up to parent component
  useEffect(() => {
    setParentData({
      results,
      isRecording: speechIsRecording,
      interimResult,
      error
    });
  }, [results, speechIsRecording, interimResult, error, setParentData]);

  // This component doesn't render anything - it just manages speech-to-text
  return null;
};