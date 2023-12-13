# Hydration Overlay 🕵️

This package displays an overlay during Hydration Errors, providing an explicit diff between the server-side and client-side renders.

## Installation

```bash
npm install @builder.io/react-hydration-overlay
```

## Usage

First, wrap the root of your app in the `HydrationOverlay` component.

```tsx
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

const App = () => {
  return (
    <HydrationOverlay>
      <YourApp />
    </HydrationOverlay>
  );
};
```

Second, add the plugin for your framework. Currently, we only support Next.js.

### Next.js

in `next.config.js`:

```js
const {
  withHydrationOverlay,
} = require("@builder.io/react-hydration-overlay/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** your config here */
};

module.exports = withHydrationOverlay()(nextConfig);
```

## Notes

- This package is currently in beta. Please report any issues you find!
- This package is not intended for production use. It is intended to help you debug hydration errors in development. We highly recommend you remove this package from your production builds.
- This package works by comparing the HTML received from the server with the HTML rendered by the client, which has one improtant consequence. React re-renders the entire app when hydration fails, potentially introducing even more changes. The biggest example is `style` attributes: React appends `;` to each one and alters the whitespace. Therefore, this tool might give you false positives for style changes. We are working on a solution for this.

## Support

- [x] Next.js
- [ ] Gatsby
- [ ] Create React App
- [ ] Vite
