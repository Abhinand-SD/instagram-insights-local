import React from 'react';
import { Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-6 mt-12 border-t border-white/5 bg-slate-900/50 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">

                <div className="flex items-center gap-2 text-slate-300">
                    <span>Designed & Developed by</span>
                    <span className="font-semibold text-white">Abhinand SD</span>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://www.linkedin.com/in/abhinand-sd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin size={20} />
                    </a>
                    <div className="text-xs text-slate-500">
                        © {new Date().getFullYear()} All rights reserved.
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
