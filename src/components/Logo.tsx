import { SITE_NAME } from "@/site.config";

export const Logo = () => {
  return (
    <a
      href="/"
      className="text-lg font-light tracking-wider text-foreground"
    >
      {SITE_NAME}
    </a>
  );
};
