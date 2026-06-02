/* ═══════════════════════════════════════════
   HBP · Hardware Build Planner — Logic & Data
   ═══════════════════════════════════════════ */

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const TIERS       = ['entry','low','mid','high','enthusiast'];
const TIER_LABELS = { entry:'Entrada', low:'Baja', mid:'Media', high:'Alta', enthusiast:'Entusiasta' };
const TIER_RANK   = { entry:1, low:2, mid:3, high:4, enthusiast:5 };

// ─────────────────────────────────────────────
// DATA FACTORIES
// ─────────────────────────────────────────────
function makeCPU(id,brand,name,cores,threads,base,boost,tdp,socket,perf,tier,igpu=false){
  return {id,type:'cpu',brand,name,cores,threads,baseClock:base,boostClock:boost,tdp,socket,perf,tier,igpu};
}
function makeGPU(id,brand,name,shaders,vram,clock,pcie,tdp,perf,tier){
  return {id,type:'gpu',brand,name,shaders,vram,clock,pcie,tdp,perf,tier};
}

// ─────────────────────────────────────────────
// CPUs
// ─────────────────────────────────────────────
const CPUS = [
  // AMD AM4
  makeCPU('r5-5500',   'AMD','Ryzen 5 5500',   6,12,3.6,4.2, 65,'AM4', 42,'low'),
  makeCPU('r5-5600',   'AMD','Ryzen 5 5600',   6,12,3.5,4.4, 65,'AM4', 50,'mid'),
  makeCPU('r5-5600x',  'AMD','Ryzen 5 5600X',  6,12,3.7,4.6, 65,'AM4', 54,'mid'),
  makeCPU('r7-5700x',  'AMD','Ryzen 7 5700X',  8,16,3.4,4.6, 65,'AM4', 62,'mid'),
  makeCPU('r7-5800x',  'AMD','Ryzen 7 5800X',  8,16,3.8,4.7,105,'AM4', 66,'high'),
  makeCPU('r7-5800x3d','AMD','Ryzen 7 5800X3D',8,16,3.4,4.5,105,'AM4', 78,'high'),
  makeCPU('r9-5900x',  'AMD','Ryzen 9 5900X', 12,24,3.7,4.8,105,'AM4', 75,'high'),
  makeCPU('r9-5950x',  'AMD','Ryzen 9 5950X', 16,32,3.4,4.9,105,'AM4', 82,'enthusiast'),
  // AMD AM5 — Gen 7000
  makeCPU('r5-7600',   'AMD','Ryzen 5 7600',   6,12,3.8,5.1, 65,'AM5', 64,'mid',true),
  makeCPU('r5-7600x',  'AMD','Ryzen 5 7600X',  6,12,4.7,5.3,105,'AM5', 68,'mid',true),
  makeCPU('r7-7700',   'AMD','Ryzen 7 7700',   8,16,3.8,5.3, 65,'AM5', 74,'high',true),
  makeCPU('r7-7700x',  'AMD','Ryzen 7 7700X',  8,16,4.5,5.4,105,'AM5', 78,'high',true),
  makeCPU('r7-7800x3d','AMD','Ryzen 7 7800X3D',8,16,4.2,5.0,120,'AM5', 92,'enthusiast',true),
  makeCPU('r9-7900x',  'AMD','Ryzen 9 7900X', 12,24,4.7,5.6,170,'AM5', 86,'enthusiast',true),
  makeCPU('r9-7950x',  'AMD','Ryzen 9 7950X', 16,32,4.5,5.7,170,'AM5', 94,'enthusiast',true),
  makeCPU('r9-7950x3d','AMD','Ryzen 9 7950X3D',16,32,4.2,5.7,120,'AM5', 96,'enthusiast',true),
  // AMD AM5 — APU 8000G
  makeCPU('r5-8500g',  'AMD','Ryzen 5 8500G',  6,12,3.5,5.0, 65,'AM5', 52,'low',true),
  makeCPU('r5-8600g',  'AMD','Ryzen 5 8600G',  6,12,4.3,5.0, 65,'AM5', 60,'mid',true),
  makeCPU('r7-8700g',  'AMD','Ryzen 7 8700G',  8,16,4.2,5.1, 65,'AM5', 72,'mid',true),
  // AMD AM5 — Gen 9000
  makeCPU('r5-9600x',  'AMD','Ryzen 5 9600X',  6,12,3.9,5.4, 65,'AM5', 74,'mid',true),
  makeCPU('r7-9700x',  'AMD','Ryzen 7 9700X',  8,16,3.8,5.5, 65,'AM5', 84,'high',true),
  makeCPU('r7-9800x3d','AMD','Ryzen 7 9800X3D',8,16,4.7,5.2,120,'AM5',100,'enthusiast',true),
  makeCPU('r9-9900x',  'AMD','Ryzen 9 9900X', 12,24,4.4,5.6,120,'AM5', 92,'enthusiast',true),
  makeCPU('r9-9950x',  'AMD','Ryzen 9 9950X', 16,32,4.3,5.7,170,'AM5', 98,'enthusiast',true),
  // Intel LGA1700
  makeCPU('i3-12100',  'Intel','Core i3-12100',  4, 8,3.3,4.3, 60,'LGA1700', 40,'entry',true),
  makeCPU('i5-12400',  'Intel','Core i5-12400',  6,12,2.5,4.4, 65,'LGA1700', 52,'low',true),
  makeCPU('i5-12600k', 'Intel','Core i5-12600K',10,16,3.7,4.9,125,'LGA1700', 64,'mid',true),
  makeCPU('i7-12700k', 'Intel','Core i7-12700K',12,20,3.6,5.0,125,'LGA1700', 74,'high',true),
  makeCPU('i9-12900k', 'Intel','Core i9-12900K',16,24,3.2,5.2,125,'LGA1700', 82,'high',true),
  makeCPU('i3-13100',  'Intel','Core i3-13100',  4, 8,3.4,4.5, 60,'LGA1700', 44,'entry',true),
  makeCPU('i5-13400',  'Intel','Core i5-13400', 10,16,2.5,4.6, 65,'LGA1700', 58,'low',true),
  makeCPU('i5-13600k', 'Intel','Core i5-13600K',14,20,3.5,5.1,125,'LGA1700', 72,'mid',true),
  makeCPU('i7-13700k', 'Intel','Core i7-13700K',16,24,3.4,5.4,125,'LGA1700', 82,'high',true),
  makeCPU('i9-13900k', 'Intel','Core i9-13900K',24,32,3.0,5.8,125,'LGA1700', 90,'enthusiast',true),
  makeCPU('i5-14400',  'Intel','Core i5-14400', 10,16,2.5,4.7, 65,'LGA1700', 60,'low',true),
  makeCPU('i5-14600k', 'Intel','Core i5-14600K',14,20,3.5,5.3,125,'LGA1700', 76,'mid',true),
  makeCPU('i7-14700k', 'Intel','Core i7-14700K',20,28,3.4,5.6,125,'LGA1700', 86,'high',true),
  makeCPU('i9-14900k', 'Intel','Core i9-14900K',24,32,3.2,6.0,125,'LGA1700', 94,'enthusiast',true),
  // Intel LGA1851 — Core Ultra 200
  makeCPU('u5-225',    'Intel','Core Ultra 5 225',  10,10,3.3,4.9, 65,'LGA1851', 62,'mid',true),
  makeCPU('u5-245k',   'Intel','Core Ultra 5 245K', 14,14,4.2,5.2,125,'LGA1851', 74,'mid',true),
  makeCPU('u7-265k',   'Intel','Core Ultra 7 265K', 20,20,3.9,5.5,125,'LGA1851', 84,'high',true),
  makeCPU('u9-285k',   'Intel','Core Ultra 9 285K', 24,24,3.7,5.7,125,'LGA1851', 92,'enthusiast',true),
];

