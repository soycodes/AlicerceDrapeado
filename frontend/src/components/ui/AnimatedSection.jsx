import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/**
 * Wraps children in a motion.div that animates into view when scrolled to.
 * @param {string} animation - 'fadeUp' | 'fadeIn' | 'slideRight' | 'slideLeft'
 * @param {number} delay - Delay in seconds
 * @param {string} className - Additional Tailwind classes
 */
export default function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  className = '',
  once = true,
}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: once,
  })

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.7, delay, ease: 'easeOut' } },
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.92 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants[animation]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}
