# Image prompt: comic characters for the 17 competition cards

**Version:** 2.2.0 (7 Nov 2026)
**Use with:** ChatGPT (image generation) or Gemini. Paste section 2 first, then one competition from section 4 per image.
**Direction (decided 7 Nov 2026):** retro pop-art comic characters, one student per competition, shown large as the card's main picture. The v2.0 pilot (Mewarnai, Vokal Solo, English Debate) was approved as the right look; v2.1 asks for more punch, more varied poses and expressions, and a clearer TK child.
**Not for:** the title lettering or the logos.

---

## 1. How to run it (in this order)

1. **One image per message, one character per image is the best quality.** If your image generations are limited, use sheet mode (section 7) instead. (The v2.0 pilot came back as one sheet and the debater was cut off at the bottom.)
2. **Re-run the three pilot subjects first** with this version: Vokal Solo (SMP), English Debate, Lomba Mewarnai. Check them against section 3.
3. **Stay in one chat.** After the pilot, attach the single best result and say: "Copy only its line work, halftone and colour treatment. Ignore its clothes, face and pose." Then continue with the rest in the same conversation.
4. **Save each result** as `slug.png` (names in section 4). Send the files to the website agent.
5. **Ask the school once** about the points under "Check with the school" before generating all 17.

### Check with the school (one message)
- Uniform colours by level (the prompt assumes SD red and white, SMP blue and white, SMA grey and white). The prompt puts the level colour on the tie, vest, pinafore or trousers, and keeps headscarves plain white.
- Dress for girls (long sleeves, long skirt, headscarf for most girls) and for sports kit.
- TK has no standard uniform; the prompt uses a bright smock.

## 2. Master block (paste first in every new chat)

```
You are illustrating one character for a school festival website in Banda Aceh, Indonesia. The festival is "issue #3 of a comic book".
Draw exactly ONE image containing exactly ONE student (two only if the subject says so), waist-up, in a square 1024 x 1024 canvas. Never a sheet, never a collage, never several separate pictures.

STYLE (follow exactly):
- Bold retro pop-art comic cover illustration, like a 1960s American print comic (Lichtenstein-style).
- HEAVY black outline, thick and confident (about 4 to 5 percent of the image width), slightly thicker on the outer silhouette than on inner details.
- Flat, saturated colour fills with strong contrast. Shadows are built from clearly visible coarse Ben-Day halftone dots (dot size about 1 percent of the image width), not a faint texture.
- NOT manga, NOT anime, NOT chibi, NOT a textbook or clip-art look. Natural proportions, friendly simplified face: dot or short-line eyes with a highlight, small nose, a very expressive mouth and eyebrows. No oversized sparkly eyes.
- No gradients, no glow, no soft shadows, no 3D rendering, no painterly or photographic texture.
- The face is large: the head fills at least a third of the image height, so the expression still reads when the image is shrunk to 150 pixels.
- DYNAMIC POSE: show real movement and a strong gesture, with a clear diagonal in the body and a tilted head or shoulders (about 8 to 12 degrees). Not a calm front-on pose.
- A few bold comic action marks around the figure (2 to 4 yellow triangle bursts or short action lines, small four-point sparkles). No more.
- Friendly, confident, never babyish (except the TK child) and never sexualised.
- Each character must have a clearly DIFFERENT face, hair, expression and pose from every other one in the set. Do not reuse the same smile.

DRESS (important, follow exactly):
- Modest, school-appropriate clothing for every character: shirt with sleeves to at least the elbow (long sleeves for girls), long skirt or long trousers (sports kit may have knee-length shorts and sleeves).
- Most girls wear a plain white school headscarf (jilbab/kerudung); a few may have visible hair. Boys may wear a black peci only if the subject says so.
- The level colour goes on the tie, vest, pinafore, trousers or jersey, not on the headscarf. Uniform colours by level: SD red and white, SMP blue and white, SMA grey and white.

PALETTE (use only these plus natural skin and hair tones):
black ink #111014, white #ffffff, sun yellow #ffe347 and #ffb300, orange #ff6a1a, red #e3261c, teal #5fd4c6, blue #1f6fd6, grey #8a8d98, green #178a47, magenta #b0129b.

DO NOT DRAW: any text, letters or numbers (except the single block letter "A" if the subject asks), any national flag, any logo, any watermark, any other person unless the subject says so.

BACKGROUND: plain flat solid magenta #FF00FF everywhere outside the character: no gradient, no ground shadow, no floor, no comic frame, no black border, no cream or paper margin around the picture. The magenta runs right to every edge of the canvas. Do not use magenta inside the character. It will be removed afterwards.

FRAMING: the whole character and every prop (podium, ball, book, buzzer) must be completely inside the canvas. Leave about 12 percent empty margin on every side including the bottom, so the image can be cropped to a head-and-shoulders view on phones. Never cut the figure or a prop at the canvas edge.

OUTPUT: one PNG, square, 1024 x 1024.
```

## 3. Check each result before accepting

- [ ] One image, one character (two only where the subject says so), waist-up, centred, nothing cut at any edge.
- [ ] Heavy black outline and clearly visible halftone dots. Reads like a comic cover, not a textbook.
- [ ] Not manga or anime.
- [ ] Dynamic pose and tilt.
- [ ] A face and expression clearly different from the other images in the set.
- [ ] Modest dress as specified. Level colour on tie, vest, pinafore, trousers or jersey; headscarf plain white.
- [ ] Flat magenta background to every edge: no frame, no border, no paper margin, no ground shadow, no gradient, no checkerboard drawn in.
- [ ] No text, no flag.
- [ ] Face is large and the expression is clear when shrunk to a thumbnail.
- [ ] Same outline weight, crisp digital finish and halftone look as the rest of the set (no grainy vintage-paper texture).
- [ ] Children have a full head of hair with a clear hairline and child proportions (no bald or baby look).

If one item fails, reply with that item only, for example: "Make the outline thicker. Keep everything else exactly the same."

## 4. The 17 subjects (one per message, after the master block)

Girls wear a plain white headscarf unless the subject says otherwise.

| File | Level | Subject (paste after the master block) |
|---|---|---|
| `tk-mewarnai.png` | TK | `Subject: a kindergarten child, clearly only about 5 years old: small body, big round head and cheeks, tiny hands. A girl with a FULL head of dark hair covering the whole top of her head, a clear fringe and hairline, and two small pigtails (no headscarf, not bald, not a baby), in a bright yellow smock. She holds up a fat red crayon in one fist and a big colourful drawing in the other, bouncing with joy, mouth wide open laughing, eyebrows high. Must look clearly younger than any SD student.` |
| `sd-bercerita.png` | SD red | `Subject: a boy, about 9 years old, in an SD uniform (white short-sleeved shirt, red tie, long red trousers), holding an open storybook high in one hand and flinging the other arm wide, leaning forward, grinning with a wide excited open mouth as he tells an exciting story, eyebrows raised (excited, not scared). Two small stars and an empty round speech bubble (no text) pop out of the book.` |
| `sd-tari-kreasi.png` | SD red | `Subject: two girls, about 10 years old, side by side in colourful traditional Indonesian dance costume with long sleeves, matching headscarves and sashes, in a graceful dance pose with arms swept up. The two girls must look clearly different: different heights, different faces and hair fringe, and different arm positions (one with both arms raised, the other with one arm raised and one bent). Calm proud smiles. Draw both girls, waist-up. Music notes around them.` |
| `sd-olimpiade-mipa.png` | SD red | `Subject: a girl, about 10 years old, in an SD uniform (white long-sleeved blouse, red pinafore vest, white headscarf), holding a gold medal on a ribbon high in one hand and a small science flask in the other, leaning back in amazed delight, eyes wide, mouth a big round "wow". A small pi symbol "π" floats nearby.` |
| `smp-olimpiade-mipa.png` | SMP blue | `Subject: a boy, about 13 years old, in an SMP uniform (white short-sleeved shirt, blue tie, long blue trousers), thrusting a gold trophy cup overhead with both hands, shouting in triumph with a wide toothy grin, body leaning into the pose. A small atom symbol floats nearby.` |
| `sd-vocal-solo.png` | SD red | `Subject: a boy, about 10 years old, in an SD uniform (white short-sleeved shirt, red tie), belting into a handheld microphone with eyes screwed shut, head thrown back, one fist punched in the air. Music notes and sound waves around him. Clearly different from any other singer in the set.` |
| `smp-vocal-solo.png` | SMP blue | `Subject: a girl, about 13 years old, in an SMP uniform (white long-sleeved blouse, blue vest, white headscarf), singing powerfully into a microphone on a stand, one hand pressed to her chest and the other flung out, head tilted, eyes shut, eyebrows lifted with feeling. Music notes around her.` |
| `sd-spelling-bee.png` | SD red | `Subject: a girl, about 10 years old, in an SD uniform (white long-sleeved blouse, red pinafore vest, white headscarf), holding up a square wooden letter block that shows only the letter "A" next to her cheek, smug proud grin with one eyebrow raised. A small friendly cartoon bee hovers beside her.` |
| `smp-baca-puisi.png` | SMP blue | `Subject: a boy, about 13 years old, in an SMP uniform (white short-sleeved shirt, blue tie, black peci), reading from an open poetry book held in one hand with the other hand pressed dramatically to his chest, eyes closed, head tilted back, deeply moved. A small heart floats above.` |
| `smp-basket.png` | SMP blue | `Subject: a boy, about 14 years old, in a blue basketball jersey with sleeves and knee-length shorts, dribbling a basketball low, leaning hard into the move, jaw set with fierce focus. Speed lines behind him. Waist-up, the ball fully in frame.` |
| `sd-futsal.png` | SD red | `Subject: a boy, about 11 years old, in a red futsal shirt with sleeves, swinging his leg to kick a soccer ball (the whole ball visible in frame), gritted teeth and a determined squint, body at a strong diagonal, speed lines. Waist-up.` |
| `sma-debate.png` | SMA grey | `Subject: a girl, about 16 years old, in an SMA uniform (white long-sleeved blouse, grey vest, white headscarf), standing behind a wooden podium (completely in frame) with a microphone, one index finger raised sharply making a point, eyebrows drawn together, mouth open mid-argument. Two empty speech bubbles (no text) on either side. No flag.` |
| `sma-essay.png` | SMA grey | `Subject: a boy, about 16 years old, in an SMA uniform (white short-sleeved shirt, grey tie), writing fast with a pen on a sheet of lined paper held on a clipboard, hunched forward, tongue slightly out, one eyebrow furrowed in concentration. A glowing lightbulb above his head.` |
| `sma-cerdas-cermat.png` | SMA grey | `Subject: a girl, about 16 years old, in an SMA uniform (white long-sleeved blouse, grey vest, white headscarf), slamming her palm down on a big round red quiz buzzer (completely in frame), mouth wide open shouting the answer, eyes blazing. A lightbulb and a "?" burst above her.` |
| `sma-culture-vlog.png` | SMA grey | `Subject: a girl, about 16 years old, in a white long-sleeved blouse with a white headscarf and a batik-pattern sash, filming herself with a smartphone held out on a selfie stick, tilting her head with a cheeky wink and a big grin. A play-button triangle floats beside her.` |
| `smp-sma-desain-grafis.png` | SMP blue + SMA grey | `Subject: two students side by side: an SMP boy in blue and white, and an SMA girl in a white headscarf and grey vest, both holding up a comic page of three panels together; the girl holds a drawing-tablet pen and grins, the boy points at the page, eyebrows up. Draw both. A "pow" burst shape (no letters).` |
| `smp-sma-stem-expo.png` | SMP blue + SMA grey | `Subject: two students side by side: an SMP girl in a white headscarf and blue vest holding a lab beaker with amazed wide eyes, and an SMA boy in grey and white holding a small friendly robot up with a proud grin. Draw both. A glowing lightbulb above them.` |

## 5. What the website agent does with the files

- Removes the magenta, resizes to about 400 px on the long side, saves as WebP in `public/assets/characters/`.
- Shows each character large in the card's art area, with a white sticker edge and offset shadow like the logos; crops to head and shoulders on the phone rows.
- Checks every card at phone, tablet and desktop width, and tells you which images to regenerate and why.

## 6. If the AI keeps getting it wrong

- **Several pictures in one image:** "Draw exactly one picture with exactly one character. Not a sheet, not a collage."
- **Figure or prop cut off at the edge:** "Shrink the whole picture so every part, including the prop, is inside with a clear margin on all four sides."
- **Looks flat or like a textbook:** "Thicker black outline. Bigger, clearly visible halftone dots. More contrast."
- **Draws manga or anime faces:** add "Lichtenstein-style 1960s American print comic, dot-and-line eyes, not manga."
- **Skirt or sleeves too short:** "Long sleeves to the wrist and a skirt or trousers to the ankle. Nothing above the knee."
- **Letters or a flag appear:** "No text, no letters, no flag anywhere. Leave any sign blank."
- **Same face again:** "Different face shape, hair and expression from the previous image."
- **Style drifts between images:** attach the best earlier image and say "Copy only its line work, halftone dots and colour treatment. Ignore its clothes, face and pose."
- **Checkerboard or gradient background:** repeat "plain flat solid magenta #FF00FF, nothing else".

---

## 7. Sheet mode (fewer images, for when generations are limited)

Three sheets cover all 17 characters (6 + 5 + 6). Each sheet is ONE landscape image (3 columns x 2 rows), so each character gets about 512 x 512 px, enough for the cards (they are shown at about 400 px). The website agent slices each sheet along the fixed grid, so the grid rules below matter.

**Trade-offs:** a sheet saves credits, but the AI is more likely to make faces look alike, let a figure touch a cell edge, or drop a detail. If one cell is wrong, regenerate that whole sheet with the one fix, or draw that single character on its own with section 2.

**Order:** paste the section 2 master block first (it still applies to every character), then paste the sheet block below, then the sheet's cell list.

### Sheet block (paste after the master block, before the cell list)

```
SHEET MODE (this overrides the 'one character' rule above): draw ONE landscape image, 1536 x 1024, divided by an INVISIBLE strict grid of 3 columns x 2 rows into 6 equal cells of 512 x 512. Put exactly one illustration in each cell, described in the list below (the cell marked 'two characters' holds two). Rules for the sheet:
- Every character and every prop is completely inside its own cell with about 10 percent empty margin on all four sides. Nothing touches, overlaps or crosses a cell edge. No two characters overlap.
- No panel borders, no frames, no dividing lines, no labels, no numbers, no captions, no ground shadows. The background is one continuous flat magenta #FF00FF across the whole sheet.
- All six are drawn in exactly the same style (heavy black outline, coarse visible halftone dots, flat saturated colour, same finish), at the same scale, each waist-up.
- All six look DIFFERENT: different face shape, hair, skin tone, expression and pose. Never repeat a face.
Cells, in reading order (left to right, top row then bottom row):
```

### Sheet 1 (TK and SD)

Files after slicing: `tk-mewarnai.png`, `sd-bercerita.png`, `sd-tari-kreasi.png`, `sd-olimpiade-mipa.png`, `sd-vocal-solo.png`, `sd-spelling-bee.png`.

```
Cell 1 (top-left): a kindergarten child, clearly only about 5 years old: small body, big round head and cheeks, tiny hands. A girl with a FULL head of dark hair covering the whole top of her head, a clear fringe and hairline, and two small pigtails (no headscarf, not bald, not a baby), in a bright yellow smock. She holds up a fat red crayon in one fist and a big colourful drawing in the other, bouncing with joy, mouth wide open laughing, eyebrows high. Must look clearly younger than any SD student.
Cell 2 (top-middle): a boy, about 9 years old, in an SD uniform (white short-sleeved shirt, red tie, long red trousers), holding an open storybook high in one hand and flinging the other arm wide, leaning forward, grinning with a wide excited open mouth as he tells an exciting story, eyebrows raised (excited, not scared). Two small stars and an empty round speech bubble (no text) pop out of the book.
Cell 3 (top-right): two girls, about 10 years old, side by side in colourful traditional Indonesian dance costume with long sleeves, matching headscarves and sashes, in a graceful dance pose with arms swept up. The two girls must look clearly different: different heights, different faces and hair fringe, and different arm positions (one with both arms raised, the other with one arm raised and one bent). Calm proud smiles. Draw both girls, waist-up. Music notes around them.
Cell 4 (bottom-left): a girl, about 10 years old, in an SD uniform (white long-sleeved blouse, red pinafore vest, white headscarf), holding a gold medal on a ribbon high in one hand and a small science flask in the other, leaning back in amazed delight, eyes wide, mouth a big round "wow". A small pi symbol "π" floats nearby.
Cell 5 (bottom-middle): a boy, about 10 years old, in an SD uniform (white short-sleeved shirt, red tie), belting into a handheld microphone with eyes screwed shut, head thrown back, one fist punched in the air. Music notes and sound waves around him. Clearly different from any other singer in the set.
Cell 6 (bottom-right): a girl, about 10 years old, in an SD uniform (white long-sleeved blouse, red pinafore vest, white headscarf), holding up a square wooden letter block that shows only the letter "A" next to her cheek, smug proud grin with one eyebrow raised. A small friendly cartoon bee hovers beside her.
```

### Sheet 2 (SMP and sports)

Files after slicing: `smp-olimpiade-mipa.png`, `smp-vocal-solo.png`, `smp-baca-puisi.png`, `smp-basket.png`, `sd-futsal.png`.

```
Cell 1 (top-left): a boy, about 13 years old, in an SMP uniform (white short-sleeved shirt, blue tie, long blue trousers), thrusting a gold trophy cup overhead with both hands, shouting in triumph with a wide toothy grin, body leaning into the pose. A small atom symbol floats nearby.
Cell 2 (top-middle): a girl, about 13 years old, in an SMP uniform (white long-sleeved blouse, blue vest, white headscarf), singing powerfully into a microphone on a stand, one hand pressed to her chest and the other flung out, head tilted, eyes shut, eyebrows lifted with feeling. Music notes around her.
Cell 3 (top-right): a boy, about 13 years old, in an SMP uniform (white short-sleeved shirt, blue tie, black peci), reading from an open poetry book held in one hand with the other hand pressed dramatically to his chest, eyes closed, head tilted back, deeply moved. A small heart floats above.
Cell 4 (bottom-left): a boy, about 14 years old, in a blue basketball jersey with sleeves and knee-length shorts, dribbling a basketball low, leaning hard into the move, jaw set with fierce focus. Speed lines behind him. Waist-up, the ball fully in frame.
Cell 5 (bottom-middle): a boy, about 11 years old, in a red futsal shirt with sleeves, swinging his leg to kick a soccer ball (the whole ball visible in frame), gritted teeth and a determined squint, body at a strong diagonal, speed lines. Waist-up.
```

### Sheet 3 (SMA and shared)

Files after slicing: `sma-debate.png`, `sma-essay.png`, `sma-cerdas-cermat.png`, `sma-culture-vlog.png`, `smp-sma-desain-grafis.png`, `smp-sma-stem-expo.png`.

```
Cell 1 (top-left): a girl, about 16 years old, in an SMA uniform (white long-sleeved blouse, grey vest, white headscarf), standing behind a wooden podium (completely in frame) with a microphone, one index finger raised sharply making a point, eyebrows drawn together, mouth open mid-argument. Two empty speech bubbles (no text) on either side. No flag.
Cell 2 (top-middle): a boy, about 16 years old, in an SMA uniform (white short-sleeved shirt, grey tie), writing fast with a pen on a sheet of lined paper held on a clipboard, hunched forward, tongue slightly out, one eyebrow furrowed in concentration. A glowing lightbulb above his head.
Cell 3 (top-right): a girl, about 16 years old, in an SMA uniform (white long-sleeved blouse, grey vest, white headscarf), slamming her palm down on a big round red quiz buzzer (completely in frame), mouth wide open shouting the answer, eyes blazing. A lightbulb and a "?" burst above her.
Cell 4 (bottom-left): a girl, about 16 years old, in a white long-sleeved blouse with a white headscarf and a batik-pattern sash, filming herself with a smartphone held out on a selfie stick, tilting her head with a cheeky wink and a big grin. A play-button triangle floats beside her.
Cell 5 (bottom-middle): two students side by side: an SMP boy in blue and white, and an SMA girl in a white headscarf and grey vest, both holding up a comic page of three panels together; the girl holds a drawing-tablet pen and grins, the boy points at the page, eyebrows up. Draw both. A "pow" burst shape (no letters).
Cell 6 (bottom-right): two students side by side: an SMP girl in a white headscarf and blue vest holding a lab beaker with amazed wide eyes, and an SMA boy in grey and white holding a small friendly robot up with a proud grin. Draw both. A glowing lightbulb above them.
```

### Sheet 2 has five cells
Leave the bottom-right cell completely empty magenta. (Or use it for a spare: ask for a second take of whichever subject you are least sure about.)

### Check each sheet before slicing
- [ ] Six cells in a 3 x 2 grid (five on sheet 2), same size, no overlaps.
- [ ] Nothing crosses or touches a cell edge, and no frame or divider lines.
- [ ] Every character is waist-up, fully inside the cell, with the prop (podium, ball, buzzer, book) fully inside too.
- [ ] Flat magenta to every edge, no ground shadows.
- [ ] Different faces, hair and expressions in every cell.
- [ ] Dress and uniform colours as in section 2, no text, no flags.

### Fixing a sheet without wasting credits
- Use ONE reply with ONE fix, naming the cell, for example: "Cell 3: the character is touching the right edge. Redraw the whole sheet with every character smaller. Keep everything else the same."
- If the sheet comes back in a different aspect ratio, say: "Exactly 3:2 landscape, 1536 x 1024."
- If faces look alike: "Redraw with six clearly different faces, hair styles and expressions."

---

## Changelog

**2.2.0 - 7 Nov 2026** Added section 7, sheet mode: three landscape sheets (6 + 5 + 6 characters) on a strict 3 x 2 invisible grid, ready-to-paste cell lists, a sheet checklist and a way to fix a sheet in one reply, for when image generations are limited.

**2.1.1 - 7 Nov 2026** After the Gemini test (Bercerita, Mewarnai, Tari Kreasi): forbid frames, borders, paper margins and ground shadows; require a crisp digital finish (no vintage-paper grain); TK child must have a full head of hair (the first try looked bald); Bercerita boy is excited, not scared; the two Tari Kreasi dancers must look different and be waist-up.

**2.1.0 - 7 Nov 2026** After the v2.0 pilot (approved for suitability, but too flat and calm): heavier outline, clearly visible halftone dots, dynamic tilted poses, a different expression per subject, one-image-per-message made explicit, bottom margin and props fully in frame, headscarves plain white with the level colour on vest, tie or trousers, and a clearer TK child (about 5, smock, pigtails).

**2.0.0 - 7 Nov 2026** Switched from objects-only icons to waist-up comic characters (retro pop art, not manga). Added modest dress and headscarf rules, uniform colour by level, one subject and pose per competition, crop-safe margins, and a check-with-the-school list.

**1.1.0 - 7 Nov 2026** Direction chosen: retro comic pop art (not manga or chibi). Added the halftone line to the master block.

**1.0.0 - 7 Nov 2026** Initial prompt: master style block (two variants), acceptance checklist, 17 subjects with file names, pilot-first workflow.