// ─────────────────────────────────────────────
// GPUs
// ─────────────────────────────────────────────
// Tier logica:
//   entry      → gama baja-baja, para 1080p ajustado
//   low        → gama baja, 1080p fluido
//   mid        → gama media, 1080p/1440p
//   high       → gama alta, 1440p/4K
//   enthusiast → gama entusiasta, 4K máximo
//
const GPUS = [
  // NVIDIA RTX 30
  makeGPU('rtx3050',   'NVIDIA','RTX 3050',    2560, 8,1777,'PCIe 4.0 x8',  130, 30,'entry'),
  makeGPU('rtx3060',   'NVIDIA','RTX 3060',    3584,12,1777,'PCIe 4.0 x16', 170, 40,'low'),
  makeGPU('rtx3060ti', 'NVIDIA','RTX 3060 Ti', 4864, 8,1665,'PCIe 4.0 x16', 200, 52,'mid'),
  makeGPU('rtx3070',   'NVIDIA','RTX 3070',    5888, 8,1725,'PCIe 4.0 x16', 220, 58,'mid'),
  makeGPU('rtx3080',   'NVIDIA','RTX 3080',    8704,10,1710,'PCIe 4.0 x16', 320, 70,'high'),
  makeGPU('rtx3090',   'NVIDIA','RTX 3090',   10496,24,1695,'PCIe 4.0 x16', 350, 78,'high'),
  // NVIDIA RTX 40
  makeGPU('rtx4060',   'NVIDIA','RTX 4060',    3072, 8,2460,'PCIe 4.0 x8',  115, 44,'low'),
  makeGPU('rtx4060ti', 'NVIDIA','RTX 4060 Ti', 4352, 8,2535,'PCIe 4.0 x8',  160, 54,'mid'),
  makeGPU('rtx4070',   'NVIDIA','RTX 4070',    5888,12,2475,'PCIe 4.0 x16', 200, 64,'mid'),
  makeGPU('rtx4070s',  'NVIDIA','RTX 4070 Super',7168,12,2475,'PCIe 4.0 x16',220, 70,'high'),
  makeGPU('rtx4070ti', 'NVIDIA','RTX 4070 Ti', 7680,12,2610,'PCIe 4.0 x16', 285, 74,'high'),
  makeGPU('rtx4080',   'NVIDIA','RTX 4080',    9728,16,2505,'PCIe 4.0 x16', 320, 84,'high'),
  makeGPU('rtx4080s',  'NVIDIA','RTX 4080 Super',10240,16,2550,'PCIe 4.0 x16',320,86,'enthusiast'),
  makeGPU('rtx4090',   'NVIDIA','RTX 4090',   16384,24,2520,'PCIe 4.0 x16', 450, 96,'enthusiast'),
  // NVIDIA RTX 50
  makeGPU('rtx5050',   'NVIDIA','RTX 5050',    2560, 8,2300,'PCIe 5.0 x8',  100, 32,'low'),
  makeGPU('rtx5060',   'NVIDIA','RTX 5060',    3840, 8,2497,'PCIe 5.0 x8',  145, 50,'mid'),  
  makeGPU('rtx5060ti', 'NVIDIA','RTX 5060 Ti', 4608,16,2572,'PCIe 5.0 x8',  180, 60,'mid'),
  makeGPU('rtx5070',   'NVIDIA','RTX 5070',    6144,12,2512,'PCIe 5.0 x16', 250, 72,'high'),
  makeGPU('rtx5070ti', 'NVIDIA','RTX 5070 Ti', 8960,16,2452,'PCIe 5.0 x16', 300, 82,'high'),
  makeGPU('rtx5080',   'NVIDIA','RTX 5080',   10752,16,2617,'PCIe 5.0 x16', 360, 90,'enthusiast'),
  makeGPU('rtx5090',   'NVIDIA','RTX 5090',   21760,32,2407,'PCIe 5.0 x16', 575,100,'enthusiast'),
  // AMD RX 6000
  makeGPU('rx6600',    'AMD','Radeon RX 6600',  1792, 8,2491,'PCIe 4.0 x8',  132, 36,'low'),
  makeGPU('rx6700xt',  'AMD','Radeon RX 6700 XT',2560,12,2581,'PCIe 4.0 x16',230, 52,'mid'),
  makeGPU('rx6800xt',  'AMD','Radeon RX 6800 XT',4608,16,2250,'PCIe 4.0 x16',300, 68,'high'),
  makeGPU('rx6900xt',  'AMD','Radeon RX 6900 XT',5120,16,2250,'PCIe 4.0 x16',300, 74,'high'),
  makeGPU('rx6950xt',  'AMD','Radeon RX 6950 XT',5120,16,2310,'PCIe 4.0 x16',335, 76,'high'),
  // AMD RX 7000
  makeGPU('rx7600',    'AMD','Radeon RX 7600',  2048, 8,2655,'PCIe 4.0 x8',  165, 42,'low'),
  makeGPU('rx7700xt',  'AMD','Radeon RX 7700 XT',3456,12,2544,'PCIe 4.0 x16',245, 62,'mid'),
  makeGPU('rx7800xt',  'AMD','Radeon RX 7800 XT',3840,16,2430,'PCIe 4.0 x16',263, 70,'high'),
  makeGPU('rx7900xt',  'AMD','Radeon RX 7900 XT',5376,20,2400,'PCIe 4.0 x16',315, 82,'high'),
  makeGPU('rx7900xtx', 'AMD','Radeon RX 7900 XTX',6144,24,2500,'PCIe 4.0 x16',355, 88,'enthusiast'),
  // AMD RX 9000
  makeGPU('rx9060xt',  'AMD','Radeon RX 9060 XT',3584,16,2620,'PCIe 5.0 x8', 150, 56,'mid'),
  makeGPU('rx9070',    'AMD','Radeon RX 9070',   4096,16,2520,'PCIe 5.0 x16', 220, 70,'high'),
  makeGPU('rx9070xt',  'AMD','Radeon RX 9070 XT',4096,16,2970,'PCIe 5.0 x16', 250, 78,'high'),
  // Intel Arc Battlemage — gama media (B570 ≈ RTX 4060, B580 ≈ RTX 4060 Ti)
  makeGPU('arcb570',   'Intel','Arc B570',       2304,10,2500,'PCIe 4.0 x8', 150, 48,'mid'),   
  makeGPU('arcb580',   'Intel','Arc B580',       2560,12,2670,'PCIe 4.0 x8', 190, 56,'mid'),   
];

