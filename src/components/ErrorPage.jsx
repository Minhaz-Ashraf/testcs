import React from "react";
import { Link } from "react-router-dom";
import {error} from "../assets/index"
const ErrorPage = () => {

 
  return (
    
    <><div className="text-center font-poppins ">
    <div className="flex justify-center items-center md:mt-20 sm:mt-80 mt-28 ">
      <img src={error} alt="img" className="w-[40vh]   md:w-[70vh]" />
      </div>
      <p className="md:text-[36px] text-[28px] font-semibold">Oops! We couldn't find that page.</p>
      <p className="md:text-[25px]">May be you find what you need here...</p>
  
    <Link to = "/user-dashboard" >
        <button className="bg-secondary text-white mt-9 px-[6vh] py-2 rounded-lg hover:bg-transparent hover:border hover:border-secondary hover:text-secondary ">Back to home page</button>


        </Link> 
 
    
      </div>
    </>
  );
};

export default ErrorPage;



// App.js
// import React, { useState } from 'react';

// const ParentComponent = () => {
//   const [selectedFruit, setSelectedFruit] = useState(null);

//   const handleSelectFruit = (fruit) => {
//     setSelectedFruit(fruit);
//   };

//   return (
//     <div className="container mx-auto p-4">

//       <OptionsPage onSelectFruit={handleSelectFruit} />
//       {selectedFruit && (
//         <FruitDetails fruit={selectedFruit} />
//       )}
//     </div>
//   );
// };

// const OptionsPage = ({ onSelectFruit }) => (
//   <div className="grid grid-cols-2 gap-4">
//     {['Apple', 'Mango', 'Grapes', 'Orange'].map((fruit) => (
//       <button
//         key={fruit}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={() => onSelectFruit(fruit.toLowerCase())}
//       >
//         {fruit}
//       </button>
//     ))}
//   </div>
// );

// const FruitDetails = ({ fruit }) => {
//   // Simulated data for demonstration
//   const fruitData = {
//     apple: { name: 'Apple', price: '$1.50', quantity: '10', details: 'Sweet and juicy' },
//     mango: { name: 'Mango', price: '$2.00', quantity: '5', details: 'Tropical and delicious' },
//     grapes: { name: 'Grapes', price: '$3.00', quantity: '20', details: 'Small and round' },
//     orange: { name: 'Orange', price: '$1.20', quantity: '8', details: 'Citrusy and refreshing' }
//   };

//   return (
//     <div className="mt-8">
//       {fruitData[fruit] ? (
//         <div className="border p-4 rounded">
//           <h2 className="text-xl font-bold mb-2">{fruitData[fruit].name}</h2>
//           <p><span className="font-bold">Price:</span> {fruitData[fruit].price}</p>
//           <p><span className="font-bold">Quantity:</span> {fruitData[fruit].quantity}</p>
//           <p><span className="font-bold">Details:</span> {fruitData[fruit].details}</p>
//         </div>
//       ) : (
//         <p>Fruit data not found.</p>
//       )}
//     </div>
//   );
// };

// export default ParentComponent;
