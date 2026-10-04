import { 
  GlobalInvestor, 
  PitchDeckData, 
  BlockchainBlock, 
  DonationLiveFeedItem, 
  InvestorPortfolioItem, 
  PushNotificationItem 
} from '../types';

export const INITIAL_INVESTORS: GlobalInvestor[] = [
  {
    id: 'inv-01',
    name: 'Al-Rajhi Heritage Family Office',
    type: 'Family Office',
    region: 'GCC (Riyadh, Dubai, Doha, Kuwait)',
    headquarters: 'Riyadh, Kingdom of Saudi Arabia',
    aumUsd: '$3.8 Miliar',
    ticketSize: '$500K - $15M',
    sectors: ['Edu-Dakwah AI', 'Waqf Green Energy', 'Halal FinTech'],
    preferredContracts: ['Mudharabah', 'Sukuk Al-Ijarah', 'Wakaf Produktif'],
    shariahAdvisor: 'Dr. Sheikh Yousef Al-Shubaily (AAOIFI Board)',
    verifiedStatus: true,
    description: 'Fokus pada pembangunan infrastruktur umat dan venture berteknologi tinggi yang mematuhi 100% prinsip Islamicity Kaffah tanpa kompromi syariah.',
    matchScore: 98,
    contactEmail: 'mandate@alrajhi-heritage.sa',
    activePortfolioCount: 34
  },
  {
    id: 'inv-02',
    name: 'Dubai Islamic Future Ventures (DIFV)',
    type: 'Shariah Venture Capital',
    region: 'GCC (Riyadh, Dubai, Doha, Kuwait)',
    headquarters: 'DIFC, Dubai, UAE',
    aumUsd: '$1.4 Miliar',
    ticketSize: '$250K - $5M',
    sectors: ['Global Halal Supply Chain', 'Islamic MedTech', 'Edu-Dakwah AI'],
    preferredContracts: ['Musyarakah', 'Mudharabah'],
    shariahAdvisor: 'Dar Al Sharia Legal & Financial Consultancy',
    verifiedStatus: true,
    description: 'Venture Capital syariah global terkemuka yang mendukung inovasi disrupsi teknologi halal dan akselerasi platform dakwah digital berskala internasional.',
    matchScore: 95,
    contactEmail: 'investments@difv.ae',
    activePortfolioCount: 48
  },
  {
    id: 'inv-03',
    name: 'Khazanah Ummah Sovereign Sukuk Pool',
    type: 'Sovereign / Sukuk Fund',
    region: 'Southeast Asia (Jakarta, KL, Singapore)',
    headquarters: 'Kuala Lumpur, Malaysia',
    aumUsd: '$6.2 Miliar',
    ticketSize: '$1M - $50M',
    sectors: ['Waqf Green Energy', 'AgriTech Syariah', 'Infrastruktur Dakwah'],
    preferredContracts: ['Sukuk Al-Ijarah', 'Istishna', 'Wakaf Produktif'],
    shariahAdvisor: 'Securities Commission Malaysia Shariah Advisory Council',
    verifiedStatus: true,
    description: 'Pendanaan sukuk hijau dan wakaf produktif skala megaprojek untuk ketahanan pangan syariah dan kemandirian energi pesantren di seluruh ASEAN.',
    matchScore: 94,
    contactEmail: 'sukuk-allocations@khazanah-ummah.gov.my',
    activePortfolioCount: 62
  },
  {
    id: 'inv-04',
    name: 'BSI Ventura Syariah Mandiri',
    type: 'Shariah Venture Capital',
    region: 'Southeast Asia (Jakarta, KL, Singapore)',
    headquarters: 'Jakarta, Indonesia',
    aumUsd: '$680 Juta',
    ticketSize: '$100K - $3M',
    sectors: ['Halal FinTech', 'Edu-Dakwah AI', 'AgriTech Syariah'],
    preferredContracts: ['Mudharabah', 'Musyarakah', 'Murabahah'],
    shariahAdvisor: 'Dewan Syariah Nasional - Majelis Ulama Indonesia (DSN-MUI)',
    verifiedStatus: true,
    description: 'Mitra modal ventura syariah terbesar di Indonesia yang berorientasi pada pemberdayaan ekonomi umat, pesantren preneur, dan ekosistem halal kaffah.',
    matchScore: 97,
    contactEmail: 'syndicate@bsiventura.co.id',
    activePortfolioCount: 52
  },
  {
    id: 'inv-05',
    name: 'Qatar Awqaf Global Endowment Authority',
    type: 'Wakaf Global Endowment',
    region: 'GCC (Riyadh, Dubai, Doha, Kuwait)',
    headquarters: 'Doha, State of Qatar',
    aumUsd: '$4.9 Miliar',
    ticketSize: '$500K - $20M',
    sectors: ['Edu-Dakwah AI', 'Pemberdayaan Santri', 'Waqf Green Energy'],
    preferredContracts: ['Wakaf Produktif', 'Sukuk Al-Ijarah'],
    shariahAdvisor: 'Ministry of Endowments and Islamic Affairs (Awqaf Qatar)',
    verifiedStatus: true,
    description: 'Badan wakaf abadi global yang mengelola dana abadi untuk riset kecerdasan buatan Islam, digitalisasi manuskrip Al-Quran, dan sekolah Islam terdepan.',
    matchScore: 96,
    contactEmail: 'initiatives@awqaf-qatar.qa',
    activePortfolioCount: 88
  },
  {
    id: 'inv-06',
    name: 'Baraka UK Islamic Wealth Syndicate',
    type: 'Angel Syndicate',
    region: 'Europe & UK (London, Zurich, Istanbul)',
    headquarters: 'Mayfair, London, United Kingdom',
    aumUsd: '$420 Juta',
    ticketSize: '$50K - $1M',
    sectors: ['Halal FinTech', 'Global Halal Supply Chain', 'Islamic MedTech'],
    preferredContracts: ['Musyarakah', 'Mudharabah'],
    shariahAdvisor: 'Dr. Faizal Ahmad Manjoo (UK Shariah Scholar Council)',
    verifiedStatus: true,
    description: 'Sindikat 450+ high-net-worth muslim professionals dan angel investors di London, Frankfurt, dan Zurich yang mencari startup syariah berdampak global.',
    matchScore: 91,
    contactEmail: 'deals@baraka-syndicate.co.uk',
    activePortfolioCount: 29
  },
  {
    id: 'inv-07',
    name: 'Istanbul Halal Impact Partners',
    type: 'Shariah Venture Capital',
    region: 'Europe & UK (London, Zurich, Istanbul)',
    headquarters: 'Levent, Istanbul, Türkiye',
    aumUsd: '$550 Juta',
    ticketSize: '$150K - $2.5M',
    sectors: ['Global Halal Supply Chain', 'AgriTech Syariah', 'Edu-Dakwah AI'],
    preferredContracts: ['Mudharabah', 'Murabahah'],
    shariahAdvisor: 'Participation Banks Association of Turkey (TKBB)',
    verifiedStatus: true,
    description: 'Menjembatani ekosistem teknologi halal Eropa, Timur Tengah, dan Asia Tengah dengan standardisasi kualitas dan sertifikasi halal digital.',
    matchScore: 92,
    contactEmail: 'partner@istanbulhalal.tr',
    activePortfolioCount: 22
  },
  {
    id: 'inv-08',
    name: 'Silicon Valley Crescent Angel Network',
    type: 'Angel Syndicate',
    region: 'North America & Global Diaspora',
    headquarters: 'Palo Alto, California, USA',
    aumUsd: '$310 Juta',
    ticketSize: '$50K - $750K',
    sectors: ['Edu-Dakwah AI', 'Halal FinTech', 'Islamic MedTech'],
    preferredContracts: ['Musyarakah', 'Mudharabah'],
    shariahAdvisor: 'Islamic Fiqh Academy of North America',
    verifiedStatus: true,
    description: 'Komunitas insinyur teknologi senior dan investor muslim Amerika Utara yang mendedikasikan modal dan mentorship untuk startup syariah kaffah berkelas dunia.',
    matchScore: 93,
    contactEmail: 'syndicate@crescentangels.org',
    activePortfolioCount: 19
  }
];