// ─────────────────────────────────────────────
// RAM
// ─────────────────────────────────────────────
// Tier por capacidad Y generación:
//   DDR4 y DDR5 arrancan igual en capacidades bajas,
//   pero a igual capacidad DDR5 es un escalón superior.
const RAMS = (() => {
  const list = [];
  const speeds = {
    DDR4: [2666, 3000, 3200, 3600, 4000],
    DDR5: [4800, 5200, 5600, 6000, 6400, 7200]
  };

  // DDR4: tier basado en capacidad
  const tierDDR4 = c =>
    c >= 96 ? 'enthusiast' :
    c >= 64 ? 'high'       :
    c >= 32 ? 'mid'        :
    c >= 16 ? 'low'        : 'entry';

  // DDR5: un escalón superior a DDR4 a igual capacidad
  // (8GB DDR5 = low en vez de entry; 16GB DDR5 = mid en vez de low, etc.)
  const tierDDR5 = c =>
    c >= 96 ? 'enthusiast' :
    c >= 64 ? 'enthusiast' :
    c >= 32 ? 'high'       :
    c >= 16 ? 'mid'        :
               'low';

  for (const gen of ['DDR4', 'DDR5']) {
    const tierFn = gen === 'DDR4' ? tierDDR4 : tierDDR5;
    for (const cap of [8, 16, 32, 48, 64, 96, 128]) {
      for (const sp of speeds[gen]) {
        list.push({
          id: `${gen}-${cap}-${sp}`,
          type: 'ram',
          name: `${cap}GB ${gen}-${sp}`,
          generation: gen,
          capacity: cap,
          speed: sp,
          tier: tierFn(cap)
        });
      }
    }
  }
  return list;
})();

