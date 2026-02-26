import { useEffect, useState, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import './App.css'

const Home = lazy(() => import('./pages/Home/Home'))
const Services = lazy(() => import('./pages/Services/Services'))
const Cases = lazy(() => import('./pages/Cases/Cases'))
const Product = lazy(() => import('./pages/Product/Product'))

const LoadingFallback = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-primary)'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(37,99,235,0.2)',
      borderTop: '3px solid #2563EB',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  </div>
)

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('nexus-theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      // Default to dark mode
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('nexus-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
            <Route index element={<Home />} />
            <Route path="servicos" element={<Services />} />
            <Route path="cases" element={<Cases />} />
            <Route path="produto/:slug" element={<Product />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
