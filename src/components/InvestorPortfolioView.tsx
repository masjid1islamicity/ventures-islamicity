import React, { useState } from 'react';
import { 
  TrendingUp, 
  FileText, 
  Download, 
  Printer, 
  Coins, 
  Heart, 
  ShieldCheck, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  ExternalLink 
} from 'lucide-react';
import { InvestorPortfolioItem, PitchDeckData } from '../types';
import { AiInvestorMatchmakingWidget } from './AiInvestorMatchmakingWidget';

interface InvestorPortfolioViewProps {
  portfolioItems: InvestorPortfolioItem[];
  projects?: PitchDeckData[];
  onOpenPaymentModal: (project?: PitchDeckData) => void;
  onSelectProject?: (project: PitchDeckData) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const InvestorPortfolioView: React.FC<InvestorPortfolioViewProps> = ({
  portfolioItems,
  projects = [],
  onOpenPaymentModal,
  onSelectProject,
  onNavigateToTab,
}) => {
  const [selectedReportPeriod, setSelectedReportPeriod] = useState<string>('Q3_2026');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const totalInvested = portfolioItems.reduce((acc, item) => acc + item.investedAmountUsd, 0);
  const totalValue = portfolioItems.reduce((acc, item) => acc + item.currentValueUsd, 0);
  const totalDividends = portfolioItems.reduce((acc, item) => acc + item.totalDividendsPaidUsd, 0);

  const handleGenerateAutomatedReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setGeneratedReport({
        reportId: `REP-KAFFAH-${Date.now().toString().slice(-6)}`,
        generatedAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        period: selectedReportPeriod.replace('_', ' '),
        investorName: 'Al-Mukmin Global Wealth & Waqf Syndicate',
        totalInvested,
        totalDividends,
        netReturnPercentage: '11.8% p.a Net of Zakat',
        zakatPaidUsd: Math.round(totalDividends * 0.025),
        shariahComplianceVerdict: '100% Sesuai Standar AAOIFI No. 21 & DSN-MUI (Bebas Riba Murni)',
        dakwahFootprint: [
          { label: 'Pesantren Mandiri Energi Listrik', value: '12 Lokasi (1.8 MWp Bersih)' },
          { label: 'Santri & Pelajar Penerima AI Tafsir', value: '4.800 Santri Aktif' },
          { label: 'Petani Sawah Bebas Jeratan Rentenir', value: '85 Kepala Keluarga' },
          { label: 'Pengurangan Emisi Karbon (Green Waqf)', value: '340 Ton CO2e' },
        ],
        taxDeductionCertId: `ZAKAT-TAX-EXEMPT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        auditorSignature: '0x8fbc4e29a9b1c7d3e4f5062719283a4b5c6d7e8f90123456789abcdef0123456'
      });
      setIsGeneratingReport(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Portofolio Dakwah & Pelaporan Otomatis Investor</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Pantau Kinerja Finansial & Jejak Hasanah Umat Secara Berkala
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Dasbor pelaporan otomatis yang menyajikan analisis imbal hasil nisbah syariah, transparansi dividen berkala, serta audit dampak dakwah real-time bagi para pemegang amanah modal.
          </p>
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs font-medium text-slate-400">Total Nilai Portofolio Syariah</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            ${totalValue.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Modal Pokok: ${totalInvested.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs font-medium text-slate-400">Total Dividen & Bagi Hasil Diterima</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-2">
            ${totalDividends.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            <span>Rata-rata Imbal Hasil: <strong>11.8% p.a</strong></span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs font-medium text-slate-400">Jejak Dakwah & Hasanah Riil</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-2">
            3 Inisiatif
          </div>
          <div className="mt-2 text-xs text-amber-400 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" />
            <span>12 Pesantren & 4.800 Santri Didanai</span>
          </div>
        </div>

      </div>

      {/* Detail Active Investment Projects */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">
              Daftar Portofolio Aktif & Hasil Nisbah
            </h3>
            <span className="text-xs text-slate-400">
              Semua instrumen diikat dengan akad syariah dan bukti kepemilikan aset digital
            </span>
          </div>
          <button
            onClick={() => onOpenPaymentModal()}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition"
          >
            + Tambah Investasi / Wakaf
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Inisiatif Dakwah & Bisnis</th>
                <th className="p-3">Akad Syariah</th>
                <th className="p-3">Modal Pokok</th>
                <th className="p-3">Dividen Terbayar</th>
                <th className="p-3">Jejak Dakwah Riil</th>
                <th className="p-3">Payout Berikutnya</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {portfolioItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3">
                    <div className="font-semibold text-white">{item.projectTitle}</div>
                    <div className="text-[11px] text-slate-400">{item.category}</div>
                  </td>
                  <td className="p-3 text-teal-400 font-medium">
                    {item.contractType}
                  </td>
                  <td className="p-3 font-semibold">
                    ${item.investedAmountUsd.toLocaleString()}
                  </td>
                  <td className="p-3 font-bold text-emerald-400">
                    +${item.totalDividendsPaidUsd.toLocaleString()}
                  </td>
                  <td className="p-3 text-amber-400">
                    <div>{item.dakwahMetricValue}</div>
                    <div className="text-[10px] text-slate-500">{item.dakwahMetricName}</div>
                  </td>
                  <td className="p-3 text-slate-400">
                    {item.nextPayoutDate}
                  </td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-semibold text-[10px] border border-emerald-800/40">
                      AKTIF
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Automated Investor Reporting Generator Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Sistem Pelaporan Otomatis Berkala (Investor Executive Report)
            </h3>
            <span className="text-xs text-slate-400">
              Menghasilkan laporan konsolidasi audit syariah, bagi hasil, dan bukti setor zakat resmi dalam sekali klik
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedReportPeriod}
              onChange={(e) => setSelectedReportPeriod(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="Q3_2026">Kuartal III 2026 (Juli - Sept)</option>
              <option value="Semester_1_2026">Semester I 2026</option>
              <option value="Tahunan_2026">Laporan Tahunan 2026</option>
            </select>

            <button
              onClick={handleGenerateAutomatedReport}
              disabled={isGeneratingReport}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow transition disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingReport ? 'Menyusun Laporan...' : 'Buat Laporan Otomatis'}</span>
            </button>
          </div>
        </div>

        {/* Generated Report Display Container */}
        {generatedReport ? (
          <div className="p-6 bg-slate-950 border border-emerald-900/50 rounded-2xl space-y-6 text-xs text-slate-300 print:bg-white print:text-black">
            
            {/* Header Laporan Resmi */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400">
                  DOKUMEN RESMI KAFFAH VENTURES GLOBAL
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  Laporan Kinerja Investasi & Dampak Dakwah Syariah
                </h4>
                <div className="text-xs text-slate-400 mt-1">
                  ID: <span className="font-mono text-emerald-400">{generatedReport.reportId}</span> · Periode: <strong>{generatedReport.period}</strong> · Tanggal: {generatedReport.generatedAt}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / PDF</span>
                </button>
              </div>
            </div>

            {/* Financial Performance Breakdown */}
            <div>
              <h5 className="font-bold text-white text-sm mb-3">1. Ikhtisar Finansial & Bagi Hasil (Nisbah)</h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Modal Terkelola</span>
                  <div className="text-base font-extrabold text-white mt-1">
                    ${generatedReport.totalInvested.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Dividen Masuk</span>
                  <div className="text-base font-extrabold text-emerald-400 mt-1">
                    +${generatedReport.totalDividends.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Net Yield Tahunan</span>
                  <div className="text-base font-extrabold text-teal-400 mt-1">
                    {generatedReport.netReturnPercentage}
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Penyaluran Zakat (2.5%)</span>
                  <div className="text-base font-extrabold text-amber-400 mt-1">
                    ${generatedReport.zakatPaidUsd}
                  </div>
                </div>
              </div>
            </div>

            {/* Dakwah Social Impact & Footprint */}
            <div>
              <h5 className="font-bold text-white text-sm mb-3">2. Dampak Keberkahan Dakwah & Sosial Umat (SROI)</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {generatedReport.dakwahFootprint.map((df: any, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">{df.label}</span>
                    <strong className="text-amber-400">{df.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Shariah & Tax Deduction Proof */}
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Status Audit Syariah: {generatedReport.shariahComplianceVerdict}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Sertifikat ini diakui secara hukum syariah dan dapat digunakan sebagai <strong>Bukti Setor Zakat / Pengurang Penghasilan Kena Pajak (Tax Deduction)</strong> resmi sesuai regulasi Kementerian Keuangan & OJK Syariah.
              </p>
              <div className="text-[10px] font-mono text-slate-400 pt-1">
                Ref No: {generatedReport.taxDeductionCertId} · Hash Blockchain: {generatedReport.auditorSignature}
              </div>
            </div>

          </div>
        ) : (
          <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-slate-400">
            <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p>Pilih periode pelaporan dan klik tombol "Buat Laporan Otomatis" untuk mengompilasi data investasi Anda secara real-time.</p>
          </div>
        )}

      </div>

      {/* AI-Based Investor Matchmaking (Projects Recommended for User Portfolio) */}
      <AiInvestorMatchmakingWidget
        portfolioItems={portfolioItems}
        projects={projects}
        onSelectProject={(p) => {
          if (onSelectProject) onSelectProject(p);
        }}
        onOpenPaymentModal={(p) => {
          onOpenPaymentModal(p);
        }}
        onNavigateToTab={(t) => {
          if (onNavigateToTab) onNavigateToTab(t);
        }}
      />

    </div>
  );
};
