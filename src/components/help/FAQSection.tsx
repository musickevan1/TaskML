import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '../../data/helpContent';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="text-sm font-medium text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {openIndex === index && (
              <p className="mt-2 text-sm text-gray-500">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}