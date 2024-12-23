import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/cards';
export default function Home() {
  // Define state variables
  const [search,setSearch]=useState('')
  const [foodfCat, setCatData] = useState([]);
  const [fooditem, setFoodItem] = useState([]);
  // Function to load data from the API
  const loaddata = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });  
      response = await response.json();

      // Check if the data is structured as expected
      if (response && response.length >= 2) {
        setFoodItem(response[0]); // Assuming response[0] is food items
        setCatData(response[1]);  // Assuming response[1] is food categories
      }
      setFoodItem(response[0]);
      setCatData(response[1]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loaddata();
  }, []); // Dependency array ensures this runs once on mount

  return (
    <div className='row mb-3' >
      <Navbar />
      <div>
        {/* carousel */}
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            {/* Carousel Indicators */}
            <ol className="carousel-indicators">
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
            </ol>

            {/* Carousel Inner */}
            <div className="carousel-inner">
                
                <div class=" carousel-caption  " style={{ zIndex: "10" }}>
            <div className=" d-flex justify-content-center">  
                            <input className="form-control me-2 w-75 bg-black  " type="search" placeholder="Type in..." aria-label="Search" 
                            value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                            {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
                        </div> 
                        </div>
                <div className="carousel-item active">
                    <img
                        className="d-block w-100"
                        src="https://brookrest.com/wp-content/uploads/2020/05/AdobeStock_282247995-scaled.jpeg"
                        alt="First slide"
                        style={{ maxHeight: '500px', objectFit: 'cover',backgroundColor:"black" }}
                    />
                </div>
                <div className="carousel-item">
                    <img
                        className="d-block w-100"
                        src="https://tse3.mm.bing.net/th?id=OIP.xLx4Mms8ACrlRjLRaASXiwHaE8&pid=Api&P=0&h=180"
                        alt="Second slide"
                        style={{ maxHeight: '500px', objectFit: 'cover' }}
                    />
                </div>
                <div className="carousel-item">
                    <img
                        className="d-block w-100"
                        src="https://cdn.britannica.com/08/177308-050-94D9D6BE/Food-Pizza-Basil-Tomato.jpg"
                        alt="Third slide"
                        style={{ maxHeight: '500px', objectFit: 'cover' }}
                    />
                </div>
            </div>
            {/* Carousel Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
      </div>
      <div className='container '>
        {
          foodfCat !=[]
            ? foodfCat.map((data) => {
              return (
                <div className='row  m-2'>
                  <div key={data._id} className='fs-3 m-3 bg-warning text-dark  rounded' style={{ width: "auto" }}>{data.CategoryName}</div>
                  <hr />
                  {
                    fooditem !=[]
                      ? fooditem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                        .map(filterItems => {
                          return (
                            <div key={filterItems.id_} className="p-3 m-5 ml-5 col-12 col-md-6 col-lg-3">
                              <Card
                                fooditem={filterItems}
                                option={filterItems.options[0]}
                              />
                            </div>
                          )
                        })
                      : <div>No such data found</div>}
                </div>
              )
            })
            : <div>data is not avialable</div>
        }
      </div>
      <div className="content">
        <Footer />
      </div>
    </div>
  );
}
