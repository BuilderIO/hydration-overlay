import React, { PropsWithChildren } from 'react';

type OverlayIntegrationsProps = {
    spotlight?: boolean;
};
type HydrationOverlayProps = PropsWithChildren & {
    integrations?: OverlayIntegrationsProps;
};
type OverlayProps = {
    integrations?: OverlayIntegrationsProps;
};

declare function Overlay({ integrations }: OverlayProps): any;

declare function HydrationOverlay({ children, ...rest }: HydrationOverlayProps): React.JSX.Element;

export { HydrationOverlay, Overlay };
