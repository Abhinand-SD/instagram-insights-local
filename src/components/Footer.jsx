import React from 'react';
import { Linkedin, Github, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-6 mt-12 border-t border-white/5 bg-slate-900/50 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">

                <div className="flex items-center gap-1 text-xs text-slate-600">
                    <span className="text-xs text-slate-700">Designed & Developed by</span>
                    <span className="font-sm text-slate-600">Abhinand SD</span>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/abhinand-SD"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-300"
                        aria-label="GitHub Profile"
                    >
                        <Github size={18} />
                    </a>
                    <a
                        href="https://x.com/abhinand_sd_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-300"
                        aria-label="X (Twitter) Profile"
                    >
                        <Twitter size={18} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/abhinand-sd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-300"
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin size={18} />
                    </a>
                </div>

                <div className="text-xs text-slate-700">
                    © {new Date().getFullYear()} All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
