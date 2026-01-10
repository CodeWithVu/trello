export default {
  content: ['./index.html', './src/**/*.{js,jsx}'], // ← Tailwind quét files này để tìm class names
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Roboto', 'system-ui', 'sans-serif']
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)'
      }
    }
  }
}