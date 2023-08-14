
import { useParams } from "react-router-dom"
import ProductEditForm from "../Components/ProductEditForm";
import CostumerEditForm from "../Components/CostumerEditForm";
import ProductAddForm from "../Components/ProductAddForm";
import CostumerAddForm from "../Components/CostumerAddForm";




function EditAddPage() {


const param = useParams();

  return (
    <>
     { param.status=="Update" && param.type=="Product" && <ProductEditForm typeId={param.typeId}/> }
     {param.status=="Update" && param.type=="Costumer"  && <CostumerEditForm typeId={param.typeId} />}
     {param.status=="Add" && param.type=="Product"  &&  <ProductAddForm />}
     {param.status=="Add" && param.type=="Costumer"  &&  <CostumerAddForm />}
    </>
  )
}

export default EditAddPage
