import ScrollStack, { ScrollStackItem } from './ScrollStack';
import './HowItWorksStack.css';

const steps = [
  {
    number: '01',
    title: 'Submit Your Brief',
    description:
      'Share your event type, dates, group size, destination preference, and budget range.',
    color: '#2dd4bf',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80'
  },
  {
    number: '02',
    title: 'Receive Proposal',
    description:
      'Within 48 hours, get a detailed proposal with venue options, pricing, and itinerary.',
    color: '#eab308',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80'
  },
  {
    number: '03',
    title: 'Plan Together',
    description:
      'Work with your dedicated event manager to refine every detail to perfection.',
    color: '#a78bfa',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80'
  },
  {
    number: '04',
    title: 'Flawless Execution',
    description:
      'We handle everything on the ground. You show up, connect, and leave the rest to us.',
    color: '#fb7185',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80'
  }
];

const HowItWorksStack = () => {
  return (
    <section className="how-it-works-stack">
      <div className="hiws-header">
        <span className="hiws-eyebrow">HOW IT WORKS</span>
        <h2 className="hiws-title">From brief to brilliant event</h2>
      </div>

      <ScrollStack
        itemDistance={80}
        itemScale={0.025}
        itemStackDistance={20}
        stackPosition="25%"
        scaleEndPosition="12%"
        baseScale={0.9}
        scaleDuration={0.5}
        blurAmount={0}
      >
        {steps.map(step => (
          <ScrollStackItem key={step.number}>
            <div className="hiws-card" style={{ '--step-color': step.color }}>
              <div className="hiws-visual">
                <img
                  className="hiws-photo"
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                />
                <div className="hiws-visual-overlay" />
                <span className="hiws-number">{step.number}</span>
              </div>
              <div className="hiws-content">
                <span className="hiws-content-number">{step.number}</span>
                <h3 className="hiws-content-title">{step.title}</h3>
                <p className="hiws-content-desc">{step.description}</p>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default HowItWorksStack;
