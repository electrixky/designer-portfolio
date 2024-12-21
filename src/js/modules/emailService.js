export default class EmailService {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.init();
  }

  init() {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Show loading state
    this.submitButton.disabled = true;
    this.submitButton.textContent = 'Sending...';

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        this.form
      );

      // Show success message
      this.showMessage('Message sent successfully!', 'success');
      this.form.reset();

    } catch (error) {
      // Show error message
      this.showMessage('Failed to send message. Please try again.', 'error');
      console.error('EmailJS Error:', error);

    } finally {
      // Reset button
      this.submitButton.disabled = false;
      this.submitButton.textContent = 'Надіслати';
    }
  }

  showMessage(text, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form__message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form__message form__message--${type}`;
    messageDiv.textContent = text;

    // Insert message after form
    this.form.insertAdjacentElement('afterend', messageDiv);

    // Remove message after 3 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }
}
