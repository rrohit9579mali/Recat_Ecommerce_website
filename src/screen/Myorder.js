import React from 'react';
import Myorder from '../components/myOrderdata';
import Navbar from '../components/Navbar';

export default function Cart() {
  const foodItems = [
    { id: 1, name: 'Pizza', img: 'https://tse1.mm.bing.net/th?id=OIP.2dhr5Ln6cMHIu9SmwE_uBgHaE7&pid=Api&P=0&h=180', description: 'Delicious cheese pizza' },
    { id: 2, name: 'Burger', img: 'https://cdn.pixabay.com/photo/2018/03/23/08/27/thai-fried-rice-3253027__340.jpg', description: 'Tasty beef burger' },
    { id: 3, name: 'Pasta', img: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVnJTIwZnJpZWQlMjByaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', description: 'Classic Italian pasta' },
    { id: 4, name: 'Sushi', img: 'https://media.istockphoto.com/photos/king-fish-biryani-with-raita-served-in-a-golden-dish-isolated-on-dark-picture-id1409942571?b=1&k=20&m=1409942571&s=170667a&w=0&h=ozlMJf5hsDmS2sSdEdBWnoSZOEITef4qGMeWeq2lyTc=', description: 'Fresh sushi rolls' },
    { id: 5, name: 'Fries', img: 'https://media.istockphoto.com/photos/veg-biryani-picture-id1363306527?b=1&k=20&m=1363306527&s=170667a&w=0&h=VCbro7CX8nq2kruynWOCO2GbMGCea2dDJy6O6ebCKD0=', description: 'Crispy French fries' },
    { id: 6, name: 'Salad', img: 'https://media.istockphoto.com/photos/paneer-tikka-kabab-in-red-sauce-is-an-indian-dish-made-from-chunks-of-picture-id1257507446?b=1&k=20&m=1257507446&s=170667a&w=0&h=Nd7QsslbvPqOcvwu1bY0rEPZXJqwoKTYCal3nty4X-Y=', description: 'Healthy green salad' },
    { id: 7, name: 'Tacos', img: 'https://media.istockphoto.com/photos/chinese-food-veg-pizza-picture-id1341905237?k=20&m=1341905237&s=612x612&w=0&h=Lbuza1Ig5cC1PwQhqTsq-Uac8hg1W-V0Wx4d4lqDeB0=', description: 'Spicy chicken tacos' },
    { id: 8, name: ' Chicken Cheese Pizza', img: 'https://media.istockphoto.com/photos/double-topping-pizza-on-the-wooden-desk-isolated-picture-id1074109872?k=20&m=1074109872&s=612x612&w=0&h=JoYwwTfU_mMBykXpRB_DmgeecfotutOIO9pV5_JObpk=', description: 'Creamy ice cream' },
    { id: 9, name: 'Fish Biryani', img: 'https://media.istockphoto.com/photos/king-fish-biryani-with-raita-served-in-a-golden-dish-isolated-on-dark-picture-id1409942571?b=1&k=20&m=1409942571&s=170667a&w=0&h=ozlMJf5hsDmS2sSdEdBWnoSZOEITef4qGMeWeq2lyTc=', description: 'Chocolate cake' },
    { id: 10, name: 'Soup', img: 'https://example.com/soup.jpg', description: 'Hot tomato soup' },
    { id: 11, name: 'Steak', img: 'https://example.com/steak.jpg', description: 'Grilled steak' },
  ];

  // Slice the array to only include the first 9 items
  const itemsToDisplay = foodItems.slice(0, 9);
 
  return (
    <div>
      <Navbar />
      <div className="row">
        {itemsToDisplay.map((foodItem) => (
          <div key={foodItem.id} className=" p-3 col-md-3 clo-3">
            <Myorder fooditem={foodItem} option={{ Small: 100, Medium: 150, Large: 200 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