// ─────────────────────────────────────────────
// SSD
// ─────────────────────────────────────────────
// Tier considera TANTO la interfaz como la capacidad:
//   Un SATA de 4TB puede superar en utilidad a un NVMe 3.0 de 500GB.
//   Regla aplicada:
//     SATA:        entry ≤500GB | low 1TB | mid 2TB | high 4TB
//     NVMe 3.0:    low ≤500GB  | mid 1TB | high 2–4TB
//     NVMe 4.0:    mid ≤500GB  | high 1–2TB | enthusiast 4TB
//     NVMe 5.0:    high ≤1TB   | enthusiast 2–4TB
const SSDS = (() => {
  const list = [];
  const ifaces = ['SATA', 'NVMe PCIe 3.0', 'NVMe PCIe 4.0', 'NVMe PCIe 5.0'];

  const tierFor = (iface, cap) => {
    if (iface === 'SATA') {
      if (cap >= 4000) return 'high';
      if (cap >= 2000) return 'mid';
      if (cap >= 1000) return 'low';
      return 'entry';
    }
    if (iface === 'NVMe PCIe 3.0') {
      if (cap >= 2000) return 'high';
      if (cap >= 1000) return 'mid';
      return 'low';
    }
    if (iface === 'NVMe PCIe 4.0') {
      if (cap >= 4000) return 'enthusiast';
      if (cap >= 1000) return 'high';
      return 'mid';
    }
    // NVMe PCIe 5.0
    if (cap >= 2000) return 'enthusiast';
    return 'high';
  };

  for (const iface of ifaces) {
    for (const cap of [250, 500, 1000, 2000, 4000]) {
      list.push({
        id: `${iface}-${cap}`,
        type: 'ssd',
        name: `${cap >= 1000 ? cap / 1000 + 'TB' : cap + 'GB'} ${iface}`,
        iface,
        capacity: cap,
        tier: tierFor(iface, cap)
      });
    }
  }
  return list;
})();

// ─────────────────────────────────────────────
// PSU
// ─────────────────────────────────────────────
// Coherencia potencia/certificación:
//   450–550W → Bronze máximo (White posible; Silver/Gold raro pero existe)
//   650–750W → hasta Gold
//   850–1000W → hasta Platinum
//   1200–1600W → Platinum / Titanium (aquí sí tiene sentido)
// Se eliminan combinaciones imposibles o absurdas (450W Titanium, etc.)
const PSUS = (() => {
  const list = [];

  const combos = [
    // [wattage, cert, tier]
    [450,  'White',    'entry'],
    [450,  'Bronze',   'entry'],
    [550,  'White',    'entry'],
    [550,  'Bronze',   'low'],
    [550,  'Silver',   'low'],
    [650,  'Bronze',   'low'],
    [650,  'Silver',   'low'],
    [650,  'Gold',     'mid'],
    [750,  'Bronze',   'low'],
    [750,  'Silver',   'low'],
    [750,  'Gold',     'mid'],
    [850,  'Silver',   'low'],
    [850,  'Gold',     'mid'],
    [850,  'Platinum', 'high'],
    [1000, 'Gold',     'mid'],
    [1000, 'Platinum', 'high'],
    [1200, 'Gold',     'high'],
    [1200, 'Platinum', 'high'],
    [1200, 'Titanium', 'enthusiast'],
    [1600, 'Platinum', 'enthusiast'],
    [1600, 'Titanium', 'enthusiast'],
  ];

  for (const [w, cert, tier] of combos) {
    list.push({
      id:      `psu-${w}-${cert}`,
      type:    'psu',
      name:    `${w}W 80+ ${cert}`,
      wattage: w,
      cert,
      tier
    });
  }
  return list;
})();

