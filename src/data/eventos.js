// Centraliza la información de cada evento.
// Así el HTML de las páginas queda limpio y solo recorre este arreglo.
// `flyer` debe ser la ruta al archivo ya optimizado (ideal: import ESM
// desde src/assets/images para que Astro lo convierta a WebP).

export const eventos = [
  // Los eventos antiguos han sido eliminados.
  {
    id: "evento-actual-2026",
    titulo: "OAXACA VIVE — Guelaguetza", // Puedes cambiar este título
    lugar: "Lugar del evento", // Puedes cambiar este lugar
    fechas: "Julio 26",
    flyer: "/public/images/OAXACA VIVE FLYER-3.png",
    descripcion: `Donde la esencia de Oaxaca cobra vida. Déjate envolver por la magia, el color y la riqueza cultural de nuestra tierra en Oaxaca Vive, un espectáculo único concebido como un mosaico multidisciplinario que reúne las expresiones artísticas más vibrantes de la región.

Una experiencia inolvidable que te hará vibrar y sentir el verdadero corazón de Oaxaca. ¡Asegura tu lugar desde ahora! Haz clic en el botón de abajo o escanea el código QR de nuestra publicidad para comprar tus boletos hoy mismo.`,
  },
];
