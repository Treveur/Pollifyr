const { join } = require('node:path');
const { readdirSync, lstatSync } = require('node:fs');
const i18next = require('i18next');
const backend = require('i18next-fs-backend');

i18next
	.use(backend)
	.init({
		// debug: true,
		nitImmediate: false,
		preload: readdirSync(join(__dirname, '../locales')).filter((fileName) => {
			const joinedPath = join(join(__dirname, '../locales'), fileName);
			const isDirectory = lstatSync(joinedPath).isDirectory();
			return isDirectory;
		}),
		fallbackLng: 'en',
		lng: 'en',
		backend: {
			loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
		},
	});

module.exports = (lng) => i18next.getFixedT(lng);