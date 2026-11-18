import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Home,
  Info,
  LayoutDashboard,
  Settings,
  User,
  AlertCircle,
  Menu,
  ChevronRight,
} from "lucide-react";

import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from "primereact/button";

const getBasePath = () => {
  const path = window.location.pathname;

  // Case 1: /mode/:modeName/submode/:subModeName
  if (/^\/mode\/[^/]+\/submode\/[^/]+/.test(path)) {
    const match = path.match(/^\/mode\/[^/]+\/submode\/[^/]+/);
    return match ? match[0] : "/";
  }

  // Case 2: /mode/:modeName
  if (/^\/mode\/[^/]+/.test(path)) {
    const match = path.match(/^\/mode\/[^/]+/);
    return match ? match[0] : "/";
  }

  return "/";
};

const HomePage = () => (
  <div className="mode:flex mode:flex-col mode:items-center mode:justify-center mode:min-h-[70vh] mode:animate-in mode:fade-in mode:zoom-in mode:duration-500">
    <div className="mode:bg-blue-100 mode:p-6 mode:rounded-full mode:mb-6">
      <Home className="mode:w-16 mode:h-16 mode:text-blue-600" />
      <Button label="Submit" />
    </div>
    <h1 className="mode:text-4xl mode:font-bold mode:text-gray-800 mode:mb-4">
      Welcome Home
    </h1>
    <p className="mode:text-gray-500 mode:max-w-md mode:text-center">
      This is the root route ("/"). It's the starting point of your application.
    </p>
  </div>
);

const AboutPage = () => (
  <div className="mode:flex mode:flex-col mode:items-center mode:justify-center mode:min-h-[70vh] mode:animate-in mode:fade-in mode:zoom-in mode:duration-500">
    <div className="mode:bg-green-100 mode:p-6 mode:rounded-full mode:mb-6">
      <Info className="mode:w-16 mode:h-16 mode:text-green-600" />
    </div>
    <h1 className="mode:text-4xl mode:font-bold mode:text-gray-800 mode:mb-4">
      About Us
    </h1>
    <p className="mode:text-gray-500 mode:max-w-md mode:text-center">
      This is the "/about" route. Use this page to share information about your
      app or company.
    </p>
  </div>
);

const DashboardPage = () => (
  <div className="mode:flex mode:flex-col mode:min-h-[70vh] mode:animate-in mode:fade-in mode:duration-500">
    <div className="mode:flex mode:items-center mode:gap-3 mode:mb-8">
      <LayoutDashboard className="mode:w-8 mode:h-8 mode:text-indigo-600" />
      <h1 className="mode:text-3xl mode:font-bold mode:text-gray-800">
        Dashboard
      </h1>
    </div>
    <div className="mode:grid mode:grid-cols-1 md:mode:grid-cols-3 mode:gap-6">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="mode:bg-white mode:p-6 mode:rounded-xl mode:shadow-sm mode:border mode:border-gray-100 mode:flex mode:flex-col mode:gap-4 hover:mode:shadow-md mode:transition-shadow"
        >
          <div className="mode:w-12 mode:h-12 mode:bg-indigo-50 mode:rounded-lg mode:flex mode:items-center mode:justify-center">
            <span className="mode:text-indigo-600 mode:font-bold">{item}</span>
          </div>
          <div className="mode:h-4 mode:bg-gray-100 mode:rounded mode:w-3/4"></div>
          <div className="mode:h-4 mode:bg-gray-50 mode:rounded mode:w-1/2"></div>
        </div>
      ))}
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="mode:flex mode:flex-col mode:min-h-[70vh] mode:animate-in mode:fade-in mode:duration-500">
    <div className="mode:flex mode:items-center mode:gap-3 mode:mb-8">
      <Settings className="mode:w-8 mode:h-8 mode:text-slate-600" />
      <h1 className="mode:text-3xl mode:font-bold mode:text-gray-800">
        Settings
      </h1>
    </div>
    <div className="mode:bg-white mode:rounded-xl mode:shadow-sm mode:border mode:border-gray-100 mode:overflow-hidden mode:max-w-2xl">
      {["Notifications", "Privacy", "Appearance", "Language"].map(
        (setting, idx) => (
          <div
            key={setting}
            className={`mode:p-5 mode:flex mode:items-center mode:justify-between hover:mode:bg-slate-50 mode:cursor-pointer mode:transition-colors ${idx !== 0 ? "mode:border-t mode:border-gray-100" : ""}`}
          >
            <span className="mode:font-medium mode:text-gray-700">
              {setting}
            </span>
            <ChevronRight className="mode:w-5 mode:h-5 mode:text-gray-400" />
          </div>
        ),
      )}
    </div>
  </div>
);

