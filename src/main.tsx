import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './router'
import './styles/tokens.css'
import './styles/global.css'

export const createRoot = ViteReactSSG({ routes })
