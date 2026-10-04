export type ShariahContractType = 
  | 'Mudharabah' 
  | 'Musyarakah' 
  | 'Sukuk Al-Ijarah' 
  | 'Wakaf Produktif' 
  | 'Murabahah' 
  | 'Salam' 
  | 'Istishna';

export type InvestorType = 
  | 'Family Office' 
  | 'Sovereign / Sukuk Fund' 
  | 'Shariah Venture Capital' 
  | 'Wakaf Global Endowment' 
  | 'Angel Syndicate';

export type Region = 
  | 'GCC (Riyadh, Dubai, Doha, Kuwait)' 
  | 'Southeast Asia (Jakarta, KL, Singapore)' 
  | 'Europe & UK (London, Zurich, Istanbul)' 
  | 'North America & Global Diaspora';

export interface GlobalInvestor {
  id: string;
  name: string;
  type: InvestorType;
  region: Region;
  headquarters: string;
  aumUsd: string;
  ticketSize: string;
  sectors: string[];
  preferredContracts: ShariahContractType[];
  shariahAdvisor: string;
  verifiedStatus: boolean;
  avatarUrl?: string;
  description: string;
  matchScore?: number;
  contactEmail: string;
  activePortfolioCount: number;
  compatibilityScore?: number;
  compatibilityGrade?: string;
  synergyReasons?: string[];
  recommendedPitchHook?: string;
}

export interface InvestorCompatibilityResult {
  investorId: string;
  compatibilityScore: number;
  compatibilityGrade: string;
  synergyReasons: string[];
  recommendedPitchHook: string;
  strategicFit: 'HIGH' | 'MEDIUM' | 'EMERGING';
}

export interface PitchDeckSlide {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  category: 'overview' | 'problem_solution' | 'market' | 'business_model' | 'traction' | 'financials' | 'shariah' | 'ask';
}

export interface PitchDeckData {
  title: string;
  tagline: string;
  description?: string;
  industry: string;
  contractType: ShariahContractType;
  targetAmountUsd: number;
  currentRaisedUsd: number;
  minInvestmentUsd: number;
  expectedAnnualReturn: string; // e.g. "12.5% - 16.0% Nisbah Bagi Hasil"
  daysLeft: number;
  founderName: string;
  shariahSupervisoryBoard: string;
  blockchainHash: string;
  aaoifiCompliant: boolean;
  dakwahImpact: {
    beneficiariesCount: number;
    beneficiaryLabel: string;
    socialRoiScore: number; // 0-100
    impactSummary: string;
    unSdgGoals: string[];
  };
  slides: PitchDeckSlide[];
  executiveSummary: string;
  problemStatement: string;
  solution: string;
  marketTam: string;
  marketSam: string;
  marketSom: string;
  financialProjections: { year: string; revenue: string; netProfit: string; projectedDividend: string }[];
  fundingAllocation: { category: string; percentage: number }[];
  imageUrl: string;
}

export interface PitchActionableItem {
  id: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'Kepatuhan Syariah' | 'Struktur Finansial' | 'Daya Tarik Pasar' | 'Dampak Dakwah' | 'Kesiapan Investor';
  title: string;
  recommendation: string;
  impactOnScore: string;
  shariahReference: string;
  applied?: boolean;
}

export interface PitchHealthScore {
  overallScore: number;
  grade: string;
  shariahStatus: 'COMPLIANT_KAFFAH' | 'MINOR_REVIEW_NEEDED' | 'NON_COMPLIANT';
  summaryVerdict: string;
  categoryBreakdown: {
    shariahPurity: { score: number; label: string; details: string };
    financialViability: { score: number; label: string; details: string };
    marketTraction: { score: number; label: string; details: string };
    dakwahImpact: { score: number; label: string; details: string };
    investorReadiness: { score: number; label: string; details: string };
  };
  actionableFeedback: PitchActionableItem[];
  topStrengths: string[];
}

export interface ShariahVettingReport {
  shariahScore: number;
  investmentFeasibilityScore: number;
  islamicityKaffahLevel: string;
  ribaGhararMaysirRisk: string;
  aaoifiStandardCompliance: string;
  socialImpactScore: number;
  investorFitCount: number;
  strengths: string[];
  recommendations: string[];
  blockchainAuditStatus: string;
  auditSignature: string;
}

export interface BlockchainTransaction {
  txHash: string;
  from: string;
  to: string;
  amountUsd: number;
  type: 'INVESTMENT' | 'DONATION' | 'DIVIDEND_PAYOUT' | 'WAQF_DEED' | 'AUDIT_TIMESTAMP';
  contractType: ShariahContractType;
  timestamp: string;
  blockNumber: number;
  status: 'CONFIRMED' | 'PENDING';
  projectTitle: string;
  investorName: string;
}

export interface BlockchainBlock {
  blockNumber: number;
  blockHash: string;
  previousHash: string;
  merkleRoot: string;
  timestamp: string;
  transactionsCount: number;
  validator: string;
  shariahCertificateHash: string;
  gasUsedShariah: string;
  transactions: BlockchainTransaction[];
}

export interface AuditCertificate {
  certificateId: string;
  project: string;
  contractType: string;
  auditTimestamp: string;
  blockHeight: number;
  merkleRoot: string;
  digitalSignature: string;
  shariahAuditors: string[];
  verdict: string;
  clausesVerified: string[];
}

export interface DonationLiveFeedItem {
  id: string;
  donorName: string;
  donorLocation: string;
  amountUsd: number;
  category: 'WAKAF_PRODUKTIF' | 'INFAQ_DAKWAH' | 'SUKUK_INVESTASI' | 'ZAKAT_MAAL';
  targetProject: string;
  timestamp: string;
  txHash: string;
}

export interface InvestorPortfolioItem {
  id: string;
  projectId: string;
  projectTitle: string;
  category: string;
  investedAmountUsd: number;
  currentValueUsd: number;
  totalDividendsPaidUsd: number;
  nisbahRatio: string;
  contractType: ShariahContractType;
  startDate: string;
  lastPayoutDate: string;
  nextPayoutDate: string;
  dakwahMetricValue: string;
  dakwahMetricName: string;
  status: 'ACTIVE' | 'MATURED';
}

export interface PushNotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'FINANCE' | 'DAKWAH_UPDATE' | 'AUDIT' | 'INVESTOR_ALERT';
  timestamp: string;
  read: boolean;
  linkAction?: string;
  txHash?: string;
}

export interface OfflineActionQueueItem {
  id: string;
  actionType: 'DONATION' | 'INVESTMENT' | 'PITCH_DRAFT';
  payload: any;
  createdAt: string;
  synced: boolean;
}
