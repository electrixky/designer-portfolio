const form = document.querySelector('.form');

function validateForm(formData) {
  const errors = [];

  // Check name
  const name = formData.get('name');
  if (!name || name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  // Check email
  const email = formData.get('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }

  // Check message
  const message = formData.get('message');
  if (!message || message.length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return errors;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const errors = validateForm(formData);

  // Remove any existing error messages
  const oldErrors = form.querySelectorAll('.form__error');
  oldErrors.forEach(error => error.remove());

  if (errors.length > 0) {
    // Display errors
    const errorList = document.createElement('ul');
    errorList.classList.add('form__error');

    errors.forEach(error => {
      const li = document.createElement('li');
      li.textContent = error;
      errorList.appendChild(li);
    });

    form.insertBefore(errorList, form.firstChild);
  } else {
    // Form is valid - proceed with submission
    console.log('Form is valid:', Object.fromEntries(formData.entries()));
    form.reset();
  }
});
