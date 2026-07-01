import './MovingTransit.css';
import { FaBus } from 'react-icons/fa';

export default function MovingTransit({ direction = 'left' }) {
  return (
    <div className={`moving-transit ${direction}`}>
      <style>{`
        @keyframes moveBusLeft {
          0% { transform: translateX(500px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(-100px); opacity: 0; }
        }
        @keyframes moveBusRight {
          0% { transform: translateX(-500px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100px); opacity: 0; }
        }
        .transit-left {
          animation: moveBusLeft 6s infinite ease-in-out;
        }
        .transit-right {
          animation: moveBusRight 6s infinite ease-in-out;
        }
      `}</style>

      <div className={`transit-icon ${direction === 'left' ? 'transit-left' : 'transit-right'}`}>
        <FaBus size={40} color="#00bcd4" />
      </div>
    </div>
  );
}
