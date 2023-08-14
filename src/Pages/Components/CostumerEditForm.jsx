import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import db from "../../firebase";
import {
  doc,
  query,
  updateDoc,
  where,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

function CostumerEditForm({ typeId: CostumerId }) {
  const [_status, setStatus] = useState("");
  const Costumers = useSelector((state) => state.Costumers);
  const nav = useNavigate();
  const [_CurrCostumer, setCostumer] = useState({ FirstName: "", LastName: "", City: "" });
  const [_UpdCostumer, setUpdatedCostumer] = useState({ FirstName: "", LastName: "", City: "" });

  useEffect(() => {
    const costumer = Costumers.find((costumer) => costumer.CostumerId === CostumerId);
    if (costumer) {
      setCostumer(costumer);
      setUpdatedCostumer(costumer);
    }
  }, [Costumers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCostumer((prevCostumer) => ({
      ...prevCostumer,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "Costumers", CostumerId));
    const purchasesRef = collection(db, "Purchases");
    const q = query(purchasesRef, where("CostumerId", "==", CostumerId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setUpdatedCostumer({ FirstName: "", LastName: "", City: "" });
    setStatus("Deleted");
  };

  const handleUpdate = async () => {
    setUpdatedCostumer({
      FirstName: _UpdCostumer.FirstName ? _UpdCostumer.FirstName : _CurrCostumer.FirstName,
      LastName: _UpdCostumer.LastName ? _UpdCostumer.LastName : _CurrCostumer.LastName,
      City: _UpdCostumer.City ? _UpdCostumer.City : _CurrCostumer.City,
    });

    await updateDoc(doc(db, "Costumers", CostumerId), {
      FirstName: _UpdCostumer.FirstName ? _UpdCostumer.FirstName : _CurrCostumer.FirstName,
      LastName: _UpdCostumer.LastName ? _UpdCostumer.LastName : _CurrCostumer.LastName,
      City: _UpdCostumer.City ? _UpdCostumer.City : _CurrCostumer.City,
    });
  };

  const clearState = (name) => {
    setUpdatedCostumer((prevCostumer) => ({
      ...prevCostumer,
      [name]: _CurrCostumer[name],
    }));
  };

  const handle = (e) => {
    setStatus("");
    handleChange(e);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg border border-b-8 hover:shadow-2xl transition shadow-xl">
        <h2 className="mb-4 font-light flex justify-between items-center text-lg tracking-widest font-medium border-b-2 border-blue-200 pb-2">
          Costumer Edit Page
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
            <label htmlFor="FirstName" className="block font-normal text-gray-700">
              First Name:
            </label>
            <div className="relative">
              <input
                type="text"
                name="FirstName"
                value={_UpdCostumer.FirstName}
                onChange={handle}
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
              <button
                onClick={() => {
                  clearState("FirstName");
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
            <label htmlFor="LastName" className="block font-normal text-gray-700">
              Last Name:
            </label>
            <div className="relative">
              <input
                type="text"
                name="LastName"
                value={_UpdCostumer.LastName}
                onChange={handle}
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
              <button
                onClick={() => {
                  clearState("LastName");
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
            <label htmlFor="City" className="block font-normal text-gray-700">
              City:
            </label>
            <div className="relative">
              <input
                type="text"
                name="City"
                value={_UpdCostumer.City}
                onChange={handle}
                className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
              <button
                onClick={() => {
                  clearState("City");
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
              Delete Costumer
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

export default CostumerEditForm;