export const INITIAL_PROJECTS: PitchDeckData[] = [
  {
    title: 'Noor Green Waqf Solar: 500 Pesantren Mandiri Energi',
    tagline: 'Infrastruktur Pembangkit Listrik Surya Berbasis Sukuk Wakaf Produktif dengan Smart-Grid IoT',
    industry: 'Waqf Green Energy & Sustainability',
    contractType: 'Sukuk Al-Ijarah',
    targetAmountUsd: 3500000,
    currentRaisedUsd: 3185000,
    minInvestmentUsd: 500,
    expectedAnnualReturn: '12.4% Sukuk Yield + Hasanah Sosial',
    daysLeft: 14,
    founderName: 'Ir. H. Muhammad Taufiq, M.Sc & Konsorsium Pesantren',
    shariahSupervisoryBoard: 'Prof. Dr. KH. Didin Hafidhuddin & Dewan Syariah Sukuk Hijau',
    blockchainHash: '0x7e8b912a3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f90123456789abcdef0123456',
    aaoifiCompliant: true,
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    dakwahImpact: {
      beneficiariesCount: 142000,
      beneficiaryLabel: 'Santri & Warga Sekitar Pondok',
      socialRoiScore: 98,
      impactSummary: 'Menghemat 68% beban operasional listrik pesantren untuk dialihkan penuh ke beasiswa santri yatim dan penghafal Al-Quran.',
      unSdgGoals: ['Energi Bersih (SDG 7)', 'Pendidikan Berkualitas (SDG 4)', 'Aksi Iklim (SDG 13)']
    },
    executiveSummary: 'Noor Green Waqf mengonversi atap 500 pesantren di Indonesia dan Asia Tenggara menjadi instalasi solar panel pintar terdesentralisasi, menghasilkan energi bersih 12.8 MWp yang dijamin dengan kontrak sewa Ijarah selama 15 tahun.',
    problemStatement: 'Beban tagihan listrik konvensional menyerap hingga 35% anggaran operasional pesantren, membatasi alokasi dana beasiswa pendidikan santri duafa.',
    solution: 'Penyediaan PLTS Atap pintar tanpa modal awal bagi pesantren melalui skema Sukuk Al-Ijarah berimbal hasil stabil dan bernilai jariyah abadi.',
    marketTam: '$14.2 Miliar (Potensi Wakaf Energi Terbarukan Dunia Islam)',
    marketSam: '$1.8 Miliar (Kebutuhan Fasilitas Keagamaan & Pendidikan ASEAN)',
    marketSom: '$35 Juta (Fase 1: 500 Pesantren Terpilih)',
    financialProjections: [
      { year: '2026', revenue: '$640,000', netProfit: '$420,000', projectedDividend: '11.8%' },
      { year: '2027', revenue: '$1,850,000', netProfit: '$1,290,000', projectedDividend: '12.4%' },
      { year: '2028', revenue: '$3,400,000', netProfit: '$2,480,000', projectedDividend: '13.2%' },
    ],
    fundingAllocation: [
      { category: 'Pengadaan Solar PV Tier 1 & Inverter Cerdas', percentage: 55 },
      { category: 'Pemasangan Smart Grid IoT & Baterai Lifepo4', percentage: 25 },
      { category: 'Dana Abadi Pemeliharaan & Beasiswa Santri', percentage: 15 },
      { category: 'Audit Kepatuhan Syariah & Smart Contract', percentage: 5 },
    ],
    slides: [
      {
        id: 's1',
        title: 'Ringkasan Eksekutif & Misi Dakwah',
        subtitle: 'Sinergi Energi Surya Hijau & Kemandirian Ekonomi Pesantren',
        content: 'Noor Green Waqf menggabungkan instrumen Sukuk Ijarah dan wakaf produktif untuk menyediakan listrik bersih bagi 500 pesantren.',
        highlights: ['500 Pesantren Binaan Terverifikasi', '12.8 MWp Total Kapasitas Terpasang', '100% Sertifikasi AAOIFI Sukuk Ijarah'],
        metrics: [
          { label: 'Kapasitas', value: '12.8 MWp' },
          { label: 'Penghematan Biaya', value: '68%' },
          { label: 'Imbal Hasil Sukuk', value: '12.4% p.a' },
        ],
        category: 'overview'
      },
      {
        id: 's2',
        title: 'Masalah Nyata Umat',
        subtitle: 'Ketergantungan Energi Fosil & Tingginya Biaya Operasional',
        content: 'Pesantren menampung ribuan santri namun 35% kas habis untuk listrik PLN, sementara atap ribuan gedung pesantren terpapar sinar matahari tropis tanpa termanfaatkan.',
        highlights: ['Biaya listrik rata-rata Rp 45 jt/bulan per pondok', 'Risiko pemadaman mengganggu kajian kitab & tahfiz', 'Belum tersentuh pendanaan hijau global'],
        category: 'problem_solution'
      },
      {
        id: 's3',
        title: 'Arsitektur Akad Syariah Kaffah',
        subtitle: 'Akad Sukuk Al-Ijarah Mawsufah fi al-Dhimmah',
        content: 'Investor menyertakan modal untuk pembangunan aset PLTS. Pesantren menyewa manfaat listrik melalui akad Ijarah dengan tarif hemat terjangkau.',
        highlights: ['Kepemilikan aset riil (Underlying Asset)', 'Bebas Riba, Gharar, dan Spekulasi', 'Dana dikunci dalam escrow smart contract syariah'],
        category: 'shariah'
      }
    ]
  },
  {
    title: 'Al-Furqan: Islamic AI & Quranic Intelligence Platform',
    tagline: 'Kecerdasan Buatan Islamicity Kaffah Pertama dengan Sanad Ulama & Rujukan Kitab Turats Terotentikasi',
    industry: 'Edu-Dakwah AI & Digital Halal Content',
    contractType: 'Mudharabah',
    targetAmountUsd: 1200000,
    currentRaisedUsd: 984000,
    minInvestmentUsd: 250,
    expectedAnnualReturn: '16.5% Estimasi Nisbah Bagi Hasil',
    daysLeft: 8,
    founderName: 'Dr. Zaki Al-Habsyi & Tim AI Ustadz/Data Scientist',
    shariahSupervisoryBoard: 'Majelis Ulama Fatwa Digital & AAOIFI Technology Council',
    blockchainHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    aaoifiCompliant: true,
    imageUrl: 'https://images.unsplash.com/photo-1584281722576-905786807897?auto=format&fit=crop&w=1200&q=80',
    dakwahImpact: {
      beneficiariesCount: 850000,
      beneficiaryLabel: 'Pelajar, Santri & Muallaf Global',
      socialRoiScore: 99,
      impactSummary: 'Menyediakan akses fatwa tervalidasi dan pembelajaran tafsir Al-Quran berstandar sanad dalam 24 bahasa tanpa distorsi algoritma barat.',
      unSdgGoals: ['Pendidikan Berkualitas (SDG 4)', 'Inovasi & Infrastruktur (SDG 9)', 'Kemitraan Global (SDG 17)']
    },
    executiveSummary: 'Al-Furqan menghadirkan LLM dan Agentic Knowledge Graph Islam berbasis 50.000 kitab tafsir, hadits shahih, dan fatwa empat mazhab, melayani 850.000 pengguna aktif di 32 negara.',
    problemStatement: 'Banyak AI generatif saat ini mengalami halusinasi teks agama, mencampurkan hadits palsu, dan memberikan panduan fiqih yang keliru.',
    solution: 'Mesin AI dengan verifikasi sanad bertingkat dan kriptografi syariah pada setiap kutipan ayat dan dalil fiqih.',
    marketTam: '$2.8 Miliar (EdTech Islam & Layanan Dakwah Digital Dunia)',
    marketSam: '$420 Juta (Pasar Konten Edukasi Islam Berlangganan)',
    marketSom: '$28 Juta (Penetrasi Awal Mahasiswa & Lembaga Dakwah)',
    financialProjections: [
      { year: '2026', revenue: '$480,000', netProfit: '$210,000', projectedDividend: '14.0%' },
      { year: '2027', revenue: '$1,650,000', netProfit: '$820,000', projectedDividend: '16.5%' },
      { year: '2028', revenue: '$4,200,000', netProfit: '$2,350,000', projectedDividend: '19.0%' },
    ],
    fundingAllocation: [
      { category: 'Penyempurnaan Dataset Turats & Pelatihan Model GPU', percentage: 45 },
      { category: 'Audit Sanad Ulama & Dewan Fiqih Multinasional', percentage: 25 },
      { category: 'Pemasaran Global & Distribusi di Kampus Islam', percentage: 20 },
      { category: 'Infrastruktur Keamanan & Blockchain Hashing', percentage: 10 },
    ],
    slides: [
      {
        id: 's1',
        title: 'Revolusi Pengetahuan Islam Digital',
        subtitle: 'AI Generatif Pertama dengan Integritas Sanad Kaffah',
        content: 'Menghubungkan generasi digital dengan khazanah keilmuan Islam secara akurat, ilmiah, dan beradab.',
        highlights: ['50.000+ Kitab Turats Terindeks', 'Didukung Dewan Ulama 4 Mazhab', 'Response Latency < 400ms'],
        category: 'overview'
      }
    ]
  },
  {
    title: 'HalalTrace: Global FoodTech & Blockchain Supply Chain',
    tagline: 'Platform Pelacakan Sertifikasi Halal End-to-End dari Peternakan hingga Konsumen Global',
    industry: 'Global Halal Supply Chain & IoT',
    contractType: 'Musyarakah',
    targetAmountUsd: 2000000,
    currentRaisedUsd: 1280000,
    minInvestmentUsd: 1000,
    expectedAnnualReturn: '15.2% Nisbah Dividen Saham Syariah',
    daysLeft: 22,
    founderName: 'Ahmad Farid Budiman & Asosiasi RPH Halal Modern',
    shariahSupervisoryBoard: 'Lembaga Pemeriksa Halal LPH & Halal Authority Malaysia',
    blockchainHash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
    aaoifiCompliant: true,
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    dakwahImpact: {
      beneficiariesCount: 4200000,
      beneficiaryLabel: 'Konsumen Halal Terlindungi Thoyyib',
      socialRoiScore: 95,
      impactSummary: 'Menjamin 100% kehalalan dan ke-thoyyiban makanan bagi keluarga muslim serta mencegah pemalsuan sertifikat halal internasional.',
      unSdgGoals: ['Tanpa Kelaparan (SDG 2)', 'Konsumsi Bertanggung Jawab (SDG 12)', 'Industri & Inovasi (SDG 9)']
    },
    executiveSummary: 'HalalTrace menyematkan sensor IoT dan smart contract tamper-proof pada setiap batch logistik daging dan makanan halal, menghubungkan produsen di Brazil, Australia, Indonesia, dan Arab Saudi.',
    problemStatement: 'Skandal pemalsuan label halal dan kontaminasi rantai pasok non-halal menimbulkan kerugian kepercayaan triliunan rupiah setiap tahun.',
    solution: 'Verifikasi instan via scan QR blockchain yang menampilkan video penyembelihan syariah dan bukti tes DNA halal.',
    marketTam: '$1.9 Triliun (Industri Makanan Halal Dunia)',
    marketSam: '$280 Miliar (Logistik Halal Dingin & Sertifikasi Digital)',
    marketSom: '$40 Juta (Ekspor Daging Sapi & Unggas OIC)',
    financialProjections: [
      { year: '2026', revenue: '$820,000', netProfit: '$310,000', projectedDividend: '12.5%' },
      { year: '2027', revenue: '$2,400,000', netProfit: '$1,050,000', projectedDividend: '15.2%' },
      { year: '2028', revenue: '$5,900,000', netProfit: '$2,800,000', projectedDividend: '17.8%' },
    ],
    fundingAllocation: [
      { category: 'Pemasangan Sensor IoT & Blockchain Gateway', percentage: 40 },
      { category: 'Integrasi dengan BPJPH, JAKIM, dan SFDA Saudi', percentage: 30 },
      { category: 'Ekspansi Port Logistik di Jakarta, Dubai, & Rotterdam', percentage: 20 },
      { category: 'Sertifikasi Keamanan Siber & ISO Halal', percentage: 10 },
    ],
    slides: []
  },
  {
    title: 'Baitul Maal Micro-Agri Waqf: 50.000 Petani Berdaya',
    tagline: 'Pembiayaan Tani Tanpa Riba Berbasis Akad Salam & Wakaf Sawah Produktif Terintegrasi',
    industry: 'AgriTech Syariah & Food Security',
    contractType: 'Salam',
    targetAmountUsd: 850000,
    currentRaisedUsd: 654500,
    minInvestmentUsd: 100,
    expectedAnnualReturn: '11.5% Imbal Hasil Komoditas Padi',
    daysLeft: 11,
    founderName: 'H. Suryadi Pranoto & Serikat Petani Santri Mukim',
    shariahSupervisoryBoard: 'Dewan Syariah Pemberdayaan Petani Baitul Maal',
    blockchainHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f90123456789abcdef0123456789a1b2c',
    aaoifiCompliant: true,
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    dakwahImpact: {
      beneficiariesCount: 50000,
      beneficiaryLabel: 'Petani Duafa Terbebas dari Tengkulak Riba',
      socialRoiScore: 97,
      impactSummary: 'Memutus jeratan renternir bagi 50.000 petani desa dengan modal bibit unggul, pupuk organik, dan jaminan off-taker beras halal.',
      unSdgGoals: ['Tanpa Kemiskinan (SDG 1)', 'Pekerjaan Layak (SDG 8)', 'Ekosistem Daratan (SDG 15)']
    },
    executiveSummary: 'Baitul Maal Micro-Agri menyalurkan pembiayaan pra-panen via akad Salam yang sah syariah, menggarap 12.000 hektar sawah wakaf produktif dengan transparansi timbangan digital.',
    problemStatement: 'Petani kecil tercekik bunga renternir hingga 40% per musim tanam, menyebabkan kemiskinan struktural berulang di pedesaan.',
    solution: 'Akad Salam syariah: Pembelian hasil panen di muka dengan harga adil, didukung asuransi syariah (takaful) gagal panen.',
    marketTam: '$650 Miliar (Ekonomi Agribisnis Komoditas Halal OIC)',
    marketSam: '$85 Miliar (Pembiayaan Mikro Pertanian ASEAN)',
    marketSom: '$15 Juta (Klaster Padi & Kedelai Organik Terpilih)',
    financialProjections: [
      { year: '2026', revenue: '$390,000', netProfit: '$140,000', projectedDividend: '10.5%' },
      { year: '2027', revenue: '$980,000', netProfit: '$390,000', projectedDividend: '11.5%' },
      { year: '2028', revenue: '$2,100,000', netProfit: '$920,000', projectedDividend: '12.8%' },
    ],
    fundingAllocation: [
      { category: 'Modal Kerja Pengadaan Pupuk Organik & Benih Unggul', percentage: 50 },
      { category: 'Pembangunan Gudang Dryer & Penggilingan Beras Modern', percentage: 30 },
      { category: 'Dana Takaful Syariah Cadangan Gagal Panen', percentage: 12 },
      { category: 'Aplikasi Tani Syariah & Edukasi Fiqih Muamalah', percentage: 8 },
    ],
    slides: []
  }
];

