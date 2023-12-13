"use client";
import { HtmlDiffer } from "html-differ";
import pretty from "pretty";
import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import {
  createPatch,
  createTwoFilesPatch,
  structuredPatch,
  diffWords,
} from "diff";

const DiffViewer: typeof ReactDiffViewer = (ReactDiffViewer as any).default
  ? (ReactDiffViewer as any).default
  : ReactDiffViewer;

import { parseDiff, Diff, Hunk } from "react-diff-view";

export function Overlay() {
  const [SSRHtml, setSSRHtml] = useState("");
  const [CSRHtml, setCSRHtml] = useState("");

  const [showModal, setShowModal] = useState(true);
  const [hasHydrationMismatch, setHasHydrationMismatch] = useState(true);

  const hunks = createPatch("SSR", SSRHtml, CSRHtml);
  // console.log("hunks", hunks);
  const parsedHunks = parseDiff(`diff --git SSR CSR\n` + hunks);

  useEffect(() => {
    const ssrHtml = window.BUILDER_HYDRATION_OVERLAY.SSR_HTML;
    const newCSRHtml = window.BUILDER_HYDRATION_OVERLAY.CSR_HTML;

    if (!ssrHtml) return;

    // avoid potentially re-rendering and getting a subsequent client side render
    if (CSRHtml) return;

    const newSSR = pretty(ssrHtml);
    setSSRHtml(newSSR);
    const newCSR = pretty(newCSRHtml || "");
    setCSRHtml(newCSR);

    console.log("HydrationChecker useEffect", {
      newSSR,
      newCSR,
    });

    setShowModal(true);
    if (window.BUILDER_HYDRATION_OVERLAY.ERROR) {
      setHasHydrationMismatch(true);
    }
  }, []);

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `if (!window.CSR) window.CSR = document.currentScript?.parentElement?.outerHTML;`,
        }}
      ></script> */}
      {showModal && hasHydrationMismatch && typeof document !== "undefined"
        ? createPortal(
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
                    {/* <div>Diff:</div> */}
                    {/* <Diff
                  viewType="split"
                  diffType={"modify"}
                  hunks={parsedHunks[0].hunks}
                >
                  {(hunks) =>
                    hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
                  }
                </Diff> */}
                    {/* <div>DiffViewer:</div> */}
                    <DiffViewer
                      oldValue={SSRHtml}
                      newValue={CSRHtml}
                      leftTitle={"Server-Side Render"}
                      rightTitle={"Client-Side Render"}
                      compareMethod={DiffMethod.WORDS_WITH_SPACE}
                    />
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
