
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled
      aria-label="Dark theme active"
      className="h-8 w-8 p-0 opacity-50 cursor-not-allowed"
    >
      <Moon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Dark theme active</span>
    </Button>
  );
}
