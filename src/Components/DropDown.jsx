import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import NewTable from "./NewTable";
import { addProduct, getProducts } from "../actions/ManageProducts";
import { saveOrder } from "../actions/ManageOrder";

function DropDown() {
  const [inputByUser, setInputByUser] = useState("");
  const [item, setItem] = useState();
  const [quantity, setQuantity] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [options, setOptions] = useState(["", "Apple", "Orange", "Mango"]);

  //main array
  const [products, setProduct] = useState([]);

  const addItemHandler = async (e) => {
    e.preventDefault();
    if (inputByUser === "") return;

    setOptions([...options, inputByUser]);
    setInputByUser("");

    await addProduct(inputByUser);
  };

  const productSubmitHandler = async (e) => {
    e.preventDefault();
    //creating product Object
    let product = {
      item,
      retailPrice,
      quantity,
    };

    setProduct([...products, product]);

    setItem("");
    setRetailPrice("");
    setQuantity("");
  };

  const saveOrderHandler = async (e) => {
    e.preventDefault();

    try {
      const total = products.reduce((accumulator, object) => {
        return accumulator + object.retailPrice * object.quantity;
      }, 0);

      const data = {
        total: total,
        items: products,
        created: Timestamp.now(),
      };

      await saveOrder(data);
      setProduct([]);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className='max-w-xl px-30 mx-auto'>
      <form onSubmit={productSubmitHandler}>
        <p className='text-center flex text-lg mt-6  font-semibold translate-y-12'>
          Add Item
        </p>
        <input
          className='ml-14 px-7 translate-y-2 py-3 translate-x-7 font-medium mr-3 align-right text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out float-left'
          id='inputByUser'
          type='text'
          value={inputByUser}
          onChange={(e) => setInputByUser(e.target.value)}
          placeholder='Enter Item'
        ></input>
        <button
          className=' px-4 py-3 translate-x-7 translate-y-2 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out '
          type='submit'
          onClick={addItemHandler}
        >
          Add to menu
        </button>
        <p className=' text-center flex text-lg mt-6 font-semibold translate-y-12'>
          Product
        </p>
        <div className=''>
          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className='
            justify-between content-evenly  flex mr-12 ml-20 px-11 py-3    font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out translate-y-4'
          >
            {options.map((options) => (
              <>
                <option
                  className='justify  px-4 text-center flex text-lg mt-6 font-semibold translate-y-12'
                  key={options}
                  value={options}
                >
                  {options}
                </option>
              </>
            ))}
          </select>

          <p className='mr-2 py-3 px-13 content-baseline float-right text-right flex text-lg font-semibold translate-x-11'>
            Retail Price:
          </p>
          <div className='float-right py-1 px-1 translate-x-10 '>
            <input
              type='number'
              id='retailPrice'
              value={retailPrice}
              onChange={(e) => setRetailPrice(e.target.value)}
              placeholder='0'
              maxLength='32'
              minLength='10'
              required
              className='ml-auto px-7 py-3 font-medium align-right text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out float-right'
            ></input>
          </div>

          <p className=' text-center flex text-lg mt-6 font-semibold translate-y-12'>
            Quantity
          </p>
          <input
            type='number'
            id='quantity'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder='0'
            maxLength='32'
            minLength='10'
            required
            className='flex mr-10 ml-20 px-2 py-3    font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out translate-y-4'
          ></input>
          <br></br>

          <button
            type='submit'
            className=' px-4 py-3 translate-x-2 
              float-right text-white
              font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out bg-green-700 '
          >
            Add
          </button>
        </div>
      </form>
      <br />
      <NewTable products={products} />
      <br />
      <br />
      <button
        onClick={saveOrderHandler}
        className='px-4 py-3 translate-x-2 
              float-right text-white
              bg-font-white uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out bg-blue-700 '
      >
        Save
      </button>
    </div>
  );
}

export default DropDown;