// ─────────────────────────────────────────────
// MOTHERBOARDS
// ─────────────────────────────────────────────
const MOBOS = [
  // AMD AM4
  {id:'a520',  type:'mobo',name:'A520 (AM4)',          socket:'AM4',    chipset:'A520',  ramGen:'DDR4',     pcie:'PCIe 3.0',tier:'entry'},
  {id:'b450',  type:'mobo',name:'B450 (AM4)',          socket:'AM4',    chipset:'B450',  ramGen:'DDR4',     pcie:'PCIe 3.0',tier:'low'},
  {id:'b550',  type:'mobo',name:'B550 (AM4)',          socket:'AM4',    chipset:'B550',  ramGen:'DDR4',     pcie:'PCIe 4.0',tier:'mid'},
  {id:'x570',  type:'mobo',name:'X570 (AM4)',          socket:'AM4',    chipset:'X570',  ramGen:'DDR4',     pcie:'PCIe 4.0',tier:'high'},
  // AMD AM5
  {id:'a620',  type:'mobo',name:'A620 (AM5)',          socket:'AM5',    chipset:'A620',  ramGen:'DDR5',     pcie:'PCIe 4.0',tier:'low'},
  {id:'b650',  type:'mobo',name:'B650 (AM5)',          socket:'AM5',    chipset:'B650',  ramGen:'DDR5',     pcie:'PCIe 4.0',tier:'mid'},
  {id:'b650e', type:'mobo',name:'B650E (AM5)',         socket:'AM5',    chipset:'B650E', ramGen:'DDR5',     pcie:'PCIe 5.0',tier:'high'},
  {id:'x670',  type:'mobo',name:'X670 (AM5)',          socket:'AM5',    chipset:'X670',  ramGen:'DDR5',     pcie:'PCIe 4.0',tier:'high'},
  {id:'x670e', type:'mobo',name:'X670E (AM5)',         socket:'AM5',    chipset:'X670E', ramGen:'DDR5',     pcie:'PCIe 5.0',tier:'enthusiast'},
  {id:'x870',  type:'mobo',name:'X870 (AM5)',          socket:'AM5',    chipset:'X870',  ramGen:'DDR5',     pcie:'PCIe 5.0',tier:'high'},
  {id:'x870e', type:'mobo',name:'X870E (AM5)',         socket:'AM5',    chipset:'X870E', ramGen:'DDR5',     pcie:'PCIe 5.0',tier:'enthusiast'},
  // Intel LGA1700
  {id:'h610',  type:'mobo',name:'H610 (LGA1700)',      socket:'LGA1700',chipset:'H610',  ramGen:'DDR4/DDR5',pcie:'PCIe 4.0',tier:'entry'},
  {id:'b660',  type:'mobo',name:'B660 (LGA1700)',      socket:'LGA1700',chipset:'B660',  ramGen:'DDR4/DDR5',pcie:'PCIe 4.0',tier:'low'},
  {id:'b760',  type:'mobo',name:'B760 (LGA1700)',      socket:'LGA1700',chipset:'B760',  ramGen:'DDR4/DDR5',pcie:'PCIe 4.0',tier:'mid'},
  {id:'z690',  type:'mobo',name:'Z690 (LGA1700)',      socket:'LGA1700',chipset:'Z690',  ramGen:'DDR4/DDR5',pcie:'PCIe 5.0',tier:'high'},
  {id:'z790',  type:'mobo',name:'Z790 (LGA1700)',      socket:'LGA1700',chipset:'Z790',  ramGen:'DDR4/DDR5',pcie:'PCIe 5.0',tier:'enthusiast'},
  // Intel LGA1851
  {id:'b860',  type:'mobo',name:'B860 (LGA1851)',      socket:'LGA1851',chipset:'B860',  ramGen:'DDR5',     pcie:'PCIe 5.0',tier:'mid'},
  {id:'z890',  type:'mobo',name:'Z890 (LGA1851)',      socket:'LGA1851',chipset:'Z890',  ramGen:'DDR5',     pcie:'PCIe 5.0',tier:'enthusiast'},
  // Legacy
  {id:'z590',  type:'mobo',name:'Z590 (LGA1200 — Legacy)',socket:'LGA1200',chipset:'Z590',ramGen:'DDR4',   pcie:'PCIe 4.0',tier:'low'},
];

// ─────────────────────────────────────────────
// CATALOG MAP
// ─────────────────────────────────────────────
const ALL         = { cpu: CPUS, gpu: GPUS, ram: RAMS, ssd: SSDS, psu: PSUS, mobo: MOBOS };
const TYPE_LABELS = { cpu:'CPU', gpu:'GPU', ram:'RAM', ssd:'SSD', psu:'Fuente', mobo:'Placa Base' };
const SLOT_ORDER  = ['cpu', 'gpu', 'mobo', 'ram', 'ssd', 'psu'];

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
let activeTab = 'cpu';
let build     = {};
let dragComp  = null;

