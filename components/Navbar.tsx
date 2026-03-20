import Logo from './Logo';
import SideBar from './SideBar';

export default function Navbar() {
  return (
    <nav className="bg-primary flex items-center justify-between p-4">
      <Logo size={45} isText={true} />
      <SideBar />
    </nav>
  );
}
