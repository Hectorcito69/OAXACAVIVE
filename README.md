# Oaxaca Vive — sitio en Astro.js

Reconstrucción completa del sitio (antes HTML/CSS puro subido archivo por
archivo a GitHub) como un proyecto **Astro.js** ordenado, mobile-first,
con imágenes en WebP, animaciones y un botón flotante de WhatsApp para
boletos.

---

## 1. Estructura del proyecto

```
oaxaca-vive/
├── .github/workflows/deploy.yml   # Publica automáticamente en GitHub Pages
├── public/                        # Archivos que se sirven tal cual (sin procesar)
│   ├── images/                    # Fotos y flyers ya optimizados (.webp)
│   ├── video/                     # Videos de fondo (.mp4)
│   ├── icons/                     # Iconos de redes sociales, favicon
│   └── robots.txt
├── scripts/
│   └── optimizar-imagenes.mjs     # Conversión masiva a WebP con sharp
├── src/
│   ├── components/                # Piezas reutilizables (Header, Footer, tarjetas…)
│   ├── data/                      # Contenido en JS (eventos, equipo, colaboradores)
│   ├── layouts/Layout.astro       # Esqueleto HTML compartido por todas las páginas
│   ├── pages/                     # Cada archivo = una URL del sitio
│   │   ├── index.astro            # /
│   │   ├── sobre-nosotros.astro   # /sobre-nosotros
│   │   ├── proximas-fechas.astro  # /proximas-fechas
│   │   └── colaboradores.astro    # /colaboradores
│   └── styles/global.css          # Toda la hoja de estilos, mobile-first
├── astro.config.mjs
└── package.json
```

**Por qué así:** en Astro, cada `.astro` dentro de `src/pages/` se
convierte automáticamente en una ruta — ya no hay que mantener 4 archivos
HTML casi idénticos copiando el header y el footer a mano. `Header.astro`,
`Footer.astro` y `WhatsAppButton.astro` existen una sola vez y se
reutilizan en todo el sitio.

### ¿Dónde pongo el resto de mis archivos (fotos, videos, etc.)?

- **Videos** → `public/video/`
- **Fotos, flyers, logo** → `public/images/` (renombradas a `.webp`, ver
  sección 3)
- **Iconos pequeños (redes sociales, favicon)** → `public/icons/`

Todo lo que pongas en `public/` se sirve exactamente con esa ruta, por
ejemplo `public/images/logo.png` queda disponible en `/images/logo.png`.
Ya dejé el código de cada página apuntando a esas rutas — solo faltan los
archivos físicos.

### Tabla de renombrado (nombres viejos → nuevos)

Tus archivos actuales tienen espacios, acentos y paréntesis, lo cual es
mala práctica para la web (rompe URLs, complica el control de versiones).
Renómbralos a minúsculas y con guiones (`kebab-case`) al copiarlos:

