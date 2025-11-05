import { motion, AnimatePresence } from 'framer-motion'
import { FallingText } from './FallingText'
import './LoadingScreen.css'

interface LoadingScreenProps {
  isLoading: boolean
}

function LottieBackground() {
  return (
    <iframe 
      src="https://lottie.host/embed/a3ff18a7-ec5e-4a42-a516-5a482a9d1f15/uvtqwY5j5I.json"
      className="loading-lottie-bg"
      title="Loading animation background"
      style={{ background: 'transparent' }}
    />
  )
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Lottie animation background */}
          <LottieBackground />
          
          {/* Animated background circles */}
          <motion.div 
            className="loading-circle loading-circle-1"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div 
            className="loading-circle loading-circle-2"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5
            }}
          />
          <motion.div 
            className="loading-circle loading-circle-3"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          />
          
          <motion.div 
            className="loading-content"
            initial={{ scale: 0.8, rotateY: -20 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FallingText text="EOS TEKNOLOGI" className="loading-text" />
            <motion.div
              className="loading-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              Enterprise Resource Planning
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
