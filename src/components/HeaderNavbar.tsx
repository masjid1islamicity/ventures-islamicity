import React, { useState } from 'react';
import { 
  Building2, 
  Globe2, 
  Bell, 
  Wifi, 
  WifiOff, 
  Sparkles, 
  ShieldCheck, 
  Coins, 
  TrendingUp, 
  CheckCircle2, 
  X,
  FileText,
  Blocks,
  Smartphone
} from 'lucide-react';
import { PushNotificationItem, DonationLiveFeedItem } from '../types';

interface HeaderNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOnline: boolean;
  setIsOnline: (status: boolean) => void;
  notifications: PushNotificationItem[];
  markAllNotificationsRead: () => void;
  onOpenPaymentModal: () => void;
  onOpenOfflineDrawer: () => void;
  offlineQueueCount: number;
  liveDonations: DonationLiveFeedItem[];
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  activeTab,
  setActiveTab,
  isOnline,
  setIsOnline,
  notifications,
  markAllNotificationsRead,
  onOpenPaymentModal,
  onOpenOfflineDrawer,
  offlineQueueCount,
  liveDonations,
}) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-emerald-900/30">
      {/* Top Banner: Real-time Live Ticker */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-800/20 px-3 py-1.5 text-xs text-slate-300 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400 tracking-wider text-[11px] uppercase">
              Live Real-Time Syariah Feed
            </span>
          </div>

          <div className="flex-1 overflow-x-auto no-scrollbar whitespace-nowrap flex items-center gap-6 text-[11px] text-slate-400">
            {liveDonations.slice(0, 4).map((d) => (
              <div key={d.id} className="inline-flex items-center gap-2">
                <span className="font-medium text-slate-200">{d.donorName}</span>
                <span className="text-slate-500">({d.donorLocation})</span>
                <span className="text-emerald-400 font-semibold">+${d.amountUsd.toLocaleString()}</span>
                <span className="text-slate-500 text-[10px] bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                  {d.category.replace('_', ' ')}
                </span>
                <span className="text-slate-600">·</span>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              AAOIFI Standard 21 Verified
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-medium">8.240 Investor Global Aktif</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 p-0.5 shadow-lg shadow-emerald-900/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white font-sans">
                  KAFFAH<span className="text-emerald-400">VENTURES</span>
                </span>
                <span className="hidden sm:inline font-arabic text-xs text-emerald-300 font-medium tracking-wide">
                  إسلامية كافة
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide hidden sm:block">
                AI Pitch Deck & 8000 Global Islamic Investors Superapp
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Dasbor & Donasi
            </button>
            <button
              onClick={() => setActiveTab('investors')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'investors'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              8.000 Investor Global
            </button>
            <button
              onClick={() => setActiveTab('pitch-deck-ai')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'pitch-deck-ai'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Pitch Deck AI Cerdas
            </button>
            <button
              onClick={() => setActiveTab('blockchain')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'blockchain'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Blocks className="w-3.5 h-3.5 text-teal-400" />
              Audit Blockchain
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'portfolio'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              Portofolio Dakwah
            </button>
          </nav>

          {/* Right Action Controls: Offline Mode Simulator, Notifications & CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Offline Simulator Switcher (critical for offline mode requirement) */}
            <div className="flex items-center">
              <button
                onClick={() => setIsOnline(!isOnline)}
                title={isOnline ? 'Klik untuk simulasi Mode Offline (Area Minim Sinyal)' : 'Klik untuk kembali Online'}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border transition-all ${
                  isOnline 
                    ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-emerald-600' 
                    : 'bg-amber-950/80 border-amber-600/80 text-amber-300 animate-pulse'
                }`}
              >
                {isOnline ? (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mode Offline</span>
                  </>
                )}
              </button>

              {/* Offline Queue Badge button */}
              {offlineQueueCount > 0 && (
                <button
                  onClick={onOpenOfflineDrawer}
                  className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded-full hover:bg-amber-400 transition"
                  title="Ada transaksi tertunda di offline queue"
                >
                  {offlineQueueCount} Antrean
                </button>
              )}
            </div>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition"
                aria-label="Notifikasi Push"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950 animate-pulse" />
                )}
              </button>

              {/* Dropdown Panel */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-white">Notifikasi Proyek & Dividen</span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300"
                      >
                        Tandai semua dibaca
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        Tidak ada notifikasi baru
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 text-xs hover:bg-slate-800/40 transition ${
                            !n.read ? 'bg-emerald-950/20' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-slate-200">{n.title}</span>
                            <span className="text-[10px] text-slate-500 shrink-0">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-400 mt-1 text-[11px]">{n.message}</p>
                          {n.txHash && (
                            <div className="mt-1 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Tx: {n.txHash.slice(0, 10)}...{n.txHash.slice(-6)}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 bg-slate-950/60 border-t border-slate-800 text-center text-[11px] text-slate-400">
                    Push Notification Otomatis Terhubung
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Button: Donasi / Investasi Cepat */}
            <button
              onClick={onOpenPaymentModal}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-emerald-900/30 transition-all hover:scale-[1.02]"
            >
              <Coins className="w-4 h-4" />
              <span>Investasi & Donasi</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
