
import { Zap } from 'lucide-react';

interface Props {
  amount: number;
  onDone: () => void;
}

export const XPGainToast: React.FC<Props> = ({ amount }) => {
  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm pointer-events-none animate-xp-gain"
      style={{
        background: 'linear-gradient(135deg, rgba(0,255,136,0.15), rgba(102,68,255,0.15))',
        border: '1px solid rgba(0,255,136,0.4)',
        boxShadow: '0 0 30px rgba(0,255,136,0.3)',
        color: '#00FF88',
        backdropFilter: 'blur(10px)',
        textShadow: '0 0 8px rgba(0,255,136,0.8)',
      }}
    >
      <Zap size={16} className="text-yellow-400" />
      +{amount} XP
    </div>
  );
};
