"use client";

import { db } from '@/utils/db';
import { MockInteview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import Questions from './_components/Questions';
import RecordAnswer from './_components/RecordAnswer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DashboardLayout from "@/components/layout/dashboard-layout"

const StartPage = () => {
    const router = useRouter();
    const { interviewId } = router.query;

    const [interviewData, setInterviewData] = useState([]);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        if (interviewId) {
            getInterviewDetails();
        }
    }, [interviewId]);

    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInteview)
            .where(eq(MockInteview.mockId, interviewId));

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    };

    return (
      <DashboardLayout>
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Questions
                    activeQuestionIndex={activeQuestionIndex}
                    mockInterviewQuestion={mockInterviewQuestion} />
                <RecordAnswer
                    activeQuestionIndex={activeQuestionIndex}
                    mockInterviewQuestion={mockInterviewQuestion}
                    interviewData={interviewData}
                />
            </div>
            <div className="flex justify-end gap-6 mr-10">
  {activeQuestionIndex > 0 && (
    <Button
      onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
      className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Previous Question
    </Button>
  )}
  {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
    <Button
      onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
      className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      Next Question
    </Button>
  )}
  {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
    <Link href={`/interviews/interview/${interviewData?.mockId}/feedback`}>
      <Button
        className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        End Interview
      </Button>
    </Link>
  )}
</div>

        </div>
      </DashboardLayout>
    );
};

export default StartPage;
