import { addDoc, doc, collection, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCurrentDate } from "../../FetchDate";
import db from "../../firebase";

function AddOrBuyBox({ type, CostumerId }) {
  const Products = useSelector((state) => state.Products);

  const [handleProduct, setProduct] = useState("ChooseProduct");
  const [showBox, setShowBox] = useState(false);
  const[closeButton, setCloseButton] = useState(true);
  const ShowBoxState = (state) => {
    setShowBox(state);
  };

  const updateDb = async () => {
    if (handleProduct !== "ChooseProduct") {
      const newPurchase = { CostumerId: CostumerId, ProductId: handleProduct, date: fetchCurrentDate() };
      const productUpdQuntity = Products.find((prod) => prod.ProductId === handleProduct);
      await updateDoc(doc(db, "Products", productUpdQuntity.ProductId), { Name: productUpdQuntity.Name, Price: productUpdQuntity.Price, Quantity: productUpdQuntity.Quantity - 1 });
      await addDoc(collection(db, "Purchases"), newPurchase);
      setShowBox(false);
      setProduct("ChooseProduct");
    } else {
      alert("Please Choose a Product");
    }
  };



         

  return (
    <>
      <div>
       {closeButton &&
        <button
          className="rounded-lg border-blue-600 border-b-4 transition bg-blue-500 text-white pt-1.5 pb-1.5 pr-7 pl-7 hover:bg-blue-600"
          onClick={() => {
            ShowBoxState(true);
            if(type=="Buy") {
              setCloseButton(false);
              }
            
          }}
        >
          {type === "Buy" ? "Buy Product" : "Add Product"}
        </button>
}
        {showBox && (
          <div className="Box mt-4 p-4  rounded-md">
            <h4 className="mb-2 text-lg text-left font-normal tracking-wider ">{type === "Buy" ? "Buy Product" : "Add Product"}</h4>
            <select
              name=""
              id=""
              value={handleProduct}
              onChange={(e) => {
                setProduct(e.target.value);
              }}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="ChooseProduct" disabled>
                Choose Product
              </option>
              {Products.map((product) => (
                <option key={product.ProductId} disabled={product.Quantity === 0 ? true : false} value={product.ProductId}>
                  {product.Name}
                </option>
              ))}
            </select>
            <div className="mt-4 space-x-2">
              <button
                onClick={updateDb}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
              >
                {type === "Buy" ? "Buy" : "Add"}
              </button>
              <button
                onClick={() => {
                  setShowBox(false);
                  setProduct("ChooseProduct");
                
                  setCloseButton(true);
                  
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddOrBuyBox;
