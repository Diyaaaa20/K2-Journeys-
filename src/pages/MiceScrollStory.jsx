import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MiceScrollStory.css";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    letter: "M",
    title: "Meetings",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    cards: [
      "Executive Board Meetings",
      "Leadership Retreats",
      "Investor Meetings",
      "Global Partner Summits",
    ],
  },

  {
    letter: "I",
    title: "Incentives",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    cards: [
      "Employee Reward Trips",
      "Luxury Team Retreats",
      "Destination Incentives",
      "Annual Recognition Tours",
    ],
  },

  {
    letter: "C",
    title: "Conferences",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
    cards: [
      "International Conferences",
      "Product Launches",
      "Medical Conferences",
      "Business Conventions",
    ],
  },

  {
    letter: "E",
    title: "Events",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
    cards: [
      "Corporate Galas",
      "Award Nights",
      "Brand Activations",
      "Luxury Networking Events",
    ],
  },
];

export default function MiceScroll() {
  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((section) => {
      const letter = section.querySelector(".letter");
      const title = section.querySelector(".title");
      const cards = section.querySelectorAll(".card");
      const image = section.querySelector(".bg");

      gsap.from(letter, {
        scale: 0.4,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top center",
        },
      });

      gsap.from(title, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top center",
        },
      });

      gsap.from(cards, {
        y: 120,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top center",
        },
      });

      gsap.from(image, {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: section,
          start: "top center",
        },
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
      });
    });
  }, []);

  return (
    <section className="mice-wrapper">
      {sections.map((item, index) => (
        <div
          className="mice-section"
          key={index}
          ref={(el) => (refs.current[index] = el)}
        >
          <img className="bg" src={item.image} alt="" />

          <div className="overlay"></div>

          <div className="content">

            <h1 className="letter">{item.letter}</h1>

            <h2 className="title">{item.title}</h2>

            <div className="cards">

              {item.cards.map((card, i) => (
                <div className="card" key={i}>
                  {card}
                </div>
              ))}

            </div>

          </div>

        </div>
      ))}
    </section>
  );
}