import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/i18n/ui";

interface NavLink {
  name: string;
  href: string;
  target?: string;
  rel?: string;
}

interface NavbarProps {
  lang?: Locale;
  labels?: {
    home: string;
    about: string;
    contact: string;
  };
}

function buildNavLinks(lang: Locale, labels: NavbarProps["labels"]): NavLink[] {
  const prefix = lang === "en" ? "" : `/${lang}`;
  return [
    { name: labels?.home ?? "Home", href: `${prefix}/` },
    { name: labels?.about ?? "About", href: `${prefix}/about` },
    { name: labels?.contact ?? "Contact", href: `${prefix}/contact` },
  ];
}

function isActiveLink(href: string, pathname: string): boolean {
  const normalize = (p: string) =>
    p.replace(/^\/(en)/, "").replace(/\/$/, "") || "/";

  const normHref = normalize(href);
  const normPath = normalize(pathname);

  if (normHref === "/") return normPath === "/";
  return normPath === normHref || normPath.startsWith(normHref + "/");
}

export const Navbar = ({ lang = "en", labels }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pathname, setPathname] = useState("");

  const navLinks = buildNavLinks(lang, labels);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // iOS Safari requires position:fixed to prevent scroll-through
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY) * -1);
      }
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      )}
    >
      <div
        className="relative z-50 container mx-auto flex items-center justify-between px-6"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingLeft: "calc(env(safe-area-inset-left, 0px) + 1.5rem)",
          paddingRight: "calc(env(safe-area-inset-right, 0px) + 1.5rem)",
        }}
      >
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium text-foreground/50 hover:text-foreground transition-colors duration-200",
                isActiveLink(link.href, pathname) &&
                  "text-foreground underline underline-offset-4"
              )}
              target={link.target}
              rel={link.rel}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile: Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md md:hidden"
          >
            <div
              className="flex h-[100dvh] flex-col items-center justify-center px-6"
              style={{
                paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.5rem)",
                paddingBottom:
                  "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
              }}
            >
              <div className="flex w-full max-w-sm flex-col items-center justify-center gap-8 text-center">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex w-full min-h-14 items-center justify-center py-1 text-3xl font-medium leading-none tracking-tight text-foreground/75 transition-colors duration-200 hover:text-foreground",
                      isActiveLink(link.href, pathname) &&
                        "text-foreground underline decoration-1 underline-offset-[10px]"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    target={link.target}
                    rel={link.rel}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
