import Logo from './Logo';
import SideBar from './SideBar';

export default function Navbar() {
  return (
    <nav className="bg-primary border-b-custom-text-muted/10 flex items-center justify-between border-b p-4">
      <Logo size={45} isText={true} />
      <SideBar />
    </nav>
  );
}
