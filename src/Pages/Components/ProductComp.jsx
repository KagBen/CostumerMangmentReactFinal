import { useSelector } from "react-redux";
import CostumerItemComp from "./CostumerItemComp";
import aggregateOrders from "../../AggregateFunc";
import { Link } from "react-router-dom";

function ProductComp({ Product }) {
  const Purchase = useSelector((state) => state.Purchases);
  const CurrAggregatedPurchase = aggregateOrders(Purchase.filter((purchase) => purchase.ProductId === Product.ProductId));

  return (
    <div className="p-4 bg-white border border-b-4 shadow-xl hover:shadow-2xl rounded-lg mb-4">
      <span className="text-xl border-b mb-3 inline-block">
        Product Name: <Link to={`/EditAddPage/Update/Product/${Product.ProductId}`} className="text-blue-500 hover:underline ">{Product.Name}</Link>
      </span>
      <br />
      <div className="pl-2"> 
      Product Price: {Product.Price}$
      <br />
      Product Quantity: <span className={Product.Quantity? "":"text-red-500"} >{Product.Quantity? Product.Quantity:"Sold Out"}</span>
      <h1 className="text-lg tracking-widest font-medium underline mt-4 pl-2 ">List Of Costumers:</h1>
      {CurrAggregatedPurchase.length ? (
        CurrAggregatedPurchase.map((purchase) => {
          const CurrPurchasesByCostumer = CurrAggregatedPurchase.filter((pur) => pur.CostumerId === purchase.CostumerId);
          return (
            <>
            <ul key={purchase.PurchaseId} className="pl-2">
              <CostumerItemComp AggregatedPurchasesCostumer={{ CostumerId: CurrPurchasesByCostumer[0].CostumerId, productPurchaseDates: CurrPurchasesByCostumer[0].products[0].dates }} />
            </ul>
            </>
          );
        })
      ) : (
        <p className="mt-2">No Orders exist for this product yet..</p>
      )}
      </div>
    </div>
  );
}

export default ProductComp;
