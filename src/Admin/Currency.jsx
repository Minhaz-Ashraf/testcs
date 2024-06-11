import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { getToken } from '../Stores/service/getToken';
import apiurl from '../util';

const config = {
  headers: {
    Authorization: ``,
    "Content-Type": "application/json; charset=UTF-8",
  },
};

const Currency = () => {
  const [currency, setCurrency] = useState({
    AED: "",
    GBP: "",
    INR: "",
  });

  const [exchangeRates, setExchangeRates] = useState({
    AED: null,
    GBP: null,
    INR: null,
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (currencyType, value) => {
    setCurrency((prevState) => ({
      ...prevState,
      [currencyType]: value,
    }));
  };

  const updateExchangeRate = async (currencyType, rateToUSD) => {
    try {
      const token = getToken();
      config.headers.Authorization = `Bearer ${token}`;
      const response = await apiurl.put(
        `/update-exchangeRate-data/${currencyType}`,
        { rateToUSD },
        config
      );
      if (response.status === 200) {
        setMessage(`Successfully updated ${currencyType} exchange rate.`);
        getAllExchangeRates(); // Refresh exchange rates after update
      }
    } catch (err) {
      console.log(err);
      setMessage(`Failed to update ${currencyType} exchange rate.`);
    }
  };

  const handleSubmit = (currencyType) => {
    const rateToUSD = parseFloat(currency[currencyType]);
    if (!isNaN(rateToUSD)) {
      updateExchangeRate(currencyType, rateToUSD);
    } else {
      setMessage(`Invalid value for ${currencyType} exchange rate.`);
    }
  };

  const getAllExchangeRates = async () => {
    try {
      const token = getToken();
      config.headers.Authorization = `Bearer ${token}`;
      const response = await apiurl.get('/get-exchangeRate-data', config);
      const rates = response.data.reduce((acc, rate) => {
        acc[rate.currency] = rate.rateToUSD;
        return acc;
      }, {});
      setExchangeRates(rates);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllExchangeRates();
  }, []);

  return (
    <>
      <span className="flex">
        <span className="">
          <Nav />
        </span>
        <span className="mx-16 w-full mt-20 mb-9 flex flex-col">
          <p className="font-montserrat font-semibold md:text-[33px] text-[22px]">
            Convert Currencies into Dollar
          </p>
          <p className="font-montserrat text-[16px] font-semibold mb-3 mt-9">
            AED Rate to Dollar
          </p>
          <div className="flex items-center gap-9">
            <input
              type="text"
              placeholder="Put value"
              className="h-12 focus:outline-none bg-[#F0F0F0] px-3 rounded-md w-1/3"
              value={currency.AED}
              onChange={(e) => handleInputChange("AED", e.target.value)}
            />
            <span>
              <span
                className="bg-primary text-white font-DMsans px-6 py-2 rounded-md cursor-pointer"
                onClick={() => handleSubmit("AED")}
              >
                Submit
              </span>
            </span>
          </div>
          <p className="font-montserrat text-[16px] font-semibold mb-3 mt-5">
            GBP Rate to Dollar
          </p>
          <div className="flex items-center gap-9">
            <input
              type="text"
              placeholder="Put value"
              className="h-12 focus:outline-none bg-[#F0F0F0] px-3 rounded-md w-1/3"
              value={currency.GBP}
              onChange={(e) => handleInputChange("GBP", e.target.value)}
            />
            <span>
              <span
                className="bg-primary text-white font-DMsans px-6 py-2 rounded-md cursor-pointer"
                onClick={() => handleSubmit("GBP")}
              >
                Submit
              </span>
            </span>
          </div>
          <p className="font-montserrat text-[16px] font-semibold mb-3 mt-5">
            INR Rate to Dollar
          </p>
          <div className="flex items-center gap-9">
            <input
              type="text"
              placeholder="Put value"
              className="h-12 focus:outline-none bg-[#F0F0F0] px-3 rounded-md w-1/3"
              value={currency.INR}
              onChange={(e) => handleInputChange("INR", e.target.value)}
            />
            <span>
              <span
                className="bg-primary text-white font-DMsans px-6 py-2 rounded-md cursor-pointer"
                onClick={() => handleSubmit("INR")}
              >
                Submit
              </span>
            </span>
          </div>
          <div className="mt-5">
            <p className="font-montserrat text-[16px] font-semibold mb-3">Current Exchange Rates</p>
            <div className="flex flex-col gap-4">
              <div>
                <strong>AED to USD:</strong> {exchangeRates.AED}
              </div>
              <div>
                <strong>GBP to USD:</strong> {exchangeRates.GBP}
              </div>
              <div>
                <strong>INR to USD:</strong> {exchangeRates.INR}
              </div>
            </div>
          </div>
          {message && (
            <div className="mt-5">
              <p className="font-montserrat text-[16px] font-semibold">{message}</p>
            </div>
          )}
        </span>
      </span>
    </>
  );
};

export default Currency;
