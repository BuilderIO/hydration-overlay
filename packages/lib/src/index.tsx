import React from "react";
import { Overlay } from "./Overlay.js";
import { HydrationOverlayProps } from "./types.js";

export function HydrationOverlay(
  props: HydrationOverlayProps
) {
  return (
    <>
      {props.children}
      <Overlay spotlight={props.spotlight} />
    </>
  );
}

export * from "./Overlay";