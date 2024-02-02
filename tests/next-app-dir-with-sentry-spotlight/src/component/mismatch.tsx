"use client";

export default function Mismatch() {
  return (
    <div>
      {typeof window === "undefined" ? (
        <div>SERVER RENDERED DIV</div>
      ) : (
        <span>BROWSER RENDERED SPAN</span>
      )}
    </div>
  );
}
