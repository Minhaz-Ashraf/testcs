import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./user/Home";
import Signup from "./user/Signup/Signup";
import LoginPopup from "./user/Login/LoginPopup";
import NumberChangeAlert from "./user/Settings/components/NumberChangeAlert";
import DeleteAlert from "./user/Settings/components/DeleteAlert";

// import VerifyNumber from "./user/verification/VerifyNumber";
import Consent from "./user/Signup/Consent";
import { RegistrationFile } from "./user/Registration";
import BasicSearch from "./user/search/BasicSearch";
import IdSearch from "./user/search/IdSearch";
import { AllMatch, NewJoin, SearchResult, Shortlisted } from "./user/matches";
import ProfileReq from "./user/Inbox/ProfileReq";
import ActivityCard from "./user/Dashboard/UserDashboard";
import Thankyou from "./user/Registration/Thankyou";
import ErrorPage from "./components/ErrorPage";
import Profile from "./user/Dashboard/Profile";
import ImageEdit from "./user/Dashboard/ImageEdit";
import PartnerEdit from "./user/Dashboard/PartnerEdit";
import InterestReq from "./user/Inbox/IntrestReq";
import Dashboard from "./Admin/Dashboard";
import User from "./Admin/User";
import ContactUpdate from "./user/Settings/ContactUpdate";
import BlockProfile from "./user/Settings/BlockProfile";
import WhatSappSetting from "./user/Settings/WhatSappSetting";
import DelAccount from "./user/Settings/DelAccount";
import RegNumber from "./user/Settings/RegNumber";
import SubsEmail from "./user/Settings/SubsEmail";
import Approval from "./Admin/Approval";
import ReportList from "./Admin/ReportList";
import { useEffect, useState } from "react";
import NumberChangePop from "./user/PopUps/NumberChangePop";
import { useDispatch, useSelector } from "react-redux";
import {
  decodeCookieAndFetchUserData,
  userDataStore,
} from "./Stores/slices/AuthSlice";
import { io } from "socket.io-client";
import PdfData from "./Admin/comps/PdfData";

