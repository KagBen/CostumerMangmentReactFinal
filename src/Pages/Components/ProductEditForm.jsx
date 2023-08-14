import { doc, query, updateDoc, where, collection, getDocs, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import db from "../../firebase";

function ProductEditForm({ typeId: ProductId }) {
  const [_status, setStatus] = useState("");
  const nav = useNavigate();
  const [_CurrProduct, setProduct] = useState({ Name: "", Quantity: "", Price: "" });
  const [_UpdProduct, setUpdatedProduct] = useState({ Name: "", Quantity: "", Price: "" });

  const Products = useSelector((state) => state.Products);

  useEffect(() => {
    const product = Products.find((product) => product.ProductId === ProductId);
    if (product) {
      setProduct({ ...product });
      setUpdatedProduct({ ...product });
    }
  }, [Products]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "Products", ProductId));
    const purchasesRef = collection(db, "Purchases");
    const q = query(purchasesRef, where("ProductId", "==", ProductId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setUpdatedProduct({ Name: "", Quantity: "", Price: "" });
    setStatus("Deleted");
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    value = isNaN(value) ? value : +value;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handle = (e) => {
    setStatus("");
    handleChange(e);
  };

  const handleUpdate = async () => {
    setUpdatedProduct({
      Name: _UpdProduct.Name ? _UpdProduct.Name : _CurrProduct.Name,
      Quantity: _UpdProduct.Quantity,
      Price: _UpdProduct.Price,
    });

    await updateDoc(doc(db, "Products", ProductId), {
      Name: _UpdProduct.Name ? _UpdProduct.Name : _CurrProduct.Name,
      Quantity: _UpdProduct.Quantity,
      Price: _UpdProduct.Price,
    });
  };

  const clearState = (name) => {
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: _CurrProduct[name],
    }));
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg border border-b-8 hover:shadow-2xl transition shadow-xl">
        <h2 className="mb-4 font-light flex justify-between items-center text-lg tracking-widest font-medium border-b-2 border-blue-200 pb-2">
          Product Edit Page
          <button
            onClick={() => {
              nav(-1);
            }}
            className="px-3 py-1 bg-gray-500 font-light text-md text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Go Back
          </button>
        </h2>

        <div className="mt-4">
          <div className="mb-2 relative">
            <label htmlFor="Name" className="block font-normal text-gray-700">
              Product Name:
            </label>
            <div className="relative">
              <input
                type="text"
                name="Name"
                value={_UpdProduct.Name}
                onChange={handle}
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
              <button
                onClick={() => {
                  clearState("Name");
                }}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-2 relative">
            <label htmlFor="Quantity" className="block font-normal text-gray-700">
              Quantity:
            </label>
            <div className="relative">
              <input
                type="number"
                name="Quantity"
                value={_UpdProduct.Quantity}
                onChange={handle}
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-200 "
                
              />
              <button
                onClick={() => {
                  clearState("Quantity");
                }}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-2 relative">
            <label htmlFor="Price" className="block font-normal text-gray-700">
              Price:
            </label>
            <div className="relative">
              <input
                type="number"
                name="Price"
                value={_UpdProduct.Price}
                onChange={handle}
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-200 appearance-none"
                
              />
              <button
                onClick={() => {
                  clearState("Price");
                }}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => {
                handleUpdate();
                setStatus("Updated");
              }}
              className="px-4 py-2 font-light bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 font-light text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200"
            >
              Delete Product
            </button>
            <button
              onClick={() => {
                nav(-1);
              }}
              className="px-4 py-2 bg-gray-500 font-light text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200"
            >
              Cancel
            </button>
          </div>

          {_status && (
            <div className="mt-4">
              <p className="text-green-500">{_status} successfully</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductEditForm;
  