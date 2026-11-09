# AGENTS.md — Rules for the AI Assistant

This file tells the AI coding assistant HOW to build and maintain this project.

WHAT to build is defined in `SPEC.md`.
WHAT IS TRUE about the Königsforst is defined in `data/`.

## Stack

- Use plain HTML, CSS, and vanilla JavaScript.
- No frameworks, no build step, and no npm packages.
- Use one `index.html`, one `style.css`, and one `app.js`.
- Store content and factual information in `data/*.json`.
- The website must work when hosted on GitHub Pages.
- No external fonts, CDNs, or tracking.

## Content

- Never invent facts about the Königsforst.
- All factual information must come from files in `data/`.
- If information is missing, null, or unconfirmed, display "Noch nicht bestätigt".
- Do not invent opening hours, route lengths, attractions, animal sightings, rules, or facilities.
- The website language is German.
- Use clear, natural, visitor-friendly language.
- Follow the questions and information architecture defined in `SPEC.md`.

## Design — The Grey Rule

- Use system fonts only.
- Use only black, white, and shades of grey.
- No colors outside the grey palette.
- No decorative icons.
- No animations.
- Follow the visual direction and layout defined in `SPEC.md`.
- Mobile first: design for a 360 px wide smartphone.
- Ensure the layout also works on laptop screens between 1366 px and 1440 px.
- Use readable typography, clear visual hierarchy, and sufficient spacing.
- Interactive elements must have touch targets of at least 44 × 44 px.

## Accessibility

- Follow WCAG 2.2 Level AA as the accessibility target.
- Use semantic HTML.
- Set `lang="de"` on the HTML element.
- Provide meaningful headings and accessible navigation.
- Ensure full keyboard navigation and visible focus states.
- Maintain sufficient contrast.
- Provide accessible alternatives for interactive maps.
- Use descriptive alt text for meaningful images, if images are permitted by the design rules.
- Do not rely on color alone to communicate information.
- Respect reduced-motion preferences if motion is introduced in a future approved change.

## Code Quality

- Keep files small, readable, and well structured.
- Use semantic HTML elements such as `header`, `main`, `section`, and `footer`.
- Use buttons for actions and links for navigation.
- Use labels for form inputs.
- Add short comments in English where necessary.
- Avoid unnecessary complexity and duplicated code.

## How You Work With Me

- Before writing code, explain your plan in a few bullet points.
- After each change, explain in two sentences what you changed and why.
- Change only what I explicitly asked for.
- Do not redesign or restructure unrelated parts of the website.
- If a request conflicts with this file or `SPEC.md`, explain the conflict and ask before proceeding.
- Explain technical decisions in simple language so I can understand them as a design student.

