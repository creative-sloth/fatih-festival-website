# PROJECT HANDOFF — SCHOOL FESTIVAL WEBSITE
Version: 1.0
Prepared: 3 November 2026
Purpose: Handoff from ChatGPT planning to Claude Opus for continued discovery, design, implementation, and launch.

---

## 1. PROJECT OVERVIEW

We are planning a polished, interactive, bilingual website for a school-hosted festival featuring 1–10 competitions. The primary audience is students from external schools, along with the teachers, parents, and school representatives who may help them understand the event and register.

The website's primary purpose is to make reliable festival and competition information easy to discover, understand, and act on. Visitors must be able to explore competitions, understand eligibility and requirements, access official technical guidelines (*juknis*), view dates and event schedules, contact the committee, and follow a link to the correct Google Form for registration.

This should feel like a thoughtfully art-directed festival experience—not a generic school website or a plain list of links. It should be energetic and engaging for children and teenagers while remaining professional, trustworthy, accessible, and easy to use.

**Important:** The official festival theme and branding have not yet been supplied. Do not finalize colors, typography, illustration style, imagery, or thematic metaphors until the user shares those materials.

## 2. CONFIRMED REQUIREMENTS

- Festival name: Not decided / not supplied yet.
- Number of competitions: 1–10.
- Audience: External schools only.
- Website languages: Indonesian and English.
- Platform: Open to recommendations.
- Visual direction: To be determined by the official festival theme, which will be supplied separately.
- Primary objective: Inform visitors and help prospective participants register correctly.
- Competition registration: Each competition should link to its relevant Google Form.
- Information to include:
  - Festival overview and general information
  - Competition list and descriptions
  - Technical guidelines / juknis
  - Rundown / event schedule
  - Timeline and key dates
  - Registration links and requirements
  - Contact persons / committee contacts
  - FAQ and other essential visitor information
- Desired experience: High-quality UI/UX, visually interesting, interactive, responsive, and professional.
- User wants to brainstorm and define the project before implementation, rather than rushing directly into code.
- User will continue the project with Claude Opus.

## 3. DESIGN GOAL AND CREATIVE PRINCIPLE

Aim for a **professional festival website with a playful interactive layer**.

The experience should combine:
1. Excitement: a distinctive identity, engaging visual storytelling, and purposeful motion.
2. Clarity: visitors quickly understand what is offered, who can participate, when things happen, and how to register.
3. Trust: accurate official information, consistent school/event branding, readable content, and working links.
4. Usability: mobile-first layouts, accessible controls, fast loading, clear navigation, and a dependable registration journey.

Avoid making the site look childish. The audience includes children and teenagers, and the site should feel contemporary and polished.

Do not add interaction solely for decoration. Every animation, filter, or effect should either support the festival's story or help users navigate information.

## 4. DESIGN RESEARCH ALREADY DISCUSSED

These were suggested as references to study for inspiration, not as templates to copy. Recheck the live sites and evaluate the current experience before drawing conclusions; some references may have changed.

### A. Awwwards Conference Amsterdam / NK Studio
Reference: https://www.nk.studio/work/awwwards-conf-amsterdam
Potential lessons: immersive opening section, confident art direction, motion used to create atmosphere, strong visual identity.

### B. SXSW
Reference: https://www.sxsw.com/
Potential lessons: large program organization, category navigation, clear calls to action, handling multiple activities without overwhelming visitors.

### C. SITEFEST / Primakara
Reference: https://sitefest.primakara.ac.id/competition/006
Potential lessons: competition-specific information, Indonesian educational-event context, rules and registration details.

### D. WHOLE Festival 2024 / Nicola Napoli
Reference: https://www.nicolanapoli.com/projects/whole-2024/
Potential lessons: playful visual storytelling, a cohesive festival world, thematic visual elements and progression.

### E. The New Yorker Festival
Reference: https://festival.newyorker.com/
Potential lessons: editorial hierarchy, controlled typography, professional presentation of official event information.

Use these references as research inputs, not proof that any one site's current UI or UX is ideal. Look for additional high-quality festival, youth event, university competition, and conference sites. Explain what is worth borrowing and why. Do not copy brand assets, layouts, illustrations, or code.

## 5. RECOMMENDED INFORMATION ARCHITECTURE

Keep the main navigation compact. Proposed destinations:

1. **Home**
   - Hero: festival name, tagline, date/location (when confirmed), visual identity, main CTA.
   - Brief festival overview.
   - Competition highlights.
   - “How to participate” steps.
   - Important timeline / key deadlines.
   - Confirmed prizes or festival highlights, if applicable.
   - Links to juknis and resources.
   - FAQs and contacts.
   - Footer with official school/event details and social links.

