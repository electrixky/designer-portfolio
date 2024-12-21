import LanguageSwitcher from './modules/langSwitcher.js';
import EmailService from "./modules/emailService.js";

document.addEventListener('DOMContentLoaded', () => {
  new LanguageSwitcher();
  new EmailService();
});
