"use strict";

const errorMessage = document.querySelector("#ladefehler");

function element(tag, className, text) {
	const node = document.createElement(tag);
	if (className) node.className = className;
	if (text !== undefined) node.textContent = text;
	return node;
}

function addStatus(parent, label) {
	parent.append(element("span", "status", label));
}

function addSource(parent, label, url) {
	const source = element("p", "source");
	source.append(document.createTextNode("Quelle: "));
	if (url) {
		const link = element("a", "", label);
		link.href = url;
		link.target = "_blank";
		link.rel = "noreferrer";
		source.append(link);
	} else {
		source.append(document.createTextNode(label));
	}
	parent.append(source);
}

function appendDetails(parent, entries) {
	if (!entries || entries.length === 0) return;
	const list = element("dl", "detail-list");
	for (const [label, value] of entries) {
		list.append(element("dt", "", label), element("dd", "", value));
	}
	parent.append(list);
}

function renderFeatured(items) {
	const target = document.querySelector("#startziele");
	for (const item of items) {
		const card = element("article", "feature-card");
		const imageLink = element("a", "feature-image-link");
		imageLink.href = `#${item.id}`;
		imageLink.setAttribute("aria-label", `${item.name}: Ziel entdecken`);
		imageLink.append(element("div", "photo-placeholder", item.imageNote));
		const copy = element("div", "feature-copy");
		const title = element("h3");
		const titleLink = element("a", "", item.name);
		titleLink.href = `#${item.id}`;
		title.append(titleLink);
		copy.append(title, element("p", "", item.summary));
		addSource(copy, item.source, item.sourceUrl);
		card.append(imageLink, copy);
		target.append(card);
	}
}

function renderInfoCards(selector, items) {
	const target = document.querySelector(selector);
	for (const item of items) {
		const card = element("article", "info-card");
		card.append(element("h3", "", item.title), element("p", "", item.text));
		addStatus(card, item.status);
		appendDetails(card, item.details);
		if (item.source) addSource(card, item.source, item.sourceUrl);
		target.append(card);
	}
}

function renderRoutes(groups) {
	const target = document.querySelector("#wege-liste");
	for (const group of groups) {
		const section = element("section", "route-group");
		section.append(element("h3", "", group.group));
		const cards = element("div", "route-grid");
		for (const route of group.items) {
			const card = element("article", "route-card");
			card.append(element("h3", "", route.name));
			addStatus(card, "Quelle angegeben · Angaben vor Tour prüfen");
			if (route.note) card.append(element("p", "", route.note));
			appendDetails(card, [
				["Start", route.start],
				["Strecke", route.distance],
				["Dauer", route.duration],
				["Anspruch", route.difficulty]
			]);
			cards.append(card);
		}
		addSource(section, group.source, group.sourceUrl);
		section.prepend(cards);
		target.append(section);
	}
}

function renderCompactList(selector, items) {
	const target = document.querySelector(selector);
	for (const item of items) {
		const card = element("article", "compact-card");
		card.append(element("h4", "", item.name), element("p", "", item.detail));
		addStatus(card, item.status);
		target.append(card);
	}
}

function renderDestinations(items) {
	const target = document.querySelector("#ziel-liste");
	for (const item of items) {
		const card = element("article", "info-card");
		card.id = item.id;
		card.append(element("h3", "", item.name), element("p", "", item.text));
		addStatus(card, item.status);
		if (item.source) addSource(card, item.source, item.sourceUrl);
		target.append(card);
	}
}

function renderPageText(page) {
	document.querySelector("#hero-intro").textContent = page.heroIntro;
	document.querySelector("#map-status").textContent = page.mapStatus;
	document.querySelector("#map-note").textContent = page.mapNote;
	document.querySelector("#intro-overview").textContent = page.overview;
	document.querySelector("#nature-intro").textContent = page.natureIntro;
	document.querySelector("#nature-notice").textContent = page.natureNotice;
	document.querySelector("#updates-text").textContent = page.updates;
	const natureSources = document.querySelector("#nature-source");
	natureSources.append(document.createTextNode("Quellen: "));
	for (const source of page.natureSources) {
		const link = element("a", "", source.name);
		link.href = source.url;
		link.target = "_blank";
		link.rel = "noreferrer";
		natureSources.append(link);
		if (source !== page.natureSources.at(-1)) natureSources.append(document.createTextNode(" · "));
	}
	document.querySelector("#footer-text").append(
		document.createTextNode(`${page.footer} `)
	);
	const footer = document.querySelector("#footer-text");
	const visitLink = element("a", "", "Besuchsinformationen");
	visitLink.href = "#besuch";
	const routesLink = element("a", "", "Routenangaben");
	routesLink.href = "#wege";
	footer.append(visitLink, document.createTextNode(" und "), routesLink, document.createTextNode("."));
}

async function loadContent() {
	try {
		const response = await fetch("data/koenigsforst.json");
		if (!response.ok) throw new Error(`Fakten konnten nicht geladen werden: HTTP ${response.status}`);
		const data = await response.json();
		renderPageText(data.page);
		renderFeatured(data.featured);
		renderInfoCards("#besuch-grid", data.visit);
		renderInfoCards("#aktivitaeten-grid", data.activities);
		renderRoutes(data.routes);
		renderCompactList("#tierliste", data.animals);
		renderCompactList("#pflanzenliste", data.plants);
		renderDestinations(data.destinations);
	} catch (error) {
		console.error(error);
		errorMessage.hidden = false;
	}
}

loadContent();
