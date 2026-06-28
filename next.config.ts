import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Самодостаточный сервер для деплоя: .next/standalone с минимальными зависимостями.
  output: "standalone",
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
