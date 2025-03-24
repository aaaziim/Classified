import React from "react";
import Breadcrumb from "../Components/Breadcrumb";
import DynamicTitlePage from "../Components/DynamicTitlePage";

const Privacy = () => {
  return (
    <div>
      <div className="space-y-4 mb-4">
        <DynamicTitlePage title={`Privacy Policy | SideGurus`} />

        <Breadcrumb
          title={"Privacy Policy"}
          subTitle={"Here you can read safety information"}
        ></Breadcrumb>
      </div>
      <div className="bg-[#FFE5D5]   p-6 min-h-screen flex justify-center items-center">
        <div className="max-w-3xl bg-[#FFFFFF] p-8 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">
            Effective Date: 22nd March 2025
          </h1>
          <p className="mb-4">
            Welcome to<span className="text-[#014D48] font-semibold text-lg"> SideGurus.com
            </span>
            , where local talent connects with opportunity. Your privacy matters
            to us, and we are committed to safeguarding your personal
            information. This policy explains how we collect, use, and protect
            your data when you use our platform. By accessing <span className="text-[#014D48]  font-semibold text-lg"> SideGurus.com
            </span>
            , you agree to the terms outlined below. We may update this policy
            from time to time, and we encourage you to review it regularly.
          </p>

          <h2 className="text-xl font-semibold text-teal-700">
            Your Privacy is Our Priority
          </h2>
          <p className="mb-4">
            At{" "}
            <span className="text-[#014D48]  font-semibold text-lg">
              SideGurus.com
            </span>
            , we take user privacy seriously. We do not engage in invasive
            marketing tactics or sell your information. Our platform is designed
            to help individuals and businesses promote their local services and
            events without compromising their personal data.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>We do not sell your data to third parties.</li>
            <li>We do not send spam or unsolicited promotional messages.</li>
            <li>
              We do not run third-party advertisements; all posts come directly
              from users.
            </li>
            <li>We do not use invasive tracking technologies.</li>
            <li>
              We do not participate in affiliate marketing or third-party
              referral programs.
            </li>

            <li>
              We encourage users to review the privacy policies of any
              third-party links found on our site.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-teal-700">
            Information We Collect & How It’s Used
          </h2>
          <p className="mb-4">
            To enhance your experience and keep the platform secure, we collect
            specific data when you use{" "}
            <span className="text-[#014D48]  font-semibold text-lg">
              SideGurus.com
            </span>
            . The information you provide allows us to facilitate transactions,
            verify identities, and improve the platform’s functionality.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>
              <strong>Account Information –</strong> When you create an account,
              we may collect your name, email address, phone number, and
              location.
            </li>
            <li>
              <strong>Payment Details –</strong> Payment processing is handled
              through customers and providers. To be safe follow our{" "}
              <a className="text-black font font-semibold" href="/safety-guide">
                safety guide
              </a>
            </li>
            <li>
              <strong>Geolocation Data –</strong> We may collect geographic data
              based on your IP address or device settings.
            </li>
            <li>
              <strong>User-Generated Content –</strong> Any photos,
              descriptions, or details you provide in your service listings or
              event posts will be publicly visible.
            </li>
            <li>
              <strong>Device & Browsing Data –</strong> We collect technical
              information such as browser type, device ID, and IP address to
              maintain security.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-teal-700">
            When We Share Data
          </h2>
          <p className="mb-4">
            We take user confidentiality seriously and only share information
            when necessary:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>
              <strong>Legal Compliance –</strong> If required by law, we may
              disclose user data to law enforcement.
            </li>
            <li>
              <strong>Fraud Prevention –</strong> To protect against fraud or
              malicious activity, we may work with security service providers.
            </li>
            <li>
              <strong>Business Transactions –</strong> If{" "}
              <span className=" text-[#014D48] font-semibold text-lg">
                SideGurus.com
              </span>{" "}
              is involved in a merger or acquisition, user data may be
              transferred.
            </li>
            <li>
              <strong>At Your Direction –</strong> If you authorize us to share
              your information for a specific purpose, we will do so
              accordingly.
            </li>
          </ul>
          <p className="mb-4">
            We do not sell, trade, or distribute your personal data to
            advertisers, marketers, or third-party organizations outside of
            these circumstances.
          </p>

          <h2 className="text-xl font-semibold text-teal-700">
            How We Keep Your Data Safe
          </h2>
          <p className="mb-4">
            Security is a top priority at{" "}
            <span className="text-[#014D48]  font-semibold text-lg">
              SideGurus.com
            </span>
            . We implement measures to protect user data from unauthorized
            access, theft, or misuse. While we take every precaution, no
            platform can guarantee 100% security. Users should also take
            responsibility for safeguarding their accounts by using strong
            passwords and avoiding suspicious communications.
          </p>

          {/* <h2 className="text-xl font-semibold mt-6 mb-2">Cookies & Tracking</h2>
        <p className="mb-4">
        To improve your experience, we use cookies and similar technologies for website functionality and fraud prevention. You can adjust your browser settings to disable cookies, but this may affect certain site features.
        </p> */}

          <h2 className="text-xl font-semibold text-teal-700">Age Restrictions</h2>
          <p className="mb-4">
            <span className="text-[#014D48]  font-semibold text-lg">
              SideGurus.com
            </span>{" "}
            is intended for individuals 18 years or older. If we discover that a
            minor has created an account, we will take steps to remove their
            data.
          </p>

          <h2 className="text-xl font-semibold text-teal-700">
            Changes to This Policy
          </h2>
          <p className="mb-4">
            We reserve the right to modify this Privacy Policy as needed. If
            significant updates are made, we will notify users through website
            announcements or email notifications. Your continued use of{" "}
            <span className="text-[#014D48]  font-semibold text-lg">
              SideGurus.com
            </span>{" "}
            indicates acceptance of the revised terms.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
          <p className="mb-4">
            If you have questions about this policy or need assistance with your
            privacy settings, please contact us:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Email: SideGurusServices@gmail.com</li>
            <li>
              Website:{" "}
              <a href="https://www.sidegurus.com">
                <span className="text-[#014D48]  font-semibold text-lg">
                  SideGurus.com
                </span>
              </a>
            </li>
          </ul>
          <p>
            By using{" "}
            <span className=" text-[#014D48] font-semibold text-lg">
              SideGurus.com
            </span>
            , you acknowledge and agree to the practices described in this
            Privacy Policy. Thank you for being a part of our growing community,
            where your skills and services connect with the right opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
