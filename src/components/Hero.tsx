import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { localizedPath } from '@/i18n/config';

interface HeroProps {
  locale: Locale;
  messages: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    testimonialsButton: string;
    guideButton: string;
    testimonialsStat: string;
    citiesStat: string;
    readersStat: string;
    videoFallback: string;
  };
}

export default function Hero({ locale, messages }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/hero-video.mp4" type="video/mp4" />
        {messages.videoFallback}
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/60 to-transparent z-10" />

      <div className="relative z-20 flex flex-col items-start justify-center h-full max-w-7xl mx-auto px-6 lg:px-8">
        <span className="text-africa-gold text-sm md:text-base font-semibold tracking-widest uppercase mb-4">
          {messages.eyebrow}
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 max-w-4xl leading-tight">
          {messages.title}
          <br />
          <span className="text-africa-gold">{messages.titleAccent}</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 font-light">
          {messages.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={localizedPath(locale, '/temoignages')} className="btn-primary text-center text-lg px-8 py-4">
            {messages.testimonialsButton}
          </Link>
          <Link
            href={localizedPath(locale, '/guide')}
            className="btn-outline text-center text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-russia-red"
          >
            {messages.guideButton}
          </Link>
        </div>

        <div className="flex gap-8 md:gap-12 mt-16">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-white">40+</p>
            <p className="text-white/70 text-sm">{messages.testimonialsStat}</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-white">12</p>
            <p className="text-white/70 text-sm">{messages.citiesStat}</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-white">15k</p>
            <p className="text-white/70 text-sm">{messages.readersStat}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/80 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
