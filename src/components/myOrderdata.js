import React, { useEffect, useRef, useState } from 'react';
export default function Card(props) { 
  let option = props.option || {};
  let priceOption = Object.keys(option);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  

  let finalprice = qty * parseInt(option[size] || 0);
  
  useEffect(() => {
    setSize(priceRef.current.value);
  }, [option]);

  return (
    <div>
      <div className="card" style={{ width: '20rem', maxHeight: 'auto' }}>
        <img
          src={props.fooditem?.img || 'https://via.placeholder.com/150'}
          className="card-img-top"
          style={{ maxHeight: '15rem', objectFit: 'fill' }}
          alt="Food Item"
        />
        <div className="card-body">
          <h5 className="card-title">{props.fooditem?.name || "Food Item"}</h5>
          <div className="d-flex align-items-center gap-2 mb-3">
            <select
              className="form-select bg-success"
              style={{ color: 'white', width: '50%' }}
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <option key={index} value={index + 1}>Option {index + 1}</option>
              ))}
            </select>
            <select
              className="form-select"
              style={{ width: '50%' }}
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOption.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
          </div>
          <div className="d-flex align-items-center d-inline">
            <p className="mb-0 fs-5 me-2">₹{finalprice}/-</p>
          </div>
          <p className="card-text mt-2">{props.fooditem?.description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
}
  