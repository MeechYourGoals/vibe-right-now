
import * as React from "react"
import { useMobileContext } from "@/providers/MobileProvider"

export function useIsMobile() {
  return useMobileContext()
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
