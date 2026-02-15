# janicequach.com

personal site. clean, minimal, fast. squarespace replacement.

## preview locally

```bash
python -m http.server 8000
# visit http://localhost:8000
```

## what's in it

- lowercase casual tone (matches your voice)
- your actual principles from ~/space/human/principles.md
- leadership philosophy from manifesto
- current focus (clickview, ai, team building)
- mobile responsive
- zero dependencies, loads in <100ms

## deploy

fastest: **netlify drop**
1. drag `index.html` to netlify.com/drop
2. get instant URL
3. connect custom domain (janicequach.com) in settings

alternative: **github pages**
```bash
gh repo create janice-quach.github.io --public
git remote add origin git@github.com:janice-quach/janice-quach.github.io.git
git add index.html README.md
git commit -m "init: personal site"
git push -u origin main
# auto-publishes to janice-quach.github.io
```

## customize

all content in `index.html`:
- L163-167: tagline + intro
- L172-181: principles (currently from your actual principles.md)
- L186-196: how you work (from manifesto)
- L201-207: current focus
- L213-215: contact links (update email to real address)

## next steps

- [ ] update email address (L214: hello@janicequach.com)
- [ ] add linkedin URL (L215)
- [ ] optional: add photo/avatar
- [ ] optional: add case studies section
- [ ] optional: analytics (plausible.io or simple-analytics)
- [ ] deploy to netlify or github pages
- [ ] point janicequach.com domain to deployment

## why this over squarespace

- loads 10x faster (no bloat)
- full control over content
- version controlled (git)
- free hosting (netlify/github)
- embodies your principles (structure creates speed, clarity over cleverness)
