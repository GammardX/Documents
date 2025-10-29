// .github/scripts/generateIndex.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve('.');
const WEBSITE_DIR = path.join(ROOT, 'website');
const OUTPUT = path.join(WEBSITE_DIR, 'documents.json');

// Funzione ricorsiva per leggere la struttura delle cartelle
function readDirRecursive(dir, base = '') {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	const result = [];

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		const relPath = path.join(base, entry.name);

		if (entry.isDirectory()) {
			result.push({
				type: 'directory',
				name: entry.name,
				path: relPath,
				children: readDirRecursive(fullPath, relPath)
			});
		} else if (entry.isFile()) {
			result.push({
				type: 'file',
				name: entry.name,
				path: relPath,
				url: `https://github.com/GammardX/Documents/blob/main/${relPath}`
			});
		}
	}

	return result;
}

console.log('📁 Generating documents.json ...');
const data = readDirRecursive(ROOT);
fs.writeFileSync(OUTPUT, JSON.stringify(data, null, 2));
console.log('✅ File generated:', OUTPUT);
