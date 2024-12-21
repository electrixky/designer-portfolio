import translations from '../translations.js';

export default class LanguageSwitcher {
  constructor() {
    this.currentLang = 'ua';
    this.init();
  }

  init() {
    // Get all language buttons
    const langButtons = document.querySelectorAll('.header__lang-btn');

    this.switchLanguage(this.currentLang);
    this.updateButtonStates(this.currentLang);

    // Add click handlers
    langButtons.forEach(button => {
      button.addEventListener('click', () => {
        const newLang = button.dataset.lang;
        this.switchLanguage(newLang);
        this.updateButtonStates(newLang);

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

  updateButtonStates(activeLang) {
    const langButtons = document.querySelectorAll('.header__lang-btn');
    langButtons.forEach(btn => {
      if (btn.dataset.lang === activeLang) {
        btn.classList.add('header__lang-btn--active');
      } else {
        btn.classList.remove('header__lang-btn--active');
      }
    });
  }

  switchLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    this.currentLang = lang;

    const elements = document.querySelectorAll('[data-lang-key]');
    elements.forEach(element => {
      const key = element.dataset.langKey;
      if (translations[lang][key]) {
        element.innerHTML = translations[lang][key].replace(/\n/g, '<br>');
      }
    });
  }
}
