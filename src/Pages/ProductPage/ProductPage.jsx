import { useSelector } from "react-redux";
import ProductComp from "../Components/ProductComp";
import TotalSumPurComp from "../Components/TotalSumComp";
import { Link } from "react-router-dom";

function ProductPage() {
  const Products = useSelector((state) => state.Products);
  const AllPurchases = useSelector((state) => state.Purchases);
  
  return (
    <div className="p-4 bg-gray-100 ">
      <div className="flex border border-b-4 shadow-xl transition hover:shadow-2xl items-center justify-between bg-white mb-3 rounded-lg p-3 h-full">
      <h1 className="text-2xl font-normal tracking-wider">Products</h1>
      
      <Link to="/EditAddPage/Add/Product/" className=" rounded-lg bg-blue-500 border-b-4 text-white border-blue-600  pt-2 pb-2 pr-4 pl-4 hover:bg-blue-600">
        + Create New Product
      </Link>
      </div>
      <div>
        <TotalSumPurComp Admin={true} AllPurchases={AllPurchases } />
      </div>
      <div className="space-y-4 mt-4">
        {Products.map((Product) => {
          return <ProductComp key={Product.ProductId} Product={Product} />;
        })}
      </div>
     
    </div>
  );
}

export default ProductPage;
