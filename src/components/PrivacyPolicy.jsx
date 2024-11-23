import React from 'react';

const PrivacyPolicy = () => {
  return (
    <>
          <img
        src="whatsapp.png"
        alt="WhatsApp Logo"
        className="w-24 h-24 fixed z-[10] top-[75vh] cursor-pointer"
        onClick={() => window.open("https://wa.me/918847714464", "_blank")}
      />
    <div className="mt-32 mx-auto py-6 md:px-24 px-12">
      <h1 className="text-4xl font-bold text-center mb-6 text-black">Privacy Policy</h1>
      <p className="mb-4 text-lg text-gray-700">
        This Privacy Policy governs the manner in which Waterpark Chalo collects, uses, maintains, and discloses information collected from users (referred to as “Users” or “you”) of the Waterpark Chalo website (“Website”) located at waterparkchalo.com. This Privacy Policy applies to the Website and all products and services offered by Waterpark Chalo.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Personal Information Collection</h2>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>
            Waterpark Chalo may collect personal information from Users in various ways, including but not limited to when Users visit our Website, register on the Website, subscribe to our newsletter, respond to a survey, fill out a form, or interact with other features or services we provide on the Website.
          </li>
          <li>
            The types of personal information that may be collected include, but are not limited to, name, email address, phone number, postal address, and other information voluntarily submitted by Users.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. Non-Personal Information Collection</h2>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>
            Waterpark Chalo may collect non-personal information about Users whenever they interact with our Website. Non-personal information may include the browser name, the type of computer or device used, and technical information about Users’ means of connection to our Website, such as the operating system and internet service providers utilized.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. Web Browser Cookies</h2>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>
            Our Website may use “cookies” to enhance User experience. Users’ web browsers place cookies on their hard drives for record-keeping purposes and sometimes to track information about them. Users may choose to set their web browsers to refuse cookies or to alert when cookies are being sent. However, doing so may limit some functionalities of the Website.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. How We Use Collected Information</h2>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>To personalize User experience: We may use information to understand how our Users interact with the Website and provide content and offers that align with their preferences.</li>
          <li>To improve our Website: We continually strive to enhance our Website based on the feedback and information we receive from Users.</li>
          <li>To send periodic emails: We may use the email address to respond to inquiries, questions, and other requests. If Users opt to subscribe to our mailing list, they will receive emails that may include company news, updates, promotions, or related information. Users can unsubscribe from receiving future emails at any time.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">5. Protection of Information</h2>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>
            Waterpark Chalo adopts appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of Users’ personal information, username, password, transaction information, and data stored on our Website.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">6. Sharing Personal Information</h2>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>
            Waterpark Chalo does not sell, trade, or rent Users’ personal information to others. We may share generic aggregated demographic information not linked to any personal information regarding visitors and Users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">7. Changes to this Privacy Policy</h2>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>
            Waterpark Chalo has the discretion to update this Privacy Policy at any time. When we do, we will post a notification on the main page of our Website, revise the updated date at the bottom of this page, and send an email to Users who have provided their email address. We encourage Users to frequently check this page for any changes to stay informed about how we are protecting the personal information we collect. You acknowledge and agree that it is your responsibility to review this Privacy Policy periodically and become aware of modifications.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">8. Acceptance of these Terms</h2>
        <ul className="list-disc pl-5 text-lg text-gray-700">
          <li>
            By using this Website, you signify your acceptance of this Privacy Policy. If you do not agree to this policy, please do not use our Website. Your continued use of the Website following the posting of changes to this policy will be deemed your acceptance of those changes.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">9. Contacting Us</h2>
        <p className="text-lg text-gray-700">
          If you have any questions about this Privacy Policy, the practices of this Website, or your dealings with this Website, please contact us at:
        </p>
        <p className="text-lg text-gray-700 mt-2">
          Email: <a href="mailto:wpc@waterparkchalo.com" className="text-blue-600">wpc@waterparkchalo.com</a>
        </p>
      </section>

      <footer className="mt-6 text-center text-lg text-gray-500">
        <p>This Privacy Policy was last updated on <strong>31 December 2023</strong>.</p>
      </footer>
    </div>
    </>
  );
};

export default PrivacyPolicy;
