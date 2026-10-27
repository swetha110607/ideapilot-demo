import { useNavigate } from 'react-router-dom';

const FEATURES = [
  {
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: 'AI-Powered Plans',
    description:
      'Gemini AI generates structured, actionable project plans tailored to your specific idea.',
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    title: 'Step-by-Step Roadmap',
    description:
      'Get 4–6 concrete implementation steps, a recommended tech stack, and difficulty assessment.',
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: 'Save & Revisit',
    description:
      'All your plans are saved automatically. Browse your history and revisit plans anytime.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <span className="flex items-center gap-2 text-xl font-bold text-brand-700">
            <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#6272f5" />
              <path
                d="M16 7a2 2 0 0 1 1.5 3.33A5.5 5.5 0 0 1 21.5 15.5h.5a1 1 0 1 1 0 2h-.5v.5a5.5 5.5 0 0 1-1.5 3.79V23a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-1.21A5.5 5.5 0 0 1 10.5 18v-.5H10a1 1 0 1 1 0-2h.5a5.5 5.5 0 0 1 4-5.17A2 2 0 0 1 16 7z"
                fill="white"
              />
            </svg>
            IdeaPilot
          </span>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Open App
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 to-brand-800 px-4 py-24 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
            <span className="h-2 w-2 animate-pulse-slow rounded-full bg-green-400" />
            Powered by Gemini AI
          </div>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Turn Ideas into
            <br />
            <span className="text-brand-300">Action Plans</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-brand-200">
            Stop second-guessing your next project. IdeaPilot uses Gemini AI to transform your raw
            idea into a structured, actionable plan — complete with tech stack, milestones, and risk
            analysis.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary px-8 py-3.5 text-base"
            >
              Plan Your Idea — Free
            </button>
            <button
              onClick={() =>
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="rounded-lg border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything you need to get started
            </h2>
            <p className="mt-3 text-gray-500">From idea to execution plan in under a minute.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="card text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '1',
                label: 'Describe your idea',
                desc: 'Enter a title, select a category, and write a description.',
              },
              {
                step: '2',
                label: 'AI generates a plan',
                desc: 'Gemini AI analyzes your idea and creates a structured plan.',
              },
              {
                step: '3',
                label: 'Execute with confidence',
                desc: 'Follow the steps, tackle challenges, and build your project.',
              },
            ].map(({ step, label, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
                  {step}
                </span>
                <h3 className="mb-2 font-semibold text-gray-900">{label}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary mt-12 px-8 py-3.5 text-base"
          >
            Start Planning Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-4 py-8 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} IdeaPilot. Built with Gemini AI, React, and Tailwind CSS.
        </p>
        <p className="mt-1 text-xs text-gray-300">
          AI-generated plans may require expert verification. Shared demo data — no authentication.
        </p>
      </footer>
    </div>
  );
}
