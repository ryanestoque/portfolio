import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#172554", // Navy blue
          color: "#dbeafe", // Light text
          fontSize: 260,
          fontWeight: 300,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top-Left Bracket */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 48,
            width: 100,
            height: 100,
            borderTop: "12px solid #dbeafe",
            borderLeft: "12px solid #dbeafe",
          }}
        />
        {/* Top-Right Bracket */}
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 48,
            width: 100,
            height: 100,
            borderTop: "12px solid #dbeafe",
            borderRight: "12px solid #dbeafe",
          }}
        />
        {/* Bottom-Left Bracket */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 48,
            width: 100,
            height: 100,
            borderBottom: "12px solid #dbeafe",
            borderLeft: "12px solid #dbeafe",
          }}
        />
        {/* Bottom-Right Bracket */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 48,
            width: 100,
            height: 100,
            borderBottom: "12px solid #dbeafe",
            borderRight: "12px solid #dbeafe",
          }}
        />
        <span style={{ marginTop: 20 }}>R</span>
      </div>
    ),
    { ...size }
  );
}
