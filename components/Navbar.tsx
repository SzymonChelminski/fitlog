import Logo from './Logo';
import SideBar from './SideBar';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-4">
      <Logo size={45} isText={true} />
      <SideBar />
    </nav>
  );
}
