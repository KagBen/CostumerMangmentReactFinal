import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListComp from "./ListComp";
import AddOrBuyBox from "./PAddOrBuyBox";
import { memo } from "react";

function TableComp({ AggregatedPurchases, searchOnlyByDate = false, searchOnlyByProduct = false, both = false, comeFromCostumerPage = false }) {
  const Costumers = useSelector((state) => state.Costumers);

  // Filter costumers who don't have any purchases
  const costumersWithoutPurchases = Costumers.filter((costumer) =>
    AggregatedPurchases.findIndex((purchase) => purchase.CostumerId === costumer.CostumerId) === -1
  );

  return (
    <div>
      <table className="w-full border-collapse border-2 border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 font-normal tracking-widest border">Costumer Name</th>
            {!both && searchOnlyByDate && <th className="p-2 font-normal tracking-widest border">Product</th>}
            {!both && searchOnlyByProduct && <th className="p-2 font-normal tracking-widest border">Dates</th>}
            {!searchOnlyByDate && !searchOnlyByProduct && <th className="p-2 font-normal tracking-widest border">Products and Dates</th>}
            {both && searchOnlyByDate && searchOnlyByProduct && <th className="p-2 font-normal tracking-widest border">Products and Dates</th>}
            {comeFromCostumerPage && <th className="p-2 font-normal tracking-widest border">Buy Product</th>}
          </tr>
        </thead>
        <tbody>
          {/* Display costumers without purchases */}
          {comeFromCostumerPage && costumersWithoutPurchases.map((costumer, index) => (
            <tr key={index} className={(index) % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="p-8 border text-center"> <Link className="text-blue-600 font-normal tracking-wider hover:border-b hover:border-gray-300" to={`/EditAddPage/Update/Costumer/${costumer?.CostumerId}`}>
                      {costumer?.FirstName} {costumer?.LastName}
                    </Link></td>
              <td className="p-8 border text-center tracking-wider font-normal">No orders placed yet...</td>
              <td className="p-8 border text-center">
                <AddOrBuyBox type="Buy" CostumerId={costumer.CostumerId} />
              </td>
            </tr>
          ))}

          {/* Display costumers with purchases */}
          {AggregatedPurchases.length !== 0 ? (
            AggregatedPurchases.map((purchase, index) => {
              const costumer = Costumers.find((cost) => cost.CostumerId === purchase.CostumerId);
              const productArr = AggregatedPurchases.find((pur) => pur.CostumerId === purchase.CostumerId).products;

              return (
                <tr key={index + costumersWithoutPurchases.length} className={(index + costumersWithoutPurchases.length) % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="p-2 border text-center">
                    <Link className="text-blue-600 font-normal tracking-wider hover:border-b hover:border-gray-300" to={`/EditAddPage/Update/Costumer/${costumer?.CostumerId}`}>
                      {costumer?.FirstName} {costumer?.LastName}
                    </Link>
                  </td>
                  {!both && searchOnlyByDate && (
                    <td className="p-2 border">
                      {productArr.length !== 0 ? (
                        <ListComp AggregatedPurchases={productArr} type="Products" withDates={false} />
                      ) : (
                        "No Orders Found"
                      )}
                    </td>
                  )}
                  {!both && searchOnlyByProduct && (
                    <td className="p-2 border">
                      {productArr.length !== 0 ? (
                        <ListComp AggregatedPurchases={productArr} type="Products" withDates={true} onlyDates={true} />
                      ) : (
                        "No Orders Found"
                      )}
                    </td>
                  )}
                  {!searchOnlyByDate && !searchOnlyByProduct && (
                    <td className="p-2 border">
                      {productArr.length !== 0 ? (
                        <ListComp AggregatedPurchases={productArr} type="Products" withDates={true} />
                      ) : (
                        "No Orders Found"
                      )}
                    </td>
                  )}
                  {both && searchOnlyByDate && searchOnlyByProduct && (
                    <td className="p-2 border">
                      {productArr.length !== 0 ? (
                        <ListComp AggregatedPurchases={productArr} type="Products" withDates={true} />
                      ) : (
                        "No Orders Found"
                      )}
                    </td>
                  )}
                  {comeFromCostumerPage && <td className="p-2 border text-center"><AddOrBuyBox type="Buy" CostumerId={purchase.CostumerId} /></td>}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="p-2 border font-normal tracking-widest" colSpan={5}>No Results Found...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default memo(TableComp);
