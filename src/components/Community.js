import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import API from '../api/api';
import { FaThumbsUp, FaRegThumbsUp, FaHeart, FaRegHeart, FaSurprise, FaComment, FaShare, FaMapMarkerAlt, FaGlobeAsia, FaTrophy, FaMedal, FaCrown, FaFire, FaPlane, FaCamera, FaImage, FaSmile, FaEllipsisH, FaPaperPlane, FaUserPlus, FaBookmark, FaRegBookmark, FaUsers } from 'react-icons/fa';
import './Community.css';

const mockUsers = [
  { name: 'Aarav Sharma', avatar: 'AS', states: 18, countries: 12, destinations: 87, badge: 'Adventurer', mutual: 4, color: '#3b82f6' },
  { name: 'Meera Patel', avatar: 'MP', states: 24, countries: 8, destinations: 142, badge: 'Wanderer', mutual: 7, color: '#8b5cf6' },
  { name: 'Rohan Das', avatar: 'RD', states: 12, countries: 22, destinations: 65, badge: 'Explorer', mutual: 2, color: '#06b6d4' },
  { name: 'Ananya Iyer', avatar: 'AI', states: 28, countries: 5, destinations: 210, badge: 'All India', mutual: 11, color: '#10b981' },
  { name: 'Vikram Singh', avatar: 'VS', states: 15, countries: 18, destinations: 95, badge: 'Explorer', mutual: 3, color: '#f59e0b' },
  { name: 'Kavya Nair', avatar: 'KN', states: 9, countries: 3, destinations: 45, badge: 'First Step', mutual: 1, color: '#ec4899' },
];

const stories = [
  { name: 'Aarav', avatar: 'AS', place: 'Ladakh', color: '#3b82f6' },
  { name: 'Meera', avatar: 'MP', place: 'Munnar', color: '#8b5cf6' },
  { name: 'Rohan', avatar: 'RD', place: 'Tokyo', color: '#06b6d4' },
  { name: 'Ananya', avatar: 'AI', place: 'Hampi', color: '#10b981' },
  { name: 'Vikram', avatar: 'VS', place: 'Goa', color: '#f59e0b' },
  { name: 'Kavya', avatar: 'KN', place: 'Kerala', color: '#ec4899' },
];

const mockPosts = [
  {
    id: 1, user: 'Ananya Iyer', avatar: 'AI', color: '#10b981', badge: 'All India',
    time: '2 hours ago', location: 'Meghalaya',
    text: 'ALL 28 STATES DONE! 🎉 This journey took 4 years. Meghalaya was my final state — the living root bridges of Cherrapunji blew my mind. Every single state has taught me something. India is truly incredible.',
    reactions: { like: 89, love: 34, wow: 12 }, comments: 28, shares: 8,
    commentsList: [
      { user: 'Aarav Sharma', avatar: 'AS', text: 'Incredible achievement! Which state was your favorite?', time: '1h', likes: 5 },
      { user: 'Meera Patel', avatar: 'MP', text: 'Living root bridges are magical! Congratulations! 🎉', time: '45m', likes: 3 },
    ]
  },
  {
    id: 2, user: 'Rohan Das', avatar: 'RD', color: '#06b6d4', badge: 'Explorer',
    time: '5 hours ago', location: 'Kyoto, Japan',
    text: 'Cherry blossom season in Kyoto 🌸 Country #22 on my world map! The temples wrapped in pink petals are something else. Next stop: Osaka for street food.',
    reactions: { like: 56, love: 22, wow: 8 }, comments: 12, shares: 4,
    commentsList: [
      { user: 'Vikram Singh', avatar: 'VS', text: 'Japan is on my list! How was the food?', time: '3h', likes: 2 },
    ]
  },
  {
    id: 3, user: 'Aarav Sharma', avatar: 'AS', color: '#3b82f6', badge: 'Adventurer',
    time: '1 day ago', location: 'Pangong Lake, Ladakh',
    text: 'Finally made it to Pangong Lake! The color of the water changes every hour — turquoise to deep blue to emerald. -5°C but absolutely worth every shiver. State #18 ✅',
    reactions: { like: 42, love: 18, wow: 15 }, comments: 9, shares: 6,
    commentsList: []
  },
  {
    id: 4, user: 'Vikram Singh', avatar: 'VS', color: '#f59e0b', badge: 'Explorer',
    time: '2 days ago', location: null,
    text: 'Planning a 15-day road trip through the Seven Sisters (Northeast India) next month! 🚗 Assam → Meghalaya → Nagaland → Manipur → Mizoram → Tripura → Arunachal Pradesh. Anyone done this route? Drop your tips below! 👇',
    reactions: { like: 24, love: 5, wow: 3 }, comments: 15, shares: 2,
    commentsList: [
      { user: 'Ananya Iyer', avatar: 'AI', text: 'Done all 7! DM me — I have a full itinerary to share.', time: '1d', likes: 8 },
      { user: 'Kavya Nair', avatar: 'KN', text: 'Arunachal needs Inner Line Permit. Apply early!', time: '1d', likes: 4 },
    ]
  },
  {
    id: 5, user: 'Meera Patel', avatar: 'MP', color: '#8b5cf6', badge: 'Wanderer',
    time: '3 days ago', location: 'Rameswaram, Tamil Nadu',
    text: 'Completed all top destinations in Tamil Nadu! Mahabalipuram, Ooty, Rameswaram, Kodaikanal, Pondicherry — each one a different world. 24 states down. 4 more to go. The South never disappoints. 🏛️',
    reactions: { like: 65, love: 28, wow: 4 }, comments: 16, shares: 3,
    commentsList: []
  },
];

