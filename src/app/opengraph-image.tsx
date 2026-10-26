import { ImageResponse } from "next/og";
import { store, storeLocationLabel } from "@/data/store";

export const alt = `${store.name} — stationery, electrical essentials and book binding in Okara`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #14223d 0%, #1c2f53 60%, #263f6d 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="96" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="10" fill="#ffffff" fillOpacity="0.08" />
            <path d="M7 13c4-1.8 8.2-1.6 12 .6v16.2c-3.8-2.2-8-2.4-12-.6z" fill="#fff" />
            <path d="M33 13c-4-1.8-8.2-1.6-12 .6v16.2c3.8-2.2 8-2.4 12-.6z" fill="#dce5f2" />
            <path
              d="M22.6 5.5 15.2 21h5l-2.4 11.5L26 16.6h-5.1l2.9-11.1z"
              fill="#f59e0b"
              stroke="#1c2f53"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 30, color: "#fcd34d", fontWeight: 600 }}>{storeLocationLabel}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 1000 }}>
            {store.name}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#c3d2ea", maxWidth: 980, lineHeight: 1.35 }}>
            Stationery · School &amp; Office Supplies · Electrical Essentials · Book Binding
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["Copies & Notebooks", "Registers", "Bulbs & Switches", "Wires & Cables"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.1)",
                fontSize: 24,
                color: "#ffffff",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
