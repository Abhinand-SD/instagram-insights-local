import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUpload from './components/FileUpload';
import ProfileCard from './components/ProfileCard';
import StatsCard from './components/StatsCard';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState(null);
  const [dataType, setDataType] = useState(null);

  // Stats state
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    notFollowingBack: 0
  });

  const handleDataLoaded = (loadedData, type) => {
    if (type === 'zip_import') {
      try {
        console.log("Processing ZIP import data...");
        // Parse Followers
        const followersList = new Set();
        let followersArray = [];

        // Structure observed in followers_1.json: It is a direct array of objects.
        if (Array.isArray(loadedData.followers)) {
          followersArray = loadedData.followers;
        } else if (loadedData.followers && Array.isArray(loadedData.followers.relationships_followers)) {
          followersArray = loadedData.followers.relationships_followers;
        } else {
          console.warn("Unknown followers structure", loadedData.followers);
        }

        // Add to Set with lowercase normalization
        followersArray.forEach(item => {
          if (item.string_list_data && item.string_list_data[0] && item.string_list_data[0].value) {
            followersList.add(item.string_list_data[0].value.toLowerCase());
          }
        });

        // Parse Following
        let followingArray = [];
        // Structure observed in following.json: Object with 'relationships_following' array
        if (loadedData.following && Array.isArray(loadedData.following.relationships_following)) {
          followingArray = loadedData.following.relationships_following;
        } else if (Array.isArray(loadedData.following)) {
          followingArray = loadedData.following;
        } else {
          console.warn("Unknown following structure", loadedData.following);
        }

        // Filter Following who are NOT in Followers
        const notFollowingBack = followingArray.filter(item => {
          let username = null;

          // Try to get username from string_list_data value (common in followers)
          if (item.string_list_data && item.string_list_data[0] && item.string_list_data[0].value) {
            username = item.string_list_data[0].value;
          }
          // Fallback: Try 'title' field (common in following.json)
          else if (item.title) {
            username = item.title;
          }

          if (username) {
            // Check if this username exists in followers list (case insensitive)
            return !followersList.has(username.toLowerCase());
          }
          return false;
        });

        // Update Stats
        setStats({
          followers: followersList.size,
          following: followingArray.length,
          notFollowingBack: notFollowingBack.length
        });

        setData(notFollowingBack);
        setDataType('not_following_back');
      } catch (err) {
        console.error("Error processing ZIP data", err);
        alert(`Error processing extracted data: ${err.message}`);
      }
    } else {
      setData(loadedData);
      setDataType(type);
      // For single files, we don't have full stats, so we zero them out or handle differently
      // Since specific requirement is about zip upload experience, we focus on that.
      setStats({
        followers: 0,
        following: 0,
        notFollowingBack: loadedData.length
      });
    }
  };

  const handleReset = () => {
    setData(null);
    setDataType(null);
    setStats({ followers: 0, following: 0, notFollowingBack: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow px-4 py-8 max-w-6xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!data ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center min-h-[70vh]"
            >
              <div className="text-center mb-10">
                <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-500 to-red-500">
                  Instagram Insights
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto px-4">
                  Identify users who don't follow you back instantly. Secure client-side processing.
                </p>
              </div>
              <FileUpload onDataLoaded={handleDataLoaded} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-2xl font-bold text-white mb-2 text-center md:text-left">
                Users Not Following You Back
              </h2>

              {/* Stats Card */}
              {dataType === 'not_following_back' && (
                <StatsCard
                  followersCount={stats.followers}
                  followingCount={stats.following}
                  notFollowingBackCount={stats.notFollowingBack}
                  onReset={handleReset}
                />
              )}

              {/* Reset Button for non-zip uploads (fallback) */}
              {dataType !== 'not_following_back' && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleReset}
                    className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Upload New File
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data.map((item, index) => {
                  const username = item.string_list_data?.[0]?.value || item.title || "Unknown User";
                  const profileData = {
                    ...item,
                    string_list_data: [{
                      ...(item.string_list_data?.[0] || {}),
                      value: username,
                      timestamp: item.string_list_data?.[0]?.timestamp || Math.floor(Date.now() / 1000)
                    }]
                  };

                  return (
                    <ProfileCard
                      key={`${username}-${index}`}
                      profile={profileData}
                      index={index}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
