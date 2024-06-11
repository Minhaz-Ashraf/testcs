import React from "react";
import { logo } from "../assets";
import { BackArrow } from "./DataNotFound";
import Footer from "./Footer";

const Privacy = () => {
  return (
    <>
      <div className="bg-[#FCFCFC] md:px-12 sm:px-9 navshadow #conditions md:block sm:block hidden">
        <img src={logo} alt="" className="md:w-[16vh] sm:w-[11vh] pt-2 " />
      </div>
      <BackArrow className="md:absolute sm:fixed  md:ml-12   w-full fixed  sm:ml-5"  />
      <div className="bg-[#FCFCFC]  px-9 py-12 rounded-xl shadow md:mt-9 sm:mt-20 mt-28  md:mx-56 sm:mx-12 mx-6 mb-9" id="policy">
        <p className=" font-montserrat  font-semibold text-[22px] text-center my-5">
          Privacy Policy
        </p>
        <span className=" font-DMsans font-light text-[14px]">
          <p>
            Connecting Soulmate is a non-profit, free matrimonial match-making
            portal started with the purpose of helping people meet and find
            prospective partners. <br />  We (promoters/website owners) and/or
            our team take no fees - in cash or kind to run the services. It's a
            free service dedicated especially to the Sindhi community. We also
            serve other communities, who reach out to us. Your privacy is
            important to us, and so is being transparent about how we collect,
            import IdSearch from './../user/search/IdSearch';
use, and share information about you. This policy is intended to
            help you understand:
          </p>
          <p className="text-[16px] font-semibold font-montserrat my-3 mt-4">
            1. What information does Connecting Soulmate collect from you?
          </p>
          <p>
            Connecting Soulmate (website/app) is a free, charitable platform
            matchmaking (“Service”) for no-monetary gains. To provide you with
            the services, you (User/Member) are required to submit certain
            personal information which is displayed on the website/app by your
            or your nominated/ authorised person to find the perfect life
            partner. You hereby provide your consent to collect, process, and
            share of your personal information with other users/members in order
            to provide the service. <br />
            Connecting Soulmate gathers information while you are availing of
            our charitable services: personal data, we advise you not to
            register with our Site. <br />
            In order to avail of the service you provide the following
            information:- <br />
            While registering for our service, you share with us your personal
            data, such as name, gender, date of birth, contact details,
            educational qualification, employment details, photos, marital
            status and your interests and sensitive personal data such as your
            Identity proofs.
            <p className="mt-4 text-primary mb-2 font-medium">
              You have the option to send interesting profiles to your contacts
              via WhatsApp.
            </p>
            Your chats and messages with other users as well as the content you
            publish will be processed as a part of the service. We collect
            information about your activity on our services, such as date and
            time you last logged in, and notifications you send to others on the
            portal. 
            <br />
            We collect information from and about the device(s) such as IP
            address, device ID and type, device specification and apps settings,
            app error reports, browser type and version, operating system,
            identifiers associated with cookies or other technologies that may
            uniquely identify your device or browser;
          </p>
          <p className="mt-4 text-primary font-medium">
          Note: We do not ask or track information from any 3rd party tools like social media etc for your personal information. 
          </p>
          <p className="text-[16px] font-semibold font-montserrat my-3 mt-4">
         2. How do we use the information collected from you?
          </p>

          <p>
          We use the information collected in the following ways:
          <ul>
            <li>we use the information submitted by you to provide the Service.</li>
            <li>provide you with customer support;</li>
            <li>communicate with you by email, or phone about the Service</li>
            <li>recommend relevant matches to you and display your profile to other users.</li>
          </ul>
          </p>
          <p className="text-[16px] font-semibold font-montserrat my-3 mt-4">
            3. With whom do we share your information?
          </p>
          <p>
          Connecting Soulmate does not sell, rent, share, trade or give away any of your personal information. <br />
          We publish the information shared by you with other users to provide the Services in 2 ways:
            <br /> 
            1. <span className="text-[#2E2E2E] font-medium">A brief profile card</span> - where basic details of yours are mentioned <br />
             2. <span className="text-[#2E2E2E] font-medium">Detailed profile</span> - once you accept someone’s interest request then only all your submitted information is visible to the person. Be cautious as what you share with other users and with whom. 
             We may use third party service providers to provide website and application development, hosting, maintenance, backup, storage, payment processing, analysis and other services for us, which may require them to access or use information about you. If a service provider needs to access information about you to perform services on our behalf, they do so under close instruction from us, including policies and procedures designed to protect your information. All of our service providers and partners agree to strict confidentiality obligations and data protection.
          </p>
          <p className="text-[16px] font-semibold font-montserrat my-3 mt-4">
            4. How we secure your information?
          </p>
          <p>
          While we implement safeguards designed to protect your information, no security system is impenetrable and due to the inherent nature of the Internet, we cannot guarantee that data, during transmission through the Internet or while stored on our systems or otherwise in our care, is absolutely safe from intrusion by others. We follow generally accepted industry standards to protect the personal information submitted to us. All your information, not just the sensitive information, is restricted. Only employees who need the information to perform a specific job are granted access to personally identifiable information.
If you have any questions about the security of our website, please email us.
          </p>
          <p className="text-[16px] font-semibold font-montserrat my-3 mt-4">
            4. How we secure your information?
          </p>
          <p>
          We keep your personal information only as long as you use our service. In practice, we delete your information upon deletion of your account.
          </p>
          <p className="text-[16px] font-semibold font-montserrat my-3 mt-4">
            4. Tell me how to contact Connecting Soulmate.
          </p>
          <p>If you have any questions about this privacy statement, the practices of this site, or your dealings with this Website, please email us.</p>
          </span>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
