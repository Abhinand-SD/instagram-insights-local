import React, { useState } from 'react';
import { ExternalLink, UserMinus } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileCard = ({ profile, index }) => {
    // Safe access to nested data
    const data = profile.string_list_data?.[0] || {};
    const username = data.value;
    const href = data.href;
    const timestamp = data.timestamp;

    const [imageError, setImageError] = useState(false);

    const formatDate = (ts) => {
        if (!ts) return 'Unknown date';
        return new Date(ts * 1000).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="glass-card p-4 flex flex-col items-center gap-4 group"
        >
            <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-900">
                    {imageError ? (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500 text-2xl font-bold uppercase">
                            {username?.slice(0, 2) || "??"}
                        </div>
                    ) : (
                        <img
                            src={`https://unavatar.io/instagram/${username}`}
                            alt={username}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={() => setImageError(true)}
                            loading="lazy"
                        />
                    )}
                </div>
            </div>

            <div className="text-center w-full">
                <h3 className="text-lg font-bold text-white truncate max-w-full" title={username}>
                    @{username}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                    Followed on: {formatDate(timestamp)}
                </p>
            </div>

            <a
                href={href || `https://www.instagram.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 flex items-center justify-center gap-2 bg-slate-700 hover:bg-red-500/80 text-white py-2 px-4 rounded-lg transition-all duration-300 font-medium text-sm group-hover:shadow-lg hover:shadow-red-500/20"
            >
                <UserMinus size={16} />
                <span>Unfollow</span>
            </a>
        </motion.div>
    );
};

export default ProfileCard;
