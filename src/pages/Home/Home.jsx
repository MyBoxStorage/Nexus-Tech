import Hero from '../../components/sections/Hero/Hero'
import SocialProof from '../../components/sections/SocialProof/SocialProof'
import TheProblem from '../../components/sections/TheProblem/TheProblem'
import ServicesHighlight from '../../components/sections/ServicesHighlight/ServicesHighlight'
import HowItWorks from '../../components/sections/HowItWorks/HowItWorks'
import Pricing from '../../components/sections/Pricing/Pricing'
import CaseHighlight from '../../components/sections/CaseHighlight/CaseHighlight'
import About from '../../components/sections/About/About'
import Contact from '../../components/sections/Contact/Contact'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.home}>
      <Hero />
      <SocialProof />
      <TheProblem />
      <ServicesHighlight />
      <HowItWorks />
      <Pricing />
      <CaseHighlight />
      <About />
      <Contact />
    </div>
  )
}

export default Home
