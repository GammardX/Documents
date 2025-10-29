const repoOwner = 'GammardX';
const repoName = 'Documents';

async function loadDocuments(path, listContainer) {
	try {
		const response = await fetch('documents.json');
		const data = await response.json();

		// Filtra solo file (non directory)
		const files = data.filter((item) => item.type === 'file');
		console.log(files);

		files.forEach((file) => {
			const p = document.createElement('p');
			p.setAttribute('content', file.name);

			const link = document.createElement('a');
			link.setAttribute('target', '_blank');
			link.setAttribute('href', file.html_url);
			link.textContent = file.name;

			p.appendChild(link);
			listContainer.appendChild(p);
		});
	} catch (error) {
		console.error('Errore nel caricamento dei file:', error);
		listContainer.innerHTML = '<p>Impossibile caricare i documenti.</p>';
	}
}

document.addEventListener('DOMContentLoaded', () => {
	loadDocuments('Documenti esterni', document.getElementById('Doc-Esterni'));
	loadDocuments('Documenti interni', document.getElementById('Doc-Interni'));
	loadDocuments(
		'Documenti esterni/Verbali',
		document.getElementById('Doc-Esterni-Verbali')
	);
	loadDocuments(
		'Documenti interni/Verbali',
		document.getElementById('Doc-Interni-Verbali')
	);

	const toggleElements = document.querySelectorAll(
		'.toggle-section, .toggle-subsection'
	);

	toggleElements.forEach((header) => {
		const content = header.nextElementSibling;
		if (!content) return;

		header.style.cursor = 'pointer';
		content.style.display = 'block';
		content.dataset.visible = 'true';
		header.classList.remove('collapsed');

		header.addEventListener('click', () => {
			const visible = content.dataset.visible === 'true';
			content.style.display = visible ? 'none' : 'block';
			content.dataset.visible = visible ? 'false' : 'true';
			header.classList.toggle('collapsed', visible);
		});
	});
});
