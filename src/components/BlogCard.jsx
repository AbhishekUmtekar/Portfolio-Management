import React from 'react';

const BlogCard = ({ title, date, excerpt }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-6">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{excerpt}</p>
            </div>
            <div className="flex justify-between items-center">
                <button className="text-teal-600 font-medium hover:text-teal-700 text-sm">
                    Read full post
                </button>
                <span className="text-sm text-gray-500">{date}</span>
            </div>
        </div>
    );
};

export default BlogCard;