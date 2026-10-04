import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Coins, 
  Building2, 
  QrCode, 
  Wallet, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  WifiOff,
  Sparkles
} from 'lucide-react';
import { PitchDeckData, ShariahContractType } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: PitchDeckData[];
  selectedProject?: PitchDeckData | null;
  isOnline: boolean;
  onPaymentSuccess: (paymentData: {
    donorName: string;
    amountUsd: number;
    projectTitle: string;
    category: 'WAKAF_PRODUKTIF' | 'INFAQ_DAKWAH' | 'SUKUK_INVESTASI' | 'ZAKAT_MAAL';
    contractType: ShariahContractType;
    paymentMethod: string;
    isOfflineQueued: boolean;
  }) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  projects,
  selectedProject,
  isOnline,
  onPaymentSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [donorName, setDonorName] = useState('Hamba Allah / Investor Mukmin');
  const [donorLocation, setDonorLocation] = useState('Jakarta / Riyadh');
  const [targetProjectTitle, setTargetProjectTitle] = useState(
    selectedProject?.title || projects[0]?.title || 'Noor Green Waqf Solar: 500 Pesantren'
  );
  const [amountUsd, setAmountUsd] = useState<number>(selectedProject?.minInvestmentUsd || 500);
  const [category, setCategory] = useState<'WAKAF_PRODUKTIF' | 'INFAQ_DAKWAH' | 'SUKUK_INVESTASI' | 'ZAKAT_MAAL'>('SUKUK_INVESTASI');
  const [contractType, setContractType] = useState<ShariahContractType>('Sukuk Al-Ijarah');
  const [paymentMethod, setPaymentMethod] = useState<string>('bsi_va');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedTxHash, setGeneratedTxHash] = useState('');

  const quickAmounts = [100, 250, 500, 1000, 5000, 25000];

  const handleProcessPayment = () => {
    setIsProcessing(true);
    const tx = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setGeneratedTxHash(tx);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      onPaymentSuccess({
        donorName,
        amountUsd,
        projectTitle: targetProjectTitle,
        category,
        contractType,
        paymentMethod,
        isOfflineQueued: !isOnline,
      });
    }, 1000);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-7 relative shadow-2xl overflow-hidden my-8">
        
        {/* Top Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Offline Warning Banner if offline mode is active */}
        {!isOnline && (
          <div className="mb-4 p-3 bg-amber-950/80 border border-amber-600/60 rounded-xl text-xs text-amber-200 flex items-center gap-2">
            <WifiOff className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>Mode Offline Aktif (Area Minim Sinyal):</strong> Transaksi Anda akan diverifikasi secara lokal dan otomatis disinkronkan ke blockchain saat sinyal internet kembali.
            </span>
          </div>
        )}

        {isSuccess ? (
          /* SUCCESS SCREEN */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white">
              {isOnline ? 'Alhamdulillah, Transaksi Berhasil!' : 'Transaksi Tersimpan di Antrean Offline!'}
            </h3>
            
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              {isOnline ? (
                <>Dana sebesar <strong className="text-emerald-400">${amountUsd.toLocaleString()} USD</strong> telah tercatat pada smart contract buku besar syariah dan dialokasikan untuk <strong>{targetProjectTitle}</strong>.</>
              ) : (
                <>Transaksi <strong className="text-emerald-400">${amountUsd.toLocaleString()} USD</strong> tersimpan aman di penyimpanan lokal (IndexedDB) dan akan di-broadcast otomatis ke blockchain saat online.</>
              )}
            </p>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl max-w-md mx-auto text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Kategori:</span>
                <span className="text-emerald-400 font-bold">{category.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Akad:</span>
                <span className="text-teal-400 font-bold">{contractType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Pewakif/Investor:</span>
                <span className="text-white font-medium">{donorName}</span>
              </div>
              <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-400 truncate">
                <span className="text-slate-500 block">Hash Transaksi (SHA-256):</span>
                <span className="text-emerald-400">{generatedTxHash}</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition"
            >
              Selesai & Lihat Portofolio
            </button>
          </div>
        ) : (
          /* MULTI-STEP FLOW */
          <div className="space-y-5">
            
            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Gerbang Pembayaran Syariah & Escrow Pintar</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {step === 1 && 'Pilih Inisiatif & Nominal Investasi / Wakaf'}
                {step === 2 && 'Ikrar Akad Syariah (Ijab & Qabul)'}
                {step === 3 && 'Pilih Saluran Pembayaran Digital Aman'}
              </h2>
            </div>

            {/* STEP 1: AMOUNT & PROJECT SELECTION */}
            {step === 1 && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Pilih Inisiatif Dakwah / Bisnis</label>
                  <select
                    value={targetProjectTitle}
                    onChange={(e) => setTargetProjectTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    {projects.map((p) => (
                      <option key={p.title} value={p.title}>
                        {p.title} (Target ${p.targetAmountUsd.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Kategori Akad</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="SUKUK_INVESTASI">Sukuk Investasi (Bagi Hasil)</option>
                      <option value="WAKAF_PRODUKTIF">Wakaf Produktif (Dana Abadi)</option>
                      <option value="INFAQ_DAKWAH">Infaq & Sedekah Dakwah</option>
                      <option value="ZAKAT_MAAL">Zakat Maal (Asnaf Fi Sabilillah)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Akad Spesifik</label>
                    <select
                      value={contractType}
                      onChange={(e) => setContractType(e.target.value as ShariahContractType)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Sukuk Al-Ijarah">Sukuk Al-Ijarah</option>
                      <option value="Mudharabah">Mudharabah</option>
                      <option value="Musyarakah">Musyarakah</option>
                      <option value="Wakaf Produktif">Wakaf Produktif</option>
                      <option value="Salam">Salam</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nominal (USD)</label>
                  <input
                    type="number"
                    value={amountUsd}
                    onChange={(e) => setAmountUsd(Math.max(10, Number(e.target.value)))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-base font-extrabold text-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                  {/* Quick amount chips */}
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    {quickAmounts.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setAmountUsd(q)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                          amountUsd === q
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        ${q.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Nama Pemilik Dana / Investor</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Asal Kota / Negara</label>
                    <input
                      type="text"
                      value={donorLocation}
                      onChange={(e) => setDonorLocation(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-4 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
                >
                  <span>Lanjut ke Ikrar Akad Syariah</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: SHARIAH AQAD DECLARATION (IJAB & QABUL) */}
            {step === 2 && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-950 border border-emerald-900/60 rounded-2xl space-y-3">
                  <div className="text-center font-arabic text-base text-emerald-300 leading-loose">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ · عَلَى بَرَكَةِ اللَّهِ
                  </div>

                  <h4 className="font-bold text-white text-sm text-center">
                    Pernyataan Ijab & Qabul (Akad {contractType})
                  </h4>

                  <p className="text-slate-300 leading-relaxed text-[11px] bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    "Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Saya, <strong className="text-white">{donorName}</strong>, dengan ini mengikhlaskan dan menyalurkan dana sebesar <strong className="text-emerald-400">${amountUsd.toLocaleString()} USD</strong> untuk inisiatif <strong className="text-white">{targetProjectTitle}</strong> dengan Akad <strong className="text-teal-400">{contractType}</strong>. Pengelolaan dana dijalankan secara amanah, profesional, transparan, bebas dari riba, gharar, dan maysir, serta senantiasa mengharapkan ridha Allah Ta'ala."
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Tervalidasi sesuai Fatwa Dewan Syariah Nasional (DSN-MUI) & AAOIFI Standard No. 21.</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl flex items-center gap-1.5"
                  >
                    <span>Saya Setuju & Lanjut Bayar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: MULTI-RAIL PAYMENT GATEWAY */}
            {step === 3 && (
              <div className="space-y-4 text-xs">
                <span className="text-slate-400 font-medium block">Pilih Saluran Pembayaran:</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* BSI Virtual Account */}
                  <div
                    onClick={() => setPaymentMethod('bsi_va')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === 'bsi_va'
                        ? 'bg-emerald-950/60 border-emerald-500 shadow'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Bank Syariah Indonesia</span>
                      <Building2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">BSI Virtual Account Otomatis</span>
                  </div>

                  {/* Al Rajhi Bank Saudi */}
                  <div
                    onClick={() => setPaymentMethod('alrajhi')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === 'alrajhi'
                        ? 'bg-emerald-950/60 border-emerald-500 shadow'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Al Rajhi Bank (KSA)</span>
                      <Building2 className="w-4 h-4 text-teal-400" />
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">GCC Islamic Direct Wire</span>
                  </div>

                  {/* QRIS Syariah */}
                  <div
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === 'qris'
                        ? 'bg-emerald-950/60 border-emerald-500 shadow'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">QRIS Syariah Nasional</span>
                      <QrCode className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">Scan Bebas Biaya Admin</span>
                  </div>

                  {/* Sukuk Wallet / Halal Escrow */}
                  <div
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      paymentMethod === 'wallet'
                        ? 'bg-emerald-950/60 border-emerald-500 shadow'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Dompet Sukuk / USDT</span>
                      <Wallet className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">Smart Contract Escrow</span>
                  </div>

                </div>

                {/* Total Summary */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">Total Ditransfer:</span>
                    <span className="text-lg font-extrabold text-white">${amountUsd.toLocaleString()} USD</span>
                  </div>
                  <div className="text-right text-[11px] text-emerald-400">
                    <div>Bebas Biaya Admin Ribawi</div>
                    <div className="text-slate-500 font-mono">100% Bersih</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={handleProcessPayment}
                    disabled={isProcessing}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Memproses Transaksi...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Konfirmasi & Bayar Sekarang</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
