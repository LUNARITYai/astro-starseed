import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/site.config";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export const Logo = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = !mounted || theme === "dark";

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Moon className="size-5" />
        <span className="text-lg font-light tracking-wider opacity-0">
          {SITE_NAME}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="shrink-0 cursor-pointer focus-visible:outline-none"
      >
        {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
      </button>

      <a
        href="/"
        className={cn(
          "text-lg font-light tracking-wider",
          isDark ? "text-white" : "text-black"
        )}
      >
        {SITE_NAME}
      </a>
    </div>
  );
};
