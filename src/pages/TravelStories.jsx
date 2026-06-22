import { useState } from "react";
import "./TravelStories.css";

const stories = [
  {
    country: "Japan",
    title: "Land of Tradition & Technology",
    video:
      "https://cdn.coverr.co/videos/coverr-tokyo-at-night-1560798293205?download=1080p",
    story:
      "Experience Tokyo nightlife, Kyoto temples, cherry blossoms and Mount Fuji.",
    visa: "Tourist Visa Required",
    flag: "🇯🇵",
  },
  {
    country: "Dubai",
    title: "City of the Future",
    video:
      "https://cdn.coverr.co/videos/coverr-dubai-skyline-1573991049363?download=1080p",
    story:
      "Luxury shopping, desert safaris and iconic architecture await.",
    visa: "Easy Tourist Visa",
    flag: "🇦🇪",
  },
  {
    country: "Switzerland",
    title: "Alpine Dreams",
    video:
      "https://cdn.coverr.co/videos/coverr-swiss-mountains-1573668817285?download=1080p",
    story:
      "Snow peaks, scenic trains and breathtaking alpine landscapes.",
    visa: "Schengen Visa",
    flag: "🇨🇭",
  },
];

export default function TravelStories() {
  const [active, setActive] = useState(stories[0]);

  return (
    <div className="travel-page">
      <h1 className="main-title">Explore Travel Stories</h1>

      <div className="country-list">
        {stories.map((item) => (
          <button
            key={item.country}
            className={
              active.country === item.country
                ? "country-btn active"
                : "country-btn"
            }
            onClick={() => setActive(item)}
          >
            {item.flag} {item.country}
          </button>
        ))}
      </div>

      {/* key prop causes React to remount the div on country change,
          which re-triggers the CSS fadeInUp animation */}
      <div key={active.country} className="story-container">
        <div className="video-wrapper">
          <video src={active.video} autoPlay muted loop playsInline />
        </div>

        <div className="story-content">
          <h2>{active.title}</h2>
          <p>{active.story}</p>

          <div className="visa-card">
            <span>🛂 Visa Info</span>
            <p>{active.visa}</p>
          </div>

          <div className="highlights">
            <div>🌍 Culture</div>
            <div>🍜 Food</div>
            <div>🏔 Adventure</div>
          </div>
        </div>
      </div>
    </div>
  );
}