// ─────────────────────────────────────────────
// EVALUATOR
// ─────────────────────────────────────────────
function evaluateBuild(b) {
  const issues = [], recs = [];

  // Socket CPU ↔ Mobo
  if (b.cpu && b.mobo && b.cpu.socket !== b.mobo.socket)
    issues.push(`Socket incompatible: ${b.cpu.name} (${b.cpu.socket}) no encaja en ${b.mobo.name}.`);

  // RAM ↔ Mobo
  if (b.ram && b.mobo) {
    const moboGens = b.mobo.ramGen.split('/');
    if (!moboGens.includes(b.ram.generation))
      issues.push(`La placa ${b.mobo.name} no soporta ${b.ram.generation}.`);
  }

  // RAM ↔ CPU (sockets que solo admiten DDR5)
  if (b.cpu && b.ram) {
    if (b.cpu.socket === 'AM5' && b.ram.generation === 'DDR4')
      issues.push('Ryzen AM5 requiere DDR5, no DDR4.');
    if (b.cpu.socket === 'LGA1851' && b.ram.generation === 'DDR4')
      issues.push('Core Ultra 200 (LGA1851) requiere DDR5.');
  }

  // Potencia
  const cpuW  = b.cpu?.tdp ?? 0;
  const gpuW  = b.gpu?.tdp ?? 0;
  const otherW = 80;
  const powerDraw      = cpuW + gpuW + otherW;
  const recommendedPsu = Math.ceil((powerDraw * 1.5) / 50) * 50;

  if (b.psu && b.psu.wattage < recommendedPsu)
    issues.push(`Fuente insuficiente: ${b.psu.wattage}W. Recomendado: ≥${recommendedPsu}W.`);

  // Cuello de botella
  let bottleneck = null, synergy = 50;
  if (b.cpu && b.gpu) {
    const diff = b.cpu.perf - b.gpu.perf, pct = Math.abs(diff);
    if      (pct < 10) { synergy = 95; bottleneck = { side: 'none', pct }; }
    else if (pct < 20) { synergy = 80; bottleneck = { side: diff < 0 ? 'cpu' : 'gpu', pct }; }
    else               { synergy = Math.max(30, 80 - pct); bottleneck = { side: diff < 0 ? 'cpu' : 'gpu', pct }; }

    if (bottleneck.side === 'cpu' && pct >= 20)
      recs.push(`La CPU limita a la GPU (~${pct}% de diferencia). Considera una CPU de gama superior.`);
    else if (bottleneck.side === 'gpu' && pct >= 20)
      recs.push(`La GPU limita a la CPU (~${pct}% de diferencia). Considera una GPU más potente.`);
  }

  // Balance
  const ranks = SLOT_ORDER.filter(k => b[k]).map(k => TIER_RANK[b[k].tier]);
  let balance = 60;
  if (ranks.length >= 2) {
    const avg      = ranks.reduce((a, x) => a + x, 0) / ranks.length;
    const variance = ranks.reduce((a, x) => a + (x - avg) ** 2, 0) / ranks.length;
    balance = Math.max(20, Math.round(100 - variance * 25));
  }

  // Recomendaciones adicionales
  if (b.ram && b.ram.capacity < 16)
    recs.push('16 GB es el mínimo recomendado para gaming/productividad moderna.');
  if (b.cpu && b.ram && b.cpu.socket === 'AM5' && b.ram.speed < 6000)
    recs.push('Para Ryzen AM5, DDR5-6000 ofrece la mejor sinergia.');
  if (b.gpu && !b.ssd)
    recs.push('Añadí un SSD NVMe para tiempos de carga rápidos.');
  if (b.gpu && b.ssd?.iface === 'SATA')
    recs.push('Considera un SSD NVMe para mejor rendimiento general.');
  if (b.cpu && !b.gpu && !b.cpu.igpu)
    recs.push('Esta CPU no tiene gráficos integrados: necesitarás una GPU dedicada.');
  if (b.psu && (b.psu.cert === 'White' || b.psu.cert === 'Bronze') && powerDraw > 400)
    recs.push('Considera una fuente 80+ Gold o superior para mejor eficiencia.');

  // Eficiencia y puntuación
  const totalPerf = (b.cpu?.perf ?? 0) + (b.gpu?.perf ?? 0);
  const totalTdp  = cpuW + gpuW;
  const efficiency = totalTdp > 0 ? Math.min(100, Math.round((totalPerf / totalTdp) * 80)) : 50;

  const presentBonus = ranks.length * 1;
  const perfScore    = (b.cpu?.perf ?? 0) * 0.45 + (b.gpu?.perf ?? 0) * 0.45;
  const score        = Math.min(100, Math.round(perfScore + presentBonus + (synergy - 50) * 0.1 + (balance - 50) * 0.05));
  const tier         = score >= 90 ? 'enthusiast' : score >= 80 ? 'high' : score >= 65 ? 'mid' : score >= 45 ? 'low' : 'entry';

  return { tier, score, balance, synergy, efficiency, bottleneck, compatibility: { ok: issues.length === 0, issues }, powerDraw, recommendedPsu, recommendations: recs };
}

// ─────────────────────────────────────────────
// COMPONENT SUBTITLE
// ─────────────────────────────────────────────
function compSub(c) {
  if (c.type === 'cpu')  return `${c.cores}C/${c.threads}T · ${c.boostClock}GHz · ${c.tdp}W · ${c.socket}`;
  if (c.type === 'gpu')  return `${c.vram}GB VRAM · ${c.tdp}W · ${c.pcie}`;
  if (c.type === 'ram')  return `${c.capacity}GB ${c.generation}-${c.speed}`;
  if (c.type === 'ssd')  return `${c.capacity >= 1000 ? c.capacity / 1000 + 'TB' : c.capacity + 'GB'} · ${c.iface}`;
  if (c.type === 'psu')  return `${c.wattage}W · 80+ ${c.cert}`;
  if (c.type === 'mobo') return `${c.socket} · ${c.chipset} · ${c.ramGen}`;
  return '';
}

