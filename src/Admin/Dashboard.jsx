import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { getToken } from '../Stores/service/getToken';
import apiurl from '../util';

const config = {
  headers: {
    Authorization: ``,
    "Content-Type": "application/json; charset=UTF-8",
  },
};

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalMaleUsers: 0,
    totalFemaleUsers: 0,
    totalDeletedUsers: 0,
    totalUsersCategoryA: 0,
    totalUsersCategoryB: 0,
    totalUsersCategoryC: 0,
    totalUsersUnCategorised: 0,
    totalActiveUsers: 0,
    totalSuccessfulMarriages : 0,
  });

  const getAllUsersStatistics = async () => {
    try {
      const token = getToken();
      config.headers.Authorization = `Bearer ${token}`;
      const response = await apiurl.get('get-user-statistics', config);
      setStatistics(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsersStatistics();
  }, []);

  return (
    <>
      <span className="flex">
        <span className="fixed">
          <Nav />
        </span>
        <span className="grid md:grid-cols-3 grid-cols-1 md:mx-16 mx-6 md:ml-80 px-9 w-full gap-8 mt-16 overflow-scroll scrollbar-hide mb-20">
          <AdminCard title="Total Users" count={statistics.totalUsers} />
          <AdminCard title="Total Male Users" count={statistics.totalMaleUsers} />
          <AdminCard title="Total Female Users" count={statistics.totalFemaleUsers} />
          <AdminCard title="Total Deleted Users" count={statistics.totalDeletedUsers} />
          <AdminCard title="Total Users Category A" count={statistics.totalUsersCategoryA} />
          <AdminCard title="Total Users Category B" count={statistics.totalUsersCategoryB} />
          <AdminCard title="Total Users Category C" count={statistics.totalUsersCategoryC} />
          <AdminCard title="Total Uncategorised Users" count={statistics.totalUsersUnCategorised} />
          <AdminCard title="Total Active Users" count={statistics.totalActiveUsers} />
          <AdminCard title="Total Successfull Marriages" count={statistics.totalSuccessfulMarriages} />
        </span>
      </span>
    </>
  );
};

const AdminCard = ({ title, count }) => {
  return (
    <div className="shadow rounded-3xl my-2 px-6 pt-5 pb-16 font-montserrat w-full">
      <p className="font-medium">{title}</p>
      <p className="font-semibold text-[32px]">{count}</p>
    </div>
  );
};

export default Dashboard;