export const INITIAL_BLOCKS: BlockchainBlock[] = [
  {
    blockNumber: 1849204,
    blockHash: '0x0000a4f89d31c2e4b5062719283a4b5c6d7e8f90123456789abcdef012345678',
    previousHash: '0x000093e78c20b1d3a405160817293a3b4c5d6e7f89012345678abcdef0123456',
    merkleRoot: '0x4c2b9a7f3e1d6805bb5f928490a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9',
    timestamp: '2026-10-03T18:40:00Z',
    transactionsCount: 18,
    validator: 'Validator Syariah Node #01 (BSI - Riyadh Consortium)',
    shariahCertificateHash: 'CERT-AAOIFI-0x89ab12cd34ef56',
    gasUsedShariah: '0 Riba / Clean Halal Proof-of-Stake',
    transactions: [
      {
        txHash: '0x3f9e8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f',
        from: '0xAlRajhiFamilyVault...39b4',
        to: '0xNoorGreenWaqfSmartContract...7a11',
        amountUsd: 500000,
        type: 'INVESTMENT',
        contractType: 'Sukuk Al-Ijarah',
        timestamp: '2026-10-03T18:38:12Z',
        blockNumber: 1849204,
        status: 'CONFIRMED',
        projectTitle: 'Noor Green Waqf Solar: 500 Pesantren',
        investorName: 'Al-Rajhi Heritage Family Office'
      },
      {
        txHash: '0x8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c',
        from: '0xDubaiIslamicFund...88cf',
        to: '0xAlFurqanKnowledgeVault...33d2',
        amountUsd: 250000,
        type: 'INVESTMENT',
        contractType: 'Mudharabah',
        timestamp: '2026-10-03T18:39:45Z',
        blockNumber: 1849204,
        status: 'CONFIRMED',
        projectTitle: 'Al-Furqan: Islamic AI & Quranic Intelligence',
        investorName: 'Dubai Islamic Future Ventures'
      }
    ]
  },
  {
    blockNumber: 1849203,
    blockHash: '0x000093e78c20b1d3a405160817293a3b4c5d6e7f89012345678abcdef0123456',
    previousHash: '0x000082d67b19a0c293f405f70618292a3b4c5d6e78901234567abcdef012345',
    merkleRoot: '0x7b1c3d5e9f2a4b6c8d0e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c',
    timestamp: '2026-10-03T18:30:00Z',
    transactionsCount: 24,
    validator: 'Validator Syariah Node #02 (Khazanah SC Malaysia)',
    shariahCertificateHash: 'CERT-DSNMUI-0x12cd34ef5678ab',
    gasUsedShariah: '0 Riba / Clean Halal Proof-of-Stake',
    transactions: [
      {
        txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
        from: '0xHajiAhmadMunir...14ef',
        to: '0xBaitulMaalAgriContract...99a0',
        amountUsd: 15000,
        type: 'DONATION',
        contractType: 'Wakaf Produktif',
        timestamp: '2026-10-03T18:29:10Z',
        blockNumber: 1849203,
        status: 'CONFIRMED',
        projectTitle: 'Baitul Maal Micro-Agri Waqf',
        investorName: 'H. Ahmad Munir (Wakif Individu)'
      }
    ]
  }
];

