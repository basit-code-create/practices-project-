# Rajpoot Book Depo and Electric Store — Website

Business website and product catalog for **Rajpoot Book Depo and Electric Store**, Okara, Punjab, Pakistan (owner: **Rao Nazir Asim**).

The site introduces the shop, shows its stationery and electrical product categories, presents its book-binding services, and helps customers find or contact the shop. It is a catalog, not an online store: there is no cart, checkout, payment or live stock tracking.

## Pages

| URL | What it shows |
| --- | --- |
| `/` | Homepage: hero, category overview, featured products, stationery and electrical sections, book binding, about, map, contact |
| `/products` | Full catalog with search and category filter (both work together) |
| `/categories/<slug>` | One page per category, showing only that category's products, with its own search |
| `/services` | Book-binding services and how the process works |
| `/about` | About the business and owner |
| `/contact` | Location details, Google Map and directions |
| `/image-credits` | Sources of the stock photos |

Category pages:

| Category | URL |
| --- | --- |
| Copies & Notebooks | `/categories/copies-notebooks` |
| Registers | `/categories/registers` |
| Writing Supplies | `/categories/writing-supplies` |
| School Supplies | `/categories/school-supplies` |
| Office Stationery & Paper | `/categories/office-stationery` |
| Electrical Bulbs & Lighting | `/categories/electrical-lighting` |
| Switches & Electrical Accessories | `/categories/switches-accessories` |
| Wires & Cables | `/categories/wires-cables` |
| Other Electrical Items | `/categories/electrical-accessories` |

Unknown category URLs return a proper 404 page. `/categories` redirects to `/products`.

## Technology