const ProfilePage = () => (
  <div className="mode:flex mode:flex-col mode:items-center mode:justify-center mode:min-h-[70vh] mode:animate-in mode:fade-in mode:slide-in-from-bottom-8 mode:duration-500">
    <div className="mode:w-32 mode:h-32 mode:bg-gradient-to-tr mode:from-purple-500 mode:to-pink-500 mode:rounded-full mode:mb-6 mode:border-4 mode:border-white mode:shadow-lg mode:flex mode:items-center mode:justify-center">
      <User className="mode:w-16 mode:h-16 mode:text-white" />
    </div>
    <h1 className="mode:text-3xl mode:font-bold mode:text-gray-800 mode:mb-2">
      User Profile
    </h1>
    <p className="mode:text-gray-500 mode:mb-6">Software Engineer</p>
    <button className="mode:px-6 mode:py-2 mode:bg-gray-900 mode:text-white mode:rounded-lg hover:mode:bg-gray-800 mode:transition-colors">
      Edit Profile
    </button>
  </div>
);

const NotFoundPage = () => {
  const location = useLocation();
  return (
    <div className="mode:flex mode:flex-col mode:items-center mode:justify-center mode:min-h-[70vh] mode:animate-in mode:fade-in mode:zoom-in mode:duration-500">
      <div className="mode:bg-red-100 mode:p-6 mode:rounded-full mode:mb-6">
        <AlertCircle className="mode:w-16 mode:h-16 mode:text-red-600" />
      </div>
      <h1 className="mode:text-6xl mode:font-black mode:text-gray-800 mode:mb-4">
        404
      </h1>
      <h2 className="mode:text-2xl mode:font-semibold mode:text-gray-700 mode:mb-4">
        Page Not Found
      </h2>
      <p className="mode:text-gray-500 mode:max-w-md mode:text-center mode:mb-8">
        No match was found for{" "}
        <code className="mode:bg-gray-100 mode:px-2 mode:py-1 mode:rounded mode:text-red-500">
          {location.pathname}
        </code>
        .
      </p>
      <Link
        to="/"
        className="mode:px-6 mode:py-3 mode:bg-blue-600 mode:text-white mode:font-medium mode:rounded-lg hover:mode:bg-blue-700 mode:transition-colors mode:shadow-sm"
      >
        Return Home
      </Link>
    </div>
  );
};