export const INITIAL_LIVE_DONATIONS: DonationLiveFeedItem[] = [
  {
    id: 'don-01',
    donorName: 'Syeikh Khalid Al-Mansoor',
    donorLocation: 'Riyadh, Saudi Arabia',
    amountUsd: 25000,
    category: 'WAKAF_PRODUKTIF',
    targetProject: 'Noor Green Waqf Solar: 500 Pesantren',
    timestamp: 'Baru saja',
    txHash: '0x99a1...44ef'
  },
  {
    id: 'don-02',
    donorName: 'Hj. Siti Rahmah & Keluarga',
    donorLocation: 'Surabaya, Indonesia',
    amountUsd: 3500,
    category: 'INFAQ_DAKWAH',
    targetProject: 'Al-Furqan: Islamic AI & Quranic Intelligence',
    timestamp: '2 menit lalu',
    txHash: '0x88b2...33cd'
  },
  {
    id: 'don-03',
    donorName: 'Baraka UK Syndicate Member',
    donorLocation: 'London, United Kingdom',
    amountUsd: 12000,
    category: 'SUKUK_INVESTASI',
    targetProject: 'HalalTrace: Global FoodTech Blockchain',
    timestamp: '5 menit lalu',
    txHash: '0x77c3...22ab'
  },
  {
    id: 'don-04',
    donorName: 'Dato’ Sri Azman Hashim',
    donorLocation: 'Kuala Lumpur, Malaysia',
    amountUsd: 50000,
    category: 'WAKAF_PRODUKTIF',
    targetProject: 'Baitul Maal Micro-Agri Waqf',
    timestamp: '9 menit lalu',
    txHash: '0x66d4...11fa'
  },
  {
    id: 'don-05',
    donorName: 'Dr. Tariq Ramadan Society',
    donorLocation: 'Geneva, Switzerland',
    amountUsd: 8000,
    category: 'ZAKAT_MAAL',
    targetProject: 'Al-Furqan: Islamic AI & Quranic Intelligence',
    timestamp: '14 menit lalu',
    txHash: '0x55e5...00bc'
  }
];