- [Next.js 16](https://nextjs.org) (App Router, Server Components, Cache Components, React Compiler)
- React 19, TypeScript
- Tailwind CSS 4
- Lucide React icons
- Vitest for automated tests

There is no database, login or backend. Business details, categories and products live in three TypeScript files under `src/data/`.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Checks

| Command | What it does |
| --- | --- |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates Next.js route types, then runs the TypeScript compiler |
| `npm test` | Vitest: catalog data rules, category routing, map links, phone/WhatsApp links, search |
| `npm run check` | All three of the above |
| `npm run build` | Production build |
| `npm start` | Serves the production build (after `npm run build`) |

The tests catch common editing mistakes, such as a product pointing at a category that doesn't exist, a duplicate product ID, or a missing image file.

## Project structure

```text
src/
  app/                  Pages and routes (layout, home, products, categories/[slug],
                        services, about, contact, not-found, sitemap, robots, icons)
  components/
    layout/             Header, navigation, footer, logo
    home/               Homepage sections
    products/           Product and category cards, grid, search, filter
    shared/             Map, contact buttons, breadcrumbs, headings, empty state
  data/
    store.ts            Business details (name, owner, location, contacts, hours)
    categories.ts       Product categories
    products.ts         Product catalog
  lib/                  Helpers for maps, contact links, search, metadata
  types/catalog.ts      Product and category types
  proxy.ts              Returns a 404 status for unknown category URLs
public/images/          Product, category and service photos
tests/                  Automated tests
```

## Updating business details

All business information is in **`src/data/store.ts`**. Anything left empty is hidden on the website, so nothing breaks while details are unconfirmed.

### Phone and WhatsApp

```ts
phone: "+92 300 1234567",
whatsapp: "+92 300 1234567",
```

Use the complete number. International format (`+92 300 1234567`) and local format (`0300-1234567`) both work. Incomplete numbers are ignored on purpose, so no broken call button can appear.

Once a number is set:

- **Phone** adds "Call" buttons (header, contact page, footer) that open the dialer.
- **WhatsApp** adds "Ask on WhatsApp" buttons to every product card. The message is prefilled with the product name, so the shop knows what the customer is asking about. WhatsApp buttons also appear on the services and contact pages.

### Street address

```ts
address: "Shop No. 1, Main Bazaar, Okara",
```

The address appears on the contact page, footer, homepage location section and in search-engine data. The map does not depend on it; the map uses the coordinates.

### Opening hours

```ts
openingHours: [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "21:00" },
  { days: ["Sunday"], opens: "12:00", closes: "18:00" },
],
```

Use 24-hour times. The website shows them as "Monday – Saturday: 9:00 AM – 9:00 PM".

### Email and social media

```ts
email: "shop@example.com",
social: {
  facebook: "https://www.facebook.com/your-page",
  instagram: "https://www.instagram.com/your-account",
},
```

### Map location

```ts
coordinates: { latitude: 30.817865, longitude: 73.468005 },
map: { zoom: 16 },
```

The embedded map, "Get Directions" and "View Location" links, and search-engine data are all generated from these values. If you change the coordinates, also update the expected values in `tests/maps.test.ts`; that test guards against accidental edits.

### Logo

The header uses a built-in text-and-icon logo. To use a real logo, put the image in `public/images/` and set:

```ts
logo: { src: "/images/logo.png", width: 160, height: 48 },
```

The browser-tab icon is `src/app/icon.svg`.

## Managing products

Products are in **`src/data/products.ts`**. The homepage, catalog and category pages all read from this one list.

### Add a product

Copy an existing entry and change it:

```ts
{
  id: "os-022",                       // unique
  slug: "whiteboard-dusters",         // unique, lowercase, hyphens
  name: "Whiteboard Dusters",
  categorySlug: "office-stationery",  // must match a category slug
  description: "Dusters for cleaning whiteboards.",
  icon: "package",                    // optional; see ProductIconName in src/types/catalog.ts
  keywords: ["duster", "board"],      // optional extra search words
},
```

To remove a product the shop doesn't stock, delete its entry.

### Add or change a price

Add a `price` in Pakistani Rupees **only after the owner has confirmed it**:

```ts
price: 250,
```

The card then shows "Rs. 250". Without a price it shows "Contact for Price". Never add placeholder prices.

### Featured products

Add `featured: true` to show a product in the homepage's "Featured Products" section. Aim for 4 to 8; the homepage shows at most 8.

### Product photos

Almost every product has a representative stock photo in `public/images/products/`, named after the product slug (e.g. `a4-paper.jpg`). Products without a photo show an icon instead, and so does any photo that fails to load.

The current photos come from [Pexels](https://www.pexels.com) and are used under the [Pexels License](https://www.pexels.com/license/): free for commercial use, no attribution required. Each one is still listed, with a link to the original, in `src/data/imageCredits.ts` and on the `/image-credits` page.

To use your own photo (photos of the real shop and stock are best):

1. Save it in `public/images/products/`. A 3:2 landscape image around 900×600 works well (JPG or WebP).
2. Point the product at it: `image: "/images/products/a4-paper.jpg",`. If you overwrite an existing file with the same name, no code change is needed.
3. Remove that image's entry from `src/data/imageCredits.ts`. The photo is now yours.

Only use photos you have the right to use.

## Managing categories

Categories are in **`src/data/categories.ts`**. The homepage cards, category pages, filters, footer links and sitemap are all generated from this list.

### Add a category

1. Add the new slug to the `CategorySlug` list in `src/types/catalog.ts`, e.g. `| "batteries"`.
2. Add an entry to `categories` in `src/data/categories.ts` (name, group `"stationery"` or `"electrical"`, descriptions, image, icon).
3. Add an image at the path you used, e.g. `public/images/categories/batteries.jpg` (4:3 landscape, around 1200×900).
4. Add products with `categorySlug: "batteries"`.
5. Run `npm test`. It checks the slug is unique, the image exists and the category has products.

The new page is then available at `/categories/batteries`.

### Replace a category image

Replace the file in `public/images/categories/` (keep the same name), or point `image` at a new file. Use a 4:3 landscape image, update `imageAlt` to describe it, and remove its entry from `src/data/imageCredits.ts` if it was a stock photo.

## Production domain

Once the domain is confirmed, set it as an environment variable (see `.env.example`):

```bash
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

This turns on canonical links and puts the real domain in the sitemap, robots.txt and link previews. Until it is set, no canonical link is published. On Vercel, the sitemap and link previews fall back to the deployment's own Vercel address.

## Deploying to Vercel

1. Push this project to a GitHub, GitLab or Bitbucket repository.
2. In [Vercel](https://vercel.com/new), import the repository. Vercel detects Next.js automatically; the default build command (`npm run build`) and output settings are correct.
3. Optional: under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` once the domain is known.
4. Deploy. To use a custom domain, add it under **Settings → Domains**, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.

Alternatively, from this folder: `npx vercel` (preview) and `npx vercel --prod` (production).

After changing `src/data/*.ts`, commit and push; Vercel rebuilds the site automatically.

## Content rules this site follows

- No invented phone numbers, addresses, opening hours, prices, stock levels, reviews, ratings or history.
- The product list is a starter catalog for the owner to review. A notice on the catalog pages says that stock and prices change and should be confirmed at the shop.
- Product and category photos are representative stock photos. The footer and catalog notice say they may differ from the items in the shop, and `/image-credits` lists their sources.
- There is no contact form, because a form needs a real way to deliver messages, such as an email service. Customers are directed to configured phone/WhatsApp numbers or to visit the shop. A form can be added later together with a delivery service.

## Details still to confirm with the owner

- [ ] Complete phone number
- [ ] WhatsApp number
- [ ] Exact street address
- [ ] Opening hours
- [ ] Business email (if any)
- [ ] Social media pages (if any)
- [ ] Which catalog items are actually stocked (remove the rest)
- [ ] Verified prices (optional)
- [ ] Which book-binding options are offered (book repair/rebinding, document binding, etc.)
- [ ] Real logo and product/shop photos (optional)
- [ ] Production domain
