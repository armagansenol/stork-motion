export const breakpoints = {
  mobile: 800,
  tablet: 1024,
}

export function lineBreak(text: string) {
  return text.replace("<br>", "\n")
}