// ─────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────
const SLOT_ICONS = {
  cpu:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="14" x2="22" y2="14"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="14" x2="4" y2="14"/></svg>`,
  gpu:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><circle cx="8" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="16" cy="12" r="1"/></svg>`,
  mobo: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 7h10M7 12h5M7 17h8"/></svg>`,
  ram:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="1"/><line x1="7" y1="7" x2="7" y2="17"/><line x1="11" y1="7" x2="11" y2="17"/><line x1="15" y1="7" x2="15" y2="17"/></svg>`,
  ssd:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="17" cy="12" r="2"/><path d="M6 12h6"/></svg>`,
  psu:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
};

// ─────────────────────────────────────────────
// RENDER — CATALOG TABS
// ─────────────────────────────────────────────
function renderTabs() {
  const tabs = document.getElementById('tabs');
  tabs.innerHTML = SLOT_ORDER.map(t =>
    `<button class="tab ${t === activeTab ? 'active' : ''}" onclick="setTab('${t}')">${TYPE_LABELS[t]}</button>`
  ).join('');
}

function setTab(t) {
  activeTab = t;
  document.getElementById('search').value = '';
  renderTabs();
  renderCatalog();
}

function renderCatalog() {
  const q     = document.getElementById('search').value.toLowerCase();
  const items = ALL[activeTab].filter(c => c.name.toLowerCase().includes(q));
  document.getElementById('catalog-count').textContent = items.length + ' items';
  document.getElementById('comp-list').innerHTML = items.map(c => `
    <div class="comp-item" id="ci-${c.id}" draggable="true"
      ondragstart="onDragStart(event,'${c.id}','${c.type}')"
      ondragend="onDragEnd(event)"
      onclick="assignToSlot('${c.id}','${c.type}')">
      <div class="comp-item-info">
        <div class="comp-item-name">${c.name}</div>
        <div class="comp-item-sub">${compSub(c)}</div>
      </div>
      <span class="tier tier-${c.tier}">${TIER_LABELS[c.tier]}</span>
    </div>
  `).join('');
}

// ─────────────────────────────────────────────
// RENDER — BUILD SLOTS
// ─────────────────────────────────────────────
function getInvalidSlots(ev) {
  const set = new Set();
  for (const issue of ev.compatibility.issues) {
    const lc = issue.toLowerCase();
    if (lc.includes('socket'))  { set.add('cpu'); set.add('mobo'); }
    if (lc.includes('ddr') || lc.includes('ram')) {
      set.add('ram');
      if (lc.includes('placa'))  set.add('mobo');
      if (lc.includes('ryzen') || lc.includes('core ultra')) set.add('cpu');
    }
    if (lc.includes('fuente'))  set.add('psu');
  }
  return set;
}

function renderBuild() {
  const ev           = evaluateBuild(build);
  const invalidSlots = getInvalidSlots(ev);
  const count        = SLOT_ORDER.filter(k => build[k]).length;

  document.getElementById('build-count').textContent = `${count} de 6 componentes`;
  document.getElementById('build-tier-badge').innerHTML = count > 0
    ? `<span class="tier tier-${ev.tier}">${TIER_LABELS[ev.tier]}</span>` : '';

  document.getElementById('build-slots').innerHTML = SLOT_ORDER.map(type => {
    const c       = build[type];
    const invalid = invalidSlots.has(type);
    if (c) {
      return `
        <div class="slot slot-filled ${invalid ? 'invalid' : ''}"
          ondragover="onDragOver(event,'${type}')"
          ondragleave="onDragLeave(event)"
          ondrop="onDrop(event,'${type}')">
          <div class="slot-filled">
            <div class="slot-filled-header">
              <span class="slot-type-label">${SLOT_ICONS[type]} ${TYPE_LABELS[type]}</span>
              <button class="slot-remove" onclick="removeSlot('${type}')" title="Quitar">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div class="slot-name">${c.name}</div>
            <div class="slot-specs">${compSub(c)}</div>
          </div>
        </div>`;
    } else {
      return `
        <div class="slot ${invalid ? 'invalid' : ''}"
          ondragover="onDragOver(event,'${type}')"
          ondragleave="onDragLeave(event)"
          ondrop="onDrop(event,'${type}')">
          <div class="slot-empty">
            ${SLOT_ICONS[type]}
            <span class="slot-empty-label">${TYPE_LABELS[type]}</span>
            <span class="slot-empty-hint">Clic o arrastra aquí</span>
          </div>
        </div>`;
    }
  }).join('');

  renderEval(ev, count === 0);
}

// ─────────────────────────────────────────────
// RENDER — EVALUATION
// ─────────────────────────────────────────────
function barColor(v) {
  if (v >= 75) return 'var(--green)';
  if (v >= 50) return 'var(--accent)';
  if (v >= 30) return 'var(--yellow)';
  return 'var(--red)';
}

