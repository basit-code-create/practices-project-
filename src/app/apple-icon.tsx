import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1c2f53" }}>
        <svg width="180" height="180" viewBox="0 0 40 40">
          <rect width="40" height="40" fill="#1c2f53" />
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
      </div>
    ),
    size,
  );
}