| Archivo original                          | Nuevo nombre                     | Carpeta destino |
|---|---|---|
| `image-removebg-preview-modified.png`     | `logo.png`                       | `public/images` |
| `flortehuana.jpg`                         | `favicon.png`                    | `public/icons` |
| `foto de fondo escenario.jpg`             | `stage-bg.jpg`                   | `public/images` |
| `Oaxaca Vive Chicago.mp4`                 | `hero-chicago.mp4`               | `public/video` |
| `c1730_DSg0iY28.mp4`                      | `separador.mp4`                  | `public/video` |
| `papelpicado1.png`                        | `papel-picado.png`               | `public/images` |
| `FOTODANZANTE.jpg`                        | `danzante.jpg`                   | `public/images` |
| `adornoflores.png`                        | `adorno-flores.png`              | `public/images` |
| `flyers_page-0002.jpg`                    | `flyer-chicago.jpg`              | `public/images` |
| `flyers_page-0003.jpg`                    | `flyer-escondido.jpg`            | `public/images` |
| `galeria1.jpg`                            | `galeria-1.jpg`                  | `public/images` |
| `fotoparagaleriagrande.jpg`               | `galeria-grande.jpg`             | `public/images` |
| `fotoparagalriachica.jpg`                 | `galeria-chica-1.jpg`            | `public/images` |
| `fotoparagaleriachica2.jpg`               | `galeria-chica-2.jpg`            | `public/images` |
| `fotoparagaleriachica3.jpg`               | `galeria-chica-3.jpg`            | `public/images` |
| `fotogaleriachica4.jpg`                   | `galeria-4.jpg`                  | `public/images` |
| `fotogaleriachica5.jpg`                   | `galeria-chica-5.jpg`            | `public/images` |
| `instagramlogoblanco.png`                 | `icon-instagram.png`             | `public/icons` |
| `logofacebookblanco.png`                  | `icon-facebook.png`              | `public/icons` |
| `image-removebg-preview (4).png`          | `icon-twitter.png`               | `public/icons` |
| `LUIS ADRIAN TENOR.png`                   | `team-luis-adrian.png`           | `public/images` |
| `Jazz matias.png`                         | `team-jazz-matias.png`           | `public/images` |
| `ticha.jpg`                               | `team-ticha-cruz.jpg`            | `public/images` |
| `ximenahernandez.jpeg`                    | `team-ximena-hernandez.jpeg`     | `public/images` |
| `Costa Mia.png`                           | `team-costa-mia.png`             | `public/images` |
| `Cuarteto Xcanda.jpg`                     | `team-cuarteto-xcanda.jpg`       | `public/images` |
| `zaid-aerea-1.jpg`                        | `team-zaid-glez.jpg`             | `public/images` |
| `Alejandro Cristobal.jpg`                 | `team-alejandro-cristobal.jpg`   | `public/images` |
| `Pablo Marquez.jpeg`                      | `team-pablo-marquez.jpeg`        | `public/images` |
| `Inti Vazquez.png`                        | `team-inti-vazquez.png`          | `public/images` |
| `Wagije Jimenez.png`                      | `team-wagive-jimenez.png`        | `public/images` |
| `Jhovanny Aguilar.png`                    | `team-jhovanny-aguilar.png`      | `public/images` |
| `Lili Urbieta.png`                        | `team-lili-urbieta.png`          | `public/images` |
| `Margarita Machado.jpeg`                  | `team-margarita-machado.jpeg`    | `public/images` |
| `Cuauhpanco Teatrofoto1/2.jpg`            | `colab-cuauhpanco-1/2.jpg`       | `public/images` |
| `Ballet Folklorico de Zimatlan.jpeg`      | `colab-ballet-zimatlan.jpeg`     | `public/images` |
| `balletoaxaca.jpg`                        | `colab-ballet-oaxaca.jpg`        | `public/images` |
| `talleralebrijologo.jpg`                  | `colab-alebrijes-bg.jpg`         | `public/images` |
| `talleralebrijologo1/2/3.jpg`             | `colab-alebrijes-1/2/3.jpg`      | `public/images` |
| `Said Corona Oaxaca Vive.png`             | `colab-isaid-corona.png`         | `public/images` |
| `Zanda Gundaluu1/3.jpg`                   | `colab-zanda-1/3.jpg`            | `public/images` |
| `lagartijasinfondo.png`                   | `lagartija.png`                  | `public/images` |
| `grecas.png` / `grecascompleto.png`       | *(opcional, no se usan ya)*      | — |

> El resto de fotos que tengas (más flyers, más galería) sigue el mismo
> patrón: minúsculas, guiones, sin acentos ni espacios.

---

## 2. Puesta en marcha

