import React, { useState } from 'react';
import '../styles/SeniorsProfiles.css';
const SeniorsProfiles = () => {
  const [expandedCards, setExpandedCards] = useState(new Set());

  const seniorsData = [
    {
      id: 1,
      name: "Bhaskar",
      title: "Pre final year student",
      experience: "3 years in mentoring juniors and leading college clubs.",
      expertise: ["Literature", "Creative Writing", "Mentoring"],
      Skills: "Python, Machine Learning, React.js",
      bio: "Passionate about helping young minds discover the beauty of literature. Available for mentoring and academic guidance.",
      email: "bhaskarbhaskr09@gmail.com",
      linkedin: "https://www.linkedin.com/in/bhaskara-88aa76322",
      avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFesFldH12gcg/profile-displayphoto-shrink_800_800/B4DZcI1agTGkAc-/0/1748199910428?e=1761782400&v=beta&t=mIa9OqOuKOJ59b6RrKqvK7O8wSu0Sw2hjtN-QA3GaCM",
      location: "Mysore",
      availability: "Available for guidance"
    },

    {
      id: 2,
      name: "Manasa H N",
      title: "Pre final year student",
      experience: "Active contributor in college literary and tech clubs with hands-on leadership experience.",
      expertise: ["Literature", "Creative Writing", "Mentoring"],
      Skills: "Java, Spring Boot, JDBC, UI/UX",
      bio: "Passionate about helping young minds discover the beauty of literature. Available for mentoring and academic guidance.",
      email: "manasa14102004@gmail.com",
      linkedin: "https://www.linkedin.com/in/manasa-h-n-0383bb331",
      avatar: "https://media.licdn.com/dms/image/v2/D4E03AQE2TTkAldGOCg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729087501866?e=1761782400&v=beta&t=0-kJuw8tajJOpbR0Mwxe9M_8_yLwYJXEuxIlTSD8w8k",
      location: "Mysore",
      availability: "Available for guidance"
    }
  ];

  const handleContact = (type, profile) => {
    if (type === 'email') {
      window.open(`mailto:${profile.email}?subject=Hello from ${profile.name}`);
    } else if (type === 'linkedin') {
      window.open(profile.linkedin, '_blank');
    }
  };

  const toggleCardExpansion = (cardId) => {
    const newExpandedCards = new Set(expandedCards);
    if (newExpandedCards.has(cardId)) {
      newExpandedCards.delete(cardId);
    } else {
      newExpandedCards.add(cardId);
    }
    setExpandedCards(newExpandedCards);
  };

  return (
    <div className="seniors-profiles">
      <div className="profiles-container">
        {/* Header Section */}
        <div className="profiles-header">
          <p className="profiles-subtitle">
            Connect with experienced professionals who are eager to share their knowledge and guide you on your journey.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="profiles-grid">
          {seniorsData.map((senior) => {
            const isExpanded = expandedCards.has(senior.id);
            return (
              <div key={senior.id} className="profile-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <img src={senior.avatar} alt={senior.name} className="avatar-img" />
                  </div>

                  <div className="profile-info">
                    <h3 className="profile-name">{senior.name}</h3>
                    <p className="profile-title">{senior.title}</p>
                    <p className="profile-experience"><b>Experience:</b> {senior.experience}</p>
                    <p className="profile-location">📍 {senior.location}</p>
                    <p className="profile-availability">{senior.availability}</p>
                    <p className="profile-skills"><b>Skills:</b> {senior.Skills}</p>
                  </div>
                </div>

                <div className="profile-expertise">
                  <h4>Expertise:</h4>
                  <div className="expertise-tags">
                    {senior.expertise.slice(0, 2).map((skill, index) => (
                      <span key={index} className="expertise-tag">{skill}</span>
                    ))}
                    {senior.expertise.length > 2 && !isExpanded && (
                      <span className="expertise-tag more-tag">+{senior.expertise.length - 2} more</span>
                    )}
                    {isExpanded && senior.expertise.slice(2).map((skill, index) => (
                      <span key={index + 2} className="expertise-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                {isExpanded && (
                  <div className="profile-bio">
                    <p>{senior.bio}</p>
                  </div>
                )}

                <div className="profile-actions">
                  <button 
                    className="contact-btn email-btn"
                    onClick={() => handleContact('email', senior)}
                  >
                    📧 Email
                  </button>
                  <button 
                    className="contact-btn linkedin-btn"
                    onClick={() => handleContact('linkedin', senior)}
                  >
                    💼 LinkedIn
                  </button>
                  <button 
                    className="contact-btn toggle-btn"
                    onClick={() => toggleCardExpansion(senior.id)}
                  >
                    {isExpanded ? '👆 See Less' : '👇 See More'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="profiles-cta">
          <h2>Ready to Connect?</h2>
          <p>Choose a mentor whose experience aligns with your goals and reach out to start your journey together.</p>
        </div>
      </div>
    </div>
  );
};

export default SeniorsProfiles;
