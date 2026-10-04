import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Sparkles, 
  Blocks, 
  Briefcase 
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dasbor', icon: TrendingUp },
    { id: 'investors', label: '8K Investor', icon: Users },
    { id: 'pitch-deck-ai', label: 'Pitch AI', icon: Sparkles },
    { id: 'blockchain', label: 'Blockchain', icon: Blocks },
    { id: 'portfolio', label: 'Portofolio', icon: Briefcase },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 safe-area-pb">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition ${
                isActive
                  ? 'text-emerald-400 font-bold bg-emerald-950/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-emerald-400' : ''} transition-transform`} />
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
