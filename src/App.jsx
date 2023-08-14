

import { Route, Routes} from 'react-router-dom'
import MainPage from './Pages/MainPage/MainPage'
import ProductPage from './Pages/ProductPage/ProductPage'
import CostumerPage from './Pages/CostumerPage/CostumerPage'
import PurchasesPage from './Pages/PurchasesPage/PurchasesPage'
import EditAddPage from './Pages/EditAddPage/EditPageCostOrProd'
import db from './firebase'
import { useEffect } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { useDispatch } from 'react-redux'

import './index.css';





function App() {


const dispatch= useDispatch();

  const snapQuery=async(q, name ) => { 
    onSnapshot(q ,(qCsnapShot)=>{
      const arr= qCsnapShot.docs.map(doc =>({[name+'Id']:doc.id , ...doc.data()}))
      dispatch({type:'LOAD',payload:{arr:arr,name:name+'s'}})
    } )
  }

useEffect(()=>{
const fetchAllData = async()=>{
    const queryCostumers =query(collection(db,"Costumers"))
    const queryProducts = query(collection(db,"Products"))
    const queryPurchases = query(collection(db,"Purchases"))
    await snapQuery(queryCostumers,"Costumer")
    await snapQuery(queryProducts,"Product")
    await snapQuery(queryPurchases,"Purchase")
} 
fetchAllData();
},[])

  return (
    <>



     <Routes>

        <Route path='/' element={<MainPage/>}>
          <Route path='ProductPage' element={<ProductPage/>}/>
          <Route path='CostumerPage' element={<CostumerPage/>}/>
          <Route path='PurchasesPage' element={<PurchasesPage/>}/>
          <Route path='EditAddPage/:status/:type/:typeId?' element={<EditAddPage/>}/>
         
          
        </Route>
      </Routes>
       
    </>
  )
}

export default App
