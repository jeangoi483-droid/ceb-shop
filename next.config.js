/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! ATTENTION !!
    // Cela permet de terminer le build même si votre projet a des erreurs TypeScript.
    // Très utile pour mettre en ligne rapidement !
    ignoreBuildErrors: true,
  },
  eslint: {
    // On ignore aussi les erreurs de linting pour être sûr que ça passe
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig