#!/usr/bin/env bash
# Construit la séquence d'images du récit au scroll, prête pour le navigateur.
#   1. génère les images sources (placeholder vectoriel — voir make-story-frames.mjs)
#   2. rastérise en PNG
#   3. encode en WebP dans public/story/
#   4. écrit le manifeste lu par ScrollStory.vue
#
# Quand les plans Higgsfield seront disponibles, remplacer les étapes 1-2 par :
#   ffmpeg -i plan.mp4 -an -vf "fps=18,scale=1280:-2" -c:v libwebp -quality 78 \
#          -start_number 0 public/story/frame-%04d.webp
# puis regénérer le manifeste avec les vrais compteurs.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD="${1:-/tmp/iconlabs-story-build}"
DEST="$ROOT/public/story"

node "$ROOT/tools/make-story-frames.mjs" "$BUILD"

mkdir -p "$BUILD/png"
for f in "$BUILD"/svg/frame-*.svg; do
  rsvg-convert -w 1280 -h 720 "$f" -o "$BUILD/png/$(basename "${f%.svg}").png"
done

rm -rf "$DEST"; mkdir -p "$DEST"
# -start_number 0 des deux côtés : le multiplexeur image2 numérote sa sortie à
# partir de 1 par défaut, ce qui décalerait toute la séquence d'un cran par
# rapport aux index du plan de rythme (content/story-pacing.ts).
ffmpeg -loglevel error -y -start_number 0 -i "$BUILD/png/frame-%04d.png" \
  -c:v libwebp -quality 78 -preset picture -start_number 0 "$DEST/frame-%04d.webp"

# Affiche de secours : la toute première image, en JPEG léger.
magick "$BUILD/png/frame-0000.png" -quality 82 "$DEST/poster.jpg"

node -e '
const fs = require("fs"), path = require("path");
const dest = process.argv[1], build = process.argv[2];
const beats = JSON.parse(fs.readFileSync(path.join(build, "beats.json"), "utf8"));
const files = fs.readdirSync(dest).filter(f => /^frame-\d{4}\.webp$/.test(f)).sort();
if (files.length !== beats.count) throw new Error(`attendu ${beats.count} images, trouvé ${files.length}`);
// Les index comptent autant que le nombre : le plan de rythme adresse 0..count-1.
const pad = n => `frame-${String(n).padStart(4, "0")}.webp`;
for (const n of [0, beats.count - 1]) {
  if (!files.includes(pad(n))) throw new Error(`image manquante : ${pad(n)} (séquence décalée ?)`);
}
const bytes = files.reduce((n, f) => n + fs.statSync(path.join(dest, f)).size, 0);
fs.writeFileSync(path.join(dest, "manifest.json"), JSON.stringify({
  pattern: "/story/frame-%04d.webp",
  count: beats.count,
  width: beats.width,
  height: beats.height,
  poster: "/story/poster.jpg",
  totalBytes: bytes,
  beats: beats.beats,
  source: "placeholder-vector",
  generatedAt: new Date().toISOString().slice(0, 10),
}, null, 2));
console.log(`manifeste écrit — ${files.length} images, ${(bytes / 1024 / 1024).toFixed(2)} Mo au total`);
' "$DEST" "$BUILD"
