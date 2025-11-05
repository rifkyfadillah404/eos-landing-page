import { motion, useReducedMotion } from 'framer-motion'
import { testimonials } from '../data/siteContent'
import { Star } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      className="testimonials"
      id="testimonials"
      aria-labelledby="testimonials-heading"
      variants={prefersReducedMotion ? undefined : containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.div className="testimonials-header" variants={prefersReducedMotion ? undefined : headerVariants}>
        <p className="eyebrow">Testimonials</p>
        <h2 id="testimonials-heading">Dipercaya oleh perusahaan manufaktur terkemuka</h2>
        <p className="testimonials-subtitle">Transformasi digital yang terbukti meningkatkan efisiensi operasional</p>
      </motion.div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.author}
            className="testimonial-card"
            variants={prefersReducedMotion ? undefined : cardVariants}
            whileHover={prefersReducedMotion ? undefined : { y: -8 }}
          >
            <div className="testimonial-quote-icon">
              <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
                <path d="M0 32V16C0 7.16667 4.66667 0 14 0v6.66667C8.66667 6.66667 6 10.6667 6 16h8v16H0zm20 0V16C20 7.16667 24.6667 0 34 0v6.66667C28.6667 6.66667 26 10.6667 26 16h8v16H20z" fill="currentColor"/>
              </svg>
            </div>

            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="#FFB800" stroke="#FFB800" size={18} />
              ))}
            </div>

            <blockquote className="testimonial-text">
              {testimonial.quote}
            </blockquote>

            <div className="testimonial-footer">
              <div className="testimonial-avatar">
                <div className="avatar-placeholder">
                  {testimonial.author.charAt(0)}
                </div>
              </div>
              <div className="testimonial-author-info">
                <h4 className="testimonial-author">{testimonial.author}</h4>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </div>

            <div className="testimonial-decoration" />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
