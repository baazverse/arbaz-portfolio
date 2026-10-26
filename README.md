# Arbaz Hasan — Video Editing Portfolio

Zero-dependency static site (HTML, CSS, JavaScript). No build step, so it deploys as-is.

## Run locally
`python3 -m http.server 8000` in this folder, then open http://localhost:8000 (needed because the site uses ES modules).

## Deploy
- **Netlify:** drag this folder onto app.netlify.com/drop, or connect the repo (publish directory `.`, no build command).
- **Vercel:** import the repo, framework "Other", no build command.
- **Custom domain:** add it in the Netlify/Vercel dashboard, then replace `YOUR-DOMAIN` in `index.html` (canonical, og:image), `robots.txt` and `sitemap.xml`.

## Change text and contact details
- Email, WhatsApp, LinkedIn, availability label (`showAvailability`), testimonials switch: top of `projects.js`.
- Section copy: `index.html`.

## Add, replace or publish a video
1. Compress to H.264 MP4 (`ffmpeg -i in.mp4 -vf scale=1280:-2 -crf 28 -movflags +faststart out.mp4`; use width 540 for vertical).
2. Put it in `videos/` and a poster frame (WebP) in `videos/posters/`.
3. Add or edit an object in `PROJECTS` in `projects.js`. `published: false` hides it. `featured: true` puts it first, full width. `beforeSrc` adds a Before/After switch. `aspectRatio` accepts "16:9", "9:16", "1:1".
4. Videos use `preload="none"` and only load when opened.

## Contact form
No backend is configured, so after validation the form opens WhatsApp with the message prefilled (nothing is stored). To receive enquiries by form, create a Formspree endpoint and paste its URL into `formEndpoint` in `projects.js`.

## Testimonials
Leave `showTestimonials: false` until you have real ones with permission to publish.
