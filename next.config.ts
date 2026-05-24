import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  redirects: async () => [
    // HTTP-level redirect so the root URL never serves the static "404" shell.
    // The proxy still handles locale detection for /hy, /ru, /en.
    { source: "/", destination: "/hy", permanent: false },
  ],
};

export default withNextIntl(nextConfig);
