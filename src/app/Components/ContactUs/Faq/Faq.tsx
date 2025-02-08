'use client'
import React, { useState } from 'react';
import './Faq.scss';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FaqItem = {
  question: string;
  answer: string;
};

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    { question: 'How do I create an account?', answer: 'To create an account, go to the Sign-Up page and fill in the required information.' },
    { question: 'How do I post a job listing?', answer: 'You can post a job listing by clicking on "Post a Job" after logging in.' },
    { question: 'What are the subscription plans?', answer: 'We offer various subscription plans. Please visit our Pricing page for details.' },
    { question: 'How can I reset my password?', answer: 'To reset your password, click "Forgot Password" on the login page.' },
    { question: 'How do I delete my account?', answer: 'You can delete your account by navigating to the Account Settings page.' },
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <div className="faq__wrapper">
        <h2>
          Frequently Asked <span>Questions</span>
        </h2>
        <div className="faq--section">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq--item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq--header">
                <div className="faq--question">{faq.question}</div>
                <div className="faq--icon">
                  {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              {activeIndex === index && <div className="faq--answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
