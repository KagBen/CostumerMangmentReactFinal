import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ListComp({ AggregatedPurchases, type, withDates, onlyDates = false }) {
  const Products = useSelector((state) => state.Products);
  const Costumers = useSelector((state) => state.Costumers);

  return (
    <>
      <div>
        < ul className="pl-8 py-4 m-2" >
          {AggregatedPurchases.map((purchase, index) => {
            switch (type) {
              case "Products": {
                const Product = Products.find((prod) => prod.ProductId === purchase.ProductId);
                if (withDates || onlyDates) {
                  return (
                    <div key={index} className="mt-2">
                      {!onlyDates && (
                        <li className="text-blue-600 pb-1 border-b hover:text-blue-800 transition ">
                          <Link to={`/EditAddPage/Update/Product/${Product?.ProductId}`}>{Product?.Name}</Link>
                        </li>
                      )}
                      <ul className="pl-12  py-2 list-disc">
                        {purchase.dates.map((date, index) => (
                          <li key={index}>{date.date}</li>
                        ))}
                      </ul>
                    </div>
                  );
                } else {
                  return (
                    <>
                      {purchase.dates.map((date, index) => (
                        <li key={index}>{Product?.Name}</li>
                      ))}
                    </>
                  );
                }
              }

              case "Costumers": {
                const Costumer = Costumers.find((cost) => cost.CostumerId === purchase.CostumerId);
                return (
                  <li key={index} className="text-blue-600">
                    <Link to={`/EditAddPage/Update/Costumer/${Costumer.CostumerId}`}>{Costumer.FirstName} {Costumer.LastName}</Link>
                  </li>
                );
              }
            }
          })}
        </ul>
      </div>
    </>
  );
}

export default memo(ListComp);
