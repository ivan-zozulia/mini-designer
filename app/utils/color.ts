import { colord } from 'colord'

// in original shirt.svg
// hsl(79 100% 42%) - base color
// hsl(81 100% 27%) - deep shadows
// hsl(79 100% 37%) - light shadows

const deepShadowsFactor = 27 / 42
const lightShadowsFactor = 37 / 42

export function shadowColors(baseColor: string) {
  const { h, s, l } = colord(baseColor).toHsl()
  return {
    deep: `hsl(${h}, ${s}%, ${l * deepShadowsFactor}%)`,
    light: `hsl(${h}, ${s}%, ${l * lightShadowsFactor}%)`,
  }
}
