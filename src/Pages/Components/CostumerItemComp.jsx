import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddOrBuyBox from "./PAddOrBuyBox";

function CostumerItemComp({ AggregatedPurchasesCostumer }) {
  const [_CurrCostumer, setCostumer] = useState();
  const Costumers = useSelector((state) => state.Costumers);

  useEffect(() => {
    setCostumer(Costumers.find((cost) => cost.CostumerId === AggregatedPurchasesCostumer.CostumerId));
  }, [AggregatedPurchasesCostumer.CostumerId, Costumers]);

  return (
   
    <li className="py-4 px-6 border-b-2">
     
      <p>
        <Link to={`/EditAddPage/Update/Costumer/${_CurrCostumer?.CostumerId}`} className="text-blue-700 ">
         <span className="text-black text-lg">Costumer Name: </span><span className="hover:underline">{_CurrCostumer?.FirstName} {_CurrCostumer?.LastName}</span>
        </Link>
      </p>

      <ul className=" rounded-lg  ml-6  p-4 pt-2 ">
        Purchased Dates:
        {AggregatedPurchasesCostumer.productPurchaseDates.map((date, index) => {
          return <li key={index}>{date.date}</li>;
        })}
      </ul>

      <AddOrBuyBox type={"Add"} CostumerId={_CurrCostumer?.CostumerId} />
    </li>
    
  );
}

export default CostumerItemComp;