const badgeColors = { 'First Step': '#94a3b8', 'Explorer': '#3b82f6', 'Adventurer': '#8b5cf6', 'Wanderer': '#f59e0b', 'Nomad': '#ec4899', 'All India': '#10b981' };

export default function Community() {
  const [user, setUser] = useState({ name: 'Explorer' });
  const [myStats, setMyStats] = useState({ states: 0, countries: 0, destinations: 0 });
  const [reactions, setReactions] = useState({});
  const [saved, setSaved] = useState({});
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [postText, setPostText] = useState('');

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem('user')); if (s?.name) setUser(s); } catch {}
    async function fetch() {
      try {
        const [selRes, visitRes] = await Promise.all([API.get('/api/user/selected'), API.get('/api/user/visited-destinations')]);
        const locs = selRes.data.selectedLocations || [];
        setMyStats({ states: locs.filter(l => !l.type || l.type !== 'country').length, countries: locs.filter(l => l.type === 'country').length, destinations: (visitRes.data.visitedDestinations || []).length });
      } catch {}
    }
    fetch();
  }, []);

  const getInitials = (n) => n.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const toggleReaction = (postId, type) => {
    setReactions(prev => {
      const current = prev[postId];
      if (current === type) return { ...prev, [postId]: null };
      return { ...prev, [postId]: type };
    });
  };
  const toggleSave = (postId) => setSaved(prev => ({ ...prev, [postId]: !prev[postId] }));
  const toggleComments = (postId) => setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));

  return (
    <Layout>
      <div className="fb-page">
        <div className="fb-layout">
          {/* LEFT SIDEBAR */}
          <aside className="fb-left">
            <div className="fb-profile-mini">
              <div className="fb-avatar-me">{getInitials(user.name)}</div>
              <span className="fb-my-name">{user.name}</span>
            </div>
            <nav className="fb-shortcuts">
              <a href="/dashboard" className="fb-sc"><FaMapMarkerAlt /> India Map</a>
              <a href="/worldmap" className="fb-sc"><FaGlobeAsia /> World Map</a>
              <a href="/journal" className="fb-sc"><FaCamera /> Journal</a>
              <a href="/statistics" className="fb-sc"><FaTrophy /> My Stats</a>
              <a href="/planner" className="fb-sc"><FaPlane /> Trip Planner</a>
              <a href="/community" className="fb-sc active"><FaUsers /> Community</a>
            </nav>
            <div className="fb-left-footer">
              StampYourMap &copy; {new Date().getFullYear()}
            </div>
          </aside>

          {/* CENTER FEED */}
          <main className="fb-center">
            {/* Stories */}
            <div className="fb-stories">
              <div className="fb-story fb-story-create">
                <div className="fb-story-add">+</div>
                <span>Create Story</span>
              </div>
              {stories.map((s, i) => (
                <div key={i} className="fb-story" style={{ '--ring': s.color }}>
                  <div className="fb-story-avatar" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)` }}>{s.avatar}</div>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>

            {/* Post Composer */}
            <div className="fb-composer">
              <div className="fb-composer-top">
                <div className="fb-avatar-sm">{getInitials(user.name)}</div>
                <input
                  className="fb-composer-input"
                  placeholder={`What's on your travel mind, ${user.name.split(' ')[0]}?`}
                  value={postText}
                  onChange={e => setPostText(e.target.value)}
                />
              </div>
              <div className="fb-composer-actions">
                <button className="fb-ca"><FaImage style={{ color: '#10b981' }} /> Photo</button>
                <button className="fb-ca"><FaMapMarkerAlt style={{ color: '#f43f5e' }} /> Check In</button>
                <button className="fb-ca"><FaSmile style={{ color: '#f59e0b' }} /> Feeling</button>
              </div>
            </div>

            {/* Posts Feed */}
            {mockPosts.map((post, i) => {
              const myReaction = reactions[post.id];
              const totalReactions = post.reactions.like + post.reactions.love + post.reactions.wow + (myReaction ? 1 : 0);
              return (
                <div key={post.id} className="fb-post" style={{ '--i': i }}>
                  {/* Post Header */}
                  <div className="fb-post-header">
                    <div className="fb-post-user">
                      <div className="fb-post-avatar" style={{ background: `linear-gradient(135deg, ${post.color}, ${post.color}cc)` }}>{post.avatar}</div>
                      <div>
                        <div className="fb-post-name">
                          {post.user}
                          <span className="fb-post-badge" style={{ background: `${badgeColors[post.badge]}18`, color: badgeColors[post.badge] }}>{post.badge}</span>
                        </div>
                        <div className="fb-post-meta">
                          {post.time}
                          {post.location && <> · <FaMapMarkerAlt /> {post.location}</>}
                          · <FaGlobeAsia />
                        </div>
                      </div>
                    </div>
                    <button className="fb-post-more"><FaEllipsisH /></button>
                  </div>

                  {/* Post Content */}
                  <p className="fb-post-text">{post.text}</p>

                  {/* Reactions Summary */}
                  <div className="fb-post-stats">
                    <div className="fb-reaction-icons">
                      <span className="fb-ri" style={{ background: '#3b82f6' }}><FaThumbsUp /></span>
                      <span className="fb-ri" style={{ background: '#f43f5e' }}><FaHeart /></span>
                      <span className="fb-ri" style={{ background: '#f59e0b' }}><FaSurprise /></span>
                      <span className="fb-reaction-count">{totalReactions}</span>
                    </div>
                    <div className="fb-post-counts">
                      <span onClick={() => toggleComments(post.id)}>{post.comments + (post.commentsList?.length || 0)} comments</span>
                      <span>{post.shares} shares</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="fb-post-actions">
                    <button className={`fb-action-btn ${myReaction === 'like' ? 'active-like' : ''}`} onClick={() => toggleReaction(post.id, 'like')}>
                      {myReaction === 'like' ? <FaThumbsUp /> : <FaRegThumbsUp />} Like
                    </button>
                    <button className="fb-action-btn" onClick={() => toggleComments(post.id)}>
                      <FaComment /> Comment
                    </button>
                    <button className="fb-action-btn"><FaShare /> Share</button>
                    <button className={`fb-action-btn ${saved[post.id] ? 'active-save' : ''}`} onClick={() => toggleSave(post.id)}>
                      {saved[post.id] ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                  </div>

                  {/* Comments Section */}
                  {showComments[post.id] && (
                    <div className="fb-comments">
                      {post.commentsList.map((c, j) => (
                        <div key={j} className="fb-comment">
                          <div className="fb-comment-avatar">{c.avatar}</div>
                          <div className="fb-comment-body">
                            <div className="fb-comment-bubble">
                              <span className="fb-comment-name">{c.user}</span>
                              <span className="fb-comment-text">{c.text}</span>
                            </div>
                            <div className="fb-comment-meta">
                              <span>{c.time}</span>
                              <button>Like ({c.likes})</button>
                              <button>Reply</button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* Comment Input */}
                      <div className="fb-comment-input">
                        <div className="fb-comment-avatar">{getInitials(user.name)}</div>
                        <div className="fb-comment-field">
                          <input
                            placeholder="Write a comment..."
                            value={newComment[post.id] || ''}
                            onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                          />
                          <button className="fb-send"><FaPaperPlane /></button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="fb-right">
            {/* My Travel Card */}
            <div className="fb-my-card">
              <div className="fb-my-card-header">Your Travel Card</div>
              <div className="fb-my-card-stats">
                <div className="fb-mcs"><strong>{myStats.states}</strong><span>States</span></div>
                <div className="fb-mcs"><strong>{myStats.countries}</strong><span>Countries</span></div>
                <div className="fb-mcs"><strong>{myStats.destinations}</strong><span>Dest.</span></div>
              </div>
            </div>

            {/* Trending */}
            <div className="fb-sidebar-card">
              <h3><FaFire style={{ color: '#f59e0b' }} /> Trending Destinations</h3>
              {['Ladakh', 'Goa', 'Manali', 'Kerala', 'Hampi'].map((p, i) => (
                <div key={i} className="fb-trending-item">
                  <span className="fb-tr-rank">#{i + 1}</span>
                  <span className="fb-tr-name">{p}</span>
                  <FaFire className="fb-tr-fire" />
                </div>
              ))}
            </div>

            {/* People You May Know */}
            <div className="fb-sidebar-card">
              <h3><FaUserPlus /> People You May Know</h3>
              {mockUsers.slice(0, 4).map((t, i) => (
                <div key={i} className="fb-suggest">
                  <div className="fb-suggest-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)` }}>{t.avatar}</div>
                  <div className="fb-suggest-info">
                    <span className="fb-suggest-name">{t.name}</span>
                    <span className="fb-suggest-mutual">{t.mutual} mutual connections</span>
                  </div>
                  <button className="fb-suggest-btn"><FaUserPlus /></button>
                </div>
              ))}
            </div>

            {/* Leaderboard Preview */}
            <div className="fb-sidebar-card">
              <h3><FaTrophy style={{ color: '#f59e0b' }} /> Top Travelers</h3>
              {mockUsers.sort((a, b) => b.states - a.states).slice(0, 3).map((t, i) => (
                <div key={i} className="fb-lb-item">
                  <span className="fb-lb-pos">{i === 0 ? <FaCrown style={{ color: '#fbbf24' }} /> : `#${i + 1}`}</span>
                  <div className="fb-lb-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)` }}>{t.avatar}</div>
                  <span className="fb-lb-name">{t.name.split(' ')[0]}</span>
                  <span className="fb-lb-score">{t.states}s / {t.countries}c</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