2. **Competitions**
   - Directory of all competitions.
   - Search/filter only if it genuinely helps; for 1–10 competitions, avoid unnecessary complexity.
   - Useful filters may include category, school level, individual/team, and registration status.
   - Each competition should have a dedicated detail page or clearly structured detail view.

3. **Schedule**
   - Registration opening and closing dates.
   - Technical meetings, preliminary/final rounds, event dates, and other confirmed milestones.
   - Event-day rundown, including times, activities, and venues where available.
   - Clearly distinguish the overall festival timeline from the event-day rundown.

4. **Guide & FAQ**
   - General participation rules.
   - Registration instructions.
   - Downloadable juknis / official guidelines.
   - Common questions.
   - Explain any registration fee, payment procedure, eligibility restrictions, required documents, and team rules only when confirmed by the organizers.

5. **Contact**
   - Official committee contact.
   - Competition-specific contact persons where relevant.
   - WhatsApp links, email, and official social channels when provided.
   - Never invent contact details.

A compact navigation may use Home, Competitions, Schedule, Guide & FAQ, Contact, a language toggle (`ID | EN`), and a clear Register/Explore CTA. On mobile, preserve access to the main actions.

## 6. COMPETITION DETAIL PAGE — REQUIRED CONTENT MODEL

Every competition should follow a consistent structure. Use only facts confirmed by the committee; show a clear “To be announced” state or omit a field when details are unknown.

Suggested fields:
- Competition name
- Short summary
- Category / discipline
- Eligible school levels or grades
- Individual or team participation
- Team size, if applicable
- Eligibility requirements
- Registration opening date and deadline
- Competition date and time
- Venue / format (onsite, online, or hybrid)
- Registration fee, if applicable
- Prize details, if confirmed
- Juknis download or official rules link
- Required documents / preparation notes
- Competition-specific contact person
- Registration status
- Google Form registration URL

Suggested visual structure:
- Competition title and short, engaging description
- Small, readable information chips (category, eligible level, individual/team, status)
- Key dates and requirements
- Prominent juknis button
- Clear registration CTA
- Contact/help option
- Related schedule or FAQ links, if useful

Registration statuses could include “Coming soon,” “Open,” “Closing soon,” “Closed,” or “Cancelled,” but these must be based on confirmed dates/status and defined rules. Do not use a countdown or status that implies registration is open unless the data supports it. If the registration form is missing, do not render an active registration button.

## 7. BILINGUAL EXPERIENCE

The website must support Indonesian and English.

Recommendations:
- Put a clearly visible language toggle in the global navigation.
- Preserve the current page when switching languages whenever practical.
- Translate all important UI labels, instructions, validation/status text, FAQs, and core content—not just the homepage.
- Keep competition names, official document titles, and proper nouns accurate. If a juknis exists only in Indonesian, state that clearly on the English page rather than implying a translated document exists.
- Ensure both language versions have equivalent information and working links.
- Use appropriate Indonesian and English wording, not overly literal machine translation.
- Decide URL and content architecture early. Options include language-prefixed routes (`/id/...`, `/en/...`) or a simpler language state, depending on the chosen stack and scope.

## 8. INTERACTION PRIORITIES

### Priority 1 — Essential UX
- Clear navigation and obvious primary CTA.
- Searchable/filterable competition directory if needed.
- Consistent competition cards.
- Correct external Google Form links.
- Accessible juknis downloads.
- Timeline/rundown that works on mobile.
- Working bilingual toggle.
- Useful contact links.
- Clear registration states.
- Fast, responsive layouts.

### Priority 2 — Useful enhancements
- Interactive timeline: select a milestone to view details.
- Competition cards that reveal more information on click/tap.
- A “My shortlist” feature for saving interesting competitions locally in the browser, only if useful and feasible.
- Competition comparison for key factors such as school level, individual/team, date, and fee—only if these differences matter to visitors.

### Priority 3 — Thematic delight
- Subtle hover states and transitions.
- Scroll reveals used sparingly.
- Themed illustrations or small animated details.
- An interactive festival map or themed “discovery” experience, if the official theme naturally supports it.
- Countdown only when a real confirmed date makes it useful.

Important interaction/accessibility rules:
- Never rely on hover alone; support touch and keyboard.
- Honor reduced-motion preferences.
- Do not block access to information behind a long intro animation.
- Avoid heavy parallax or large videos that slow down mobile devices.
- Keep contrast, focus states, keyboard navigation, semantic headings, and tap targets accessible.
- Avoid fake participant counts, fake scarcity, fake testimonials, or invented prizes.

## 9. PLATFORM / TECHNICAL DIRECTION

The platform is not yet decided. Compare options against the real needs, not just visual appeal.

### Option A: Custom-coded website — provisional recommendation
Likely best if the user wants a distinct visual identity, custom interactions, a proper bilingual experience, and AI-assisted development.

