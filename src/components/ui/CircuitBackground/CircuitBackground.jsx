import { useEffect, useRef } from 'react'
import styles from './CircuitBackground.module.css'

function CircuitBackground() {
  const svgRef = useRef(null)

  useEffect(() => {
    // Check if mobile for performance optimization
    const isMobile = window.innerWidth < 768
    
    if (isMobile && svgRef.current) {
      // Disable animation on mobile for better performance
      svgRef.current.style.animation = 'none'
    }
  }, [])

  return (
    <div className={styles.circuitBackground} aria-hidden="true">
      <svg
        ref={svgRef}
        className={styles.circuitSvg}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for the circuit lines */}
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Pattern for repeating circuit elements */}
          <pattern id="circuitPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Horizontal lines */}
            <line x1="0" y1="50" x2="200" y2="50" stroke="url(#circuitGradient)" strokeWidth="1" opacity="0.3" />
            <line x1="0" y1="150" x2="200" y2="150" stroke="url(#circuitGradient)" strokeWidth="1" opacity="0.3" />
            
            {/* Vertical lines */}
            <line x1="50" y1="0" x2="50" y2="200" stroke="url(#circuitGradient)" strokeWidth="1" opacity="0.3" />
            <line x1="150" y1="0" x2="150" y2="200" stroke="url(#circuitGradient)" strokeWidth="1" opacity="0.3" />
            
            {/* Connection nodes */}
            <circle cx="50" cy="50" r="4" fill="#2563EB" opacity="0.5" />
            <circle cx="150" cy="50" r="4" fill="#7C3AED" opacity="0.5" />
            <circle cx="50" cy="150" r="4" fill="#7C3AED" opacity="0.5" />
            <circle cx="150" cy="150" r="4" fill="#2563EB" opacity="0.5" />
            
            {/* Diagonal connections */}
            <line x1="50" y1="50" x2="150" y2="150" stroke="url(#circuitGradient)" strokeWidth="0.5" opacity="0.2" />
            <line x1="150" y1="50" x2="50" y2="150" stroke="url(#circuitGradient)" strokeWidth="0.5" opacity="0.2" />
          </pattern>
        </defs>
        
        {/* Background pattern */}
        <rect width="100%" height="100%" fill="url(#circuitPattern)" />
        
        {/* Animated energy pulses - main horizontal paths */}
        <g className={styles.energyPaths}>
          {/* Path 1 - Top */}
          <path
            d="M -100 150 L 200 150 L 250 100 L 500 100 L 550 150 L 800 150 L 850 200 L 1100 200 L 1150 150 L 1400 150 L 1450 100 L 1700 100 L 1750 150 L 2020 150"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className={styles.energyPulse}
            style={{ animationDelay: '0s' }}
          />
          
          {/* Path 2 - Middle */}
          <path
            d="M -100 540 L 300 540 L 350 490 L 600 490 L 650 540 L 1000 540 L 1050 590 L 1300 590 L 1350 540 L 1700 540 L 1750 490 L 2020 490"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className={styles.energyPulse}
            style={{ animationDelay: '1s' }}
          />
          
          {/* Path 3 - Bottom */}
          <path
            d="M -100 900 L 150 900 L 200 850 L 450 850 L 500 900 L 750 900 L 800 950 L 1050 950 L 1100 900 L 1350 900 L 1400 850 L 1650 850 L 1700 900 L 2020 900"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className={styles.energyPulse}
            style={{ animationDelay: '2s' }}
          />
          
          {/* Vertical connecting paths */}
          <path
            d="M 400 -50 L 400 200 L 450 250 L 450 500 L 400 550 L 400 800 L 450 850 L 450 1130"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
            className={styles.energyPulse}
            style={{ animationDelay: '0.5s' }}
          />
          
          <path
            d="M 960 -50 L 960 250 L 1010 300 L 1010 550 L 960 600 L 960 850 L 1010 900 L 1010 1130"
            fill="none"
            stroke="#9333EA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
            className={styles.energyPulse}
            style={{ animationDelay: '1.5s' }}
          />
          
          <path
            d="M 1520 -50 L 1520 200 L 1470 250 L 1470 500 L 1520 550 L 1520 800 L 1470 850 L 1470 1130"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
            className={styles.energyPulse}
            style={{ animationDelay: '2.5s' }}
          />
        </g>
        
        {/* Glowing nodes */}
        <g className={styles.glowingNodes}>
          <circle cx="400" cy="150" r="6" fill="#2563EB" filter="url(#glow)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="960" cy="540" r="8" fill="#7C3AED" filter="url(#glow)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="1520" cy="900" r="6" fill="#2563EB" filter="url(#glow)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="900" r="5" fill="#3B82F6" filter="url(#glow)">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="1700" cy="150" r="5" fill="#9333EA" filter="url(#glow)">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.8s" repeatCount="indefinite" />
          </circle>
        </g>
        
        {/* Corner decorations */}
        <g className={styles.cornerDecorations} opacity="0.3">
          {/* Top Left */}
          <path d="M 50 50 L 150 50 L 150 60 L 60 60 L 60 150 L 50 150 Z" fill="#2563EB" />
          {/* Top Right */}
          <path d="M 1870 50 L 1770 50 L 1770 60 L 1860 60 L 1860 150 L 1870 150 Z" fill="#7C3AED" />
          {/* Bottom Left */}
          <path d="M 50 1030 L 150 1030 L 150 1020 L 60 1020 L 60 930 L 50 930 Z" fill="#7C3AED" />
          {/* Bottom Right */}
          <path d="M 1870 1030 L 1770 1030 L 1770 1020 L 1860 1020 L 1860 930 L 1870 930 Z" fill="#2563EB" />
        </g>
      </svg>
      
      {/* Overlay gradient for better text readability */}
      <div className={styles.overlay} />
    </div>
  )
}

export default CircuitBackground
