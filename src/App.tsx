import { Outlet } from 'react-router-dom'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