import Chat from "./user/chat/Chat";
import ReApprove from "./user/Settings/components/ReapproveReq";
import Dummy from "./components/dummy";
import Currency from "./Admin/Currency";
import NotificationReceiver from "./user/notification/UserNotification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Notifications from "./Admin/Notifications";
import BeforeApprovalPage from "./user/Registration/BeforeApprovalpage";
import VerifyLinkReq from "./user/Registration/VerifyLinkReq";
import AllFemaleUser from "./Admin/comps/AllFemaleUser";
import AllMaleUser from "./Admin/comps/AllMaleUser";
import DeletedUsers from "./Admin/comps/DeletedUsers";
import MarriedUsers from "./Admin/comps/MarriedUser";
import CategoryAUser from "./Admin/comps/CategoryAUser";
import CategoryBUser from "./Admin/comps/CategoryBUser";
import CategoryCUser from "./Admin/comps/CategoryCUser";
import ReviewAlert from "./Stores/slices/ReviewAlert";
import CategoryUnUser from "./Admin/comps/UnCategorisedUser";
import ActiveUser from "./Admin/comps/TotalActiveUser";
import WaitingOrRejected from "./user/Settings/components/WaitingOrRejected";
import { isNotification } from "./Stores/slices/notificationslice";
const socket = io(import.meta.env.VITE_APP_DEV_BASE_URL);
const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />

    <Route path="admin/dashboard" element={<Dashboard />} />
    <Route path="admin/user" element={<User />} />
    {/* <Route path="/link-verification" element={<VerifyLinkReq />} /> */}
    <Route path="admin/approval-lists" element={<Approval />} />
    <Route path="admin/report-lists" element={<ReportList />} />
    <Route path="admin/currency-value" element={<Currency />} />
    <Route path="admin/notifications" element={<Notifications />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/pdf" element={<PdfData />} />
    <Route path="/admin/successfull-married" element={<MarriedUsers />} />
    <Route path="/admin/categoryA-users" element={<CategoryAUser />} />
    <Route path="/admin/categoryB-users" element={<CategoryBUser />} />
    <Route path="/admin/categoryC-users" element={<CategoryCUser />} />
    <Route path="/admin/uncategorised-users" element={<CategoryUnUser />} />
    <Route path="/admin/deleted-users" element={<DeletedUsers />} />
    <Route path="/admin/active-users" element={<ActiveUser />} />
    <Route path="/admin/female-users" element={<AllFemaleUser />} />
    <Route path="/admin/male-users" element={<AllMaleUser />} />
    <Route path="/form-submitted" element={<Thankyou />} />

    <Route path="/waiting" element={<BeforeApprovalPage />} />
    <Route path="/signup/:number" element={<Signup />} />
    {/* <Route path="/verify-number" element={<VerifyNumber />} /> */}
    <Route path="/registration-form/:page" element={<RegistrationFile />} />

    <Route path="/image-edit" element={<ImageEdit />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

const SubadminRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin/user" element={<ActivityCard />} />
    {/* <Route path="/link-verification" element={<VerifyLinkReq />} /> */}
    <Route path="/waiting" element={<BeforeApprovalPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup/:number" element={<Signup />} />
    {/* <Route path="/registration-form/:page" element={<RegistrationFile />} /> */}
    {/* <Route path="/verify-number" element={<VerifyNumber />} /> */}
    <Route path="/consent-form" element={<Consent />} />
    <Route
      path="/change-register-number/:userId/:email"
      element={<NumberChangePop />}
    />
    <Route path="/user-dashboard" element={<ActivityCard />} />
    <Route path="/basic-search" element={<BasicSearch />} />
    <Route path="/searchbyid" element={<IdSearch />} />
    <Route path="/form-submitted" element={<Thankyou />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/user-notification" element={<NotificationReceiver />} />
    <Route path="/all-matches" element={<AllMatch />} />
    <Route path="/new-join" element={<NewJoin />} />
    <Route path="/shortlisted" element={<Shortlisted />} />
    <Route path="/search-results" element={<SearchResult />} />
    <Route path="/inbox/profiles/:option" element={<ProfileReq />} />
    <Route path="/inbox/interests/:option" element={<InterestReq />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/partner-edit" element={<PartnerEdit />} />
    <Route path="/image-edit" element={<ImageEdit />} />
    <Route path="/settings/contact-info" element={<ContactUpdate />} />
    <Route path="/settings/block-profile" element={<BlockProfile />} />
    <Route path="/settings/whatsapp" element={<WhatSappSetting />} />
    <Route path="/settings/delete-profile" element={<DelAccount />} />
    <Route path="/settings/phonenumber" element={<RegNumber />} />
    <Route path="/settings/email" element={<SubsEmail />} />
    <Route path="/inreview" element={<ReviewAlert />} />
    <Route path="/waiting-or-rejected" element={<WaitingOrRejected />} />
    <Route path="/consent-form" element={<Consent />} />
    <Route path="/form-submitted" element={<Thankyou />} />

    {/* <Route path="/link-verification" element={<VerifyLinkReq />} /> */}
    <Route path="/updated-registered-number" element={<NumberChangeAlert />} />
    <Route path="/deleted-account" element={<DeleteAlert />} />
    {/* <Route path="/reapprove" element={<ReApprove />} /> */}
    <Route path="/waiting" element={<BeforeApprovalPage />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/waiting" element={<BeforeApprovalPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

const DeletedUserRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />

    {/* <Route path="/link-verification" element={<VerifyLinkReq />} /> */}
    <Route path="/waiting" element={<BeforeApprovalPage />} />
    <Route path="/form-submitted" element={<Thankyou />} />

    <Route path="/signup/:number" element={<Signup />} />
    {/* <Route path="/verify-number" element={<VerifyNumber />} /> */}.
    <Route path="/reapprove" element={<ReApprove />} />

    <Route path="/registration-form/:page" element={<RegistrationFile />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

const DefaultRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup/:number" element={<Signup />} />
    <Route path="/login/:number" element={<LoginPopup />} />
    <Route path="/inreview" element={<ReviewAlert />} />
    {/* <Route path="/verify-number" element={<VerifyNumber />} /> */}
    <Route path="/form-submitted" element={<Thankyou />} />
    <Route path="/consent-form" element={<Consent />} />
    <Route path="/registration-form/:page" element={<RegistrationFile />} />
    <Route path="/link-verification" element={<VerifyLinkReq />} />
    <Route path="/waiting" element={<BeforeApprovalPage />} />
    <Route path="/dummy" element={<Dummy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

function App() {
  const dispatch = useDispatch();

  const { userData, userId } = useSelector(userDataStore);
  const [accessType, setAccessType] = useState(null);

  useEffect(() => {
    dispatch(decodeCookieAndFetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setAccessType(userData);
    } else {
      setAccessType(null);
    }
  }, [userData]);

  useEffect(() => {
    socket.on(`notification/${userId}`, (data) => {
      dispatch(isNotification());
    });
    socket.on(`registeredNumberChanged/${userId}`, (data) => {
      localStorage.removeItem("authToken");
    });

    return () => {
      socket.off(`notification/${userId}`);
    };
  }, [socket, userId]);
  console.log(accessType, "ffmg");
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
      <div className="overflow-hidden">
        {accessType?.accessType === "2" ? (
          accessType?.isDeleted === true ||
          accessType?.registrationPhase === "notapproved" ||
          accessType?.registrationPhase === "registering" ? (
            <DeletedUserRoutes />
          ) : (
            <UserRoutes />
          )
        ) : null}

        {accessType?.accessType === "1" && <SubadminRoutes />}
        {accessType?.accessType === "0" && <AdminRoutes />}
        {!accessType?.accessType && <DefaultRoutes />}
      </div>
    </>
  );
}

export default App;

// import { Route, Routes, useNavigate } from "react-router-dom";
// import Home from "./user/Home";
// import Signup from "./user/Signup/Signup";
// import LoginPopup from "./user/Login/LoginPopup";
// import VerifyNumber from "./user/verification/VerifyNumber";
// import Consent from "./user/Signup/Consent";
// import { RegistrationFile } from "./user/Registration";
// import BasicSearch from "./user/search/BasicSearch";
// import IdSearch from "./user/search/IdSearch";

// import ProfileReq from "./user/Inbox/ProfileReq";
// import ActivityCard from "./user/Dashboard/UserDashboard";
// import Thankyou from "./user/Registration/Thankyou";
// import ErrorPage from "./components/ErrorPage";
// import Profile from "./user/Dashboard/Profile";
// import ImageEdit from "./user/Dashboard/ImageEdit";
// import PartnerEdit from "./user/Dashboard/PartnerEdit";
// import InterestReq from "./user/Inbox/IntrestReq";
// import Dashboard from "./Admin/Dashboard";
// import User from "./Admin/User";
// import ContactUpdate from "./user/Settings/ContactUpdate";
// import BlockProfile from "./user/Settings/BlockProfile";
// import WhatSappSetting from "./user/Settings/WhatSappSetting";
// import DelAccount from "./user/Settings/DelAccount";
// import RegNumber from "./user/Settings/RegNumber";
// import SubsEmail from "./user/Settings/SubsEmail";
// import Approval from "./Admin/Approval";
// import ReportList from "./Admin/ReportList";
// // import Chat from './user/chat/Chat';
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { decodeCookieAndFetchUserData, userDataStore } from "./Stores/slices/AuthSlice";
// import Dummy from "./components/dummy";
// import Currency from "./Admin/Currency";
// import NotificationReceiver from "./user/notification/UserNotification";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Terms from "./components/Terms";
// import Privacy from "./components/Privacy";
// import NumberChangePop from "./user/PopUps/NumberChangePop";
// import Notifications from "./Admin/Notifications";
// import BeforeApprovalPage from "./user/Registration/BeforeApprovalpage";
// import VerifyLinkReq from "./user/Registration/VerifyLinkReq";
// import NumberChangeAlert from "./user/Settings/components/NumberChangeAlert";
// import DeleteAlert from "./user/Settings/components/DeleteAlert";
// import ReApprove from "./user/Settings/components/ReapproveReq";
// import PdfData from "./Admin/comps/PdfData";
// import ReviewAlert from "./Stores/slices/ReviewAlert";
// import WaitingOrRejected from "./user/Settings/components/WaitingOrRejected";
// import { io } from "socket.io-client";
// import { isNotification } from "./Stores/slices/notificationslice";
// import Shortlisted from "./user/matches/Shortlisted";
// import AllMatch from "./user/matches/AllMatch";
// import NewJoin from "./user/matches/NewJoin";
// const socket = io(import.meta.env.VITE_APP_DEV_BASE_URL);

// import SearchResult from "./user/matches/SearchResult";
// import Chat from './user/chat/Chat';

// const AdminRoutes = () =>
// {
//   return (
//     <Routes>
//       {/* <Route path="/" element={<Dashboard />} />
//       <Route path="/admin/user" element={<User />} /> */}
//       <Route path="/admin/approval-lists" element={<Approval />} />
//       {/* <Route path="/admin/report-lists" element={<ReportList />} />
//       <Route path="/currency-value" element={<Currency />} />
//       <Route path="/admin/notifications" element={<Notifications />} /> */}
//     </Routes>
//   );
// };

// const SubadminRoutes = () =>
// {
//   return (
//     <Routes>
//       <Route path="/admin/user" element={<ActivityCard />} />

//     </Routes>
//   );
// };

// const UserRoutes = () =>
// {

//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/signup/:number" element={<Signup />} />
//       <Route path="/verify-number" element={<VerifyNumber />} />
//       <Route path="/consent-form" element={<Consent />} />
//       <Route path="/registration-form/:page" element={<RegistrationFile />} />

//       {/* <Route path="/user-dashboard" element={<ActivityCard />} />
//       <Route path="/basic-search" element={<BasicSearch />} />
//       <Route path="/searchbyid" element={<IdSearch />} /> */}
//       <Route path="/form-submitted" element={<Thankyou />} />
//       {/* <Route path="/user-notification" element={<NotificationReceiver />} /> */}
//       {/* <Route path="/all-matches" element={<AllMatch />} />
//       <Route path="/new-join" element={<NewJoin />} />
//       <Route path="/shortlisted" element={<Shortlisted />} />
//       <Route path="/search-results" element={<SearchResult />} />
//       <Route path="/inbox/profiles/:option" element={<ProfileReq />} />
//       <Route path="/inbox/interests/:option" element={<InterestReq />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/partner-edit" element={<PartnerEdit />} />
//       <Route path="/image-edit" element={<ImageEdit />} />
//       <Route path="/settings/contact-info" element={<ContactUpdate />} />
//       <Route path="/settings/block-profile" element={<BlockProfile />} />
//       <Route path="/settings/whatsapp" element={<WhatSappSetting />} />
//       <Route path="/settings/delete-profile" element={<DelAccount />} />
//       <Route path="/settings/phonenumber" element={<RegNumber />} />
//       <Route path="/settings/email" element={<SubsEmail />} /> */}
//       <Route path="/terms" element={<Terms />} />
//       <Route path="/privacy" element={<Privacy />} />

//     </Routes>
//   );
// };

// function App()
// {

//   const dispatch = useDispatch();

//   useEffect(() =>
//   {
//     // Fetch user data on page load
//     dispatch(decodeCookieAndFetchUserData());
//   }, [dispatch]);
//   const { userData, userId} = useSelector(userDataStore);
//   // console.log("userdata haiye", userData);
//   // console.log("outside function accessType:", userData?.accessType

//   const renderRoutesBasedOnAccessType = () =>
//   {
//     if (!userData)
//     {

//       return null
//     }
//     else
//     {
//       // console.log("userData  accessType:", userData?.accessType
//       // );
//       const accessType = userData?.accessType;

//       switch (accessType)
//       {
//         case 0:
//           return <AdminRoutes />
//         case 1:
//           return <SubadminRoutes />;
//         case 2:
//           return <UserRoutes />;
//         default:
//           return null;
//       }
//     }

//   };
//   return (
//     <>
//       <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
//       <div className="overflow-hidden">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/signup/:number" element={<Signup />} />
//           <Route path="/login/:number" element={<LoginPopup />} />
//           <Route path="/verify-number" element={<VerifyNumber />} />
//           <Route path="/consent-form" element={<Consent />} />
//           <Route
//             path="/registration-form/:page"
//             element={<RegistrationFile />}
//           />

//           <Route path="/dummy" element={<Dummy />} />
//           <Route path="/terms" element={<Terms />} />
//           <Route path="/privacy" element={<Privacy />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/inreview" element={<ReviewAlert />} />
//           <Route path="/waiting-or-rejected" element={<WaitingOrRejected />} />
//           <Route path="/signup-newUser" element={<Signup />} />

//           <Route path="/verify-number" element={<VerifyNumber />} />
//           <Route path="/consent-form" element={<Consent />} />
//           <Route path="/registration-form/:page" element={<RegistrationFile />} />
//           <Route path="/link-verification" element={<VerifyLinkReq />} />
//           <Route path="/user-dashboard" element={<ActivityCard />} />
//           <Route path="/basic-search" element={<BasicSearch />} />
//           <Route path="/searchbyid" element={<IdSearch />} />
//           <Route path="/form-submitted" element={<Thankyou />} />
//           <Route path="/user-notification" element={<NotificationReceiver />} />
//           <Route path="/all-matches" element={<AllMatch />} />
//           <Route path="/new-join" element={<NewJoin />} />
//           <Route path="/shortlisted" element={<Shortlisted />} />
//           <Route path="/search-results" element={<SearchResult />} />
//           <Route path="/inbox/profiles/:option" element={<ProfileReq />} />
//           <Route path="/inbox/interests/:option" element={<InterestReq />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/partner-edit" element={<PartnerEdit />} />
//           <Route path="/image-edit" element={<ImageEdit />} />
//           <Route path="/settings/contact-info" element={<ContactUpdate />} />
//           <Route  path = "/updated-registered-number" element = {<NumberChangeAlert/> }/>
//           <Route path="/settings/block-profile" element={<BlockProfile />} />
//           <Route path="/settings/whatsapp" element={<WhatSappSetting />} />
//           <Route path="/settings/delete-profile" element={<DelAccount />} />
//           <Route path="/settings/phonenumber" element={<RegNumber />} />
//           <Route path="/settings/email" element={<SubsEmail />} />
//           <Route path = "/deleted-account" element={<DeleteAlert/>} />
//           <Route path = "/reapprove" element={<ReApprove/>}/>
//           <Route path="/terms" element={<Terms />} />
//           <Route path="/privacy" element={<Privacy />} />

//           <Route path="/change-register-number/:userId/:email" element={<NumberChangePop />} />
//           <Route path="/admin/dashboard" element={<Dashboard />} />
//            <Route path="/admin/user" element={<User />} />

//           <Route path="/admin/successfull-married" element={<MarriedUsers/>} />
//           <Route path="/admin/successfull-married" element={<Approval />} />
//           <Route path="/admin/deleted-users" element={<DeletedUsers />} />
//           <Route path="/admin/female-users" element={<AllFemaleUser />} />
//           <Route path="/admin/male-users" element={<AllMaleUser/>} />
//           <Route path="/admin/report-lists" element={<ReportList />} />
//           <Route path="/admin/notifications" element={<Notifications />} />
//           <Route path="/admin/currency-value" element={<Currency />} />
//            <Route path = "/waiting" element={<BeforeApprovalPage />} />
//           <Route path="/currency-value" element={<Currency />} />
//           <Route path = "/waiting" element={<BeforeApprovalPage />} />
//           <Route path = "/pdf" element={<PdfData />} />
//           <Route path ="/chat" element={<Chat/>}/>
//           <Route path="*" element={<ErrorPage />} />
//           {renderRoutesBasedOnAccessType()}
//         </Routes>
//       </div>
//     </>
//   );
// }
// export default App;
