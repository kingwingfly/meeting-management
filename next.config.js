/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config, { isServer, dev }) {
    // Use the client static directory in the server bundle and prod mode
    // Fixes `Error occurred prerendering page "/"`
    config.output.webassemblyModuleFilename =
      isServer && !dev
        ? '../../meeting-arrangement-wasm/pkg/meeting_arrangement_wasm_bg.wasm'
        : '../meeting-arrangement-wasm/pkg/meeting_arrangement_wasm_bg.wasm'

    // Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
    config.experiments = { ...config.experiments, asyncWebAssembly: true }

    return config
  },
}

module.exports = nextConfig
