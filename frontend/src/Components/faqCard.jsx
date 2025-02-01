import React, { useState } from 'react';

const FAQCard = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full  overflow-hidden p-6 border-b-[var(--strock)] border-b-2">
            {/* Question and Toggle Button */}
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h5 className="font-bold text-lg text-[var(--pt)]">{question}</h5>
                <button className="focus:outline-none">
                    <svg
                        className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="var(--strock)"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
            >
                <p className="text-[var(--st)] text-base font-semibold">{answer}</p>
            </div>
        </div>
    );
};

export default FAQCard;