// Adding a simple contact form within your ContactPage component
function ContactForm() {
    const handleSubmit = (event) => {
      event.preventDefault();
      // Process form data here
      console.log("Form submitted!");
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Message:
          <textarea name="message" required></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
    );
  }
  
  // Include the ContactForm in the ContactPage component
  function ContactPage() {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <h1>Contact Me</h1>
        <p>If you have any questions, please don't hesitate to reach out. Here's how you can get in touch with me:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:nwwolk@gmail.com">nwwolk@gmail.com</a></li>
          <li><strong>Location:</strong> Philadelphia PA 19146</li>
          <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/nicholaswolk" target="_blank" rel="noopener noreferrer">Visit my LinkedIn</a></li>
        </ul>
        <ContactForm />
      </div>
    );
  }
  
  export default ContactPage;
  