function renderRing(score) {
  const r = 28, circ = 2 * Math.PI * r, dash = (score / 100) * circ;
  const col = barColor(score);
  return `
    <svg class="ring-svg" width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r="${r}" fill="none" stroke="var(--border2)" stroke-width="5"/>
      <circle cx="36" cy="36" r="${r}" fill="none" stroke="${col}" stroke-width="5"
        stroke-dasharray="${dash} ${circ}" stroke-linecap="round"
        transform="rotate(-90 36 36)" style="transition:stroke-dasharray 0.4s ease"/>
    </svg>`;
}

function metric(label, val) {
  return `
    <div class="metric-row">
      <span class="metric-label">${label}</span>
      <div class="metric-bar"><div class="metric-fill" style="width:${val}%;background:${barColor(val)}"></div></div>
      <span class="metric-val">${val}</span>
    </div>`;
}

function renderEval(ev, empty) {
  const panel = document.getElementById('eval-panel');
  if (empty) {
    panel.innerHTML = `
      <div class="empty-state">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        <div class="empty-title">Sin componentes</div>
        <div class="empty-sub">Añade componentes al build para ver la evaluación en tiempo real.</div>
      </div>`;
    return;
  }

  let html = '';

  html += `<div class="eval-section">
    <div class="eval-label">Puntuación global</div>
    <div class="score-ring">
      ${renderRing(ev.score)}
      <div>
        <div class="ring-value">${ev.score}</div>
        <div class="ring-tier">Gama ${TIER_LABELS[ev.tier]}</div>
      </div>
    </div>
  </div>`;

  html += `<div class="eval-section">
    <div class="eval-label">Métricas</div>
    ${metric('Balance', ev.balance)}
    ${metric('Sinergia', ev.synergy)}
    ${metric('Eficiencia', ev.efficiency)}
  </div>`;

  html += `<div class="eval-section">
    <div class="eval-label">Consumo</div>
    <div class="power-row">
      <div class="power-stat">
        <div class="power-stat-label">Estimado</div>
        <div class="power-stat-val">${ev.powerDraw}<span class="power-stat-unit">W</span></div>
      </div>
      <div class="power-stat">
        <div class="power-stat-label">PSU rec.</div>
        <div class="power-stat-val">${ev.recommendedPsu}<span class="power-stat-unit">W</span></div>
      </div>
    </div>
  </div>`;

  if (ev.bottleneck) {
    const ok = ev.bottleneck.side === 'none';
    html += `<div class="eval-section">
      <div class="eval-label">Cuello de botella</div>
      <div class="bottleneck-box ${ok ? 'bottleneck-ok' : 'bottleneck-warn'}">
        ${ok ? '✓ Sin cuello de botella significativo' : `⚠ ${ev.bottleneck.side.toUpperCase()} limita al sistema (~${ev.bottleneck.pct}%)`}
      </div>
    </div>`;
  }

  if (!ev.compatibility.ok) {
    html += `<div class="eval-section">
      <div class="eval-label">Compatibilidad</div>
      <div class="issue-list">
        ${ev.compatibility.issues.map(i => `<div class="issue-item">⚠ ${i}</div>`).join('')}
      </div>
    </div>`;
  }

  if (ev.recommendations.length > 0) {
    html += `<div class="eval-section">
      <div class="eval-label">Recomendaciones</div>
      <div class="rec-list">
        ${ev.recommendations.map(r => `<div class="rec-item">→ ${r}</div>`).join('')}
      </div>
    </div>`;
  }

  panel.innerHTML = html;
}

// ─────────────────────────────────────────────
// DRAG & DROP
// ─────────────────────────────────────────────
function onDragStart(e, id, type) {
  dragComp = ALL[type].find(c => c.id === id);
  e.dataTransfer.effectAllowed = 'copy';
  const ghost = document.getElementById('ghost');
  ghost.textContent = dragComp.name;
  ghost.style.display = 'block';
  document.addEventListener('mousemove', moveGhost);
}

function moveGhost(e) {
  const ghost = document.getElementById('ghost');
  ghost.style.left = (e.clientX + 12) + 'px';
  ghost.style.top  = (e.clientY + 12) + 'px';
}

function onDragEnd() {
  dragComp = null;
  const ghost = document.getElementById('ghost');
  ghost.style.display = 'none';
  document.removeEventListener('mousemove', moveGhost);
}

function onDragOver(e, slotType) {
  e.preventDefault();
  if (dragComp && dragComp.type === slotType) {
    e.currentTarget.classList.add('drag-over');
    e.dataTransfer.dropEffect = 'copy';
  } else {
    e.dataTransfer.dropEffect = 'none';
  }
}

function onDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

function onDrop(e, slotType) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if (dragComp && dragComp.type === slotType) {
    build[slotType] = dragComp;
    dragComp = null;
    renderBuild();
  }
}

// ─────────────────────────────────────────────
// ACTIONS
// ─────────────────────────────────────────────
function assignToSlot(id, type) {
  const comp = ALL[type].find(c => c.id === id);
  if (!comp) return;
  build[type] = comp;
  renderBuild();
}

function removeSlot(type) {
  delete build[type];
  renderBuild();
}

function resetBuild() {
  build = {};
  renderBuild();
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
renderTabs();
renderCatalog();
renderBuild();
