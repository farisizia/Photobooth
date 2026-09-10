/**
 * Curated Unsplash & Authentic Sample Photos for Photobooth Template Previews.
 * Ensures each template displays a unique, high-aesthetic set of photos,
 * matching specific themes, poses, and framing requirements.
 */

export const TEMPLATE_SAMPLE_PHOTOS: Record<string, string[]> = {
  // 1. Korean 4-Cut Classic: 4 foto potret berbeda dari satu orang yang berganti pose
  // Pose 1: senyum ceria, Pose 2: peace sign/vibe korea, Pose 3: wink/cute expression, Pose 4: candid tertawa
  'korean-4cut-classic': [
    'https://images.unsplash.com/photo-1682867265761-2e7accaf4b7c?auto=format&fit=crop&w=600&q=80', // Pose 1: senyum ceria
    'https://images.unsplash.com/photo-1682867265752-851b42f3f2ae?auto=format&fit=crop&w=600&q=80', // Pose 2: peace sign
    'https://images.unsplash.com/photo-1682867265624-2659b8c803a6?auto=format&fit=crop&w=600&q=80', // Pose 3: wink / cute
    'https://images.unsplash.com/photo-1682867267405-5c2640e56064?auto=format&fit=crop&w=600&q=80', // Pose 4: candid tertawa
  ],

  // 2. Korean 4-Cut Checkerboard: Set foto teman/bestie yang berbeda lagi (bukan cewek di Classic)
  'korean-4cut-checker': [
    'https://images.unsplash.com/photo-1530047139082-5435ca3c4614?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1758525224035-2948ee08ada3?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1758525224403-8f83c7ffa54b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1758525224175-123429797f37?auto=format&fit=crop&w=600&q=80',
  ],

  // 3. Korean Wide 2-Cut: Foto pasangan / sahabat dengan framing landscape/lebar
  'korean-wide-2cut': [
    '/mockups/korean_pose_4.jpg', // Pasangan hangat berdua tertawa manis membuat simbol hati
    'https://images.unsplash.com/photo-1781791967670-680eaca7de02?auto=format&fit=crop&w=800&q=80', // Pasangan ceria lanskap
  ],

  // 4. The Vintage Chronicle (Koran Jadul): Potret bernuansa monokrom vintage
  'vintage-chronicle': [
    'https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1722370024187-278e990172f9?auto=format&fit=crop&w=600&q=80',
  ],

  // 5. Struk Kasir: Potret bernuansa monokrom street style candid
  'thermal-receipt': [
    'https://images.unsplash.com/photo-1549313882-fa83996f24fc?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1653858381366-7d1ec0b6b2d0?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1623472927536-c966c62f0701?auto=format&fit=crop&w=600&q=80',
  ],

  // 6. Music Player (Spotify / The 1975)
  'music-player': [
    'https://images.unsplash.com/photo-1656262740200-b7c6f12f9c3e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1661273867500-5fffa915dec2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1720968669113-97c2224bb83c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1604145421922-8f5f809cd3ef?auto=format&fit=crop&w=600&q=80',
  ],

  // 7. 35mm Analog Film Roll
  'analog-film-35mm': [
    'https://images.unsplash.com/photo-1764731667840-65bcf7314075?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1761776569075-3d41cee76e34?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1770182023898-413f69dbe67c?auto=format&fit=crop&w=600&q=80',
  ],

  // 8. Classic Polaroid 600
  'classic-polaroid': [
    'https://images.unsplash.com/photo-1706284340691-f83bc4a5e504?auto=format&fit=crop&w=600&q=80',
  ],

  // 9. Dual Polaroid Stack
  'dual-polaroid': [
    'https://images.unsplash.com/photo-1687201659725-38e536473e3b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1723066496620-6bee4e3f1c7b?auto=format&fit=crop&w=600&q=80',
  ],

  // 10. Y2K Cyber Silver (CD Prism Chrome)
  'y2k-cyber-silver': [
    'https://images.unsplash.com/photo-1580428180163-76ab1efe2aed?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1618902543712-5167afb37421?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1768696082553-4a6c13f8baa9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1732538204289-474ac52286b1?auto=format&fit=crop&w=600&q=80',
  ],

  // 11. Passport & ID Photo (6 Slots Grid)
  'passport-id-photo': [
    'https://images.unsplash.com/photo-1666852327656-5e9fd213209b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  ],

  // 12. Romantic Floral Romance
  'floral-romance': [
    'https://images.unsplash.com/photo-1525198255522-d1d721e65e56?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1628607224701-45210a08092d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1628607225485-c616ac0114e0?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1628607348087-96797080e861?auto=format&fit=crop&w=600&q=80',
  ],

  // 13. Cute Kawaii Sticker Bomb
  'kawaii-sticker-bomb': [
    'https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1633231852277-9b176967e2ec?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1643126119931-e9a990fa0a57?auto=format&fit=crop&w=600&q=80',
  ],

  // 14. Cinema Film Strip (Retro Movie Ticket)
  'cinema-ticket': [
    'https://images.unsplash.com/photo-1739433437953-25af9fa13cf8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1774544085293-afc5ad1f63c1?auto=format&fit=crop&w=800&q=80',
  ],

  // 15. Landscape 4R — Single Shot (1 Foto)
  '4r-landscape-single': [
    '/mockups/korean_pose_4.jpg',
  ],

  // 16. Landscape 4R — 4-Grid (2x2) (4 Foto)
  '4r-landscape-grid4': [
    '/mockups/korean_pose_1.jpg',
    '/mockups/korean_pose_2.jpg',
    '/mockups/korean_pose_4.jpg',
    '/mockups/korean_pose_3.jpg',
  ],

  // 17. Landscape 4R — 3-Grid Vertikal (3 Foto)
  '4r-landscape-col3': [
    '/mockups/korean_pose_1.jpg',
    '/mockups/korean_pose_2.jpg',
    '/mockups/korean_pose_3.jpg',
  ],

  // 18. Landscape 4R — Split Asimetris (1 Besar + 2 Kecil) (3 Foto)
  '4r-landscape-split3': [
    '/mockups/korean_pose_1.jpg',
    '/mockups/korean_pose_2.jpg',
    '/mockups/korean_pose_4.jpg',
  ],

  // 19. Landscape 4R — Asimetris 4-Foto (4 Foto)
  '4r-landscape-asym4': [
    '/mockups/korean_pose_1.jpg',
    '/mockups/korean_pose_2.jpg',
    '/mockups/korean_pose_4.jpg',
    '/mockups/korean_pose_3.jpg',
  ],

  // 20. Portrait 4R — Single Polaroid (1 Foto)
  '4r-portrait-polaroid': [
    '/mockups/korean_pose_1.jpg',
  ],

  // 21. Portrait 4R — 2-Cut Vertikal (2 Foto)
  '4r-portrait-cut2': [
    '/mockups/korean_pose_1.jpg',
    '/mockups/korean_pose_2.jpg',
  ],

  // 22. Portrait 4R — 4-Grid (2x2) (4 Foto)
  '4r-portrait-grid4': [
    '/mockups/korean_pose_1.jpg',
    '/mockups/korean_pose_2.jpg',
    '/mockups/korean_pose_4.jpg',
    '/mockups/korean_pose_3.jpg',
  ],
};

const DEFAULT_FALLBACK_PHOTOS = [
  '/mockups/korean_pose_1.jpg',
  '/mockups/korean_pose_2.jpg',
  '/mockups/korean_pose_4.jpg',
  '/mockups/korean_pose_3.jpg',
];

/**
 * Returns the curated array of sample photos for a given template ID
 */
export function getTemplateSamplePhotos(templateId: string, count?: number): string[] {
  const photos = TEMPLATE_SAMPLE_PHOTOS[templateId] || DEFAULT_FALLBACK_PHOTOS;
  if (!count) return photos;
  return Array.from({ length: count }).map((_, i) => photos[i % photos.length]);
}
