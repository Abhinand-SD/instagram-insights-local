import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserMinus, UserCheck, RefreshCw } from 'lucide-react';

const StatItem = ({ icon: Icon, label, value, color }) => (
    <div className="flex flex-col items-center p-3 rounded-xl bg-slate-800/50 border border-white/5 w-full">
        <div className={`p-2 rounded-lg ${color} bg-opacity-10 mb-2`}>
            <Icon size={20} className={color.replace('bg-', 'text-')} />
        </div>
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">{label}</span>
    </div>
);

const StatsCard = ({ followersCount, followingCount, notFollowingBackCount, onReset }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card mb-8 p-6 w-full max-w-4xl mx-auto"
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="grid grid-cols-3 gap-4 w-full md:w-auto flex-1">
                    <StatItem
                        icon={Users}
                        label="Followers"
                        value={followersCount}
                        color="bg-blue-500"
                    />
                    <StatItem
                        icon={UserCheck}
                        label="Following"
                        value={followingCount}
                        color="bg-green-500"
                    />
                    <StatItem
                        icon={UserMinus}
                        label="Not Back"
                        value={notFollowingBackCount}
                        color="bg-red-500"
                    />
                </div>

                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white transition-all font-medium whitespace-nowrap shadow-lg hover:shadow-xl active:scale-95 w-full md:w-auto justify-center"
                >
                    <RefreshCw size={18} />
                    <span>Upload New File</span>
                </button>

            </div>
        </motion.div>
    );
};

export default StatsCard;
