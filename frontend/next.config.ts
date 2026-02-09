import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure Turbopack uses the frontend folder as the workspace root
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
