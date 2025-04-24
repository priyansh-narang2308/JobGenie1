"use client";

import { db } from '@/utils/db';
import { MockInteview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './IntevriewItemCard';

const InterviewLit = () => {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(() => {
        user && getInterviewList();
    }, [user]);

    const getInterviewList = async () => {
        const result = await db.select()
            .from(MockInteview)
            .where(eq(MockInteview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInteview.id));
        setInterviewList(result);
    };

    return (
        <div className="px-6 py-8">
<h2 className="font-bold text-3xl text-gray-900 dark:text-white mb-6">
    📂 Your Previous Interviews
</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviewList && interviewList.length > 0 ? (
                    interviewList.map((interview, index) => (
                        <InterviewItemCard interview={interview} key={index} />
                    ))
                ) : (
<p className="text-gray-500 dark:text-gray-400 text-md">
    No interviews found.
</p>
                )}
            </div>
        </div>
    );
};

export default InterviewLit;
