// middlewares/language.js
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

// إعداد i18next لدعم اللغات المتعددة
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['querystring', 'cookie', 'header'],
      caches: ['cookie'],
    },
  });

// Middleware لدعم اللغات المتعددة
const languageMiddleware = middleware.handle(i18next);

module.exports = languageMiddleware;