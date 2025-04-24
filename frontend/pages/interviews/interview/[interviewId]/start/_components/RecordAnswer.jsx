"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Mic2 } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiConfig';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import dynamic from 'next/dynamic';

const WebcamComponent = dynamic(() => import('react-webcam'), { ssr: false });
const SpeechToTextWrapper = dynamic(() =>
    import('./SpeechToTextWrapper').then(mod => mod.SpeechToTextWrapper),
    { ssr: false }
);

const RecordAnswer = ({ activeQuestionIndex, mockInterviewQuestion, interviewData }) => {
    const [userAnswer, setUserAnswer] = useState("");
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [interimResult, setInterimResult] = useState("");
    const [speechToTextData, setSpeechToTextData] = useState({
        results: [],
        isRecording: false,
        interimResult: "",
        error: null
    });

    useEffect(() => {
        if (speechToTextData.results && speechToTextData.results.length > 0) {
            const combinedTranscript = speechToTextData.results.map(result => result.transcript).join(' ');
            setUserAnswer(prevAns => prevAns + ' ' + combinedTranscript);
        }
    }, [speechToTextData.results]);

    useEffect(() => {
        if (!speechToTextData.isRecording && userAnswer?.length > 10) {
            updateUserAnswer();
        }
    }, [userAnswer, speechToTextData.isRecording]);

    const saveUserAnswer = async () => {
        setIsRecording(!isRecording);
    };

    const updateUserAnswer = async () => {
        console.log(userAnswer);
        setLoading(true);

        const feedbackPrompt = `
            You are an expert interview evaluator.
            Based on the following:
            - Interview Question: "${mockInterviewQuestion[activeQuestionIndex]?.question}"
            - Candidate's Answer: "${userAnswer}"
            Please analyze the answer in terms of relevance, clarity, and completeness. Provide a concise evaluation in **3 to 5 lines**, focusing on constructive feedback and specific areas of improvement.
            Return the response strictly in the following JSON format:
            {
            "rating": "<score out of 10>",
            "feedback": "<short constructive feedback>"
            }`;

        const result = await chatSession.sendMessage(feedbackPrompt);

        const mockJsonResp = (result.response.text()).replace("```json", "").replace("```", "");
        console.log(mockJsonResp);
        const jsonFeedbackResp = JSON.parse(mockJsonResp);

        const resp = await db.insert(UserAnswer)
            .values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: jsonFeedbackResp?.feedback,
                rating: jsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD-MM-yyyy")
            });

        if (resp) {
            toast("User Answer recorded successfully!");
            setUserAnswer("");
            setSpeechToTextData(prev => ({
                ...prev,
                results: []
            }));
        }

        setLoading(false);
    };

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col justify-center  items-center rounded-lg p-5 mt-20 bg-black'>
                <Image src={"/webcam.svg"} alt='webcam' width={200} height={200} className='absolute' />
                {typeof window !== 'undefined' && (
                    <WebcamComponent
                        mirrored={true}
                        style={{
                            height: 300,
                            width: "100%",
                            zIndex: 10,
                        }}
                    />
                )}
            </div>

            {/* Client-side only Speech-to-Text component */}
            {typeof window !== 'undefined' && (
                <SpeechToTextWrapper
                    isRecording={isRecording}
                    setParentData={setSpeechToTextData}
                />
            )}

            <Button
                disabled={loading}
                variant="outline"
                className={`my-10 px-6 py-3 flex items-center gap-3 rounded-xl shadow-md cursor-pointer transition-all duration-300
                  ${isRecording ? 'bg-red-100 hover:bg-red-200 text-red-700' : 'bg-blue-100 text-blue-700'}
                `}
                onClick={saveUserAnswer}
            >
                {isRecording ? (
                    <>
                        <Mic2 className="w-5 h-5 animate-pulse" />
                        <span className="font-semibold">Stop Recording</span>
                    </>
                ) : (
                    <>
                        <Mic2 className="w-5 h-5" />
                        <span className="font-semibold">Record Answer</span>
                    </>
                )}
            </Button>

            {(isRecording || userAnswer) && (
                <div className="w-full max-w-xl mb-3 mt-0.5 p-4 border border-yellow-500 rounded-md bg-yellow-50">
                    <h2 className="text-md font-semibold mb-2 text-yellow-800">Your Answer:</h2>
                    <p className="text-gray-800 whitespace-pre-wrap">
                        {speechToTextData.interimResult || userAnswer || "Start speaking to generate text..."}
                    </p>
                </div>
            )}
        </div>
    );
};

export default RecordAnswer;