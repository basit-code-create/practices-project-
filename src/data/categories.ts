import type { Category, CategoryGroup, CategorySlug } from "@/types/catalog";

/**
 * Product categories. The homepage cards, category pages, catalog filters,
 * navigation and sitemap are all generated from this list.
 *
 * To add a category: add its slug to `CategorySlug` in `src/types/catalog.ts`,
 * add an entry below, and add products that use the new slug.
 */
export const categories: Category[] = [
  {
    slug: "copies-notebooks",
    name: "Copies & Notebooks",
    group: "stationery",
    description:
      "School copies, single-line, two-line and four-line notebooks, drawing books and sketchbooks.",
    longDescription:
      "Everyday copies and notebooks for school, college, office and home — single-line, two-line and four-line notebooks, Urdu and English handwriting copies, mathematics notebooks, drawing books, sketchbooks and more. Ask at the shop about current sizes, page counts and brands.",
    image: "/images/categories/copies-notebooks.jpg",
    imageAlt: "Stack of spiral-bound notebooks",
    icon: "notebook",
  },
  {
    slug: "registers",
    name: "Registers",
    group: "stationery",
    description:
      "School, office, attendance, cash, ledger and account registers for everyday record-keeping.",
    longDescription:
      "Registers for schools, offices, shops and homes — attendance, cash, ledger, account, record, meeting and order registers, as well as general-purpose registers for daily use. Ask at the shop about the sizes and rulings currently available.",
    image: "/images/categories/registers.jpg",
    imageAlt: "Open handwritten ledger register",
    icon: "book-marked",
  },
  {
    slug: "writing-supplies",
    name: "Writing Supplies",
    group: "stationery",
    description:
      "Ballpoint and gel pens, pencils, erasers, sharpeners, markers, highlighters and colours.",
    longDescription:
      "Pens, pencils and everything that goes with them — ballpoint and gel pens, pencils, erasers, sharpeners, highlighters, permanent and whiteboard markers, colour pencils and crayons for school, office and art work.",
    image: "/images/categories/writing-supplies.jpg",
    imageAlt: "Pencils and pens in a black metal pen holder",
    icon: "pen-line",
  },
  {
    slug: "school-supplies",
    name: "School Supplies",
    group: "stationery",
    description:
      "Geometry boxes, rulers, compasses, protractors, pencil boxes and school project materials.",
    longDescription:
      "Supplies students need through the school year — geometry boxes, rulers and scales, set squares, protractors, compasses, pencil boxes, stationery kits and materials for school projects. Ask at the shop about bags, bottles and lunch boxes.",
    image: "/images/categories/school-supplies.jpg",
    imageAlt: "School supplies with pencils and a notebook",
    icon: "pencil-ruler",
  },
  {
    slug: "office-stationery",
    name: "Office Stationery & Paper",
    group: "stationery",
    description:
      "A4 and coloured paper, chart paper, files, folders, envelopes, staplers, glue and desk essentials.",
    longDescription:
      "Paper and desk essentials for offices, shops, schools and homes — A4, loose, coloured and chart paper, drawing sheets, files and folders, envelopes, sticky notes, staplers, clips, tape, glue, scissors and more.",
    image: "/images/categories/office-stationery.jpg",
    imageAlt: "Office stationery on a desk, including a calculator and tape dispenser",
    icon: "files",
  },
  {
    slug: "electrical-lighting",
    name: "Electrical Bulbs & Lighting",
    group: "electrical",
    description:
      "LED and energy-saving bulbs, tube lights, bulb holders and other lighting essentials.",
    longDescription:
      "Lighting for homes, shops and offices — LED and energy-saving bulbs, bulb holders and lighting accessories. Ask at the shop about tube lights, decorative bulbs, night lights and the wattages currently available.",
    image: "/images/categories/electrical-lighting.jpg",
    imageAlt: "Glowing light bulbs in glass pendant lamps",
    icon: "lightbulb",
  },
  {
    slug: "switches-accessories",
    name: "Switches & Electrical Accessories",
    group: "electrical",
    description:
      "Light switches, sockets, switchboards, plugs, plug tops, connectors and electrical fittings.",
    longDescription:
      "Switches, sockets and accessories for everyday electrical work — light switches, sockets, switchboards, plugs, plug tops, connectors and fittings. Ask at the shop about extension boards and power strips.",
    image: "/images/categories/switches-accessories.jpg",
    imageAlt: "Light switch on a textured wall",
    icon: "toggle",
  },
  {
    slug: "wires-cables",
    name: "Wires & Cables",
    group: "electrical",
    description:
      "Electrical wires and cables, wire connectors, insulation tape and cable clips.",
    longDescription:
      "Wires, cables and the accessories that go with them — electrical wires and cables, wire connectors, insulation tape and cable clips. Ask at the shop about the sizes and lengths currently available.",
    image: "/images/categories/wires-cables.jpg",
    imageAlt: "Bundle of copper electrical wires",
    icon: "cable",
  },
  {
    slug: "electrical-accessories",
    name: "Other Electrical Items",
    group: "electrical",
    description:
      "Circuit breakers, fuses, holders, adapters, extension cables and other electrical accessories.",
    longDescription:
      "Other electrical items for home and shop use — holders and general electrical accessories. Ask at the shop about circuit breakers, fuses, adapters and extension cables.",
    image: "/images/categories/electrical-accessories.jpg",
    imageAlt: "Circuit breakers, a multimeter and pliers",
    icon: "plug-zap",
  },
];

export const categoryGroups: Record<
  CategoryGroup,
  { label: string; title: string; description: string }
> = {
  stationery: {
    label: "Stationery",
    title: "Stationery, School & Office Supplies",
    description:
      "Copies, notebooks, registers, pens, geometry boxes, paper and desk essentials for students, teachers, offices and shops.",
  },
  electrical: {
    label: "Electrical",
    title: "Electrical Essentials",
    description:
      "Bulbs, switches, sockets, wires, cables and everyday electrical accessories for homes, shops and offices.",
  },
};

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoriesByGroup(group: CategoryGroup): Category[] {
  return categories.filter((category) => category.group === group);
}

export function getCategoryPath(slug: CategorySlug): string {
  return `/categories/${slug}`;
}
