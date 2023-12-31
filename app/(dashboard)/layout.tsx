import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-20 md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 fixed flex-col inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 h-full pt-20">{children}</main>
    </div>
  );
};

export default DashboardLayout;
