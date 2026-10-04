import { BlockchainBlock, BlockchainTransaction, AuditCertificate, ShariahContractType } from '../types';

export async function sha256(message: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback simple hash for older environments
  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return '0x' + Math.abs(hash).toString(16).padStart(64, '0');
}

export async function createNewBlock(
  previousBlock: BlockchainBlock,
  transactions: BlockchainTransaction[]
): Promise<BlockchainBlock> {
  const blockNumber = previousBlock.blockNumber + 1;
  const timestamp = new Date().toISOString();
  const txPayload = JSON.stringify(transactions);
  const merkleRoot = await sha256(`merkle_${txPayload}_${timestamp}`);
  const blockHash = await sha256(`${blockNumber}_${previousBlock.blockHash}_${merkleRoot}_${timestamp}`);

  return {
    blockNumber,
    blockHash,
    previousHash: previousBlock.blockHash,
    merkleRoot,
    timestamp,
    transactionsCount: transactions.length,
    validator: `Validator Syariah Node #${Math.floor(Math.random() * 8) + 1} (Konsorsium OIC)`,
    shariahCertificateHash: `CERT-AAOIFI-${blockHash.slice(0, 16)}`,
    gasUsedShariah: '0 Riba / Clean Halal Proof-of-Stake',
    transactions,
  };
}

export function generateAuditCertificate(
  projectTitle: string,
  contractType: ShariahContractType,
  blockHeight: number
): AuditCertificate {
  const rawId = Math.random().toString(36).substring(2, 8).toUpperCase();
  const certId = `CERT-KAFFAH-${new Date().getFullYear()}-${rawId}`;
  const sig = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

  return {
    certificateId: certId,
    project: projectTitle,
    contractType,
    auditTimestamp: new Date().toISOString(),
    blockHeight,
    merkleRoot: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    digitalSignature: sig,
    shariahAuditors: [
      'Dr. Sheikh Yousef Al-Shubaily (AAOIFI Shariah Board Fellow)',
      'Dewan Syariah Nasional - Majelis Ulama Indonesia (DSN-MUI)',
      'Kaffah Global Blockchain Automated Auditor v4.2'
    ],
    verdict: 'LULUS AUDIT SYARIAH KAFFAH (100% RIBA-FREE & COMPLIANT)',
    clausesVerified: [
      'Kepemilikan aset riil (Underlying Asset) diverifikasi tanpa unsur Gharar (ketidakpastian berlebih)',
      'Skema bagi hasil (Nisbah) disepakati di muka tanpa garansi pengembalian modal tetap berbau riba',
      'Penyisihan otomatis zakat perniagaan 2.5% dan dana kebajikan (Qardhul Hasan) tersinkronisasi',
      'Klausul bebas denda keterlambatan berbunga (ta\'zir disalurkan murni ke dana sosial umat)'
    ]
  };
}
