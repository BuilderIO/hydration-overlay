import React, { type PropsWithChildren } from "react";
import { Overlay } from "./Overlay.js";

export function HydrationOverlay(props: PropsWithChildren) {
  return (
    <>
      {props.children}
      <Overlay />
    </>
  );
}
