import React, { useEffect, useState } from "react";
import { FaPeopleArrows, FaUserAlt } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from "react-router-dom";
import {
  Hero1,
  Hero2,
  HeroLcircle,
  MobileProto,
  appstore,
  founder,
  googleplay,
  heroCircles,
  logo,
  logow,
} from "../assets/index.js";
import {
  chooseData,
  cardData,
  coupleData,
  heroImage,
} from "../DummyData/HomeData.js";
import Footer from "../components/Footer.jsx";
import { TbHeartSearch } from "react-icons/tb";
import { RxEnter } from "react-icons/rx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const Home = () => {

  const icons = [FaUserAlt, TbHeartSearch, RxEnter, FaPeopleArrows   ];

  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/verify-number", { state: { action: "signup" } });
  };

  const handleLoginClick = () => {
    navigate("/verify-number", { state: { action: "login" } });
  };
  useEffect(() => {
    gsap.from(".anim", {
      duration: 1,
      opacity: 0,
      x: 200,
      ease: "power2.out",
    });

    
    gsap.from(".popimg", {
      opacity: 0,
      scale: 0.5,
      ease: "back",
      duration:0.5,
     stagger:0.8
       });

       gsap.from(".popHero", {
        opacity: 0,
        scale: 0.5,
        ease: "back",
        duration: 1.5,
       stagger:0.8
         });

       gsap.from(".anim-img", {
        duration: 2,
        opacity: 0.5,
        x: -90,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".anim-img",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 2,
        },
      });

      gsap.from(".anim-text", {
        duration: 2,
        opacity: 0,
        x: 90,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".anim-text",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 2,
        },
      });
  }, []);
  return (
    <>
      <nav>
      <div className="flex w-full justify-between item-center md:px-9 px-6  py-1 bg-[#FCFCFC] navshadow z-30">
          <img src={logo} alt="logo" className="sm:w-28 w-28 " />
          <span className="flex justify-end items-center flex-1">
          <span
        className="border-[1px] mx-6 border-[#A92525] p-1 px-3 rounded-lg text-[#A92525] cursor-pointer hover:bg-[#A92525] hover:text-white"
        onClick={handleSignupClick}
      >
        Sign up
      </span>
      <span
        className="background p-[7px] px-5 rounded-xl text-white cursor-pointer"
        onClick={handleLoginClick}
      >
        Log in
      </span>
          </span>
        </div>
      </nav>

      {/* HERO SECTION */}

<div>
<span className=" flex  md:flex-row flex-col sm:flex-row relative md:mx-16 mx-6 mb-0 ">

<div className=" flex  sm:mx-6 md:flex-row flex-col sm:flex-row items-center justify-start  ">

<div className="  flex  justify-around items-center ">
{/* {heroImage.map((image)=> */}
  <img src={Hero1}   alt="banner1"  className="md:w-[430px] sm:w-[350px] py-20 px-6 popHero"  />
 

{/* ) } */}
</div>
</div>
    <span className="md:mt-36 sm:mt-36 md:absolute  md:right-9  sm:right-0 px-6 mb-6">
    <img src={heroCircles} alt="ellipse"  className="absolute top-0 right-16 w-36 md:-translate-y-9 popimg "/>
    <img src={heroCircles} alt="ellipse"  className="absolute top-80 right-0 w-36 popimg "/>
      <p className=" font-montserrat text-primary font-bold md:text-[48px] sm:text-[28px] text-[28px] relative  anim">Connecting hearts, <br />building futures</p>
      <img src={heroCircles} alt="ellipse"  className="absolute top-0 w-16 -translate-x-3 popimg"/>
      <p className="text-[18px] font-DMsans font-normal mt-1 anim">Your Journey to happily ever after starts here with us at Connecting <br /> Soulmate - <span className="text-primary font-normal">honorary services for hindu community</span></p>
      <span className="flex flex-row items-center font-DMsans mt-9 gap-9">
        <span onClick={handleSignupClick} className="border popimg border-primary text-primary px-6 py-2 cursor-pointer rounded-lg">Sign up</span>
        <span onClick={handleLoginClick} className="px-6 py-2 bg-primary text-white cursor-pointer rounded-lg popimg">Log in</span>
        <img src={heroCircles} alt="ellipse"  className="absolute top-36 right-0 w-16 popimg "/>
      </span>
      <img src={heroCircles} alt="ellipse"  className="absolute top-80 right-60 w-16 popimg"/>
    </span>
  </span>
</div>

{/* //why choose us */}
      <span>
        <span className="flex justify-center items-center ">
          <h2 className="text-[#262626] text-[32px] font-bold font-montserrat ">
            Why You Choose Us
          </h2>
        </span>

        <span className="flex flex-wrap justify-center items-center   text-primary  ">
        {chooseData.map((i, index) => (
    <React.Fragment key={index}>
      <div className="flex flex-col justify-center items-center md:w-[30%] sm:w-[30%] w-[70%] mt-14">
        <span className="px-7 md:text-[25px] sm:text-[20px]  text-[25px] font-semibold text-style">
          {i.head}
        </span>
        <span className="font-semibold sm:text-center">{i.title}</span>
        <p className="font text-[16px] font-DMsans font-medium text-black text-center text-wrap w-2/3">
          {i.text}
        </p>
      </div>
      {index !== 5 && (
        <hr className="w-36 bg-primary h-[2px] sm:hidden md:hidden mt-5" />
      )}
      {index !== 2 && index !== 5 && (
        <div className="line mt-14 hidden sm:block md:block"></div>
      )}
    </React.Fragment>
  ))}

        </span>

        <span className="flex justify-center items-center mt-20">
          <h2 className="text-[#262626] text-[32px] font-bold font-montserrat ">
            Process
          </h2>
        </span>

        <span className="grid grid-cols-1 md:grid-cols-4 ss:grid-cols-2 sm:grid-cols-2 gap-8  md:px-16 px-6 sm:px-16 mt-12 font-DMsans">
          {cardData.map((m, index) => (
            <span className="rounded-2xl py-5 pb-9  card ">
              <span className="flex items-center justify-center ">
              {React.createElement(icons[index % icons.length], { size: 39, className: "mt-12" })}
              </span>
              <span className="flex items-center justify-center">
                <h3 className="text-[22px] font-medium font mt-3 text-center px-5">
                  {m.title}
                </h3>
              </span>
              <span className="flex items-center justify-center">
                <p className="text-[16px] pt-5 px-5 font-normal font-DMsans text-start ">
                  {m.text}
                </p>
              </span>
            </span>
          ))}

        </span>


        <span className="flex md:flex-row sm:flex-row flex-col justify-center items-center mt-24">
          <h2 className="text-[#262626] text-[32px] font-bold font-montserrat ">
            About The Founder
          </h2>
        </span>

        <span className="md:px-28 sm:px-16 pt-12 sm:gap-9 grid md:grid-cols-2  sm:grid-cols-2 grid-cols-1  items-center">
        <span className="">
        <div className="  md:rounded-[90px] rounded-[60px] background md:w-[70%] w-80 mx-8 md:mx-0 sm:mx-0 sm:mt-5">
          <img
            src={founder}
            alt="mg"
            className=" pl-5 pt-3   "
          />
         </div>
          </span>

          <span className=" mx-6">
            <h3 className="text-[22px] pt-5  font-semibold">Late Shri Bhagwan Das Kalwani</h3>
            <p className="text-[16px] text-normal md:mt-5 md:pe-12 sm:pe- ">
              Late Shri Bhagwan Das Kalwani, a charismatic soul, left an
              indelible mark by serving diverse communities worldwide. His
              magnetic personality propelled him to selflessly contribute to
              society, channeling his physical, financial, and emotional
              strengths. Alongside Mr. & Mrs. Lulla at Astoria Hotel, Dubai, he
              managed a marriage bureau as part of his charitable endeavors,
              benefiting all communities. Even in his absence, his legacy lives
              on through the dedicated members of his organization, perpetuating
              his energetic commitment to societal well-being. Shri Bhagwan Das
              Kalwani's spirit continues to inspire a global community,
              fostering connections and shared aspirations.
            </p>
          </span>
        </span>
<div className="hidden">
        <span className="flex justify-center items-center mt-20 ">
          <h2 className="text-[#262626] text-[25px] font-bold font-montserrat ">
            What Our Couples Says
          </h2>
        </span>

        <span className="grid grid-cols-1 md:grid-cols-3 ss:grid-cols-2 sm:grid-cols-2 gap-8  px-16 mt-16">
          {coupleData.map((j) => (
            <span className="rounded-2xl h-[52vh] ">
              <span className="flex items-center justify-center">
                <img src="./test.png" alt="img" />
              </span>
              <div className="bg-[#F9F9F9] rounded-2xl mx-5 -translate-y-12">
                <h3 className="text-[22px] font-medium font pt-7 px-5 ">
                  {j.title}
                </h3>

                <p className="text-[12px] pt-2 px-5 font-medium font ">
                  {j.text}
                </p>
              </div>
            </span>
          ))}

     
        </span>
</div>
       <div className="md:px-16 px-6 md:rounded-[99px] rounded-[50px] bg-primary md:mx-16 sm:mx-9 mx-6 mt-32 py-5">
          <span className="flex md:flex-row sm:flex-row sm:py-6 flex-col-reverse  justify-between items-center">
            <span className="  ">
              <h3 className="font text-white md:text-[35px] sm:text-[22px] text-[20px]  font-bold mt-6">
                Your Perfect Match Awaits – Instantly on Your Fingertips!
              </h3>
              <p className=" text-white md:pe-36 sm:pe-32 pt-3 text-[15px] ">
                Unlock a world of genuine connections with the Connecting
                Soulmate App. Download today on apple store or google play.
              </p>
              <span className="flex justify-start items-center mt-5">
             <p className="font-bold md:text-[35px] sm:text-[22px] text-[25px] mb-5 text-white font-montserrat blink"> Launching Soon</p>
              </span>
            </span>
            <img src={MobileProto} alt="img" className=" m-9 sm:w-60 md:w-96 float " />
          </span>
        </div>

        <Footer/>
      </span>
    </>
  );
};

export default Home;
