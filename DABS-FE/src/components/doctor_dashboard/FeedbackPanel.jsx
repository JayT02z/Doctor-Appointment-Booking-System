import React from 'react';
import { ratingStringToNumber } from '../../utils/format';
import { Star } from 'lucide-react';

const FeedbackPanel = ({ feedback }) => {
    if (!feedback) return (
        <div className="mt-2 p-4 rounded-lg bg-gray-50 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-center h-20 text-gray-400">
                <p className="text-sm italic">No feedback available</p>
            </div>
        </div>
    );

    const rating = ratingStringToNumber(feedback.rating);

    return (
        <div className="mt-2 p-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900">Patient Feedback</h3>
                    {feedback.rating && (
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    size={16}
                                    className={`${
                                        index < rating 
                                            ? 'fill-yellow-400 text-yellow-400' 
                                            : 'fill-gray-200 text-gray-200'
                                    }`}
                                />
                            ))}
                            <span className="ml-1 text-sm font-medium text-gray-600">
                                {rating}/5
                            </span>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {feedback.feedbackText || 'No comment provided.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPanel;