import React, { useState } from 'react';
import { 
  TrendingUp, 
  Coins, 
  Users, 
  ShieldCheck, 
  Blocks, 
  ArrowUpRight, 
  Heart, 
  Flame, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  Zap
} from 'lucide-react';
import { PitchDeckData, DonationLiveFeedItem, InvestorPortfolioItem } from '../types';
import { NisbahProjectionTool } from './NisbahProjectionTool';
import { AiInvestorMatchmakingWidget } from './AiInvestorMatchmakingWidget';

interface DashboardViewProps {
  projects: PitchDeckData[];
  liveDonations: DonationLiveFeedItem[];
  portfolioItems?: InvestorPortfolioItem[];
  onSelectProject: (project: PitchDeckData) => void;
  onOpenPaymentModal: (project?: PitchDeckData) => void;
  onNavigateToTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  liveDonations,
  portfolioItems = [],
  onSelectProject,
  onOpenPaymentModal,
  onNavigateToTab,
}) => {
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>('all');
  const [selectedDonationCategory, setSelectedDonationCategory] = useState<string>('all');

  const totalRaisedUsd = projects.reduce((acc, p) => acc + p.currentRaisedUsd, 0);
  const totalTargetUsd = projects.reduce((acc, p) => acc + p.targetAmountUsd, 0);
  const totalBeneficiaries = projects.reduce((acc, p) => acc + p.dakwahImpact.beneficiariesCount, 0);

  const filteredProjects = selectedSectorFilter === 'all'
    ? projects
    : projects.filter(p => p.industry.toLowerCase().includes(selectedSectorFilter.toLowerCase()));

  const filteredDonations = selectedDonationCategory === 'all'
    ? liveDonations
    : liveDonations.filter(d => d.category === selectedDonationCategory);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Header: Superapp Overview */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-800/30 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            <span>Platform Pendanaan Syariah Kaffah Global</span>
            <span aria-hidden="true">·</span>
            <span>8.000+ Investor Terverifikasi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Percepat Pendanaan Proyek Dakwah & Bisnis Halal dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">AI Pintar & Blockchain</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Menghubungkan inisiatif dakwah berkekuatan tinggi dengan sindikasi 8.000 investor global. Dilengkapi penyeleksi peluang berbasis AI, smart contract syariah, pelaporan portofolio otomatis, dan mode offline untuk area minim sinyal.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToTab('pitch-deck-ai')}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buat Pitch Deck Cerdas (AI)</span>
            </button>
            <button
              onClick={() => onNavigateToTab('investors')}
              className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 text-white font-medium px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-700 transition"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Jelajahi 8.000 Investor</span>
            </button>
            <button
              onClick={() => onOpenPaymentModal()}
              className="flex items-center gap-2 bg-teal-950/60 hover:bg-teal-900/60 text-teal-300 font-medium px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-teal-800/50 transition"
            >
              <Coins className="w-4 h-4 text-teal-400" />
              <span>Donasi / Investasi Cepat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Interactive Key Statistics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 sm:p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Terhimpun</span>
            <span className="p-1.5 bg-emerald-950/60 text-emerald-400 rounded-lg">
              <Coins className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              ${totalRaisedUsd.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% bulan ini</span>
              <span className="text-slate-500">· Real-time</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 sm:p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Investor Global Syariah</span>
            <span className="p-1.5 bg-teal-950/60 text-teal-400 rounded-lg">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              8.240
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <span className="text-emerald-400 font-medium">48 Negara</span>
              <span>· GCC & ASEAN Terbesar</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 sm:p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Penerima Manfaat Dakwah</span>
            <span className="p-1.5 bg-amber-950/60 text-amber-400 rounded-lg">
              <Heart className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              {totalBeneficiaries.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SROI Score: 97.4%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 sm:p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Blok Audit Blockchain</span>
            <span className="p-1.5 bg-purple-950/60 text-purple-400 rounded-lg">
              <Blocks className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              #1.849.204
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-purple-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Bebas Riba</span>
            </div>
          </div>
        </div>

      </div>

      {/* AI-Based Investor Matchmaking (Projects Recommended for User Portfolio) */}
      <AiInvestorMatchmakingWidget
        portfolioItems={portfolioItems}
        projects={projects}
        onSelectProject={(p) => {
          onSelectProject(p);
        }}
        onOpenPaymentModal={(p) => {
          onOpenPaymentModal(p);
        }}
        onNavigateToTab={onNavigateToTab}
      />

      {/* Sharia-compliant Profit & Loss Projection Tool (Nisbah Model) */}
      <NisbahProjectionTool
        onApplyToPitchDeck={(nisbahData) => {
          onNavigateToTab('pitch-deck-ai');
        }}
        onOpenPaymentModal={() => onOpenPaymentModal()}
      />

      {/* Real-time Donation & Funding Progress Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Target vs Realisasi Charts & Sector Allocations */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Perkembangan Pendanaan & Donasi Real-Time
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Distribusi serapan modal syariah dan wakaf produktif berdasarkan akad terverifikasi
                </p>
              </div>

              {/* Sector Segmented Filter Controls */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setSelectedSectorFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition ${
                    selectedSectorFilter === 'all'
                      ? 'bg-emerald-600 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setSelectedSectorFilter('energy')}
                  className={`px-2.5 py-1 rounded-md transition ${
                    selectedSectorFilter === 'energy'
                      ? 'bg-emerald-600 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Energi Hijau
                </button>
                <button
                  onClick={() => setSelectedSectorFilter('ai')}
                  className={`px-2.5 py-1 rounded-md transition ${
                    selectedSectorFilter === 'ai'
                      ? 'bg-emerald-600 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Edu-Dakwah AI
                </button>
                <button
                  onClick={() => setSelectedSectorFilter('agri')}
                  className={`px-2.5 py-1 rounded-md transition ${
                    selectedSectorFilter === 'agri'
                      ? 'bg-emerald-600 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pertanian Umat
                </button>
              </div>
            </div>

            {/* Interactive Progress Bars per Project */}
            <div className="mt-6 space-y-5">
              {filteredProjects.map((p) => {
                const percent = Math.min(100, Math.round((p.currentRaisedUsd / p.targetAmountUsd) * 100));
                return (
                  <div key={p.title} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/60 hover:border-emerald-800/50 transition">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <div>
                        <div className="font-semibold text-slate-100 text-sm hover:text-emerald-400 cursor-pointer" onClick={() => onSelectProject(p)}>
                          {p.title}
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5 flex items-center gap-2">
                          <span>{p.industry}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-400 font-medium">Akad {p.contractType}</span>
                          <span aria-hidden="true">·</span>
                          <span>Imbal Hasil: {p.expectedAnnualReturn}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0 mt-2 sm:mt-0">
                        <span className="font-extrabold text-emerald-400 text-sm">{percent}%</span>
                        <div className="text-[11px] text-slate-400">
                          ${p.currentRaisedUsd.toLocaleString()} / ${p.targetAmountUsd.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{p.dakwahImpact.beneficiariesCount.toLocaleString()} {p.dakwahImpact.beneficiaryLabel}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-amber-400 font-medium">{p.daysLeft} hari tersisa</span>
                        <button
                          onClick={() => onOpenPaymentModal(p)}
                          className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                        >
                          Ikut Danai <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shariah Investment Governance & Screening Transparency */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Proses Seleksi Investasi Akurat & Transparan Berbasis AI
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">1. AI Screening Otomatis</span>
                <p className="text-slate-400 leading-relaxed">
                  Memeriksa rasio pendapatan haram (0.00%), kepatuhan neraca bebas bunga (Riba-free), dan struktur nisbah yang adil.
                </p>
              </div>
              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="font-bold text-teal-400 block mb-1">2. Audit Dewan Syariah</span>
                <p className="text-slate-400 leading-relaxed">
                  Verifikasi manual oleh penasihat DSN-MUI & AAOIFI untuk memastikan akad underlying asset riil (bukan spekulasi).
                </p>
              </div>
              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">3. Validasi Blockchain</span>
                <p className="text-slate-400 leading-relaxed">
                  Setiap akad, penerbitan sukuk, dan transaksi di-timestamp pada ledger publik anti-tamper dengan bukti hash SHA-256.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Live Real-Time Activity Feed & Quick Actions */}
        <div className="space-y-6">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <h3 className="text-sm font-bold text-white">Aktivitas Donasi Real-Time</h3>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Live Sync</span>
            </div>

            {/* Filter buttons */}
            <div className="mt-3 flex flex-wrap gap-1 text-[10px]">
              <button
                onClick={() => setSelectedDonationCategory('all')}
                className={`px-2 py-0.5 rounded transition ${
                  selectedDonationCategory === 'all'
                    ? 'bg-slate-700 text-white font-medium'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setSelectedDonationCategory('WAKAF_PRODUKTIF')}
                className={`px-2 py-0.5 rounded transition ${
                  selectedDonationCategory === 'WAKAF_PRODUKTIF'
                    ? 'bg-emerald-900 text-emerald-200 font-medium'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                Wakaf
              </button>
              <button
                onClick={() => setSelectedDonationCategory('SUKUK_INVESTASI')}
                className={`px-2 py-0.5 rounded transition ${
                  selectedDonationCategory === 'SUKUK_INVESTASI'
                    ? 'bg-teal-900 text-teal-200 font-medium'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                Sukuk
              </button>
              <button
                onClick={() => setSelectedDonationCategory('INFAQ_DAKWAH')}
                className={`px-2 py-0.5 rounded transition ${
                  selectedDonationCategory === 'INFAQ_DAKWAH'
                    ? 'bg-amber-900 text-amber-200 font-medium'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                Infaq
              </button>
            </div>

            {/* Stream List */}
            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-1">
              {filteredDonations.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-slate-200 text-xs">
                        {item.donorName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.donorLocation}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-400 text-xs">
                        +${item.amountUsd.toLocaleString()}
                      </span>
                      <div className="text-[10px] text-slate-500">
                        {item.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-[150px]">{item.targetProject}</span>
                    <span className="font-mono text-emerald-500/80">{item.txHash}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Trigger Button */}
            <button
              onClick={() => onOpenPaymentModal()}
              className="mt-4 w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold shadow transition"
            >
              Donasikan Sekarang & Catat di Blockchain
            </button>
          </div>

          {/* 8000 Global Islamic Investors Direct Match Card */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-900/40 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-semibold text-xs">
              <Users className="w-4 h-4" />
              Jaringan 8.000 Investor Syariah Global
            </div>
            <h4 className="text-sm font-bold text-white">
              Siap Menyalurkan Modal ke Proyek Dakwah Anda
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Family offices, Sovereign wealth funds, dan sindikat angel syariah di Riyadh, Dubai, KL, Jakarta, & London aktif mencari inisiatif terverifikasi.
            </p>
            <button
              onClick={() => onNavigateToTab('investors')}
              className="mt-3 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <span>Buka Direktori 8.000 Investor</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
