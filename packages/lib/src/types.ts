import { type PropsWithChildren } from "react";

export type OverlayIntegrationsProps = {
  spotlight?: boolean
}

export type HydrationOverlayProps = PropsWithChildren & {
  integrations?: OverlayIntegrationsProps
};

export type OverlayProps = {
  integrations?: OverlayIntegrationsProps
}