Potential stack to evaluate:
- React-based framework such as Next.js, or a simpler lightweight alternative if the scope does not justify a larger framework.
- TypeScript if it improves maintainability for the selected stack.
- CSS modules, Tailwind, or another coherent styling system; do not add libraries without a reason.
- Static deployment on Vercel or Netlify, depending on the selected framework and project needs.
- Competition data stored in a structured content file or simple content source, separate from layout components.
- Google Forms for registration; no custom backend/account system required unless future requirements justify it.

Do not assume this stack is mandatory. Make a recommendation based on ease of maintenance, user skill, hosting cost, bilingual support, and project requirements.

### Option B: Google Sites
Suitable for very low-maintenance, mostly informational sites with straightforward links and limited custom behavior. Less suitable if the official theme demands a highly distinctive experience or custom interactions.

### Option C: Framer
Suitable for visual-first design and polished animation with a visual editing workflow. Consider ongoing editing, bilingual content management, plan limits, and complex competition detail structures before selecting it.

### General technical requirements
- Responsive/mobile-first.
- Good performance and optimized assets.
- Secure HTTPS hosting.
- Semantic HTML and accessibility.
- SEO basics: useful page titles, descriptions, social preview metadata, and a clear site identity.
- Correct link behavior and useful error/empty states.
- No custom registration database unless the project requirements change.
- Keep content separate from presentation so committee updates are easy.
- Provide a simple maintenance guide for the person who will update the site.
- No live external API integrations are required for the initial version.

## 10. REGISTRATION, DOCUMENTS, AND DATA ACCURACY

Google Forms will be the external registration destination for each competition.

Rules:
- Each competition must link to the correct, verified form.
- Test every form link on mobile and desktop before launch.
- Make it clear that registration opens an external Google Form.
- Do not collect or store personal data on the website unless necessary and explicitly approved.
- If a form is not ready, label registration as coming soon or omit the active CTA.
- Show deadlines with unambiguous dates, and consider the relevant local timezone if times are displayed.
- Juknis links must point to the correct official document and be accessible to the intended audience.
- Verify Google Drive sharing permissions; a link is not useful if visitors cannot open it.
- Provide a visible fallback/contact path if a form or document fails.
- Never fabricate fees, eligibility, schedule, awards, contact details, venues, registration status, or competition rules.
- Treat official organizer-provided documents as the source of truth. If information conflicts, flag it for confirmation instead of silently choosing one version.

## 11. CONTENT AND ASSETS TO COLLECT

The user has not yet supplied the festival theme or operational details. Request the following in stages, not all at once.

### First: creative assets
- Official festival theme or theme description
- Festival logo / school logo
- Poster or other branding materials
- Official colors or brand guidelines, if they exist
- Reference images the committee likes or dislikes

### Next: event basics
- Official festival name and acronym
- Host school name
- Festival purpose / short description
- Event date(s)
- Venue / location
- Target grade/age levels
- Whether participation is onsite, online, or hybrid
- Official social media and website/domain availability

### Competition information (repeat for each competition)
- Name and short description
- Category
- Eligible grades/school levels
- Individual or team; team size
- Registration opening/closing dates
- Competition date/time and venue
- Fee/payment rules, if any
- Juknis link/file
- Google Form link
- Contact person and approved contact details
- Confirmed prizes, if applicable
- Any special requirements

### General event information
- Overall timeline
- Event-day rundown
- General participation rules
- FAQ answers
- Contact persons and official channels
- Privacy notice or terms if the organizers require them

Do not delay all design work until every detail is known. Start with the official theme, then develop a flexible design system and use clearly marked placeholders for missing content.

## 12. RECOMMENDED WORKFLOW FOR CLAUDE OPUS

Work in stages and ask for confirmation at key decision points. Do not generate the entire site before the theme and content structure have been considered.

### Phase 1 — Discovery and design research
1. Restate confirmed requirements and unknowns.
2. Review the supplied theme/branding assets when available.
3. Research a small set of high-quality, relevant reference websites. Check current pages rather than relying on remembered screenshots.
4. For each reference, identify specific patterns worth adapting: navigation, information hierarchy, competition listing, animation, mobile design, or registration flow.
5. Present a concise moodboard direction and explain why it fits the audience.
6. Compare technical platform choices and recommend one based on the user's needs.

**Deliverables:** research notes, creative direction, platform recommendation, and list of open questions.

### Phase 2 — Content model and information architecture
1. Confirm sitemap and navigation.
2. Define the competition data schema.
3. Define bilingual content approach.
4. Map the registration journey and edge cases.
5. Identify required assets and missing information.

**Deliverables:** sitemap, visitor journeys, content checklist, competition data template, and bilingual strategy.

