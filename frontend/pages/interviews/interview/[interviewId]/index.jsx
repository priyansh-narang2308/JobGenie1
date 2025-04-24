"use client";

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInteview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { WebcamIcon, AlertTriangle, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';  
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const InterviewPage = () => {
    const router = useRouter();
    const { interviewId } = router.query; 

    const [interviewData, setInterviewData] = useState(null);
    const [webcamEnabled, setWebcamEnabled] = useState(false);

    useEffect(() => {
        if (!interviewId) return;  // wait for interviewId to be available
        console.log(interviewId);
        getInterviewDetails();
    }, [interviewId]);

    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInteview)
            .where(eq(MockInteview.mockId, interviewId));

        setInterviewData(result[0]);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-10">Let's Get Started</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col space-y-4">
                    <div className="p-6 rounded-xl border shadow-sm bg-white">
                        <h2 className="text-3xl text-black font-bold mb-6">Interview Details</h2>
                        {interviewData ? (
                            <div className="space-y-4">
                                <div>
                                    <span className="font-extrabold text-xl text-gray-700">Job Position:</span>
                                    <p className="mt-1 text-black font-bold">{interviewData.jobPosition}</p>
                                </div>
                                <div>
                                    <span className="font-extrabold text-xl text-gray-700">Job Description/Tech Stack:</span>
                                    <p className="mt-1 text-black  font-bold">{interviewData.jobDesc}</p>
                                </div>
                                <div>
                                    <span className="font-extrabold text-xl text-gray-700">Years of Experience:</span>
                                    <p className="mt-1 text-black  font-bold">{interviewData.jobExperience}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">Loading interview details...</p>
                        )}
                    </div>

                    <div className="p-5 rounded-xl border border-yellow-300 bg-yellow-50 shadow-sm">
                        <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-yellow-800 mb-2">Important Instructions</h3>
                                <ul className="text-yellow-700 space-y-2 text-sm">
                                    <li>• The interview will not start unless and untill the Camera is <span className='text-blue-600 text-xl font-bold'>SWITCHED ON </span></li>
                                    <li>• The interview has 5 questions which you can answer and at the last you will recieve a feedback based on your results</li>
                                    <li>• No personal details will be shared or recorded</li>
                                    <li>• Have your resume or notes ready for reference</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-full bg-gray-50 rounded-xl overflow-hidden shadow-sm border p-4 flex justify-center">
                        {webcamEnabled ? (
                            <Webcam
                                mirrored={true}
                                onUserMedia={() => setWebcamEnabled(true)}
                                onUserMediaError={() => setWebcamEnabled(false)}
                                className="rounded-lg w-full max-w-md aspect-video object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full py-8">
                                <WebcamIcon className="h-32 w-32 text-black mb-4" />
                                <p className="text-black mb-4 text-center">Camera is currently disabled</p>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-center w-full space-y-4 mt-4">
                        <Button
                            className="w-full max-w-xs text-black px-6 cursor-pointer"
                            onClick={() => setWebcamEnabled(!webcamEnabled)}
                        >
                            {webcamEnabled ? "Disable Camera" : "Enable Camera & Microphone"}
                        </Button>

                        <Link href={`/interviews/interview/${interviewId}/start`}>
                            <Button
                                className="w-full max-w-xs px-6 py-6 bg-green-600 hover:bg-green-700 text-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                                disabled={!webcamEnabled}
                            >
                                <PlayCircle className="h-5 w-5" />
                                Start Interview
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewPage;
