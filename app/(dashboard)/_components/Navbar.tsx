import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileMenu from "./MobileMenu";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
          <MobileMenu />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0 bg-white">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