export const INITIAL_USER_PORTFOLIO: InvestorPortfolioItem[] = [
  {
    id: 'port-01',
    projectId: 'p1',
    projectTitle: 'Noor Green Waqf Solar: 500 Pesantren',
    category: 'Waqf Green Energy',
    investedAmountUsd: 50000,
    currentValueUsd: 54200,
    totalDividendsPaidUsd: 4200,
    nisbahRatio: '75 : 25 (Investor : Pengelola)',
    contractType: 'Sukuk Al-Ijarah',
    startDate: '12 Jan 2026',
    lastPayoutDate: '01 Okt 2026',
    nextPayoutDate: '01 Nov 2026',
    dakwahMetricValue: '12 Pesantren Didukung',
    dakwahMetricName: 'Kemandirian Listrik Santri',
    status: 'ACTIVE'
  },
  {
    id: 'port-02',
    projectId: 'p2',
    projectTitle: 'Al-Furqan: Islamic AI Platform',
    category: 'Edu-Dakwah AI',
    investedAmountUsd: 25000,
    currentValueUsd: 29125,
    totalDividendsPaidUsd: 2125,
    nisbahRatio: '70 : 30 (Investor : Pengembang)',
    contractType: 'Mudharabah',
    startDate: '15 Feb 2026',
    lastPayoutDate: '15 Sep 2026',
    nextPayoutDate: '15 Okt 2026',
    dakwahMetricValue: '4.800 Santri/Pelajar',
    dakwahMetricName: 'Akses AI Tafsir Gratis',
    status: 'ACTIVE'
  },
  {
    id: 'port-03',
    projectId: 'p3',
    projectTitle: 'Baitul Maal Micro-Agri Waqf',
    category: 'AgriTech Syariah',
    investedAmountUsd: 15000,
    currentValueUsd: 15850,
    totalDividendsPaidUsd: 850,
    nisbahRatio: 'Bagi Hasil Komoditas Gabah Kering',
    contractType: 'Salam',
    startDate: '10 Mei 2026',
    lastPayoutDate: '25 Ags 2026',
    nextPayoutDate: '25 Nov 2026',
    dakwahMetricValue: '85 Petani Bebas Riba',
    dakwahMetricName: 'Hektar Sawah Berkah',
    status: 'ACTIVE'
  }
];

