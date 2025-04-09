
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [orientation, setOrientation] = React.useState<"portrait" | "landscape" | undefined>(undefined)

  React.useEffect(() => {
    // Handle initial detection and resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      setOrientation(
        window.innerHeight > window.innerWidth ? "portrait" : "landscape"
      )
    }
    
    // Initialize with current values
    handleResize()
    
    // Setup media query listener for breakpoint detection
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", handleResize)
    
    // Setup orientation change listener
    window.addEventListener("resize", handleResize)
    
    // Cleanup listeners
    return () => {
      mql.removeEventListener("change", handleResize)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return !!isMobile
}

// Export additional hook to get orientation if needed
export function useOrientation() {
  const [orientation, setOrientation] = React.useState<"portrait" | "landscape" | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? "portrait" : "landscape"
      )
    }
    
    handleResize()
    window.addEventListener("resize", handleResize)
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return orientation
}
