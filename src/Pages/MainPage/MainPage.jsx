import { Link, Outlet } from "react-router-dom";

function MainPage() {
  return (
    <>
    <div className="pl-3 pr-3 pt-2 pb-2 border  border-b-2 items-center  justify-between  border-t-0 flex w-100 shadow-xl">
      <h1 className="tracking-widest border-r border-gray-300 pr-4"><Link to='/ProductPage'>STORE MANAGMENT</Link></h1>
      <button className=" tracking-widest rounded-lg border  border-blue-500 hover:border-blue-800 transition  text-sm pr-3 pt-1 pb-1 pl-3 ">Login</button>
    </div>
    <div className="flex  ">
      {/* Sidebar Menu */}
      
      <aside className="  bg-gray-800  text-white w-60 text-sm   min-h-screen p-2  ">

        <nav className="mt-6">
          <ul>
            <li className="mb-3">
              <Link to="ProductPage" className="block tracking-wide px-4 py-2 rounded-sm  pl-3 hover:bg-gray-500 hover:bg-opacity-70  transition">
                Products
              </Link>
            </li>
            <li className="mb-3">
              <Link to="CostumerPage" className="block tracking-wide  px-4 py-2 rounded-sm  pl-3  hover:bg-gray-500 hover:bg-opacity-70  transition">
                Costumers
              </Link>
            </li>
            <li className="mb-3">
              <Link to="PurchasesPage" className="block tracking-wide  px-4 py-2 rounded-sm  pl-3  hover:bg-gray-500 hover:bg-opacity-70  transition">
                Purchases
              </Link>
            </li>
            <li className="mb-3">
              <Link to="EditAddPage/Add/Product/" className="block px-4 tracking-wide   pl-3  rounded-sm py-2 hover:bg-gray-500 hover:bg-opacity-70  transition">
                Create Product
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/EditAddPage/Add/Costumer/" className="block tracking-wide pl-3 px-4 rounded-sm  py-2 hover:bg-gray-500 hover:bg-opacity-70  transition">
                Create Costumer
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 p-10">

        <div className="outletMainPage bg-white rounded-lg mb-6">
          <Outlet />
        </div>
      </main>
    </div>
    </>
  );
}

export default MainPage;
