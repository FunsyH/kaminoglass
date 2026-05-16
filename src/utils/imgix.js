/**
 * Pide a Wixstatic una versión redimensionada y comprimida de la imagen.
 * En vez de bajar la foto original (puede ser 4000px), pedimos solo
 * el tamaño que realmente necesitamos mostrar.
 *
 * Ejemplo de URL original:
 *   https://static.wixstatic.com/media/abc123~mv2.jpg
 *
 * URL optimizada resultante:
 *   https://static.wixstatic.com/media/abc123~mv2.jpg/v1/fill/w_800,h_600,al_c,q_80,enc_auto/abc123.jpg
 */
export function wixImg(url, width, height, quality = 80) {
  if (!url || !url.includes('wixstatic.com')) return url

  // Extraer el nombre del archivo del final de la URL
  const filename = url.split('/').pop()

  return `${url}/v1/fill/w_${width},h_${height},al_c,q_${quality},enc_auto/${filename}`
}
