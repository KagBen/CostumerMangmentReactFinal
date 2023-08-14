import { addDoc, collection } from "firebase/firestore";
import db from "../../firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function ProductAddForm() {
  const nav = useNavigate();
  const Products = useSelector((state) => state.Products);
  const [showDiv, setShowDiv] = useState(false);

  const productExists = () => {
    return Products.find(
      (product) =>
        product.Name.toLowerCase() === _newProduct.Name.toLowerCase() && product.Price === _newProduct.Price
    );
  };

  const [_newProduct, setProduct] = useState({ Name: "", Price: "", Quantity: "" });

  const handleChange = (e) => {
    let { name, value } = e.target;
    value = isNaN(value) ? value : +value;
    setProduct({ ..._newProduct, [name]: value });
  };

  useEffect(() => {
    if (showDiv) {
      setTimeout(() => {
        setShowDiv(true);
        setProduct({ Name: "", Price: "", Quantity: "" });
      }, 10000); // 10 seconds
    }
  }, [showDiv]);

  const handleSubmit = async (e) => {
  
    if (_newProduct.Name === "") {
      alert("Name is required");
    } else {
      e.preventDefault();
      if (!productExists(_newProduct)) {
        await addDoc(collection(db, "Products"), _newProduct);
        setShowDiv(true);
      } else {
        alert("This product already exists - same Product Name same Price");
        setProduct({ Name: "", Price: "", Quantity: "" });
      }
    }
  };

  const EditJustAdded = () => {
    const Product = Products.find(
      (product) =>
        product.Name.toLowerCase() === _newProduct.Name.toLowerCase() && product.Price === _newProduct.Price
    );
    nav(`/EditAddPage/Update/Product/${Product.ProductId}`);
  };

  return (
    <div className="relative p-4 bg-white rounded-lg border border-b-8 hover:shadow-2xl transition shadow-xl">
      <h2 className="mb-4 text-lg tracking-widest font-medium border-b-2 border-blue-200 pb-2">Set new Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
            Product Name:
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={_newProduct.Name}
            onChange={handleChange}
            className="mt-1 px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Price" className="block text-sm font-medium text-gray-700">
            Product Price:
          </label>
          <input
            type="number"
            id="Price"
            name="Price"
            value={_newProduct.Price}
            onChange={handleChange}
            className="mt-1 px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Quantity" className="block text-sm font-medium text-gray-700">
            Quantity:
          </label>
          <input
            type="number"
            id="Quantity"
            name="Quantity"
            value={_newProduct.Quantity}
            onChange={handleChange}
            className="mt-1 px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={() => {
              nav('/ProductPage');
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setProduct({ Name: "", Price: "", Quantity: "" });
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200"
          >
            Clear All
          </button>
        </div>
      </form>

      {showDiv && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-80 p-8 bg-gray-900 flex items-center justify-center">
          <div className="absolute flex flex-col justify-between bg-white shadow-lg shadow-gray-800 w-5/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <p className="text-lg border-b tracking-wider">New Product - 10 seconds</p>
              <button
                onClick={() => {
                  setShowDiv(false);
                  setProduct({ Name: "", Price: "", Quantity: "" });
                }}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
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
            <p className="mt-2">
              <span className="tracking-wide">Product Name:</span> {_newProduct.Name} <br />
              <span className="tracking-wide">Product Price:</span> {_newProduct.Price} <br />
              <span className="tracking-wide">Quantity:</span> {_newProduct.Quantity}
            </p>
            <div className="mt-2">
              
              <button
                onClick={()=>{nav('/ProductPage')}}
                className="px-3 mr-2 tracking-wide  py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none "
              >
                To All Products
              </button>
              <button
                onClick={EditJustAdded}
                className="px-3 tracking-wide py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                did a mistake? - Edit Product 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductAddForm;
