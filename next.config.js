const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@agriaku/base-ui"]);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([[withTM], [withBundleAnalyzer]], {
  experimental: {
    newNextLinkBehavior: true,

    // This is a known issue for latest msw version (0.47)
    // See https://github.com/mswjs/msw/issues/1435
    esmExternals: false,
  },
  // Seems you use next/images. 
  // But next/images don't work with static pages (generated with next export) 
  // For static pages use this image-optimizer : next-optimized-images instead
  // TODO: delete when utilize ssr
  images: {
    unoptimized: true,
  },
});
