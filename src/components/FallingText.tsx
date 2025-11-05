import { motion } from 'framer-motion'

interface FallingTextProps {
  text: string
  className?: string
}

export function FallingText({ text, className = '' }: FallingTextProps) {
  const letters = text.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  }

  const letter = {
    hidden: {
      y: -100,
      opacity: 0,
      rotateX: -90,
      scale: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
    },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        display: 'inline-flex',
        overflow: 'visible',
      }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letter}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
