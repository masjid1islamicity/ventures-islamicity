import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Heart, 
  RefreshCw,
  Zap,
  Award
} from 'lucide-react';
import { PitchDeckData, InvestorPortfolioItem } from '../types';
import { recommendProjectsForPortfolioAI } from '../services/aiService';

interface AiInvestorMatchmakingWidgetProps {
  portfolioItems: InvestorPortfolioItem[];
  projects: PitchDeckData[];
  onSelectProject: (project: PitchDeckData) => void;
  onOpenPaymentModal: (project: PitchDeckData) => void;
  onNavigateToTab: (tab: string) => void;
}

export const AiInvestorMatchmakingWidget: React.FC<AiInvestorMatchmakingWidgetProps> = ({
  portfolioItems,
  projects,
  onSelectProject,
  onOpenPaymentModal,
  onNavigateToTab,
}) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImpactGoal, setSelectedImpactGoal] = useState<string>('all');

  const fetchRecommendations = async () => {
    setIsLoading(true);
    try {
      const recs = await recommendProjectsForPortfolioAI(portfolioItems, projects, { selectedImpactGoal });
      setRecommendations(recs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [portfolioItems, projects, selectedImpactGoal]);

  const totalInvested = portfolioItems.reduce((acc, p) => acc + p.investedAmountUsd, 0);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 border border-emerald-800/40 rounded-2xl p-5 sm:p-7 shadow-xl space-y-5 relative overflow-hidden">
      
      {/* Background Islamic Aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Rekomendasi Proyek Berbasis AI (Investor Matchmaking)
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                PERSONALIZED AI
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Dianalisis dari riwayat portofolio Anda (${totalInvested.toLocaleString()} USD terkelola) & kriteria kemaslahatan syariah
            </p>
          </div>
        </div>

        <button
          onClick={fetchRecommendations}
          disabled={isLoading}
          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Menganalisis Ulang...' : 'Segarkan Rekomendasi'}</span>
        </button>
      </div>

      {/* Recommended Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {recommendations.slice(0, 4).map((rec, idx) => {
          const matchPercent = rec.matchScore || 94;
          return (
            <div
              key={rec.title || idx}
              className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl hover:border-emerald-800/60 transition-all flex flex-col justify-between group space-y-3"
            >
              <div>
                {/* Header card with match badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Rekomendasi #{idx + 1} · {rec.industry}
                    </span>
                    <h4 
                      className="font-bold text-white text-sm group-hover:text-emerald-400 transition cursor-pointer mt-0.5"
                      onClick={() => onSelectProject(rec)}
                    >
                      {rec.title}
                    </h4>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{matchPercent}% Match</span>
                    </div>
                  </div>
                </div>

                {/* Return & Contract Highlights */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Model Akad</span>
                    <span className="font-bold text-teal-400 text-xs">{rec.contractType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Estimasi Imbal Hasil</span>
                    <span className="font-bold text-emerald-400 text-xs">{rec.expectedAnnualReturn}</span>
                  </div>
                </div>

                {/* AI Synergy Reasons (Why this matches your specific portfolio) */}
                <div className="mt-3 space-y-1 text-xs">
                  <span className="text-[11px] font-semibold text-slate-400 block">
                    Alasan Keselarasan dengan Portofolio Anda:
                  </span>
                  {rec.synergyReasons?.map((reason: string, rIdx: number) => (
                    <div key={rIdx} className="text-slate-300 text-[11px] flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                {/* Diversification Tag */}
                <div className="mt-2 text-[11px] text-teal-300/90 font-medium flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Dampak Portofolio: {rec.diversificationImpact}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-900 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectProject(rec)}
                  className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1 transition"
                >
                  <span>Review Pitch Deck</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onOpenPaymentModal(rec)}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-semibold shadow transition flex items-center gap-1.5"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Danai Sekarang</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
