// Adding a simple contact form within your ContactPage component
import React, { useEffect } from "react";

function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process form data here
    console.log("Form submitted!");
  };
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <br />
      <label>
        Message:
        <textarea name="message" required></textarea>
      </label>
      <br />
      <button type="submit">Send</button>
    </form>
  );
}

// Include the ContactForm in the ContactPage component
function ContactPage() {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Contact Me</h1>
      <table>
        <tr>
          <td>
            {" "}
            <p>
              If you have any questions, please don't hesitate to reach out.
              Here's how you can get in touch with me:
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <strong>Email:</strong>{" "}
              <a href="mailto:nwwolk@gmail.com">nwwolk@gmail.com</a>
              <br />
              <strong>Location:</strong> Philadelphia PA 19146
              <br />
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://linkedin.com/in/nicholaswolk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit my LinkedIn
              </a>
              <br />
            </ul>
          </td>
        </tr>
        <tr>
          <td>
            <ContactForm />
          </td>
        </tr>
      </table>
      {/* <div style={{ marginRight: "auto", marginLeft: "auto", maxwidth: "fit-content"}} > */}
      <div
        class="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme="dark"
        data-type="VERTICAL"
        data-vanity="nicholaswolk"
        data-version="v1"
      ></div>
      {/* </div> */}
    </div>
  );
}

export default ContactPage;
