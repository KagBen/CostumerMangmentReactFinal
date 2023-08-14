import { memo } from "react";
import { useSelector } from "react-redux";

function TotalSumPurComp({ Admin = true, CostumerId , AllPurchases }) {
 
  const Purchases = Admin ? AllPurchases : AllPurchases.filter((purchase) => purchase.CostumerId === CostumerId);
  const Products = useSelector((state) => state.Products);
  const TotalPrice = Purchases.reduce((acc, CurrPurchase) => {
    const product = Products.find((prod) => prod.ProductId === CurrPurchase.ProductId);
    return (acc = acc + product.Price);
  }, 0);

  return (
    <div className="p-4 bg-white  border border-b-4 shadow-xl hover:shadow-2xl rounded-lg mb-4">
      <h2 className="text-xl tracking-wider mb-2">{Admin ? "All Users Revenues" : "Specific User"}</h2>
      <div >Total revenues: <span className="text-blue-500 font-bold text-lg">{TotalPrice}$</span></div>
    </div>
  );
}

export default memo(TotalSumPurComp);
