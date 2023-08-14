import { useState } from "react";
import { useSelector } from "react-redux";
import { changeDateFormat } from "../../FetchDate";
import TableComp from "../Components/TableComp";
import aggregateOrders from "../../AggregateFunc";
import { Link } from "react-router-dom";

function PurchasesPage() {
  const [searched, setSearched] = useState({ firstSearch: false });

  const Purchases = useSelector((state) => state.Purchases);
  const Products = useSelector((state) => state.Products);
  const Costumers = useSelector((state) => state.Costumers);

  const [handleProduct, setProduct] = useState("ChooseProduct");
  const [handleCostumer, setCostumer] = useState("ChooseCostumer");
  const [handleDate, setDate] = useState("");

  const CheckAndSend = (e) => {
    let purchases = [];

    purchases = handleProduct === "ChooseProduct" ? Purchases : Purchases.filter((purchase) => purchase.ProductId === handleProduct);
    purchases = handleCostumer === "ChooseCostumer" ? purchases : purchases.filter((purchase) => purchase.CostumerId === handleCostumer);
    purchases = handleDate === "" ? purchases : purchases.filter((purchase) => purchase.date === handleDate);

    if (purchases.length !== 0) {
      setSearched({ firstSearch: true, showTable: true, searchProductOnly: handleProduct === "ChooseProduct" ? false : true, ProductId: handleProduct, searchDateOnly: handleDate === "" ? false : true, purchases: purchases });
    } else {
      setSearched({ firstSearch: true, showTable: false });
    }
    e.preventDefault();
  };

  return (
    <div className="flex flex-col bg-gray-100 mb-3 rounded-lg p-3 h-full">
      <div className="flex items-center justify-between bg-white mb-3 rounded-lg p-3 border border-b-4 hover:shadow-2xl transition rounded-lg shadow-xl">
        <h1 className="text-2xl font-normal tracking-widest text-gray-800">Purchases</h1>
      
      </div>

      <div className="bg-white border border-b-4 hover:shadow-2xl transition rounded-lg shadow-xl mb-3 p-3">
        <h1 className="text-lg font-normal tracking-wide border-b-2 border-blue-300 text-gray-800 mb-3">Search:</h1>
        <form className="flex flex-wrap font-light tracking-wide space-y-3 md:space-y-0 md:space-x-3" onSubmit={CheckAndSend}>
          <div className="flex items-center font-lighter tracking-wide w-full md:w-auto">
            <label htmlFor="ProdSelect" className=" tracking-wider text-gray-800 mr-2">
              Select Product:
            </label>
            <select
              name="ProdSelect"
              id="ProdSelect"
              value={handleProduct}
              onChange={(e) => {
                setProduct(e.target.value);
              }}
              className="px-3 py-2 w-full md:w-auto font-light text-sm tracking-wider rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="ChooseProduct">Choose Product</option>
              {Products.map((product) => {
                return (
                  <option key={product.ProductId} value={product.ProductId}>
                    {product.Name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex items-center    w-full md:w-auto">
            <label htmlFor="CostumerSelect" className=" tracking-wider text-gray-800 mr-2">
              Select Customer:
            </label>
            <select 
              name="CostumerSelect"
              id="CostumerSelect"
              value={handleCostumer}
              onChange={(e) => {
                setCostumer(e.target.value);
              }}
              className="px-3 py-2 w-full md:w-auto font-light text-sm tracking-wider rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="ChooseCostumer">Choose Customer</option>
              {Costumers.map((costumer) => {
                return (
                  <option key={costumer.CostumerId} value={costumer.CostumerId}>
                    {costumer.FirstName} {costumer.LastName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex items-center  w-full md:w-auto">
            <label htmlFor="DateSelect" className=" tracking-wider text-gray-800 mr-2">
              Choose Date:
            </label>
            <input
              type="date"
              id="DateSelect"
              onChange={(e) => {
                setDate(e.target.value === "" ? "" : changeDateFormat(e.target.value));
              }}
              className="px-3 py-2 w-full md:w-auto font-light text-sm tracking-wider rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="  px-3 py-2 border  hover:border-black text-blue-700 text-sm rounded-md border-blue-700  transition hover:text-black "
          >
            <span className="mx-2 text-md">Search</span>
            <i className="fa fa-search fa-fw "   aria-hidden="true"></i>
          </button>
        </form>
      </div>

     {searched.firstSearch && <div className="border border-b-4 shadow-xl transition hover:shadow-2xl bg-white mb-3 rounded-lg p-3">
        {searched.firstSearch && searched.showTable && (
          <div className="mb-4">
            {searched.searchProductOnly && !searched.searchDateOnly && <p>Searched Product: {Products.find((product) => product.ProductId === searched.ProductId)?.Name}</p>}
            {searched.searchDateOnly && !searched.searchProductOnly && <p>Searched Date: {handleDate}</p>}
            <TableComp AggregatedPurchases={aggregateOrders(searched.purchases)} searchOnlyByDate={searched.searchDateOnly} searchOnlyByProduct={searched.searchProductOnly} both={searched.searchProductOnly === searched.searchDateOnly === true ? true : false} comeFromCostumerPage={false} />
          </div>
        )}

        {searched.firstSearch && !searched.showTable && (
          <div className="mb-4">
            <h1>No Results Found...</h1>
          </div>
        )}
      </div>
      }
    </div>
  );
}

export default PurchasesPage;
