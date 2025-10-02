import React from 'react';
import BlogCard from '../components/BlogCard';

const Home = () => {
    const blogs = [
        {
            id: 1,
            title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
            date: "Apr 18, 2024",
            excerpt: "We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions. We want to take advantage of the current higher rates to further increase the duration of the Gilt funds we hold. Read more..."
        },
        {
            id: 2,
            title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
            date: "Apr 05, 2024",
            excerpt: "Unlock this post by trail. Craftsman Automation excels in making precise parts for cars and machines. Amidst temporary headwinds, looks resilient with a focus on growth and innovation...."
        },
        {
            id: 3,
            title: "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
            date: "Apr 03, 2024",
            excerpt: "FY24 brought us a 42% gain in our Capitalmind Focused portfolio, gently outperforming the Nifty's 29%. It's been a bit of a rollercoaster, especially these last few months, but that's part of the equity investing. It's like having a compass..."
        },
        {
            id: 4,
            title: "A Small CAD for India, Yet Again",
            date: "Mar 27, 2024",
            excerpt: "Yet again, India's Current Account Deficit is a mere 10 bn in the quarter (Dec 2023), less than levels more than a decade back, and less than 2017-18 too. Why not of gold? It's not really a current account import..."
        },
        {
            id: 5,
            title: "Poonawalla Fincorp: One right step at a time",
            date: "Mar 25, 2024",
            excerpt: "There are some winning patterns in investing that keep repeating. One such pattern is when a big company buys a struggling company, fixes old problems, and brings in new leaders to grow the business. This way has often led to..."
        },
        {
            id: 6,
            title: "CM Focused: Reducing our allocation to smallcaps & increasing cash",
            date: "Mar 18, 2024",
            excerpt: "In the last few days, we have seen increased volatility in the mid and small-cap sectors due to the current valuations, including extremes believed to be in 'overvalued zone'..."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Home</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Get started</h3>
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </div>
                    <p className="text-sm text-gray-600">
                        Read our getting started guide to get the most out of your Capitalmind subscription.
                    </p>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Community</h3>
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </div>
                    <p className="text-sm text-gray-600">
                        Join the conversation on our exclusive community on Slack for Capitalmind Premium subscribers
                    </p>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Visit website</h3>
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </div>
                    <p className="text-sm text-gray-600">
                        Keep up with our latest content on our website
                    </p>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Latest Posts</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {blogs.map(blog => (
                        <BlogCard key={blog.id} {...blog} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;