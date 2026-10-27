import { Outlet, NavLink, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xl font-bold text-brand-700"
          >
            <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#6272f5" />
              <path
                d="M16 7a2 2 0 0 1 1.5 3.33A5.5 5.5 0 0 1 21.5 15.5h.5a1 1 0 1 1 0 2h-.5v.5a5.5 5.5 0 0 1-1.5 3.79V23a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-1.21A5.5 5.5 0 0 1 10.5 18v-.5H10a1 1 0 1 1 0-2h.5a5.5 5.5 0 0 1 4-5.17A2 2 0 0 1 16 7z"
                fill="white"
              />
            </svg>
            IdeaPilot
          </button>
          <nav className="flex gap-1">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
