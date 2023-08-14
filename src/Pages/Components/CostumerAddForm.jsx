  import { addDoc, collection } from "firebase/firestore";
  import db from "../../firebase";
  import { useEffect, useState } from "react";
  import { useSelector } from "react-redux";
  import { Link, useNavigate } from "react-router-dom";

  function CostumerAddForm() {
    const nav = useNavigate();
    const Costumers = useSelector((state) => state.Costumers);
    const [showDiv, setShowDiv] = useState(false);

    const costumerExists = () => {
      return Costumers.find((costumer) => {
        return (
          costumer.FirstName.toLowerCase() === _newCostumer.FirstName.toLowerCase() &&
          costumer.LastName.toLowerCase() === _newCostumer.LastName.toLowerCase() &&
          costumer.City.toLowerCase() === _newCostumer.City.toLowerCase()
        );
      });
    };

    const [_newCostumer, setCostumer] = useState({ FirstName: "", LastName: "", City: "" });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setCostumer({ ..._newCostumer, [name]: value });
    };

    useEffect(() => {
      if (showDiv) {
        setTimeout(() => {
          setShowDiv(false);
          setCostumer({ FirstName: "", LastName: "", City: "" });
        }, 10000); // 10 seconds
      }
    }, [showDiv]);

    const handleSubmit = async (e) => {
    
      if (_newCostumer.City === "" || _newCostumer.FirstName === "" || _newCostumer.LastName === "") {
        alert("All fields are required");
      } else {
        e.preventDefault();
        if (!costumerExists(_newCostumer)) {
          await addDoc(collection(db, "Costumers"), _newCostumer);
          setShowDiv(true);
        } else {
          alert("This customer already exists");
          setCostumer({ FirstName: "", LastName: "", City: "" });
        }
      }
    };

    const EditJustAdded = () => {
      const Costumer = Costumers.find(
        (costumer) =>
          costumer.FirstName.toLowerCase() === _newCostumer.FirstName.toLowerCase() &&
          costumer.LastName.toLowerCase() === _newCostumer.LastName.toLowerCase() &&
          costumer.City.toLowerCase() === _newCostumer.City.toLowerCase()
      );
      nav(`/EditAddPage/Update/Costumer/${Costumer.CostumerId}`);
    };

    return (
      <div className= "relative p-4 bg-white rounded-lg border border-b-8 hover:shadow-2xl transition shadow-xl ">
        <h2 className="mb-4 text-lg tracking-widest font-medium border-b-2 border-blue-200 pb-2 ">Set new Costumer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
              First Name:
            </label>
            <input
              type="text"
              id="FirstName"
              name="FirstName"
              value={_newCostumer.FirstName}
              onChange={handleChange}
              className="mt-1 px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
              Last Name:
            </label>
            <input
              type="text"
              id="LastName"
              name="LastName"
              value={_newCostumer.LastName}
              onChange={handleChange}
              className="mt-1 px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="City" className="block text-sm font-medium text-gray-700">
              City:
            </label>
            <input
              type="text"
              id="City"
              name="City"
              value={_newCostumer.City}
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
              Add Costumer
            </button>
            <button
              type="button"
              onClick={() => {
                nav('/CostumerPage');
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setCostumer({ FirstName: "", LastName: "", City: "" });
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200"
            >
              Clear All
            </button>
          </div>
        </form>

        {showDiv && (
          <div className="fixed top-0 left-0 w-full h-full bg-opacity-80  p-8 bg-gray-900 flex items-center justify-center">
            <div className="absolute flex flex-col justify-between bg-white shadow-lg shadow-gray-800  w-5/12   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4  rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-lg  border-b tracking-wider">New Costumer - 10 seconds</p>
                <button
                  onClick={() => {
                    setShowDiv(false);
                    setCostumer({ FirstName: "", LastName: "", City: "" });
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
                <span className="tracking-wide">First Name:</span> {_newCostumer.FirstName} <br />
                <span className="tracking-wide">Last Name:</span> {_newCostumer.LastName} <br />
                <span className="tracking-wide">City:</span> {_newCostumer.City}
              </p>
              <div className="mt-2">
              
                <button
                  onClick={()=>{nav('/CostumerPage')}}
                  className="px-3 mr-2 tracking-wide  py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none "
                >
                  To All Costumers
                </button>
                <button
                  onClick={EditJustAdded}
                  className="px-3 tracking-wide py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none "
                >
                  did a mistake? - Edit Costumer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default CostumerAddForm;