export const INITIAL_NOTIFICATIONS: PushNotificationItem[] = [
  {
    id: 'notif-01',
    title: 'Dividen Sukuk Masuk ke Dompet Syariah',
    message: 'Distribusi imbal hasil Sukuk Noor Green Waqf sebesar $620 USD telah diverifikasi smart contract blockchain.',
    type: 'FINANCE',
    timestamp: '15 menit lalu',
    read: false,
    txHash: '0x3f9e8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f'
  },
  {
    id: 'notif-02',
    title: 'Audit Smart Contract Sukuk Selesai',
    message: 'Dewan Pengawas Syariah AAOIFI merilis sertifikat kepatuhan digital baru untuk Batch 500 Pesantren.',
    type: 'AUDIT',
    timestamp: '1 jam lalu',
    read: false
  },
  {
    id: 'notif-03',
    title: 'Peluang Investor Baru Terhubung',
    message: 'Al-Rajhi Heritage Family Office mengajukan ketertarikan sindikasi pada proyek Edu-Dakwah Al-Furqan AI.',
    type: 'INVESTOR_ALERT',
    timestamp: '3 jam lalu',
    read: true
  },
  {
    id: 'notif-04',
    title: 'Milestone Dakwah Tercapai!',
    message: '142.000 santri kini menikmati listrik tenaga surya gratis dari Noor Green Waqf Solar.',
    type: 'DAKWAH_UPDATE',
    timestamp: 'Kemarin',
    read: true
  }
];
