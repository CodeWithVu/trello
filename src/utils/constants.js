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

export const CARD_MEMBERS_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}

export const BOARD_BACKGROUNDS = [
  { id: 'bg-1', url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80', title: 'Mountain Lake', brightness: 'light' },
  { id: 'bg-2', url: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=1200&q=80', title: 'Galaxy', brightness: 'dark' },
  { id: 'bg-3', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80', title: 'Abstract Art', brightness: 'light' },
  { id: 'bg-4', url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80', title: 'City Night', brightness: 'dark' },
  { id: 'bg-5', url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80', title: 'Minimalist Wall', brightness: 'light' },
  { id: 'bg-6', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', title: 'Yosemite', brightness: 'light' }
]

