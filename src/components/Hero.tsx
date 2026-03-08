import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const Hero = ({
  badge,
  title,
  subtitle,
  ctaText,
  ctaLink,
}: HeroProps) => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 overflow-hidden relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50" />

      <div className="container px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {badge && (
            <span className="inline-block py-1 px-3 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-6 tracking-wide uppercase">
              {badge}
            </span>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 max-w-[963px] mx-auto"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-muted-foreground w-full max-w-2xl mx-auto mb-10"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto sm:w-auto sm:max-w-none"
        >
          <Button
            size="lg"
            className="rounded-full px-8 w-full sm:w-auto"
            asChild
          >
            <a href={ctaLink}>
              {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
