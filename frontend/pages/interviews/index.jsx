import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewLit from './_components/InterviewLit';

const DashboardPage = () => {
    return (
        <div className='p-10'>
            <h2 className='font-bold text-3xl '>Dashboard</h2>
            <h2 className='text-gray-500 mt-2'>Create and Start your AI Mockup Interview</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
                <AddNewInterview />
            </div>

            {/* Prev iterviews */}
            <InterviewLit />

        </div>
    );
};

export default DashboardPage;