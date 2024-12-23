import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart() || [];
  let dispatch = useDispatchCart() || (() => {});
  const [isLoading, setIsLoading] = useState(false);
  
  // If the cart is empty
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      let userEmail = localStorage.getItem("userEmail");
      const response = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      console.log("Order Response", response);

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      console.error("Checkout Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total price
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => dispatch({ type: "REMOVE", index })}
                  >
                    <DeleteIcon /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price : {totalPrice}/-</h1>
        </div>
        <div className='m-3 p-3'> 
          <button
            className='btn bg-success mt-5'
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Check Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
