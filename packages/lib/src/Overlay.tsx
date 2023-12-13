"use client";
import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";

const DiffViewer: typeof ReactDiffViewer = (ReactDiffViewer as any).default
  ? (ReactDiffViewer as any).default
  : ReactDiffViewer;

export function Overlay() {
  const [SSRHtml, setSSRHtml] = useState("");
  const [CSRHtml, setCSRHtml] = useState("");

  const [showModal, setShowModal] = useState(true);
  const [hasHydrationMismatch, setHasHydrationMismatch] = useState(true);

  useEffect(() => {
    const ssrHtml = window.BUILDER_HYDRATION_OVERLAY.SSR_HTML;
    const newCSRHtml = window.BUILDER_HYDRATION_OVERLAY.CSR_HTML;

    if (!ssrHtml || !newCSRHtml) return;

    const newSSR = ssrHtml;
    setSSRHtml(newSSR);
    const newCSR = newCSRHtml;
    setCSRHtml(newCSR);

    setShowModal(true);
    if (window.BUILDER_HYDRATION_OVERLAY.ERROR) {
      setHasHydrationMismatch(true);
    }
  }, []);

  const hideModal = () => {
    setShowModal(false);
  };

  if (!showModal || !hasHydrationMismatch || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999998,
        background: "rgba(0,0,0,0.5)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
      }}
      onClick={hideModal}
    >
      <div
        style={{
          zIndex: 999999,
          margin: "4rem 6rem",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          overflow: "auto",
          cursor: "auto",
          color: "#212529",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                padding: "1rem",
              }}
            >
              Hydration Mismatch Occured
            </div>

            <button
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "0.5rem",
                marginRight: "1rem",
                backgroundColor: "#212529",
                borderRadius: "0.25rem",
                color: "white",
              }}
              onClick={hideModal}
            >
              CLOSE
            </button>
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <DiffViewer
              oldValue={SSRHtml}
              newValue={CSRHtml}
              leftTitle={"Server-Side Render"}
              rightTitle={"Client-Side Render"}
              compareMethod={DiffMethod.WORDS}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
