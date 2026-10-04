import React, { useState } from 'react';
import { 
  X, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Database, 
  CheckCircle2, 
  HardDrive, 
  Layers, 
  Send, 
  Clock 
} from 'lucide-react';
import { OfflineActionQueueItem } from '../types';
import { getCacheStatus } from '../services/offlineStorage';

interface OfflineSyncDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isOnline: boolean;
  setIsOnline: (status: boolean) => void;
  offlineQueue: OfflineActionQueueItem[];
  onTriggerSync: () => void;
}

export const OfflineSyncDrawer: React.FC<OfflineSyncDrawerProps> = ({
  isOpen,
  onClose,
  isOnline,
  setIsOnline,
  offlineQueue,
  onTriggerSync,
}) => {
  if (!isOpen) return null;

  const [isSyncing, setIsSyncing] = useState(false);
  const cacheStatus = getCacheStatus();

  const handleManualSync = async () => {
    setIsSyncing(true);
    await new Promise(r => setTimeout(r, 900));
    onTriggerSync();
    setIsSyncing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col justify-between p-6 overflow-y-auto">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Wifi className="w-5 h-5 text-emerald-400" />
              ) : (
                <WifiOff className="w-5 h-5 text-amber-400 animate-pulse" />
              )}
              <div>
                <h3 className="text-base font-bold text-white">
                  Pusat Sinkronisasi & Mode Offline
                </h3>
                <span className="text-[11px] text-slate-400">
                  {isOnline ? 'Terhubung ke Jaringan Global' : 'Mode Area Minim Sinyal (Offline)'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/60"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Toggle Button */}
          <div className="mt-5 p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">Simulasi Status Koneksi</span>
              <span className="text-[11px] text-slate-400">
                Uji coba fungsionalitas aplikasi saat di pedalaman / minim sinyal
              </span>
            </div>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                isOnline
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              }`}
            >
              {isOnline ? 'Putus Koneksi' : 'Sambungkan'}
            </button>
          </div>

          {/* Cache Storage Status */}
          <div className="mt-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Status Cache Lokal (IndexedDB & LocalStorage)
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Investor Tersimpan</span>
                <span className="font-extrabold text-white text-sm">8.240 Data</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">Siap offline</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Proyek & Pitch Deck</span>
                <span className="font-extrabold text-white text-sm">14 Dokumen</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">Full offline viewing</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 col-span-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Pembaruan Cache Terakhir</span>
                  <span className="text-xs text-slate-300">{cacheStatus.lastCachedAt}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase block">Ukuran Cache</span>
                  <span className="text-xs font-mono text-emerald-400">~1.48 MB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Offline Queue Items */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Antrean Transaksi Tertunda ({offlineQueue.length})
              </h4>
            </div>

            {offlineQueue.length === 0 ? (
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-center text-xs text-slate-500">
                Semua transaksi telah tersinkronisasi ke blockchain. Tidak ada antrean tertunda.
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {offlineQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">
                        {item.actionType === 'DONATION' || item.actionType === 'INVESTMENT'
                          ? `Donasi / Investasi: $${item.payload.amountUsd?.toLocaleString()} USD`
                          : 'Draft Pitch Deck AI'}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] bg-amber-950 text-amber-300 border border-amber-800/40 rounded">
                        MENUNGGU SYNC
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Tujuan: {item.payload.projectTitle || 'Inisiatif Baru'}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Dibuat pada: {new Date(item.createdAt).toLocaleTimeString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Sync Action */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={handleManualSync}
            disabled={!isOnline || offlineQueue.length === 0 || isSyncing}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-2 disabled:opacity-40"
          >
            {isSyncing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Menyinkronkan ke Blockchain...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Sinkronkan Sekarang ({offlineQueue.length})</span>
              </>
            )}
          </button>
          {!isOnline && (
            <span className="text-[11px] text-amber-400 text-center block">
              Aktifkan kembali koneksi online untuk menyinkronkan antrean.
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