const Navigation = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: any;
  setMobileMenuOpen: any;
}) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/settings", label: "Settings", icon: Settings },
    { path: "/about", label: "About", icon: Info },
    // Adding a dummy broken link to test 404
    { path: "/broken-link-test", label: "404 Test", icon: AlertCircle },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="mode:fixed mode:inset-0 mode:bg-black/20 mode:z-20 lg:mode:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        mode:fixed lg:mode:static mode:inset-y-0 mode:left-0 mode:z-30
        mode:w-64 mode:bg-white mode:border-r mode:border-gray-200 mode:flex mode:flex-col mode:transition-transform mode:duration-300 mode:ease-in-out
        ${mobileMenuOpen ? "mode:translate-x-0" : "mode:-translate-x-full lg:mode:translate-x-0"}
      `}
      >
        <div className="mode:h-16 mode:flex mode:items-center mode:px-6 mode:border-b mode:border-gray-100">
          <div className="mode:w-8 mode:h-8 mode:bg-blue-600 mode:rounded-lg mode:flex mode:items-center mode:justify-center mode:mr-3">
            <span className="mode:text-white mode:font-bold mode:text-xl mode:leading-none">
              R
            </span>
          </div>
          <span className="mode:font-bold mode:text-xl mode:text-gray-800 mode:tracking-tight">
            RouterTest
          </span>
        </div>

        <div className="mode:flex-1 mode:overflow-y-auto mode:py-6 mode:px-4 mode:flex mode:flex-col mode:gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  mode:flex mode:items-center mode:gap-3 mode:px-4 mode:py-3 mode:rounded-xl mode:transition-all mode:duration-200
                  ${
                    isActive
                      ? "mode:bg-blue-50 mode:text-blue-700 mode:font-semibold mode:shadow-sm"
                      : "mode:text-gray-600 hover:mode:bg-gray-50 hover:mode:text-gray-900"
                  }
                `}
              >
                <Icon
                  className={`mode:w-5 mode:h-5 ${isActive ? "mode:text-blue-600" : "mode:text-gray-400"}`}
                />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mode:p-4 mode:border-t mode:border-gray-100">
          <div className="mode:text-xs mode:text-center mode:text-gray-400">
            react-router-dom v6 setup
          </div>
        </div>
      </aside>
    </>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <PrimeReactProvider>
      <div data-exp-root>
        <Router basename={getBasePath()}>
          <div className="mode:flex mode:h-screen mode:bg-gray-50 mode:font-sans mode:overflow-hidden">
            <Navigation
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Main Content Area */}
            <div className="mode:flex-1 mode:flex mode:flex-col mode:min-w-0 mode:overflow-hidden">
              {/* Top Header */}
              <header className="mode:h-16 mode:bg-white mode:border-b mode:border-gray-200 mode:flex mode:items-center mode:justify-between mode:px-4 lg:mode:px-8 mode:shrink-0">
                <div className="mode:flex mode:items-center lg:mode:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="mode:p-2 mode:-ml-2 mode:mr-2 mode:text-gray-600 hover:mode:bg-gray-100 mode:rounded-lg"
                  >
                    <Menu className="mode:w-6 mode:h-6" />
                  </button>
                  <span className="mode:font-bold mode:text-lg mode:text-gray-800">
                    App Preview
                  </span>
                </div>

                {/* Desktop breadcrumb */}
                <div className="mode:hidden lg:mode:flex mode:items-center mode:text-sm mode:font-medium mode:text-gray-500">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <span>
                          Dashboard /{" "}
                          <span className="mode:text-gray-900">Home</span>
                        </span>
                      }
                    />
                    <Route
                      path="/about"
                      element={
                        <span>
                          Information /{" "}
                          <span className="mode:text-gray-900">About</span>
                        </span>
                      }
                    />
                    <Route
                      path="/dashboard"
                      element={
                        <span>
                          Overview /{" "}
                          <span className="mode:text-gray-900">Dashboard</span>
                        </span>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <span>
                          Preferences /{" "}
                          <span className="mode:text-gray-900">Settings</span>
                        </span>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <span>
                          Account /{" "}
                          <span className="mode:text-gray-900">Profile</span>
                        </span>
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <span>
                          Error /{" "}
                          <span className="mode:text-red-600">Not Found</span>
                        </span>
                      }
                    />
                  </Routes>
                </div>

                <div className="mode:w-8 mode:h-8 mode:rounded-full mode:bg-indigo-100 mode:flex mode:items-center mode:justify-center mode:border mode:border-indigo-200">
                  <User className="mode:w-4 mode:h-4 mode:text-indigo-600" />
                </div>
              </header>

              {/* Page Content Scrollable Area */}
              <main className="mode:flex-1 mode:overflow-y-auto mode:p-4 md:mode:p-8">
                <div className="mode:max-w-5xl mode:mx-auto">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </Router>
      </div>
    </PrimeReactProvider>
  );
}
