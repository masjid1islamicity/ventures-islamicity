/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { DashboardView } from './components/DashboardView';
import { InvestorDirectoryView } from './components/InvestorDirectoryView';
import { AiPitchDeckView } from './components/AiPitchDeckView';
import { BlockchainAuditView } from './components/BlockchainAuditView';
import { InvestorPortfolioView } from './components/InvestorPortfolioView';
import { PaymentModal } from './components/PaymentModal';
import { OfflineSyncDrawer } from './components/OfflineSyncDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';

import { 
  INITIAL_INVESTORS, 
  INITIAL_PROJECTS, 
  INITIAL_BLOCKS, 
  INITIAL_LIVE_DONATIONS, 
  INITIAL_USER_PORTFOLIO, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';

import { 
  GlobalInvestor, 
  PitchDeckData, 
  BlockchainBlock, 
  DonationLiveFeedItem, 
  InvestorPortfolioItem, 
  PushNotificationItem,
  OfflineActionQueueItem,
  BlockchainTransaction
} from './types';

import { 
  getOfflineQueue, 
  enqueueOfflineAction, 
  clearSyncedOfflineQueue 
} from './services/offlineStorage';
import { notificationService } from './services/notificationService';
import { createNewBlock } from './services/blockchain';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [investors, setInvestors] = useState<GlobalInvestor[]>(INITIAL_INVESTORS);
  const [projects, setProjects] = useState<PitchDeckData[]>(INITIAL_PROJECTS);
  const [blocks, setBlocks] = useState<BlockchainBlock[]>(INITIAL_BLOCKS);
  const [liveDonations, setLiveDonations] = useState<DonationLiveFeedItem[]>(INITIAL_LIVE_DONATIONS);
  const [portfolioItems, setPortfolioItems] = useState<InvestorPortfolioItem[]>(INITIAL_USER_PORTFOLIO);
  const [notifications, setNotifications] = useState<PushNotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [offlineQueue, setOfflineQueue] = useState<OfflineActionQueueItem[]>([]);
  
  // Modals state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedProjectForPayment, setSelectedProjectForPayment] = useState<PitchDeckData | null>(null);
  const [isOfflineDrawerOpen, setIsOfflineDrawerOpen] = useState(false);

  // Initialize online detector & offline queue
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => {
        setIsOnline(true);
        triggerAutoSync();
      };
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // Load queue
      setOfflineQueue(getOfflineQueue());

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  // Periodic Real-Time Simulation (simulates continuous live global donations & investor pledges)
  useEffect(() => {
    if (!isOnline) return;

    const interval = setInterval(() => {
      const mockGlobalDonors = [
        { name: 'Syeikh Abdulaziz Al-Falih', loc: 'Dammam, KSA', amt: 15000, cat: 'SUKUK_INVESTASI', projIndex: 0 },
        { name: 'Dr. Nurul Hidayah & Sindikat Santri', loc: 'Bandung, Indonesia', amt: 2500, cat: 'WAKAF_PRODUKTIF', projIndex: 1 },
        { name: 'Qatari Halal Angel Member', loc: 'Doha, Qatar', amt: 35000, cat: 'SUKUK_INVESTASI', projIndex: 2 },
        { name: 'Keluarga H. Zulkifli Hasan', loc: 'Kuala Lumpur, Malaysia', amt: 5000, cat: 'INFAQ_DAKWAH', projIndex: 3 },
      ];

      const chosen = mockGlobalDonors[Math.floor(Math.random() * mockGlobalDonors.length)];
      const targetProj = projects[chosen.projIndex] || projects[0];
      const txHash = '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

      const newDonation: DonationLiveFeedItem = {
        id: `don_${Date.now()}`,
        donorName: chosen.name,
        donorLocation: chosen.loc,
        amountUsd: chosen.amt,
        category: chosen.cat as any,
        targetProject: targetProj.title,
        timestamp: 'Baru saja',
        txHash,
      };

      setLiveDonations((prev) => [newDonation, ...prev.slice(0, 19)]);

      // Increment project raised amount
      setProjects((prev) =>
        prev.map((p, idx) =>
          idx === chosen.projIndex
            ? { ...p, currentRaisedUsd: p.currentRaisedUsd + chosen.amt }
            : p
        )
      );

      // Trigger subtle push alert
      if (Math.random() > 0.4) {
        const notif = notificationService.triggerPush(
          `Donasi Syariah Masuk: +$${chosen.amt.toLocaleString()} USD`,
          `${chosen.name} (${chosen.loc}) menyalurkan dana untuk ${targetProj.title}.`
        );
        setNotifications((prev) => [notif, ...prev.slice(0, 15)]);
      }
    }, 22000);

    return () => clearInterval(interval);
  }, [isOnline, projects]);

  // Handle Payment/Donation Completion
  const handlePaymentSuccess = async (paymentData: {
    donorName: string;
    amountUsd: number;
    projectTitle: string;
    category: 'WAKAF_PRODUKTIF' | 'INFAQ_DAKWAH' | 'SUKUK_INVESTASI' | 'ZAKAT_MAAL';
    contractType: any;
    paymentMethod: string;
    isOfflineQueued: boolean;
  }) => {
    if (paymentData.isOfflineQueued) {
      // Enqueue to offline storage
      const queuedItem = enqueueOfflineAction('INVESTMENT', paymentData);
      setOfflineQueue(getOfflineQueue());

      const notif = notificationService.triggerPush(
        'Transaksi Disimpan di Antrean Offline',
        `Penyaluran $${paymentData.amountUsd.toLocaleString()} USD untuk ${paymentData.projectTitle} tersimpan aman di perangkat dan akan disinkronkan saat online.`
      );
      setNotifications((prev) => [notif, ...prev]);
    } else {
      // Real-time online process
      const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

      // 1. Add to live donation feed
      const newDonation: DonationLiveFeedItem = {
        id: `don_${Date.now()}`,
        donorName: paymentData.donorName,
        donorLocation: 'Online Payment Gateway',
        amountUsd: paymentData.amountUsd,
        category: paymentData.category,
        targetProject: paymentData.projectTitle,
        timestamp: 'Baru saja',
        txHash: txHash.slice(0, 14) + '...',
      };
      setLiveDonations((prev) => [newDonation, ...prev]);

      // 2. Update projects currentRaised
      setProjects((prev) =>
        prev.map((p) =>
          p.title === paymentData.projectTitle
            ? { ...p, currentRaisedUsd: p.currentRaisedUsd + paymentData.amountUsd }
            : p
        )
      );

      // 3. Add to portfolio
      const newPortItem: InvestorPortfolioItem = {
        id: `port_${Date.now()}`,
        projectId: `proj_${Date.now()}`,
        projectTitle: paymentData.projectTitle,
        category: paymentData.category.replace('_', ' '),
        investedAmountUsd: paymentData.amountUsd,
        currentValueUsd: paymentData.amountUsd,
        totalDividendsPaidUsd: 0,
        nisbahRatio: 'Bagi Hasil 75 : 25',
        contractType: paymentData.contractType,
        startDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        lastPayoutDate: '-',
        nextPayoutDate: 'Bulan Depan',
        dakwahMetricValue: 'Telah Diverifikasi',
        dakwahMetricName: 'Jariyah Produktif',
        status: 'ACTIVE',
      };
      setPortfolioItems((prev) => [newPortItem, ...prev]);

      // 4. Create new block in blockchain
      const newTx: BlockchainTransaction = {
        txHash,
        from: '0xInvestorWallet...' + paymentData.donorName.slice(0, 4),
        to: '0xKaffahEscrowVault...77aa',
        amountUsd: paymentData.amountUsd,
        type: paymentData.category === 'WAKAF_PRODUKTIF' ? 'WAQF_DEED' : 'INVESTMENT',
        contractType: paymentData.contractType,
        timestamp: new Date().toISOString(),
        blockNumber: blocks[0].blockNumber + 1,
        status: 'CONFIRMED',
        projectTitle: paymentData.projectTitle,
        investorName: paymentData.donorName,
      };

      const newBlock = await createNewBlock(blocks[0], [newTx]);
      setBlocks((prev) => [newBlock, ...prev]);

      // 5. Push notification
      const notif = notificationService.triggerPush(
        'Investasi & Akad Syariah Dikonfirmasi!',
        `Alhamdulillah, transaksi $${paymentData.amountUsd.toLocaleString()} USD telah tercatat pada blok blockchain #${newBlock.blockNumber}.`
      );
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  // Sync Offline Queue to Blockchain when online
  const triggerAutoSync = async () => {
    const queue = getOfflineQueue();
    if (queue.length === 0) return;

    const newTxs: BlockchainTransaction[] = [];
    for (const item of queue) {
      if (item.actionType === 'INVESTMENT' || item.actionType === 'DONATION') {
        const payload = item.payload;
        newTxs.push({
          txHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
          from: '0xOfflineSynchronized...' + payload.donorName.slice(0, 4),
          to: '0xKaffahEscrowVault...77aa',
          amountUsd: payload.amountUsd || 500,
          type: 'INVESTMENT',
          contractType: payload.contractType || 'Sukuk Al-Ijarah',
          timestamp: new Date().toISOString(),
          blockNumber: blocks[0].blockNumber + 1,
          status: 'CONFIRMED',
          projectTitle: payload.projectTitle || 'Inisiatif Syariah',
          investorName: payload.donorName || 'Investor Terverifikasi',
        });
      }
    }

    if (newTxs.length > 0) {
      const newBlock = await createNewBlock(blocks[0], newTxs);
      setBlocks((prev) => [newBlock, ...prev]);
    }

    clearSyncedOfflineQueue();
    setOfflineQueue([]);

    const notif = notificationService.triggerPush(
      'Sinkronisasi Offline Selesai!',
      `${queue.length} transaksi tertunda berhasil di-broadcast dan dicatat ke dalam rantai blok blockchain.`
    );
    setNotifications((prev) => [notif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleOpenPayment = (project?: PitchDeckData) => {
    setSelectedProjectForPayment(project || null);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Sticky Top Header Navbar */}
      <HeaderNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOnline={isOnline}
        setIsOnline={setIsOnline}
        notifications={notifications}
        markAllNotificationsRead={markAllNotificationsRead}
        onOpenPaymentModal={() => handleOpenPayment()}
        onOpenOfflineDrawer={() => setIsOfflineDrawerOpen(true)}
        offlineQueueCount={offlineQueue.length}
        liveDonations={liveDonations}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {activeTab === 'dashboard' && (
          <DashboardView
            projects={projects}
            liveDonations={liveDonations}
            portfolioItems={portfolioItems}
            onSelectProject={(p) => {
              setSelectedProjectForPayment(p);
              setActiveTab('pitch-deck-ai');
            }}
            onOpenPaymentModal={handleOpenPayment}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'investors' && (
          <InvestorDirectoryView
            investors={investors}
            projects={projects}
            onPitchToInvestor={(inv) => {
              setActiveTab('pitch-deck-ai');
            }}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'pitch-deck-ai' && (
          <AiPitchDeckView
            onCommitToBlockchain={(pTitle, pHash) => {
              // Stamped
            }}
            onOpenPaymentModal={() => handleOpenPayment()}
          />
        )}

        {activeTab === 'blockchain' && (
          <BlockchainAuditView blocks={blocks} />
        )}

        {activeTab === 'portfolio' && (
          <InvestorPortfolioView
            portfolioItems={portfolioItems}
            projects={projects}
            onSelectProject={(p) => {
              setSelectedProjectForPayment(p);
              setActiveTab('pitch-deck-ai');
            }}
            onOpenPaymentModal={handleOpenPayment}
            onNavigateToTab={setActiveTab}
          />
        )}

      </main>

      {/* Payment Gateway Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        projects={projects}
        selectedProject={selectedProjectForPayment}
        isOnline={isOnline}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Offline Mode & Sync Drawer */}
      <OfflineSyncDrawer
        isOpen={isOfflineDrawerOpen}
        onClose={() => setIsOfflineDrawerOpen(false)}
        isOnline={isOnline}
        setIsOnline={setIsOnline}
        offlineQueue={offlineQueue}
        onTriggerSync={triggerAutoSync}
      />

      {/* Mobile Bottom Dock Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