Necesitas [Node.js](https://nodejs.org) 18 o superior instalado.

```bash
# 1. Entra a la carpeta del proyecto
cd oaxaca-vive

# 2. Instala dependencias
npm install

# 3. Copia tus imágenes/videos ya renombrados a public/images, public/video, public/icons

# 4. Levanta el servidor de desarrollo
npm run dev
# abre http://localhost:4321
```

Cuando todo se vea bien:

```bash
npm run build     # genera el sitio final optimizado en /dist
npm run preview   # lo sirve localmente para probar el build de producción
```

---

## 3. Optimización de imágenes a WebP

Tienes **dos mecanismos**, según dónde se use cada imagen:

### A) Imágenes dentro del contenido de una página (fotos de equipo, flyers, galería)

Lo ideal a mediano plazo es moverlas a `src/assets/images/` e importarlas
con el componente `<Image />` de Astro — así Astro las convierte a WebP
(o AVIF), genera varios tamaños (`srcset`) y evita que el usuario
descargue una imagen más pesada de la que necesita:

```astro
---
import { Image } from "astro:assets";
import flyerChicago from "../assets/images/flyer-chicago.jpg";
---
<Image src={flyerChicago} alt="Flyer Chicago" widths={[400, 800]} />
```

Por simplicidad, el proyecto que te dejé usa rutas directas a
`public/images/*.webp` (más fácil de arrancar), pero si quieres el máximo
de rendimiento, esta es la mejora natural del "siguiente nivel".

### B) Imágenes de fondo por CSS (los "hero" de cada página, `background-image`)

Estas **no** pasan por el pipeline de `<Image />` porque Astro solo
optimiza imágenes importadas desde `src/`. Para esos casos usa el script
incluido, que convierte en bloque con [sharp](https://sharp.pixelplumbing.com/):

```bash
# coloca tus fotos originales (jpg/png) en una carpeta, p. ej. "originales/"
node scripts/optimizar-imagenes.mjs originales public/images
```

Esto genera un `.webp` de cada imagen (ancho máximo 1920px, calidad 82,
un buen balance peso/calidad) listo para usarse en `public/images`.

### Reglas rápidas

- Formato de salida: **WebP** (compatible con el 97%+ de navegadores hoy).
- No subas imágenes más anchas de lo que se van a mostrar (1920px es de
  sobra para fondos a pantalla completa).
- Usa siempre `alt` descriptivo (ya está resuelto en todas las páginas).
- Los `<img>` que no son visibles de inicio llevan `loading="lazy"`
  (ya incluido en tarjetas, galería y equipo).

---

## 4. Mobile-first y animaciones

- Todo `src/styles/global.css` está escrito con reglas base pensadas para
  pantalla chica primero, y `@media (min-width: …)` va sumando estilos
  para tablet/escritorio (nunca al revés).
- El menú de navegación se convierte en un menú hamburguesa deslizante en
  móvil y vuelve a ser horizontal a partir de 900px.
- Los bloques de contenido usan una clase `.reveal` que aparece con un
  fundido + desplazamiento suave cuando entran en pantalla (con
  `IntersectionObserver`), y se respeta `prefers-reduced-motion` para
  quienes desactivan animaciones en su sistema.
- Las transiciones entre páginas usan `<ClientRouter />` de Astro
  (View Transitions), para que la navegación se sienta fluida en vez de
  un salto brusco de página.

---

## 5. Botón flotante de boletos (WhatsApp)

Está en `src/components/WhatsAppButton.astro`, se incluye una sola vez en
`Layout.astro` y por lo tanto aparece en **todas** las páginas. Apunta a:

```
https://w.app/oaxacaviveshow
```

Si cambia el enlace en el futuro, solo se edita en ese único archivo.

---

## 6. Publicar el sitio

### Opción A — GitHub Pages (gratis, mismo lugar que ya usas)

Ya incluí `.github/workflows/deploy.yml`. Solo necesitas:

1. Subir este proyecto a tu repositorio de GitHub (a la rama `main`).
2. En **Settings → Pages** del repo, elegir como origen "GitHub Actions".
3. Cada `push` a `main` compila y publica el sitio automáticamente.
4. Si usas un dominio propio (`oaxacaviveshow.com`), agrega un archivo
   `public/CNAME` con ese dominio adentro, o configúralo en Settings → Pages.

### Opción B — Netlify o Vercel (recomendado si quieres despliegues más simples)

Ambos detectan Astro automáticamente: conectas el repo de GitHub, y con
cada `push` compilan y publican solos, con vista previa por cada rama.
Es la opción más rápida si tienes fechas límite ajustadas, porque no
depende de configurar Actions ni permisos de Pages.

---

## 7. Próximos pasos sugeridos

- Mover fotos/flyers a `src/assets/` + `<Image />` para optimización
  automática con `srcset` responsivo (mejora extra de rendimiento).
- Agregar un `sitemap.xml` automático con `@astrojs/sitemap`.
- Si más adelante se integra venta de boletos (Stripe / Ticket Tailor),
  esas páginas pueden vivir como nuevas rutas en `src/pages/` sin tocar
  el resto del sitio.
