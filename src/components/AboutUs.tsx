import { motion, useReducedMotion } from 'framer-motion'

function LottieIcon({ src, style }: { src: string; style?: React.CSSProperties }) {
  // Extract ID from lottie.host URL
  const embedUrl = src.replace('https://lottie.host/', 'https://lottie.host/embed/')
  
  return (
    <iframe 
      src={embedUrl}
      style={{ 
        border: 'none', 
        ...style 
      }}
      title="Lottie animation"
    />
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 15 },
  visible: { opacity: 1, y: 0, rotateX: 0 },
}

const featureItemVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
}

const benefitsVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

export function AboutUs() {
  const prefersReducedMotion = useReducedMotion()

  const features = [
    {
      lottie: 'https://lottie.host/99a200c0-de1a-4072-9f3f-3d7900b3338a/z188PjTa1s.lottie',
      title: 'Terintegrasi',
      description: 'Sistem end-to-end untuk semua departemen'
    },
    {
      lottie: 'https://lottie.host/27c64f18-5287-4ca5-8799-f1ebf6b34e35/bfm9bnD8a5.lottie',
      title: 'Real-time',
      description: 'Data akurat dan update seketika'
    },
    {
      lottie: 'https://lottie.host/152bb1bc-7299-43b5-be14-9cd34b2eab5f/tBFHeLOTHu.lottie',
      title: 'Aman',
      description: 'Keamanan data tingkat enterprise'
    },
    {
      lottie: 'https://lottie.host/282e890d-2615-4ab3-970b-2e1e65369716/10Y8NpAsmK.lottie',
      title: 'Scalable',
      description: 'Tumbuh bersama bisnis Anda'
    }
  ]

  return (
    <section className="about-us" id="about">
      <motion.div
        className="about-content"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="about-header" variants={prefersReducedMotion ? undefined : headerVariants}>
          <span className="eyebrow">TENTANG KAMI</span>
          <h2>Apa itu EOS ERP?</h2>
          <p className="japanese-title">EOS ERPとは？</p>
          <p className="about-subtitle">
            Sistem manajemen terintegrasi untuk industri manufaktur yang mengoptimalkan seluruh proses bisnis Anda
          </p>
        </motion.div>

        <motion.div className="about-main-card" variants={prefersReducedMotion ? undefined : cardVariants}>
          <div className="about-card-content">
            <h3>Solusi Komprehensif</h3>
            <p>
              EOS ERP memungkinkan perusahaan mengelola secara terpusat berbagai aspek operasional: <strong>produksi, persediaan, penjualan, pembelian, akuntansi,</strong> dan <strong>operasi impor/ekspor</strong>. Meningkatkan efisiensi, mengurangi biaya, dan akurasi data real-time.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="about-features-grid"
          variants={prefersReducedMotion ? undefined : containerVariants}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="about-feature-item"
              variants={prefersReducedMotion ? undefined : featureItemVariants}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05, rotate: 2 }}
            >
              <div className="feature-icon-large">
                <LottieIcon 
                  src={feature.lottie}
                  style={{ width: 80, height: 80 }}
                />
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="about-benefits" variants={prefersReducedMotion ? undefined : benefitsVariants}>
          <div className="benefit-card">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LottieIcon 
                src="https://lottie.host/86e1cba3-68c9-4dff-b96d-9d3ec1d9787a/gpRLni9KRM.lottie"
                style={{ width: 32, height: 32 }}
              />
              Keunggulan EOS ERP
            </h4>
            <ul>
              <li>Informasi konsisten dan terintegrasi di semua departemen</li>
              <li>Pengambilan keputusan lebih cepat dan tepat</li>
              <li>Pelaporan mendalam dan manajemen rantai pasokan optimal</li>
              <li>Sistem otomatisasi yang meminimalisir kesalahan</li>
              <li>Adaptasi cepat terhadap perubahan pasar</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
