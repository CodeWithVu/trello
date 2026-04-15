// export const API_ROOT = 'http://localhost:8017'
let apiRoot = ''
// console.log('import.meta.env', import.meta.env)
// console.log('process.env', process.env)

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}

if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-server-y8l4.onrender.com'
}
export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12