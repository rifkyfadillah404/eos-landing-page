import { motion, useReducedMotion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const introVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const formFieldVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function Contact() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      className="contact"
      id="contact"
      aria-labelledby="contact-heading"
      variants={prefersReducedMotion ? undefined : containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.div className="contact-card" variants={prefersReducedMotion ? undefined : cardVariants}>
        <motion.div className="contact-intro" variants={prefersReducedMotion ? undefined : introVariants}>
          <p className="eyebrow">Hubungi Kami</p>
          <h2 id="contact-heading">Mari Wujudkan Transformasi Digital Perusahaan Anda</h2>
          <p>
            Konsultasi gratis untuk memahami kebutuhan bisnis Anda. Tim ahli kami siap membantu merancang solusi ERP yang tepat.
          </p>
          <div className="contact-highlights">
            <div className="highlight-item">
              <span className="highlight-icon">✓</span>
              <span>Respons dalam 24 jam</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">✓</span>
              <span>Konsultasi gratis</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">✓</span>
              <span>Demo sistem langsung</span>
            </div>
          </div>
        </motion.div>
        <motion.form className="contact-form" aria-label="Formulir kontak">
          <motion.div className="form-field" variants={prefersReducedMotion ? undefined : formFieldVariants}>
            <label htmlFor="name">Nama Lengkap</label>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </motion.div>
          <motion.div className="form-field" variants={prefersReducedMotion ? undefined : formFieldVariants}>
            <label htmlFor="email">Email Kerja</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </motion.div>
          <motion.div className="form-field" variants={prefersReducedMotion ? undefined : formFieldVariants}>
            <label htmlFor="company">Perusahaan</label>
            <input id="company" name="company" type="text" autoComplete="organization" required />
          </motion.div>
          <motion.div className="form-field full" variants={prefersReducedMotion ? undefined : formFieldVariants}>
            <label htmlFor="message">Tantangan yang ingin diselesaikan</label>
            <textarea id="message" name="message" rows={4} required />
          </motion.div>
          <motion.button
            type="submit"
            className="primary-cta"
            variants={prefersReducedMotion ? undefined : formFieldVariants}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          >
            Mulai Konsultasi Gratis
          </motion.button>
          <motion.p className="form-footnote" variants={prefersReducedMotion ? undefined : formFieldVariants}>
            Kami menghormati privasi Anda. Informasi akan digunakan hanya untuk keperluan konsultasi.
          </motion.p>
        </motion.form>
      </motion.div>
      <noscript>
        <div className="noscript-fallback">
          <p>Formulir memerlukan JavaScript. Silakan kirim email ke hello@eosteknologi.com.</p>
        </div>
      </noscript>
    </motion.section>
  )
}
