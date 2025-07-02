//for the complete layout of our dashboard

import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 hidden md:block">
        {" "}
        {/*show for md and above, hide for other screen sizes */}
        <Sidebar />
      </div>

      <div className="md:ml-64">
        <Header />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
