'use client';

import { useEffect, useState } from 'react';

interface QuoteItem {
  text: string;
  author: string;
  country: string;
  flag: string;
}

interface QuotesCarouselProps {
  messages: {
    title: string;
    previous: string;
    next: string;
    quoteLabel: string;
    items: QuoteItem[];
  };
}

export default function QuotesCarousel({ messages }: QuotesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((value) => (value + 1) % messages.items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.items.length]);

  const current = messages.items[currentIndex];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-russia-red/5 to-africa-gold/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-8">{messages.title}</h2>

        <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="transition-all duration-500 min-h-[200px] flex flex-col justify-center">
            <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-6">« {current.text} »</p>
            <div className="flex items-center justify-center gap-3">
              <img
                src={`https://flagsapi.com/${current.flag}/flat/64.png`}
                alt={current.country}
                className="w-10 h-7 inline-block rounded shadow-sm"
              />
              <div className="text-left">
                <p className="font-bold text-charcoal">{current.author}</p>
                <p className="text-sm text-gray-500">{current.country}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentIndex((value) => (value - 1 + messages.items.length) % messages.items.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"
            aria-label={messages.previous}
          >
            <svg className="w-6 h-6 text-russia-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentIndex((value) => (value + 1) % messages.items.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"
            aria-label={messages.next}
          >
            <svg className="w-6 h-6 text-russia-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {messages.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-russia-red scale-125' : 'bg-gray-300'
                }`}
                aria-label={`${messages.quoteLabel} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