### Phase 3 — Wireframes and visual system
1. Create homepage wireframe.
2. Create competition directory and competition detail wireframes.
3. Create schedule, guide/FAQ, and contact layouts.
4. Define typography, spacing, buttons, cards, colors, and motion based on the supplied theme.
5. Review mobile and desktop layouts.

**Deliverables:** wireframes or working prototype, visual design system, and interaction specifications.

### Phase 4 — Implementation
1. Set up a maintainable project structure.
2. Implement responsive global navigation and footer.
3. Implement bilingual content and language switching.
4. Implement homepage and competition directory/detail pages.
5. Add schedule, guidelines, FAQ, and contact sections.
6. Add verified Google Forms and document links.
7. Add animations and thematic interactions after the core experience works.
8. Keep data, UI, and assets organized and easy to update.

**Deliverables:** functioning website source, local run instructions, configuration notes, and deployment instructions.

### Phase 5 — QA and launch
Test:
- Mobile, tablet, and desktop breakpoints.
- Indonesian and English on every page.
- All competition links, forms, and documents.
- Registration statuses and deadline edge cases.
- Keyboard navigation, focus states, contrast, and reduced motion.
- Broken links and empty/missing content.
- Performance and image loading.
- Browser console errors and build/deployment failures.
- Page titles, descriptions, and social previews.
- A committee review of all factual content.

**Deliverables:** QA checklist, issue list with severity, launch checklist, and handover instructions.

## 13. SUGGESTED PROJECT STRUCTURE (IF CUSTOM-CODED)

Adapt to the chosen framework; this is a conceptual organization, not a rigid requirement.

- `app/` or `src/` — routes/pages and application entry points
- `components/` — shared navigation, footer, buttons, cards, language switcher
- `content/` or `data/` — competition information, schedule, FAQs, contact details
- `messages/` or `locales/` — Indonesian and English UI translations
- `public/assets/` — approved logos, illustrations, icons, and optimized images
- `styles/` — global styles and design tokens
- `docs/` — setup, content-update, deployment, and maintenance guides

Avoid scattering competition facts throughout components. A single source of truth makes updates safer.

## 14. ACCEPTANCE CRITERIA

The first production-ready version is complete when:

1. Visitors understand the festival quickly from the homepage.
2. Every confirmed competition can be found and its essential details are clear.
3. Every published registration CTA opens the correct, verified Google Form.
4. Every published juknis link opens the correct official document with suitable access permissions.
5. Dates, deadlines, venue, and contact information match committee-approved information.
6. Indonesian and English versions are consistent and usable.
7. The site works on common mobile and desktop sizes.
8. Main navigation and essential interactions work by keyboard, touch, and pointer.
9. Animations do not obstruct information or create unnecessary delays.
10. No important information is invented or hidden in decorative UI.
11. The site has acceptable performance and no blocking errors.
12. The committee can update core content using the documented workflow.

## 15. KNOWN UNKNOWNS — DO NOT ASSUME

- Festival name and acronym.
- Official festival theme, visual identity, and logo.
- Event date(s), venue, and host-school details.
- Names and types of competitions.
- Competition-specific rules, eligibility, fees, and prizes.
- Registration opening/closing dates.
- Google Forms and juknis links.
- Contact persons and official contact channels.
- Final platform and hosting arrangement.
- Domain name and budget.
- Whether an organizer wants a CMS or needs to update content without touching code.

When a detail is missing, ask the user or use a clearly labeled placeholder. Do not make up realistic-looking event facts, URLs, contact details, or registration links.

## 16. FIRST MESSAGE / NEXT ACTION FOR CLAUDE OPUS

Start by acknowledging the handoff and summarizing the confirmed brief in a few bullets. Do not start coding immediately.

The best next action is to ask the user to upload the official festival theme, poster, logo, or a written theme description. If the theme is not finalized, offer to develop a few distinct creative directions based on any available context.

After the theme is supplied:
1. Analyze the materials and extract visual cues.
2. Suggest 2–3 distinct design directions that still fit the official identity.
3. Research and critique relevant live website references.
4. Recommend one direction and explain the trade-offs.
5. Propose a homepage wireframe and competition detail-page wireframe.
6. Then confirm platform and implementation details before building.

Use plain language and explain technical choices clearly. The user wants to collaborate on the project and make informed decisions; do not overwhelm them with a long list of questions at once.

---

## SHORT PROJECT SUMMARY

Build a bilingual (Indonesian/English), mobile-first, visually distinctive school festival website for external-school participants, featuring 1–10 competitions. Its central job is to help visitors discover competitions, understand rules and dates, access juknis, find contacts, and register via verified Google Forms. The user values polished UI/UX, interactivity, professionalism, and a theme-led visual identity. The official theme has not yet been provided. Research, plan, wireframe, and agree on the direction before coding. Never invent event details or registration links.
