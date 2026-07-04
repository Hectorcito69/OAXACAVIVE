import { defineConfig } from 'astro/config';

export default defineConfig({
  // Cambia esto si el dominio final es distinto
  site: 'https://oaxacaviveshow.com',
  compressHTML: true,
  image: {
    // Calidad por defecto para las conversiones automáticas a WebP/AVIF
    // que hace el componente <Image /> / <Picture />
  },
  // Mantiene el SEO/enlaces ya indexados de las URLs .html anteriores
  redirects: {
    '/sobre-nosotros.html': '/sobre-nosotros',
    '/proximas-fechas.html': '/proximas-fechas',
    '/ballet-oaxaca.html': '/colaboradores',
  },
});
