import type { HeroContent, Service, Testimonial, ValueProposition } from '../types/content'

export const heroContent: HeroContent = {
  headline: 'Solusi ERP yang cerdas dan hemat biaya untuk bisnis global di Indonesia',
  subheadline:
    'Sistem ERP yang dirancang khusus untuk perusahaan global yang beroperasi di Indonesia. Lebih terjangkau, fleksibel, dan terintegrasi dengan regulasi lokal.',
  primaryCta: { label: 'Konsultasi Gratis', href: '#contact' },
  secondaryCta: { label: 'Pelajari Lebih Lanjut', href: '#services' },
  metrics: [
    { value: '50%', label: 'Lebih hemat biaya' },
    { value: '100%', label: 'Customizable' },
    { value: '24/7', label: 'Support multibahasa' }
  ]
}

export const valuePropositions: ValueProposition[] = [
  {
    title: 'Biaya Lebih Rendah',
    description:
      'Biaya lebih rendah dibandingkan penyedia ERP besar. Solusi yang efisien tanpa mengorbankan kualitas dan fitur enterprise-grade.',
    accent: 'var(--gradient-expertise)'
  },
  {
    title: 'Fleksibel & Dapat Disesuaikan',
    description:
      'Fleksibel dan Dapat Disesuaikan Sesuai Kebutuhan. Sistem yang dapat dikonfigurasi mengikuti proses bisnis unik perusahaan Anda.',
    accent: 'var(--gradient-custom)'
  },
  {
    title: 'Integrasi Regulasi Indonesia',
    description:
      'Integrasi yang mulus dengan peraturan perdagangan di Indonesia. Compliance built-in untuk pajak, bea cukai, dan regulasi lokal lainnya.',
    accent: 'var(--gradient-innovation)'
  },
  {
    title: 'Dukungan Multibahasa',
    description:
      'Dukungan multibahasa (Inggris, Jepang, Indonesia). Interface dan support dalam bahasa yang Anda dan tim Anda gunakan sehari-hari.',
    accent: 'var(--gradient-custom)'
  }
]

export const services: Service[] = [
  {
    name: 'ERP (Enterprise Resource Planning)',
    description:
      'Integrasi keuangan, persediaan, pembelian, penjualan, dan produksi dalam satu platform untuk eksekusi yang presisi.',
    bullets: ['Manajemen keuangan terintegrasi', 'Kontrol persediaan & pembelian', 'Tracking produksi real-time'],
    image: '/assets/erp.jpg'
  },
  {
    name: 'Host to Host Ceisa 4.0',
    description:
      'Automasi PIB, PEB, dan TPB dengan validasi langsung sehingga kepatuhan berjalan lancar tanpa pekerjaan ulang.',
    bullets: ['Interface Bea Cukai Real-Time', 'Validasi dokumen otomatis', 'Compliance tanpa rework'],
    image: '/assets/ceisa.jpg'
  },
  {
    name: 'Subcon Management System',
    description:
      'Kelola BOM, WIP, perhitungan bea masuk, serta alur retur maklon secara transparan sesuai regulasi bea cukai.',
    bullets: ['Maklon & HS Code Management', 'Perhitungan bea masuk otomatis', 'Tracking retur transparan'],
    image: '/assets/subcon.jpg'
  },
  {
    name: 'IoT Production Counter',
    description:
      'Pantau output mesin, downtime, dan status line melalui sensor terintegrasi dengan dashboard produksi.',
    bullets: ['Sensor & Andon Display', 'Monitoring downtime real-time', 'Dashboard produksi terintegrasi'],
    image: '/assets/iot.jpg'
  }
]

export const testimonials: Testimonial[] = [
  {
    quote: 'Perusahaan kami telah memenuhi kebutuhan IT Inventory untuk Kawasan Berikat dengan sistem EOS ini dan antarmuka ke SAP.',
    author: 'Ubber Factory',
    role: 'IT & Compliance'
  },
  {
    quote: 'Terima kasih telah membantu mengotomatisasi sistem dan perangkat lunak Roll Tracking di perusahaan kertas nasional kami.',
    author: 'Paper Factory',
    role: 'Operations Lead'
  }
]
