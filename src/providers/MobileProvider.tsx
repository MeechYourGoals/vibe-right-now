import React from 'react'

const MOBILE_BREAKPOINT = 768

interface MobileProviderProps {
  children: React.ReactNode
}

const MobileContext = React.createContext(false)

export const MobileProvider: React.FC<MobileProviderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(mobile)
      if (mobile) {
        document.body.classList.add('is-mobile')
      } else {
        document.body.classList.remove('is-mobile')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>
  )
}

export const useMobileContext = () => React.useContext(MobileContext)

