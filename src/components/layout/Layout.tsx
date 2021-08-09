import Sidebar from './Sidebar';

interface IProps {
  children: React.ReactNode;
}

function Layout({ children }: IProps) {
  return (
    <div>
      <Sidebar />
      layout{children}
    </div>
  );
}

export default Layout;
