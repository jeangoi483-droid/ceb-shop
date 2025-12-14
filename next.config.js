// next.config.js

const nextConfig = {
  reactStrictMode: true,
  images: { 
    // AJOUT DE 'via.placeholder.com' À LA LISTE DES DOMAINES AUTORISÉS
    domains: ["res.cloudinary.com", "images.unsplash.com", "via.placeholder.com"], 
  },
};

module.exports = nextConfig;