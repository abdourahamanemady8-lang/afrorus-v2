'use client';

import { useState } from 'react';

interface DownloadGuideButtonProps {
  messages: {
    emailPlaceholder: string;
    invalidEmail: string;
    error: string;
    loading: string;
    button: string;
    privacy: string;
    thanks: string;
    started: string;
    fallbackBefore: string;
    fallbackLink: string;
    fallbackAfter: string;
  };
}

export default function DownloadGuideButton({ messages }: DownloadGuideButtonProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !email.includes('@')) {
      setError(messages.invalidEmail);
      return;
    }

    setError('');
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      window.open('/guide-survie-afrorus.pdf', '_blank');
      setSubmitted(true);
    } catch {
      setError(messages.error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center max-w-md mx-auto">
        <span className="text-5xl mb-4 block">✅</span>
        <p className="text-green-800 font-bold text-xl mb-2">{messages.thanks}</p>
        <p className="text-green-700">{messages.started}</p>
        <p className="text-green-600 text-sm mt-4">
          {messages.fallbackBefore}{' '}
          <a href="/guide-survie-afrorus.pdf" className="underline font-medium">{messages.fallbackLink}</a>
          {messages.fallbackAfter}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder={messages.emailPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="flex-1 px-5 py-3.5 rounded-xl border border-light-gray focus:outline-none focus:ring-2 focus:ring-russia-red focus:border-transparent text-base"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? messages.loading : messages.button}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <p className="text-xs text-gray-500 mt-4 text-center">{messages.privacy}</p>
    </form>
  );
}
