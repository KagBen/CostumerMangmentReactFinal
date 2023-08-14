import { Link, useNavigate } from "react-router-dom"
import aggregateOrders from "../../AggregateFunc"
import TableComp from "../Components/TableComp"
import { useSelector } from "react-redux"

function CostumerPage() {
  const nav = useNavigate()
  const Purchases = useSelector((state) => state.Purchases)

  return (
    <>
      <div className="bg-gray-100">
        <div className="flex border border-b-4  shadow-xl transition hover:shadow-2xl items-center justify-between bg-white mb-3 rounded-lg p-3 h-full">
          <h1 className="text-2xl font-normal tracking-wider">Costumers</h1>
          <Link to="/EditAddPage/Add/Costumer/" className=" rounded-lg bg-blue-500 border-b-4 text-white border-blue-600  pt-2 pb-2 pr-4 pl-4 hover:bg-blue-600">
            + Create New Costumer
          </Link>
        </div> 
        <div  className=" border border-b-4 shadow-xl transition hover:shadow-2xl bg-white mb-3 rounded-lg p-3 h-full">
         
          <TableComp  AggregatedPurchases= {aggregateOrders(Purchases)} comeFromCostumerPage={true}/> 
        </div>
        
      </div>
    </>
  )
}

export default CostumerPage
