const i18next = require('i18next');

const resources = {
	en: {
		translation: require('../locales/en/translation.json'),
	},
	fr: {
		translation: require('../locales/fr/translation.json'),
	},
};

i18next
	.init({
		debug: true,
		lng: 'en',
		resources: resources,
	});

module.exports = (lng) => i18next.getFixedT(lng);