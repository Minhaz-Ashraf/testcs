import React from 'react'
import { GoBell } from 'react-icons/go';
import { HiMenu } from 'react-icons/hi';
import SideBar from '../user/Dashboard/SideBar';

const ResponsiveHeader = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);


    const openPopup = () =>
      {
        setPopupOpen(true);
      };
    
      const closePopup = () =>
      {
        setPopupOpen(false);
      };
    return (
  <>
  <span className="md:hidden sm:hidden ss:hidden flex justify-between items-center mx-6 mt-1  ">
          <Link to="/user-dashboard ">
            <img src={logo} alt="logo" className="md:w-[17vh] w-[13vh] pt-2" />
          </Link>
          <span className="flex items-center gap-6 relative">
            <span className=" bg-primary rounded-full w-[10px] h-[10px] absolute right-[63px] top-1"></span>
            <Link to="/notifications">
              {" "}
              <GoBell className="text-[30px] " />
            </Link>
  
            <HiMenu
              onClick={openPopup}
              src={menu}
              className="text-[35px]"
              alt="menu"
            />
          </span>
        </span>
  
        <span className="mt-8">
                <SideBar isPopupOpen={isPopupOpen} closePopup={closePopup} />
              </span>
  </>
    )
  }
export default ResponsiveHeader