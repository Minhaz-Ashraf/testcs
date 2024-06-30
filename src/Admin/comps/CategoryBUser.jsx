import React, { useEffect, useState } from 'react';
import HeaderTab from './HeaderTab';
import apiurl from '../../util';
import Nav from '../Nav';
import Pagination from './Pagination';
import Loading from '../../components/Loading';
import DataNotFound from '../../components/DataNotFound';


const CategoryBUser = () => {
  const [categoryBUsers, setCategoryBUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPagesCount, setTotalPagesCount] = useState(0);

  const fetchTotalCategoryBUsers = async (page = 1, limit = perPage) => {
    try {
      setLoading(true);
      const response = await apiurl.get('/total-users-category-b', {
        params: { page, limit }
      });
      setCategoryBUsers(response.data.users);
      setTotalUsersCount(response.data.totalUsersCount);
      setTotalPagesCount(response.data.lastPage);
      setCurrentPage(page);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching total female users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    fetchTotalCategoryBUsers(pageNumber);
  };

  useEffect(() => {
    fetchTotalCategoryBUsers();
  }, []);

  return (
    <>
      <div className="fixed">
        <span className="absolute">
          <Nav />
        </span>
      </div>
      <div className='ml-[16%]'>
      <HeaderTab/>
</div>
      <div className='flex flex-row justify-between mx-36 ml-[24%] font-semibold text-center text-[17px] items-start font-DMsans mb-6'>
        <p className='w-5'>S.No</p>
        <p className='text-start w-16'>User Id</p>
        <p className='w-36'>Name</p>
        <p className='w-20'>Gender</p>
      </div>
      {loading ? (
        <div className="mt-28 ml-52">
          <Loading />
        </div>
      ) : categoryBUsers.length === 0 ? (
        <DataNotFound
          className="flex flex-col items-center md:ml-36 mt-11 sm:ml-28 sm:mt-20"
          message="No approval requests available"
          linkText="Back to Dashboard"
          linkDestination="/user-dashboard"
        />
      ) : (
        <CategoryBData categoryBUsers={categoryBUsers} currentPage={currentPage} perPage={perPage} />
      )}

      {categoryBUsers.length > 0 && (
        <div className="flex justify-center items-center mt-3 mb-20 ml-52">
          <Pagination
            currentPage={currentPage}
            hasNextPage={currentPage * perPage < totalUsersCount}
            hasPreviousPage={currentPage > 1}
            onPageChange={handlePageChange}
            totalPagesCount={totalPagesCount}
          />
        </div>
      )}
    </>
  );
};

const CategoryBData = ({ categoryBUsers, currentPage, perPage }) => {
//   console.log(femaleUsers, "ddn");
  return (
    <div className='flex flex-col mx-40 ml-[25%] font-normal text-black text-[15px] items-start font-DMsans mb-9'>
      {categoryBUsers?.map((item, index) => (
        <div key={item.userId} className='flex flex-row justify-between w-full my-5'>
          <p className='w-3'>{(currentPage - 1) * perPage + index + 1}</p>
          <p className='text-start w-36'>{item?.userId}</p>
          <p className='text-start w-60'>{item?.basicDetails[0]?.name?.replace("undefined", "")}</p>
          <p className='text-start'>{item?.gender === "F" ? "Female" : "Male"}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryBUser;
