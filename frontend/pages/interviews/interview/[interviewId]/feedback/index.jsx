"use client";

import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import DashboardLayout from "@/components/layout/dashboard-layout"

const FeedbackPage = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [interviewId, setInterviewId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (router?.query?.interviewId) {
            setInterviewId(router.query.interviewId);
        }
    }, [router.query]);

    useEffect(() => {
        if (interviewId) {
            getFeedback(interviewId);
        }
    }, [interviewId]);

    const getFeedback = async (id) => {
        const result = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, id))
            .orderBy(UserAnswer.id);

        setFeedbackList(result);
    };

    return (
        <DashboardLayout>
        <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto text-gray-100  min-h-screen">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-green-400 drop-shadow-lg">🎉 Congratulations!</h2>
                <h3 className="text-3xl font-semibold mt-3 text-white">Here's your Interview Feedback</h3>
            </div>

            {feedbackList.length === 0 ? (
                <div className="text-center mt-10">
                    <h2 className="font-bold text-2xl text-gray-400">
                        No Interview Feedback Record Found
                    </h2>
                </div>
            ) : (
                <>
                    <div className="text-center mb-6">
                        <p className="text-xl text-purple-400">
                            Overall Interview Rating: <span className="font-bold text-white">7/10</span>
                        </p>
                        <p className="text-gray-400 mt-1 text-lg">
                            Below is a detailed breakdown of your answers and suggestions for improvement.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {feedbackList.map((item, index) => (
                            <Collapsible key={index} className="border border-gray-700 rounded-xl bg-[#1a1a1a] shadow-lg">
                                <CollapsibleTrigger className="w-full p-5 flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition text-lg font-medium text-white rounded-t-xl focus:outline-none focus:ring-2 focus:ring-blue-400">
                                    <span>Q{index + 1}: {item.question}</span>
                                    <ChevronsUpDown className="h-6 w-6 text-gray-400" />
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <div className="p-6 space-y-6 bg-[#121212] rounded-b-xl">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-1 p-5 bg-[#331111] rounded-lg border border-red-600">
                                                <h4 className="text-xl font-bold text-red-400 mb-2">Your Answer</h4>
                                                <p className="text-base md:text-lg text-red-100 leading-relaxed">
                                                    {item.userAns}
                                                </p>
                                            </div>

                                            <div className="flex-1 p-5 bg-[#113311] rounded-lg border border-green-600">
                                                <h4 className="text-xl font-bold text-green-400 mb-2">Appropriate Answer</h4>
                                                <p className="text-base md:text-lg text-green-100 leading-relaxed">
                                                    {item.correctAns}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-[#2a2300] border-l-4 border-yellow-500 rounded-md shadow-inner">
                                            <p className="text-yellow-400 font-semibold">
                                                💡 <strong>Feedback:</strong> {item.feedback}
                                            </p>
                                            <p className="text-yellow-300 mt-1 text-base">
                                                ⭐ <strong>Rating:</strong> {item.rating}
                                            </p>
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </>
            )}

            <div className="mt-12 text-center">
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition shadow-md"
                    onClick={() => router.replace("/interviews/")}
                >
                    Go Home
                </Button>
            </div>
        </div>
        </DashboardLayout>
    );
};

export default FeedbackPage;
