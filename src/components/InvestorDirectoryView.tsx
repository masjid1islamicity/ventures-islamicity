import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  Building2, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight, 
  Mail, 
  Globe, 
  Briefcase,
  ChevronDown,
  ChevronUp,
  Target,
  RefreshCw,
  Award,
  Zap,
  Check
} from 'lucide-react';
import { GlobalInvestor, Region, InvestorType, ShariahContractType, PitchDeckData } from '../types';
import { rankInvestorsCompatibilityAI } from '../services/aiService';

interface InvestorDirectoryViewProps {
  investors: GlobalInvestor[];
  projects?: PitchDeckData[];
  onPitchToInvestor: (investor: GlobalInvestor) => void;
  onNavigateToTab: (tab: string) => void;
}

export const InvestorDirectoryView: React.FC<InvestorDirectoryViewProps> = ({
  investors: initialInvestors,
  projects = [],
  onPitchToInvestor,
  onNavigateToTab,
}) => {
  const [investorList, setInvestorList] = useState<GlobalInvestor[]>(initialInvestors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedContract, setSelectedContract] = useState<string>('all');
  const [selectedInvestorForModal, setSelectedInvestorForModal] = useState<GlobalInvestor | null>(null);
  const [isSentPitchSuccess, setIsSentPitchSuccess] = useState(false);
  const [customPitchMessage, setCustomPitchMessage] = useState('');
  
  // AI Compatibility Matchmaker state
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [isAnalyzingCompatibility, setIsAnalyzingCompatibility] = useState<boolean>(false);
  const [compatibilitySortOrder, setCompatibilitySortOrder] = useState<'compatibility' | 'aum' | 'name'>('compatibility');
  const [expandedInsightId, setExpandedInsightId] = useState<string | null>(null);
  const [matchFilter, setMatchFilter] = useState<'ALL' | 'TIER_1' | 'TIER_2'>('ALL');

  const activeProject = projects[selectedProjectIndex] || {
    title: 'Noor Green Waqf Solar: 500 Pesantren',
    industry: 'Waqf Green Energy & Sustainability',
    targetAmountUsd: 3500000,
    contractType: 'Sukuk Al-Ijarah' as ShariahContractType,
    description: 'Infrastruktur listrik surya di 500 atap pesantren untuk menghemat beban operasional dan mendanai beasiswa santri.',
  };

  // Run initial AI Compatibility ranking on mount or when active project changes
  const runAiCompatibilityAnalysis = async (proj = activeProject) => {
    setIsAnalyzingCompatibility(true);
    try {
      const ranked = await rankInvestorsCompatibilityAI(
        {
          title: proj.title,
          industry: proj.industry,
          targetAmount: proj.targetAmountUsd,
          contractType: proj.contractType,
          description: proj.description || proj.executiveSummary || proj.tagline || '',
        },
        initialInvestors
      );
      setInvestorList(ranked);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingCompatibility(false);
    }
  };

  useEffect(() => {
    runAiCompatibilityAnalysis(activeProject);
  }, [selectedProjectIndex]);

  // Handle opening pitch modal with pre-populated AI hook
  const handleOpenPitchModal = (inv: GlobalInvestor) => {
    setSelectedInvestorForModal(inv);
    const defaultHook = inv.recommendedPitchHook || 
      `Assalamu'alaikum Warahmatullahi Wabarakatuh kepada Komite Investasi ${inv.name}. Kami mengajukan proposal investasi syariah kaffah "${activeProject.title}" berbasis akad ${activeProject.contractType} dengan target $${activeProject.targetAmountUsd.toLocaleString()} USD. Sesuai mandat historis Anda di ${inv.sectors[0]}, inisiatif ini telah diaudit berstandar AAOIFI No. 21 dan bebas riba murni.`;
    setCustomPitchMessage(defaultHook);
  };

  const handleSendPitchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSentPitchSuccess(true);
    setTimeout(() => {
      setIsSentPitchSuccess(false);
      setSelectedInvestorForModal(null);
    }, 2000);
  };

  // Filtering & Sorting
  const filteredInvestors = investorList.filter((inv) => {
    const matchesSearch = 
      inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.headquarters.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.sectors.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      inv.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = selectedRegion === 'all' || inv.region === selectedRegion;
    const matchesType = selectedType === 'all' || inv.type === selectedType;
    const matchesContract = selectedContract === 'all' || inv.preferredContracts.includes(selectedContract as ShariahContractType);

    const matchesTier = 
      matchFilter === 'ALL' ||
      (matchFilter === 'TIER_1' && (inv.compatibilityScore || 0) >= 92) ||
      (matchFilter === 'TIER_2' && (inv.compatibilityScore || 0) >= 80 && (inv.compatibilityScore || 0) < 92);

    return matchesSearch && matchesRegion && matchesType && matchesContract && matchesTier;
  });

  // Apply sorting
  filteredInvestors.sort((a, b) => {
    if (compatibilitySortOrder === 'compatibility') {
      return (b.compatibilityScore || 0) - (a.compatibilityScore || 0);
    }
    if (compatibilitySortOrder === 'aum') {
      return b.activePortfolioCount - a.activePortfolioCount;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
            <Users className="w-4 h-4" />
            <span>Direktori Jaringan 8.000 Investor Global & AI Compatibility Ranking</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Pemeringkatan Kompatibilitas Investor Berbasis AI
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Algoritma AI menganalisis preferensi historis 8.240 investor internasional terhadap profil Pitch Deck Anda — mempertimbangkan keselarasan sektor halal, kecocokan tiket modal, akad syariah (AAOIFI), serta kriteria dewan pengawas.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div>
              <span className="font-bold text-white">8.240</span> Investor Aktif
            </div>
            <span className="text-slate-600">·</span>
            <div>
              <span className="font-bold text-emerald-400">$42.8 Miliar</span> Total AUM Syariah
            </div>
            <span className="text-slate-600">·</span>
            <div>
              <span className="font-bold text-teal-400">48 Negara</span> Jangkauan Global
            </div>
          </div>
        </div>
      </div>

      {/* AI Investor Compatibility Matchmaker Control Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 border border-emerald-800/40 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>AI Investor Compatibility Engine</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                  REAL-TIME RANKING
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Pilih profil Pitch Deck aktif untuk memeringkat 8.000 investor berdasarkan kesesuaian mandat historis
              </p>
            </div>
          </div>

          <button
            onClick={() => runAiCompatibilityAnalysis(activeProject)}
            disabled={isAnalyzingCompatibility}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950 flex items-center gap-2 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzingCompatibility ? 'animate-spin' : ''}`} />
            <span>{isAnalyzingCompatibility ? 'Menganalisis Kecocokan AI...' : 'Jalankan AI Matchmaker'}</span>
          </button>
        </div>

        {/* Profile Switcher Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-medium mb-1.5">
              Profil Pitch Deck yang Menjadi Acuan Penilaian:
            </label>
            <select
              value={selectedProjectIndex}
              onChange={(e) => setSelectedProjectIndex(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500"
            >
              {projects.map((p, idx) => (
                <option key={idx} value={idx}>
                  {p.title} · Sektor: {p.industry} · Akad {p.contractType} (Target: ${p.targetAmountUsd.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1.5">
              Urutkan Berdasarkan:
            </label>
            <select
              value={compatibilitySortOrder}
              onChange={(e) => setCompatibilitySortOrder(e.target.value as any)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="compatibility">Paling Kompatibel (AI Match %)</option>
              <option value="aum">Portofolio Terbanyak</option>
              <option value="name">Nama Lembaga (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Active Pitch Summary Bar */}
        <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Target: <strong className="text-white">${activeProject.targetAmountUsd.toLocaleString()} USD</strong></span>
            <span className="text-slate-600">·</span>
            <span>Akad: <strong className="text-teal-400">{activeProject.contractType}</strong></span>
            <span className="text-slate-600">·</span>
            <span>Sektor: <strong className="text-emerald-300">{activeProject.industry}</strong></span>
          </div>

          {/* Filter by Tier */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 text-[11px]">Filter Kecocokan:</span>
            <button
              onClick={() => setMatchFilter('ALL')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                matchFilter === 'ALL' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setMatchFilter('TIER_1')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                matchFilter === 'TIER_1' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sangat Selaras (&gt;92%)
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari investor, kota (Riyadh, Dubai, Jakarta), sektor halal, atau nama lembaga..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Region Filter */}
          <div className="w-full md:w-56">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Semua Wilayah Global (8.240)</option>
              <option value="GCC (Riyadh, Dubai, Doha, Kuwait)">Wilayah GCC (3.420)</option>
              <option value="Southeast Asia (Jakarta, KL, Singapore)">Asia Tenggara / ASEAN (2.680)</option>
              <option value="Europe & UK (London, Zurich, Istanbul)">Eropa & UK (1.240)</option>
              <option value="North America & Global Diaspora">Amerika Utara & Global (900)</option>
            </select>
          </div>

          {/* Investor Type Filter */}
          <div className="w-full md:w-52">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Semua Jenis Lembaga</option>
              <option value="Family Office">Family Office</option>
              <option value="Sovereign / Sukuk Fund">Sovereign / Sukuk Fund</option>
              <option value="Shariah Venture Capital">Shariah Venture Capital</option>
              <option value="Wakaf Global Endowment">Wakaf Global Endowment</option>
              <option value="Angel Syndicate">Angel Syndicate</option>
            </select>
          </div>

          {/* Contract Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedContract}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Semua Akad Syariah</option>
              <option value="Mudharabah">Mudharabah (Bagi Hasil)</option>
              <option value="Musyarakah">Musyarakah (Kemitraan)</option>
              <option value="Sukuk Al-Ijarah">Sukuk Al-Ijarah</option>
              <option value="Wakaf Produktif">Wakaf Produktif</option>
              <option value="Salam">Salam (Pertanian)</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Status */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>Menampilkan <strong className="text-white">{filteredInvestors.length}</strong> investor terurut berdasarkan <strong>{compatibilitySortOrder === 'compatibility' ? 'Kecocokan AI Terhadap Pitch Deck Anda' : 'Parameter Pilihan'}</strong></span>
          <button
            onClick={() => onNavigateToTab('pitch-deck-ai')}
            className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kustomisasi Pitch Deck di Tab AI</span>
          </button>
        </div>
      </div>

      {/* Investor Grid Cards with Compatibility Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInvestors.map((inv, rankIndex) => {
          const compScore = inv.compatibilityScore || 85;
          const isExpanded = expandedInsightId === inv.id;

          return (
            <div
              key={inv.id}
              className={`bg-slate-900/80 border rounded-2xl p-5 transition-all group flex flex-col justify-between ${
                compScore >= 92 
                  ? 'border-emerald-800/60 shadow-lg shadow-emerald-950/20' 
                  : 'border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header card with Rank and Match Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 flex items-center justify-center font-mono">
                        #{rankIndex + 1}
                      </span>
                      <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition">
                        {inv.name}
                      </h3>
                      {inv.verifiedStatus && (
                        <span title="Terverifikasi AAOIFI / DSN-MUI">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>{inv.type}</span>
                      <span aria-hidden="true">·</span>
                      <span>{inv.headquarters}</span>
                    </div>
                  </div>

                  {/* AI Compatibility Score Badge */}
                  <div className="text-right shrink-0">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                      compScore >= 92 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60 shadow-sm'
                        : compScore >= 80
                        ? 'bg-teal-950 text-teal-300 border border-teal-800/50'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{compScore}% Match</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {inv.compatibilityGrade || 'Mandat Selaras'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  {inv.description}
                </p>

                {/* Key Financial Details */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Total Kelolaan (AUM)</span>
                    <span className="font-bold text-white text-xs sm:text-sm">{inv.aumUsd}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Tiket Investasi</span>
                    <span className="font-bold text-emerald-400 text-xs sm:text-sm">{inv.ticketSize}</span>
                  </div>
                </div>

                {/* Focus Sectors & Preferred Contracts */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-slate-500">Sektor:</span>
                    {inv.sectors.map((s, idx) => (
                      <span key={idx} className="text-slate-300 text-[11px]">
                        {s}{idx < inv.sectors.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-slate-500">Akad:</span>
                    {inv.preferredContracts.map((c, idx) => (
                      <span key={idx} className="text-teal-400 text-[11px] font-medium">
                        {c}{idx < inv.preferredContracts.length - 1 ? ' / ' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Match Insights Toggle */}
                <div className="mt-3 pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setExpandedInsightId(isExpanded ? null : inv.id)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center justify-between w-full"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mengapa Cocok dengan Pitch Deck Anda?</span>
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Expanded AI Insights Card */}
                  {isExpanded && (
                    <div className="mt-2 p-3 bg-slate-950 border border-emerald-900/50 rounded-xl space-y-2 text-xs animate-fadeIn">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                        Analisis Sinergi AI:
                      </span>
                      <div className="space-y-1">
                        {inv.synergyReasons?.map((r, rIdx) => (
                          <div key={rIdx} className="text-slate-300 text-[11px] flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{r}</span>
                          </div>
                        )) || (
                          <div className="text-slate-300 text-[11px]">
                            Mandat syariah {inv.name} selaras dengan struktur pembiayaan {activeProject.title}.
                          </div>
                        )}
                      </div>

                      {inv.recommendedPitchHook && (
                        <div className="mt-2 pt-2 border-t border-slate-900">
                          <span className="text-[10px] text-slate-400 block font-semibold">
                            Rekomendasi Sudut Pandang Pitching (Hook):
                          </span>
                          <p className="text-[11px] text-slate-300 italic mt-0.5 leading-relaxed bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                            "{inv.recommendedPitchHook}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>

              {/* Footer card action buttons */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500">
                  {inv.activePortfolioCount} Proyek Aktif
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenPitchModal(inv)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pitch Deck Langsung</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Pitch Submission Modal */}
      {selectedInvestorForModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 relative">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-400" />
              Kirimkan Pitch Deck ke {selectedInvestorForModal.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Pengajuan Anda disesuaikan dengan mandat historis {selectedInvestorForModal.headquarters} dan divalidasi kepatuhan syariahnya (AAOIFI Standard No. 21).
            </p>

            {isSentPitchSuccess ? (
              <div className="my-6 p-4 bg-emerald-950/80 border border-emerald-700 rounded-xl text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">Pitch Deck Berhasil Dikirim!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Salinan dokumen terenkripsi dan hash verifikasi blockchain telah dikirim ke komite investasi {selectedInvestorForModal.contactEmail}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendPitchSubmit} className="mt-4 space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Inisiatif Terpilih</label>
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 font-semibold flex items-center justify-between">
                    <span>{activeProject.title}</span>
                    <span className="text-emerald-400 text-[11px] font-mono">${activeProject.targetAmountUsd.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-medium">Pesan Pengantar (Disusun oleh AI Sesuai Mandat Investor)</label>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI Tailored
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={customPitchMessage}
                    onChange={(e) => setCustomPitchMessage(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed text-xs font-mono"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Kompatibilitas AI Terkonfirmasi: {selectedInvestorForModal.compatibilityScore || 92}%</span>
                  </div>
                  <span>Dokumen dilengkapi tanda tangan digital SHA-256 dan bebas perantara ribawi.</span>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedInvestorForModal(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Sekarang</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
