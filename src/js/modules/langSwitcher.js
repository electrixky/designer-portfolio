import translations from '../translations.js';

export default class LanguageSwitcher {
  constructor() {
    this.currentLang = 'ua';
    this.init();
  }

  init() {
    // Get all language buttons
    const langButtons = document.querySelectorAll('.header__lang-btn');

    // Add click handlers
    langButtons.forEach(button => {
      button.addEventListener('click', () => {
        const newLang = button.dataset.lang;
        this.switchLanguage(newLang);

        // Update active button state
        langButtons.forEach(btn => btn.classList.remove('header__lang-btn--active'));
        button.classList.add('header__lang-btn--active');
      });
    });

    // Load saved language preference
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
      this.switchLanguage(savedLang);
    }
  }

  switchLanguage(lang) {
    // Save language preference
    localStorage.setItem('selectedLanguage', lang);
    this.currentLang = lang;

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-lang-key]');
    elements.forEach(element => {
      const key = element.dataset.langKey;
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
  }
}
