import { FaPen, FaFileAlt, FaUsers, FaCheckCircle } from 'react-icons/fa';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import ColorBends from './ColorBends';
import './HowItWorksStack.css';

const steps = [
  {
    number: '01',
    title: 'Submit Your Brief',
    description:
      'Share your event type, dates, group size, destination preference, and budget range.',
    color: '#2dd4bf',
    icon: FaPen
  },
  {
    number: '02',
    title: 'Receive Proposal',
    description:
      'Within 48 hours, get a detailed proposal with venue options, pricing, and itinerary.',
    color: '#eab308',
    icon: FaFileAlt
  },
  {
    number: '03',
    title: 'Plan Together',
    description:
      'Work with your dedicated event manager to refine every detail to perfection.',
    color: '#a78bfa',
    icon: FaUsers
  },
  {
    number: '04',
    title: 'Flawless Execution',
    description:
      'We handle everything on the ground. You show up, connect, and leave the rest to us.',
    color: '#fb7185',
    icon: FaCheckCircle
  }
];

const HowItWorksStack = () => {
  return (
    <section className="how-it-works-stack">
      <ColorBends
        colors={['#2dd4bf', '#eab308', '#a78bfa', '#fb7185']}
        rotation={45}
        speed={0.15}
        scale={1.2}
        frequency={2}
        warpStrength={0.8}
        mouseInfluence={0.4}
        parallax={0.3}
        noise={0.1}
        iterations={2}
        intensity={0.8}
        bandWidth={4}
        transparent={true}
        className="hiws-background"
      />

      <div className="hiws-header">
        <span className="hiws-eyebrow">HOW IT WORKS</span>
        <h2 className="hiws-title">From brief to brilliant event</h2>
      </div>

      <ScrollStack
        itemDistance={45}
        itemScale={0.035}
        itemStackDistance={15}
        stackPosition="30%"
        scaleEndPosition="15%"
        baseScale={0.92}
        scaleDuration={0.5}
        blurAmount={0}
        useWindowScroll={true}
      >
        {steps.map(step => {
          const IconComponent = step.icon;
          return (
            <ScrollStackItem key={step.number}>
              <div className="hiws-card" style={{ '--step-color': step.color }}>
                <div className="hiws-icon-section">
                  <IconComponent className="hiws-icon" />
                </div>
                <div className="hiws-content">
                  <span className="hiws-content-number">{step.number}</span>
                  <h3 className="hiws-content-title">{step.title}</h3>
                  <p className="hiws-content-desc">{step.description}</p>
                </div>
              </div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
};

export default HowItWorksStack;
