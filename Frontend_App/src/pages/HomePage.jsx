import React from "react";

const HomePage = () => {
    return (
        <>
            <section className="gradient-hero py-20 lg:py-16">
                <div className="max-w-[90vw] mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-stretch">
                        <div className="space-y-6 px-[20px] py-[10px] pb-[90px] leading-[1.2]">

                            <div>
                                <span className="px-4 py-2 rounded-full bg-[hsl(195,100%,95%)] text-[hsl(195,100%,45%)] text-sm font-medium">
                                    Track • Learn • Grow
                                </span>
                            </div>

                            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.4]">
                                Master Your Skills,
                                <span className="bg-gradient-to-br from-[hsl(195,100%,45%)] to-[hsl(195,100%,60%)] bg-clip-text text-transparent leading-[1.2]">
                                    {" "}One Step
                                </span>{" "}
                                at a Time
                            </h1>

                            <p className="text-lg text-muted-foreground max-w-lg mt-3 leading-[1.6]">
                                Transform your learning journey with SkillTracker. Visualize progress,
                                stay motivated, and achieve your goals with powerful analytics
                                and intuitive tracking.
                            </p>

                            <div className="flex items-center flex-wrap gap-4 mt-4">
                                <a href="/login">
                                    <button className="inline-flex items-center justify-center gap-2 font-medium bg-[linear-gradient(135deg,hsl(195,100%,45%),hsl(195,100%,60%))] text-white hover:opacity-90 h-14 px-10 rounded-lg shadow-soft group">
                                        Get Started
                                        <svg
                                            xmlns="http:"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </button>
                                </a>
                            </div>
                        </div>

                        <div className="relative flex justify-end">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>

                            <img
                                src="hero-banner.jpg"
                                alt="Learning workspace"
                                className="relative rounded-2xl shadow-strong w-full h-[65vh] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                        What you get
                    </h2>

                    <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-center">
                        Everything you need to plan, practice and track your learning in one place.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-center">

                        {[
                            ["Skill Tracking", "Add skills, set targets and track hours spent."],
                            ["Session Logs", "Log study sessions and attach short notes."],
                            ["Progress Analytics", "Charts and trends to help you stay on track."],
                            ["Goals & Reminders", "Set target dates and get reminders to practice."],
                        ].map(([title, desc], i) => (
                            <div
                                key={i}
                                className="
            w-full 
            p-10
            h-[260px]
            rounded-2xl
            bg-gradient-to-br from-teal-100 via-cyan-100 to-sky-100
            text-slate-800
            border border-cyan-200
            shadow-sm
            hover:shadow-2xl
            hover:-translate-y-2
            hover:scale-[1.05]
            transition-all duration-300
            cursor-pointer
            flex flex-col justify-between
          "
                            >
                                <h3 className="font-semibold text-xl">{title}</h3>
                                <p className="text-[15px] opacity-80 leading-relaxed mt-3">{desc}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            <section className="py-16 bg-slate-100">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How it works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            ["1", "Add a Skill", "Create a skill, set target hours and a completion date.", "bg-teal-200", "text-teal-900"],
                            ["2", "Log Sessions", "Quickly add study sessions with notes.", "bg-blue-200", "text-blue-900"],
                            ["3", "Watch Progress", "See charts, milestones and how close you are to your goal.", "bg-purple-200", "text-purple-900"],
                        ].map(([num, title, desc, bgColor, textColor], i) => (
                            <div
                                key={i}
                                className={`
            p-8 rounded-xl ${bgColor} ${textColor} 
            border border-slate-200 shadow-md
            transition-all duration-300 hover:shadow-lg hover:-translate-y-1
            text-center
            flex flex-col justify-between
          `}
                            >
                                <div
                                    className="w-14 h-14 rounded-full bg-white text-gray-800 mx-auto flex items-center justify-center font-bold text-lg"
                                >
                                    {num}
                                </div>

                                <h3 className="mt-5 font-semibold text-lg">{title}</h3>
                                <p className="text-sm mt-2 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-slate-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl text-center font-bold text-gray-900 mb-8">What users say</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            ["Simple, focused and exactly what I needed to keep a consistent practice habit.", "Priya, Data Analyst", "bg-teal-100", "text-teal-900"],
                            ["The progress charts made my weekly wins visible — huge motivation.", "Rahul, Student", "bg-blue-100", "text-blue-900"],
                            ["Logging sessions is so quick now — no excuses.", "Ananya, Designer", "bg-purple-100", "text-purple-900"],
                        ].map(([quote, name, bgColor, textColor], i) => (
                            <blockquote
                                key={i}
                                className={`
            p-8 rounded-xl ${bgColor} ${textColor} 
            border border-slate-200 shadow-md
            transition-all duration-300 hover:shadow-lg hover:-translate-y-1
          `}
                            >
                                <p className="leading-relaxed">“{quote}”</p>
                                <cite className="block mt-4 text-sm text-gray-700">— {name}</cite>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-[#33cbfd] text-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold">Ready to track your learning?</h2>
                    <p className="mt-2 text-lg opacity-90 max-w-2xl mx-auto">
                        Sign up, add a skill and start logging sessions in under a minute.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <a href="/signup" className="px-6 py-3 bg-white text-teal-700 rounded-lg font-medium hover:bg-orange-400 hover:text-white">
                            Create account
                        </a>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">

                <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img src="/skill_logo.png" alt="Skill Tracker" className="w-10 h-10 rounded" />
                            <div>
                                <h3 className="font-semibold text-white">Skill Tracker</h3>
                                <p className="text-sm text-gray-400">Track. Learn. Grow.</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm text-gray-400">
                            A personal growth dashboard designed to help you stay consistent, focused, and accountable.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a className="hover:text-white transition" href="/features">Features</a></li>
                            <li><a className="hover:text-white transition" href="/pricing">Pricing</a></li>
                            <li><a className="hover:text-white transition" href="/analytics">Analytics</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a className="hover:text-white transition" href="/about">About</a></li>
                            <li><a className="hover:text-white transition" href="/contact">Contact</a></li>
                            <li><a className="hover:text-white transition" href="/careers">Careers</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a className="hover:text-white transition" href="/blog">Blog</a></li>
                            <li><a className="hover:text-white transition" href="/docs">Help Center</a></li>
                            <li><a className="hover:text-white transition" href="/changelog">Changelog</a></li>
                            <li><a className="hover:text-white transition" href="/status">Status</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a className="hover:text-white transition" href="/privacy">Privacy Policy</a></li>
                            <li><a className="hover:text-white transition" href="/terms">Terms of Service</a></li>
                            <li><a className="hover:text-white transition" href="/cookies">Cookie Policy</a></li>
                        </ul>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto px-6 pb-12">
                    <div className="border-t border-gray-800 pt-10 flex flex-col items-center gap-6">

                        <div className="w-full max-w-md">
                            <p className="text-sm mb-3 text-gray-400 text-center">Stay updated with product improvements</p>
                            <div className="flex gap-3 justify-center">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded text-sm text-gray-300 focus:ring-2 focus:ring-gray-700 outline-none"
                                />
                                <button className="px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded hover:bg-orange-400 hover:text-white transition">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">

                            <a
                                href="#"
                                className="flex flex-col items-center hover:text-pink-800 transition"
                                aria-label="Instagram"
                            >
                                <svg
                                    xmlns="http:"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3z"
                                    />
                                    <circle cx="12" cy="12" r="3.75" />
                                    <circle cx="17" cy="7" r="1" />
                                </svg>
                                Instagram
                            </a>

                            <a
                                href="#"
                                className="hover:text-blue-800 transition flex flex-col items-center"
                                aria-label="LinkedIn"
                            >
                                <svg
                                    xmlns="http:"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path d="M4.98 3.5A2.5 2.5 0 0 1 7.48 6v12a2.5 2.5 0 1 1-5 0V6a2.5 2.5 0 0 1 2.5-2.5zM9 9h3.8v1.71h.05c.53-.96 1.82-1.97 3.75-1.97 4 0 4.74 2.63 4.74 6.06V18H17v-2.96c0-1.41-.03-3.23-1.97-3.23-1.97 0-2.27 1.54-2.27 3.12V18H9V9z" />
                                </svg>
                                LinkedIn
                            </a>

                            <a
                                href="#"
                                className="hover:text-red-800 transition flex flex-col items-center"
                                aria-label="YouTube"
                            >
                                <svg
                                    xmlns="http:"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-7 h-7"
                                >
                                    <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.95C17.92 5.5 12 5.5 12 5.5s-5.92 0-7.86.55A2.75 2.75 0 0 0 2.2 8.001 28.7 28.7 0 0 0 1.5 12a28.7 28.7 0 0 0 .7 3.999 2.75 2.75 0 0 0 1.94 1.95C6.08 18.5 12 18.5 12 18.5s5.92 0 7.86-.55a2.75 2.75 0 0 0 1.94-1.95c.45-1.33.7-2.88.7-3.999s-.25-2.67-.7-3.999zM10 15.25v-6.5L15.5 12 10 15.25z" />
                                </svg>
                                YouTube
                            </a>

                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 py-6">
                    <div className="max-w-7xl mx-auto px-6 text-l font-semibold text-center text-gray-500">
                        © {new Date().getFullYear()} Skill Tracker — All rights reserved.
                    </div>
                </div>

            </footer>
        </>
    );
};

export default HomePage;
