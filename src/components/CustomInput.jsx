import React from "react";

const RadioInput = ({ options, field, selectedValue, onChange, label, onBlur }) =>
{

  return (
    <div className="mb-2">
      <label className="font-semibold"> {label} {field} <span className="text-primary">*</span></label>
      <div className="flex flex-col justify-start items-start mx-5  mb-3">
        {options.map((option, index) => (
          <span className="flex items-center py-2 " key={index}>
            <input
              type="radio"
              label={label}
              id={`${ field }${ index }`}
              name={field}
              value={option.value}
              checked={selectedValue == option.value}
              onChange={(e) => onChange(e.target.value)}
              
              onBlur={onBlur}
            />
            <label htmlFor={`${ field }${ index }`} className="px-3 font-DMsans ">
              {option.label}
            </label>
          </span>
        ))}
      </div>
    </div>
  );
};


const TextInput = ({ name, value, onChange, onBlur,  placeholder, type, label }) =>
{
  return (
    <div className="flex flex-col mb-5">
      <label htmlFor={name} className="font-semibold">
        {label} {placeholder} <span className="text-primary">*</span>
      </label>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`p-2 bg-[#F0F0F0] mt-1 outline-0 md:h-[55px] w-full border focus:border-[#CC2E2E] rounded-md
          }`}
        
        type={type}
        name={name}
        placeholder={placeholder}
        label={label}
      />

    </div>
  );
}



// const LocationSelect = ({
//   countryOptions,
//   stateOptions,
//   cityOptions,
//   countryLabel,
//   stateLabel,
//   cityLabel,
//   customCountryName,
//   customStateName,
//   customCtiyName,
//   placeOfBirthCountry,
//   placeOfBirthState,
//   placeOfBirthCity,
//   currentlyLivingInCity,
//   currentlyLivingInCountry,
//   currentlyLivingInState,
//   handleSelectChange,

// }) =>
// {
//   const [hide, setHide] = useState(false)
//   const [hideState, setHideState] = useState(false)
//   const location = useLocation()
//   useEffect(() =>
//   {
//     if (placeOfBirthCountry == -1 || currentlyLivingInCountry == -1)
//     {
//       setHide(true)
//     } else
//     {
//       setHide(false)
//     }

//     if (currentlyLivingInState == -1)
//     {
//       setHideState(true)
//     }
//   }, [placeOfBirthCountry, currentlyLivingInCountry])
//   console.log({ placeOfBirthCountry: placeOfBirthCountry === undefined ? currentlyLivingInCountry : placeOfBirthCountry, currentlyLivingInState })
//   return (
//     <>
//       <div className="flex flex-col mb-5 mt-3 ">
//         <label className="font-semibold">{countryLabel}</label>
//         <label className="font-medium mt-2"> Country *</label>
//         <select
//           value={placeOfBirthCountry === undefined ? currentlyLivingInCountry : placeOfBirthCountry}
//           onChange={handleSelectChange}
//           className="p-2 bg-[#F0F0F0] mt-1 outline-0 md:h-[8vh] w-full border focus:border-[#CC2E2E] rounded-md"
//           type="text"
//           name={customCountryName}
//         >
//           <option value="">Select Country</option>
//           {countryOptions.map((country) => (
//             <option key={country.countryId} value={country.countryId}>
//               {country.countryName}
//             </option>
//           ))}
//         </select>
//       </div>
//       {!hide && <div className="flex flex-col mb-5">
//         <label className="font-medium">{stateLabel}</label>
//         <select
//           value={placeOfBirthState === undefined ? currentlyLivingInState : placeOfBirthState}
//           onChange={handleSelectChange}
//           name={customStateName}
//           className="p-2 bg-[#F0F0F0] mt-1 outline-0 md:h-[8vh] w-full  border focus:border-[#CC2E2E] rounded-md"
//         >
//           <option value="">Select State</option>
//           {stateOptions?.map((stateData) => (
//             <option key={stateData.stateId} value={stateData.stateId}>
//               {stateData.stateName}
//             </option>
//           ))}
//         </select>
//       </div>}
//       {!location.pathname.includes("registration-form/6") &&
//         <>{cityOptions && <div className="flex flex-col mb-5">
//           <label htmlFor="batch" className="font-medium">
//             {cityLabel}
//           </label>
//           <select
//             value={placeOfBirthCity === undefined ? currentlyLivingInCity : placeOfBirthCity}
//             onChange={handleSelectChange}
//             className="p-2 bg-[#F0F0F0] mt-1 outline-0 md:h-[8vh]  border focus:border-[#CC2E2E] rounded-md"
//             type="text"
//             name={customCtiyName}
//           >
//             <option value="">Select City</option>
//             {cityOptions.map((city) => (
//               <option key={city.cityId} value={city.cityId}>
//                 {city.cityName}
//               </option>
//             ))}
//           </select>
//         </div>
//         } </>
//       }
//     </>
//   );
// };

// export default LocationSelect;





// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import { IoArrowBackOutline } from "react-icons/io5";
// import { useLocation } from "react-router-dom";

// const LocationAutocomplete = ({ label, onChange, value, disabled, options, mapData }) =>
// {
//   const handleChange = (_, newValue) =>
//   {
//     onChange(newValue);
//   };

//   return (
//     <Autocomplete
//       value={value}
//       onChange={(event, newValue) => onChange(newValue)}
//       options={options}
//       getOptionLabel={(option) => option.name}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={label}
//           variant="outlined"
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//       )}
//     />
//   );
// };


// function CheckboxGroup({ mapData, value, label, onchange, mapOptions, onchange }) {
//   return (
//     <div className="mb-2 mt-5">
//       <label className="font-semibold">{label}</label>
//       <span className="flex flex-col justify-start items-start mx-5 mt-3 mb-3">
//         {mapData.map((item, index) => (
//           <span className="flex flex-row items-center" key={index}>
//             <input
//               className="p-2 bg-[#F0F0F0] mt-1 h-[5vh]"
//               type="checkbox"
//               name={`${item.field} ${index}`}
//               id={`${item.field} ${index}`}
//               value={value}
//               mapOptions = {mapOptions}
//               onChange={onchange}
//               label = {label}
//               labelOpt = {labelOpt}
//             />
//             <label htmlFor={`${item.field} ${index}`} className="px-3 font-DMsans">
//               {item.labelOPt}
//             </label>
//           </span>
//         ))}
//       </span>
//     </div>
//   );
// }


import { Autocomplete, TextField } from '@mui/material';

const LocationAutocomplete = ({ options, value, onChange, label, name, isFocused, handleFocus, handleBlur }) => {
  return (
    <Autocomplete
      onChange={onChange}
      options={options}
      value={value}
      getOptionLabel={(option) => option[label]}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          InputLabelProps={{
            shrink: isFocused || (value && value.length > 0),
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
      )}
    />
  );
};

export default LocationAutocomplete;

export { TextInput, RadioInput, LocationAutocomplete };