import Logo from './Logo'
import SideBar from './SideBar'

export default function Navbar() {
  return (
    <nav className='bg-primary p-4 flex items-center justify-between'>
      <Logo
        size={45}
        isText={true}
      />
      <SideBar />
    </nav>
  )
}
