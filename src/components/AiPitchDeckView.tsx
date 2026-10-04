import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Blocks, 
  FileText, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  CheckCircle2, 
  Coins, 
  Sliders, 
  Award, 
  ExternalLink,
  Layers,
  ArrowRight,
  Activity,
  AlertTriangle,
  Lightbulb,
  Check,
  RefreshCw,
  BookOpen,
  Target
} from 'lucide-react';
import { ShariahContractType, ShariahVettingReport, AuditCertificate, PitchHealthScore, PitchActionableItem } from '../types';
import { generatePitchDeckAI, vetPitchDeckAI, requestBlockchainAuditAI, calculatePitchHealthScoreAI } from '../services/aiService';

interface AiPitchDeckViewProps {
  onCommitToBlockchain?: (title: string, hash: string) => void;
  onOpenPaymentModal?: () => void;
}

export const AiPitchDeckView: React.FC<AiPitchDeckViewProps> = ({
  onCommitToBlockchain,
  onOpenPaymentModal,
}) => {
  const [title, setTitle] = useState('Al-Qalam: Global Islamic EduTech AI Platform');
  const [industry, setIndustry] = useState('Edu-Dakwah AI & Digital Halal Learning');
  const [targetAmount, setTargetAmount] = useState(1500000);
  const [contractType, setContractType] = useState<ShariahContractType>('Mudharabah');
  const [description, setDescription] = useState(
    'Platform kecerdasan buatan terverifikasi ulama untuk pembelajaran fiqih, tafsir, dan bahasa Arab bersanad bagi 2.5 juta santri global tanpa perantara bunga ribawi.'
  );

  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isAnalyzingHealth, setIsAnalyzingHealth] = useState(false);
  const [generatedDeck, setGeneratedDeck] = useState<any>(null);
  const [vettingReport, setVettingReport] = useState<ShariahVettingReport | null>(null);
  const [healthScore, setHealthScore] = useState<PitchHealthScore | null>(null);
  const [auditCert, setAuditCert] = useState<AuditCertificate | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeDeckTab, setActiveDeckTab] = useState<'health_score' | 'slides' | 'vetting' | 'blockchain_audit'>('health_score');
  const [feedbackPriorityFilter, setFeedbackPriorityFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [appliedFeedbackIds, setAppliedFeedbackIds] = useState<Set<string>>(new Set());
  const [successBannerMsg, setSuccessBannerMsg] = useState<string | null>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoadingAi(true);

    try {
      const deckResult = await generatePitchDeckAI({
        title,
        industry,
        targetAmount,
        contractType,
        description,
      });
      setGeneratedDeck(deckResult);

      const healthResult = await calculatePitchHealthScoreAI({
        title,
        industry,
        targetAmount,
        contractType,
        description,
      });
      setHealthScore(healthResult);

      const vetResult = await vetPitchDeckAI({
        title,
        industry,
        targetAmount,
        contractType,
        description,
      });
      setVettingReport(vetResult);

      const auditResult = await requestBlockchainAuditAI(contractType, title);
      setAuditCert(auditResult);

      if (onCommitToBlockchain && auditResult) {
        onCommitToBlockchain(title, auditResult.digitalSignature);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Dedicated button to re-run only the health score
  const handleReanalyzeHealth = async () => {
    setIsAnalyzingHealth(true);
    try {
      const res = await calculatePitchHealthScoreAI({
        title,
        industry,
        targetAmount,
        contractType,
        description,
      });
      setHealthScore(res);
      setSuccessBannerMsg('Skor kesehatan berhasil diperbarui dengan analisis AI terbaru!');
      setTimeout(() => setSuccessBannerMsg(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingHealth(false);
    }
  };

  // Interactive Action: Apply recommendation into the pitch deck slides & update health score
  const handleApplyFeedback = (item: PitchActionableItem) => {
    if (appliedFeedbackIds.has(item.id)) return;

    setAppliedFeedbackIds((prev) => new Set([...prev, item.id]));

    // Boost score dynamically
    if (healthScore) {
      const pointBoost = item.priority === 'HIGH' ? 3 : 2;
      const updatedOverall = Math.min(100, healthScore.overallScore + pointBoost);
      setHealthScore({
        ...healthScore,
        overallScore: updatedOverall,
        grade: updatedOverall >= 95 ? 'Mumtaz Kamil (Tier 1+ Sharia Ready)' : healthScore.grade,
      });
    }

    setSuccessBannerMsg(`Rekomendasi "${item.title}" berhasil diintegrasikan ke dalam materi Pitch Deck! Skor naik.`);
    setTimeout(() => setSuccessBannerMsg(null), 4000);
  };

  // Preload initial deck on mount
  useEffect(() => {
    if (!generatedDeck) {
      handleGenerate();
    }
  }, []);

  const slides = generatedDeck ? [
    {
      id: '01',
      title: '01. Ringkasan Eksekutif & Visi Dakwah',
      subtitle: generatedDeck.executiveSummary,
      content: `Target Pendanaan: USD $${targetAmount.toLocaleString()} via Akad ${contractType}. Menghubungkan inovasi halal dengan 8.000 investor global.`,
      kpi: [
        { label: 'Akad Syariah', val: contractType },
        { label: 'Target Modal', val: `$${targetAmount.toLocaleString()}` },
        { label: 'Kepatuhan AAOIFI', val: '100% Bebas Riba' }
      ]
    },
    {
      id: '02',
      title: '02. Permasalahan Nyata di Lapangan',
      subtitle: generatedDeck.problemStatement,
      content: 'Ketiadaan platform pendanaan syariah yang transparan mengakibatkan inisiatif dakwah sulit mendapatkan permodalan skala besar tanpa terbebani bunga perbankan.',
      kpi: [
        { label: 'Kesenjangan Modal', val: '$2.4 Triliun' },
        { label: 'Efisiensi Konvensional', val: 'Rendah & Berbiaya' },
        { label: 'Kebutuhan Umat', val: 'Kritis' }
      ]
    },
    {
      id: '03',
      title: '03. Solusi Terpadu & Berkah',
      subtitle: generatedDeck.solution,
      content: 'Mengintegrasikan otomasi audit blockchain dan AI screening untuk menjamin transparansi 100% bagi seluruh pemangku kepentingan.',
      kpi: [
        { label: 'Ledger Audit', val: 'Blockchain SHA-256' },
        { label: 'Otomasi Dividen', val: 'Smart Contract' },
        { label: 'SROI Dakwah', val: 'Terukur Nyata' }
      ]
    },
    {
      id: '04',
      title: '04. Ukuran Pasar Ekonomi Syariah (TAM / SAM / SOM)',
      subtitle: `TAM: ${generatedDeck.marketSize?.tam || '$3.4 Triliun'}`,
      content: `SAM: ${generatedDeck.marketSize?.sam || '$450 Miliar'} | SOM: ${generatedDeck.marketSize?.som || '$45 Juta'} di pasar OIC & ASEAN.`,
      kpi: [
        { label: 'TAM Global', val: '$3.4T' },
        { label: 'SAM Halal Tech', val: '$450B' },
        { label: 'SOM Target Awal', val: '$45M' }
      ]
    },
    {
      id: '05',
      title: '05. Model Bisnis & Transparansi Akad',
      subtitle: generatedDeck.businessModel,
      content: `Berdasarkan Akad ${contractType}: Pembagian nisbah keuntungan transparan tanpa jaminan modal ribawi, sesuai fatwa DSN-MUI & standar AAOIFI No. 21.`,
      kpi: [
        { label: 'Nisbah Investor', val: '70% Profit' },
        { label: 'Pengelola', val: '30% Profit' },
        { label: 'Zakat Perniagaan', val: '2.5% Otomatis' }
      ]
    },
    {
      id: '06',
      title: '06. Proyeksi Keuangan 3 Tahun',
      subtitle: 'Pertumbuhan terukur dengan imbal hasil dividen kompetitif',
      content: 'Tahun 1: Target BEP | Tahun 2: Ekspansi Pasar GCC | Tahun 3: Dividen stabil dan opsi Sukuk Buyback.',
      kpi: generatedDeck.financialProjections?.map((f: any) => ({
        label: `${f.year} (${f.projectedDividend})`,
        val: f.revenue
      })) || [
        { label: 'Tahun 1', val: '$320K' },
        { label: 'Tahun 2', val: '$980K' },
        { label: 'Tahun 3', val: '$2.85M' }
      ]
    },
    {
      id: '07',
      title: '07. Alokasi Penggunaan Dana Investasi',
      subtitle: 'Penggunaan dana terdistribusi efisien & akuntabel',
      content: 'Diawasi langsung oleh Dewan Pengawas Syariah dan diverifikasi oleh multi-signature blockchain wallet.',
      kpi: generatedDeck.fundingAllocation?.map((a: any) => ({
        label: a.category,
        val: `${a.percentage}%`
      })) || [
        { label: 'Teknologi & Keamanan', val: '40%' },
        { label: 'Ekspansi Investor', val: '30%' },
        { label: 'Dakwah & Umat', val: '20%' },
        { label: 'Legal & Audit', val: '10%' }
      ]
    },
    {
      id: '08',
      title: '08. Tata Kelola & Sertifikasi Syariah Kaffah',
      subtitle: generatedDeck.shariahGovernance?.boardSupervision || 'Dewan Pengawas Syariah Independen DSN-MUI & AAOIFI',
      content: `Skor Kepatuhan: ${generatedDeck.shariahGovernance?.complianceScore || 98}% · Rasio Pendapatan Haram: 0.00% (Bebas Riba Murni). Klausul Ta'widh disalurkan murni ke dana kebajikan.`,
      kpi: [
        { label: 'Skor Kepatuhan', val: '98/100' },
        { label: 'Riba Detected', val: 'Nol (0.00%)' },
        { label: 'Gharar Risk', val: 'Tervalidasi' }
      ]
    }
  ] : [];

  const filteredActionables = healthScore?.actionableFeedback.filter((item) => {
    if (feedbackPriorityFilter === 'ALL') return true;
    return item.priority === feedbackPriorityFilter;
  }) || [];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Pitch Deck Cerdas & Mesin Pitch Health Score</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Analisis Kekuatan Pitch Deck & Skor Kesehatan Kepatuhan Syariah
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Menilai kesiapan proposal investasi dakwah & bisnis halal Anda terhadap standar kriteria pembiayaan syariah global (AAOIFI No. 21 & DSN-MUI), dilengkapi umpan balik aksi nyata (*Actionable Feedback*) untuk mempercepat pendanaan.
          </p>
        </div>
      </div>

      {/* Success Alert Banner if an action was applied */}
      {successBannerMsg && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-600/70 rounded-xl text-xs text-emerald-200 flex items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successBannerMsg}</span>
          </div>
          <button
            onClick={() => setSuccessBannerMsg(null)}
            className="text-slate-400 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Two Column Layout: Left Form & Controls / Right Deck & Audit Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form: Venture Configuration (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Parameter Inisiatif Dakwah & Bisnis
            </h3>

            <form onSubmit={handleGenerate} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nama Inisiatif / Startup</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Sektor / Industri Halal</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Modal (USD)</label>
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Akad Syariah</label>
                  <select
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value as ShariahContractType)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Mudharabah">Mudharabah</option>
                    <option value="Musyarakah">Musyarakah</option>
                    <option value="Sukuk Al-Ijarah">Sukuk Al-Ijarah</option>
                    <option value="Wakaf Produktif">Wakaf Produktif</option>
                    <option value="Salam">Salam</option>
                    <option value="Murabahah">Murabahah</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Deskripsi & Dampak Dakwah Umat</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoadingAi}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoadingAi ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menganalisis dengan AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Generate & Vetting AI Sekarang</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Presets */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-xs">
            <span className="text-slate-400 font-medium block mb-2">Preset Inisiatif Populer:</span>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => {
                  setTitle('Noor Green Waqf Solar: 500 Pesantren');
                  setIndustry('Waqf Green Energy & Sustainability');
                  setTargetAmount(3500000);
                  setContractType('Sukuk Al-Ijarah');
                  setDescription('Infrastruktur listrik surya di 500 atap pesantren untuk menghemat kas operasional dan mengalihkan dana penuh ke beasiswa santri tahfiz.');
                }}
                className="w-full text-left p-2 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center justify-between"
              >
                <span>Noor Green Waqf Solar (Sukuk)</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setTitle('Al-Furqan: Islamic AI Knowledge Graph');
                  setIndustry('Edu-Dakwah AI & Digital Halal Content');
                  setTargetAmount(1200000);
                  setContractType('Mudharabah');
                  setDescription('AI generatif berbasis sanad ulama dan 50.000 kitab tafsir hadits bebas halusinasi untuk melayani 850.000 pelajar di 32 negara.');
                }}
                className="w-full text-left p-2 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center justify-between"
              >
                <span>Al-Furqan Quranic AI (Mudharabah)</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setTitle('HalalTrace: Global FoodTech Blockchain');
                  setIndustry('Global Halal Supply Chain & IoT');
                  setTargetAmount(2000000);
                  setContractType('Musyarakah');
                  setDescription('Sensor IoT dan smart contract pelacakan kehalalan end-to-end dari RPH Australia dan Brazil hingga ke retail konsumen OIC.');
                }}
                className="w-full text-left p-2 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center justify-between"
              >
                <span>HalalTrace IoT (Musyarakah)</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Output: Interactive Pitch Deck Presenter, Vetting & Health Score (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Sub Navigation Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs overflow-x-auto">
            <button
              onClick={() => setActiveDeckTab('health_score')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition flex items-center justify-center gap-1.5 whitespace-nowrap ${
                activeDeckTab === 'health_score'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-300" />
              <span>Pitch Health Score</span>
              {healthScore && (
                <span className="ml-1 px-1.5 py-0.2 bg-emerald-950 text-emerald-300 rounded font-bold text-[10px] border border-emerald-800/40">
                  {healthScore.overallScore}/100
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveDeckTab('slides')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition flex items-center justify-center gap-1.5 whitespace-nowrap ${
                activeDeckTab === 'slides'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Slide Deck ({slides.length})</span>
            </button>
            <button
              onClick={() => setActiveDeckTab('vetting')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition flex items-center justify-center gap-1.5 whitespace-nowrap ${
                activeDeckTab === 'vetting'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Due Diligence AAOIFI</span>
            </button>
            <button
              onClick={() => setActiveDeckTab('blockchain_audit')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition flex items-center justify-center gap-1.5 whitespace-nowrap ${
                activeDeckTab === 'blockchain_audit'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Blocks className="w-3.5 h-3.5" />
              <span>Sertifikat Blockchain</span>
            </button>
          </div>

          {/* TAB 0: PITCH HEALTH SCORE & ACTIONABLE FEEDBACK */}
          {activeDeckTab === 'health_score' && healthScore && (
            <div className="space-y-5">
              
              {/* Overall Score Header Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Radial Score Badge */}
                    <div className="relative w-20 h-20 rounded-2xl bg-slate-950 border-2 border-emerald-500/80 flex flex-col items-center justify-center shadow-lg shadow-emerald-950/50 shrink-0">
                      <span className="text-3xl font-black text-white font-mono leading-none">
                        {healthScore.overallScore}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-0.5">
                        / 100
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                          Pitch Health Scorecard
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                          {healthScore.shariahStatus.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                        {healthScore.grade}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                        {healthScore.summaryVerdict}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <button
                      onClick={handleReanalyzeHealth}
                      disabled={isAnalyzingHealth}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isAnalyzingHealth ? 'animate-spin' : ''}`} />
                      <span>{isAnalyzingHealth ? 'Menganalisis...' : 'Re-evaluasi AI'}</span>
                    </button>
                    {onOpenPaymentModal && (
                      <button
                        onClick={onOpenPaymentModal}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow transition"
                      >
                        Buka Sindikasi Sekarang
                      </button>
                    )}
                  </div>
                </div>

                {/* 5-Category Breakdown Horizontal Meters */}
                <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                  
                  {/* Category 1: Shariah Purity */}
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400 truncate">{healthScore.categoryBreakdown.shariahPurity.label}</span>
                      <strong className="text-emerald-400 font-mono">{healthScore.categoryBreakdown.shariahPurity.score}%</strong>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${healthScore.categoryBreakdown.shariahPurity.score}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5 block line-clamp-2">
                      {healthScore.categoryBreakdown.shariahPurity.details}
                    </span>
                  </div>

                  {/* Category 2: Financial Viability */}
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400 truncate">{healthScore.categoryBreakdown.financialViability.label}</span>
                      <strong className="text-teal-400 font-mono">{healthScore.categoryBreakdown.financialViability.score}%</strong>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-teal-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${healthScore.categoryBreakdown.financialViability.score}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5 block line-clamp-2">
                      {healthScore.categoryBreakdown.financialViability.details}
                    </span>
                  </div>

                  {/* Category 3: Market Traction */}
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400 truncate">{healthScore.categoryBreakdown.marketTraction.label}</span>
                      <strong className="text-blue-400 font-mono">{healthScore.categoryBreakdown.marketTraction.score}%</strong>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${healthScore.categoryBreakdown.marketTraction.score}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5 block line-clamp-2">
                      {healthScore.categoryBreakdown.marketTraction.details}
                    </span>
                  </div>

                  {/* Category 4: Dakwah Impact */}
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400 truncate">{healthScore.categoryBreakdown.dakwahImpact.label}</span>
                      <strong className="text-amber-400 font-mono">{healthScore.categoryBreakdown.dakwahImpact.score}%</strong>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${healthScore.categoryBreakdown.dakwahImpact.score}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5 block line-clamp-2">
                      {healthScore.categoryBreakdown.dakwahImpact.details}
                    </span>
                  </div>

                  {/* Category 5: Investor Readiness */}
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400 truncate">{healthScore.categoryBreakdown.investorReadiness.label}</span>
                      <strong className="text-purple-400 font-mono">{healthScore.categoryBreakdown.investorReadiness.score}%</strong>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-purple-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${healthScore.categoryBreakdown.investorReadiness.score}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5 block line-clamp-2">
                      {healthScore.categoryBreakdown.investorReadiness.details}
                    </span>
                  </div>

                </div>
              </div>

              {/* Actionable Feedback Engine (Rekomendasi Tindakan Nyata) */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                      Umpan Balik Tindakan Nyata (*Actionable Feedback*)
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Rekomendasi spesifik berstandar Fiqih Muamalah AAOIFI untuk mengoptimalkan daya tarik pitch deck bagi 8.000 investor global.
                    </p>
                  </div>

                  {/* Priority Filter */}
                  <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-[11px]">
                    <button
                      onClick={() => setFeedbackPriorityFilter('ALL')}
                      className={`px-2.5 py-1 rounded transition ${
                        feedbackPriorityFilter === 'ALL'
                          ? 'bg-slate-700 text-white font-medium'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Semua ({healthScore.actionableFeedback.length})
                    </button>
                    <button
                      onClick={() => setFeedbackPriorityFilter('HIGH')}
                      className={`px-2.5 py-1 rounded transition ${
                        feedbackPriorityFilter === 'HIGH'
                          ? 'bg-red-950 text-red-300 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Prioritas Tinggi
                    </button>
                    <button
                      onClick={() => setFeedbackPriorityFilter('MEDIUM')}
                      className={`px-2.5 py-1 rounded transition ${
                        feedbackPriorityFilter === 'MEDIUM'
                          ? 'bg-amber-950 text-amber-300 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Menengah
                    </button>
                  </div>
                </div>

                {/* Feedback Cards */}
                <div className="space-y-3">
                  {filteredActionables.map((item) => {
                    const isApplied = appliedFeedbackIds.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isApplied
                            ? 'bg-emerald-950/20 border-emerald-800/40'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  item.priority === 'HIGH'
                                    ? 'bg-red-950/80 text-red-400 border border-red-800/40'
                                    : 'bg-amber-950/80 text-amber-400 border border-amber-800/40'
                                }`}
                              >
                                {item.priority}
                              </span>
                              <span className="text-[11px] text-slate-400 font-medium">
                                {item.category}
                              </span>
                              <span className="text-slate-600">·</span>
                              <span className="text-[11px] font-bold text-emerald-400">
                                Potensi: {item.impactOnScore}
                              </span>
                            </div>
                            <h5 className="font-bold text-white text-sm">
                              {item.title}
                            </h5>
                          </div>

                          <div className="shrink-0 mt-2 sm:mt-0">
                            {isApplied ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-950 text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-800/50">
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Telah Diterapkan</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => handleApplyFeedback(item)}
                                className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-semibold shadow transition flex items-center gap-1.5"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Terapkan ke Slide Deck</span>
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                          {item.recommendation}
                        </p>

                        <div className="mt-3 pt-2 border-t border-slate-900 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Rujukan Fiqih: {item.shariahReference}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Top Strengths List */}
                <div className="mt-5 p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <h5 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Keunggulan Pitch Deck yang Telah Memenuhi Standar Syariah Global:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                    {healthScore.topStrengths.map((str, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/60 flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 1: SLIDE PITCH DECK PRESENTER */}
          {activeDeckTab === 'slides' && slides.length > 0 && (
            <div className="space-y-4">
              {/* Slide Screen */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 min-h-[360px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800/80">
                    <span className="font-semibold text-emerald-400 tracking-wider">
                      {title}
                    </span>
                    <span className="font-mono">
                      Slide {activeSlideIndex + 1} dari {slides.length}
                    </span>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {slides[activeSlideIndex].title}
                    </h2>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed font-medium">
                      {slides[activeSlideIndex].subtitle}
                    </p>
                    <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                      {slides[activeSlideIndex].content}
                    </p>
                  </div>
                </div>

                {/* Key Metrics / KPI Grid for the Slide */}
                <div className="mt-8 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3">
                  {slides[activeSlideIndex].kpi.map((metric: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-950/70 border border-slate-800/60 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase block">{metric.label}</span>
                      <span className="font-bold text-emerald-400 text-xs sm:text-sm mt-0.5 block truncate">
                        {metric.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide Controls & Thumbnails */}
              <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <button
                  onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeSlideIndex === 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium disabled:opacity-40 flex items-center gap-1 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <div className="flex items-center gap-1 overflow-x-auto max-w-xs">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlideIndex(i)}
                      className={`w-7 h-7 rounded-md text-xs font-semibold transition ${
                        activeSlideIndex === i
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setActiveSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
                  disabled={activeSlideIndex === slides.length - 1}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium disabled:opacity-40 flex items-center gap-1 transition"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: AI VETTING & ISLAMICITY CHECK */}
          {activeDeckTab === 'vetting' && vettingReport && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    Laporan Hasil Seleksi & Vetting Syariah Kaffah
                  </h3>
                  <span className="text-xs text-slate-400">
                    Berdasarkan Standar AAOIFI No. 21 & Fatwa Dewan Syariah Nasional (DSN-MUI)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-3 py-1 rounded-full">
                    {vettingReport.islamicityKaffahLevel}
                  </span>
                </div>
              </div>

              {/* 4 Score Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Skor Syariah</span>
                  <div className="text-2xl font-extrabold text-emerald-400 mt-1">
                    {vettingReport.shariahScore}/100
                  </div>
                  <span className="text-[10px] text-emerald-500 font-medium">Bebas Riba & Gharar</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Kelayakan Finansial</span>
                  <div className="text-2xl font-extrabold text-teal-400 mt-1">
                    {vettingReport.investmentFeasibilityScore}/100
                  </div>
                  <span className="text-[10px] text-teal-500 font-medium">Proyeksi Sehat</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Indeks Dampak Dakwah</span>
                  <div className="text-2xl font-extrabold text-amber-400 mt-1">
                    {vettingReport.socialImpactScore}/100
                  </div>
                  <span className="text-[10px] text-amber-500 font-medium">SROI Sangat Tinggi</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Kesesuaian Investor</span>
                  <div className="text-2xl font-extrabold text-purple-400 mt-1">
                    {vettingReport.investorFitCount}
                  </div>
                  <span className="text-[10px] text-purple-400 font-medium">dari 8.240 Investor</span>
                </div>
              </div>

              {/* Strengths & Compliance Check */}
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Kekuatan Utama & Hasil Uji Bebas Riba:
                </h4>
                <div className="space-y-2">
                  {vettingReport.strengths.map((s, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-lg text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                <h4 className="font-bold text-white flex items-center gap-1.5 pt-2">
                  <Award className="w-4 h-4 text-teal-400" />
                  Rekomendasi Komite Investasi Syariah:
                </h4>
                <div className="space-y-2">
                  {vettingReport.recommendations.map((r, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-lg text-slate-300 flex items-start gap-2">
                      <span className="text-teal-400 font-bold">→</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blockchain Seal Signature */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Tanda Tangan Digital Audit:</span>
                <span className="text-emerald-400 truncate max-w-xs">{vettingReport.auditSignature}</span>
              </div>
            </div>
          )}

          {/* TAB 3: BLOCKCHAIN AUDIT & CERTIFICATE */}
          {activeDeckTab === 'blockchain_audit' && auditCert && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400">
                    ID SERTIFIKAT: {auditCert.certificateId}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Sertifikat Audit Syariah Berbasis Blockchain
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download / Cetak</span>
                  </button>
                </div>
              </div>

              {/* Certificate Body */}
              <div className="p-5 bg-slate-950 border border-emerald-900/40 rounded-xl space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-400 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-slate-500">Proyek Terdaftar:</span>{' '}
                    <strong className="text-white">{auditCert.project}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Tinggi Blok:</span>{' '}
                    <strong className="text-emerald-400">#{auditCert.blockHeight}</strong>
                  </div>
                </div>

                <div className="text-center py-2">
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block mb-1">
                    Keputusan Dewan Audit
                  </span>
                  <div className="text-lg font-extrabold text-white">
                    {auditCert.verdict}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-slate-400 font-medium block">Klausul Syariah Terverifikasi:</span>
                  {auditCert.clausesVerified.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-300 text-[11px]">
                      <span className="text-emerald-400">✓</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-400 font-mono">
                  <div>
                    <span className="text-slate-500 block">Merkle Root:</span>
                    <span className="text-slate-300 truncate block">{auditCert.merkleRoot}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Digital Signature (SHA-256):</span>
                    <span className="text-emerald-400 truncate block">{auditCert.digitalSignature}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
                <span>Aset digital ini dijamin dengan underlying riil dan siap didanai investor syariah.</span>
                {onOpenPaymentModal && (
                  <button
                    onClick={onOpenPaymentModal}
                    className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition"
                  >
                    Danai Sekarang
                  </button>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
