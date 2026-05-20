declare module '*.jpg'
declare module '*.png'
declare module '*.svg?raw' {
  const markup: string
  export default markup
}
