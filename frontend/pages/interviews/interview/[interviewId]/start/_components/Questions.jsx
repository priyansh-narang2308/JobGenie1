"use client"; 

import { Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Questions = ({ mockInterviewQuestion, activeQuestionIndex }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const textToSpeech = (text) => {
        if (!isClient) return; 

        if (!("speechSynthesis" in window)) {
            alert("Sorry, your browser doesn't support Text to Speech");
            return;
        }

        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            return;
        }

        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    };

    return (
        mockInterviewQuestion && (
            <div className="p-6 ml-12 mt-15 border rounded-2xl my-10 bg-secondary/40 shadow-md space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {mockInterviewQuestion.map((question, index) => (
                        <h2
                            key={index}
                            className={`px-4 py-2 rounded-full text-sm text-center font-medium cursor-pointer transition-all duration-200
                                ${activeQuestionIndex === index
                                    ? 'bg-blue-700 text-white shadow-md'
                                    : 'bg-secondary hover:bg-accent'
                                }`}
                        >
                            Question #{index + 1}
                        </h2>
                    ))}
                </div>

                <div className="text-md md:text-lg font-semibold text-white">
                    {mockInterviewQuestion[activeQuestionIndex]?.question}
                </div>

                {isClient && (
                    <Volume2
                        className='cursor-pointer'
                        onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
                    />
                )}

                <div className="bg-yellow-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm">
                    <p className="font-semibold">⚠️ Important Instructions:</p>
                    <ul className="list-disc ml-6 mt-2 text-sm text-red-800 space-y-1">
                        <li>Click on record answer when you want to answer a question.</li>
                        <li>At the end you will receive feedback along with the correct answer to compare your answer with that</li>
                        <li>Each question will test both technical and communication skills.</li>
                        <li className='text-blue-600 text-2xl'>Give the answer in <span className='font-extrabold'>complete</span> detail and mention all necessary topics.</li>
                    </ul>
                </div>
            </div>
        )
    );
};

export default Questions;