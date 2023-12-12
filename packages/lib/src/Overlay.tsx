"use client";

import pretty from "pretty";
import React, { useEffect, useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";

const DiffViewer: typeof ReactDiffViewer = (ReactDiffViewer as any).default
  ? (ReactDiffViewer as any).default
  : ReactDiffViewer;

export function Overlay() {
  const [SSRHtml, setSSRHtml] = useState("");
  const [CSRHtml, setCSRHtml] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hasHydrationMismatch, setHasHydrationMismatch] = useState(false);

  useEffect(() => {
    const ssrHtml = window.BUILDER_IO_SSR_HTML;
    const newCSRHtml = document.querySelector("#__next")?.innerHTML;

    if (!ssrHtml) return;

    // avoid potentially re-rendering and getting a later client side render
    if (CSRHtml) return;

    const newSSR = pretty(ssrHtml);
    setSSRHtml(newSSR);
    const newCSR = pretty(newCSRHtml || "");
    setCSRHtml(newCSR);

    // TO-DO: make sure there IS a hyration mismatch

    setShowModal(true);
    setHasHydrationMismatch(true);
  }, []);

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `if (!window.CSR) window.CSR = document.currentScript?.parentElement?.outerHTML;`,
        }}
      ></script>
      {showModal && hasHydrationMismatch ? (
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
                }}
              >
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    padding: "1rem",
                  }}
                >
                  Hydration Mismatch Occured. Here is the difference in HTML:
                </div>

                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    padding: "1rem",
                    textAlign: "right",
                  }}
                >
                  <button style={{ cursor: "pointer" }} onClick={hideModal}>
                    Close
                  </button>
                </div>
              </div>
              <div style={{ position: "relative", width: "100%" }}>
                <DiffViewer
                  oldValue={SSRHtml}
                  newValue={CSRHtml}
                  splitView={true}
                  leftTitle={"Server-Side Render"}
                  rightTitle={"Client-Side Render"}
                  compareMethod={DiffMethod.WORDS}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
