# Elzion homepage: changes in this version

## Sections
- Removed from the homepage: "We Make Building Your Product Simple" (Simple), "The Smarter Way to Build Software" (Compare), and "Why Trust Us with Your Product?" (Trust).
- "Meet Elzion": the heading, paragraph and chips are removed. The Discover → Grow process timeline stays where it was, under a new title: **OUR PROCESS / From Idea to Launch, Step by Step.**
- The component files themselves are unchanged and not deleted. Only `src/pages/Home.jsx` stopped rendering them.

## Motion layer (homepage only)
- New files: `src/motion/motion.js` and `src/motion/motion.css`. Both are loaded from `src/main.jsx`, which starts the motion only when the path is `/`.
- Effects:
  - intro curtain
  - smooth (inertia) wheel scrolling
  - scroll progress bar
  - headings reveal word by word (mirrored when you scroll back up)
  - scrambling eyebrow labels
  - read-along paragraphs
  - hero cards spread out on scroll
  - hero letters dodge the cursor
  - hero card focus blur
  - dark cards open like a window, with a cursor spotlight
  - process timeline bars draw in with a moving WEEK marker
  - marquees speed up with scroll and reverse on scroll-up
  - Work cards rise in 3D and tilt
  - green ink transition for long in-page jumps
  - footer wordmark letters rise and follow the mouse
  - contact form typing effects (flying letters, fill lines, ✓ badges, signal meter, send burst)
- Mouse-only effects run on mouse/trackpad devices only. Phones keep native scrolling.
- If "reduce motion" is turned on, all of it is switched off.

## Footer (new design)
- Files: `src/components/home/Footer.jsx` (rewritten) and `src/styles/footer.css` (new).
- Layout, top to bottom:
  - two crossing tapes with scrolling text
  - "Got an idea? Let's make it real." headline, next to a spinning "Start a project" badge
  - four columns: About, Navigation, Services, Socials
  - a legal row with a "Back to top" button
- Wordmark: on the homepage the motion layer draws "elzion." from a few thousand particles.
  - Scrolling down pulls them together; scrolling back up scatters them.
  - The cursor or a finger pushes them aside, and a click or tap blasts them out.
  - Tilting a phone makes them slide.
- The Footer component is shared, so project pages get the new design too. On those pages the wordmark is static (no particles), because the motion layer only runs on the homepage.

## Mobile layer (phones & touch devices)
- Phone tilt: the hero carousel, the Work cards, the timeline cards and the footer particles all react to how the phone is tilted. iPhone asks for permission on the first tap.
- Hero cards become an auto-playing 3D coverflow carousel (820px and below) with dots. Swipe to spin it.
- Process timeline steps and Work cards become sticky stacks. Each card that gets covered shrinks and darkens.
- Touch feedback: a green ripple appears wherever you tap. Buttons squish and spring back, with a tiny vibration on Android.
- A floating "Let's talk" pill shows after the hero, with a scroll-progress ring. It hides when Contact or the footer is on screen.
- Desktop is unchanged.

## Responsive
- New file: `src/styles/responsive-final.css`, loaded last. It covers:
  - small phones (320–380px)
  - the timeline note on mobile
  - a 2-column "How we work together" board on tablets (600–1023px)
  - wider content on screens of 1800px and up
- `src/components/ui/how-it-works.css`: the scattered pinned-card layout now starts at 1024px (was 768px), where it has room.
- Checked at 320, 375, 414, 600, 768, 900, 1024, 1280, 1440, 1920 and 2560px. No horizontal overflow.

## Build
- `frontend/dist` already contains these changes and can be deployed as is.
- For a clean build from source: `cd frontend && npm install && npm run build`.
