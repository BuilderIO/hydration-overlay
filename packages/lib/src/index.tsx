import React from "react";
import { Overlay } from "./Overlay.js";
import { HydrationOverlayProps } from "./types.js";

export function HydrationOverlay(
  {children, ...rest}: HydrationOverlayProps
) {
  return (
    <>
      {children}
      <Overlay {...rest} />
    </>
  );
}

export * from "./Overlay";