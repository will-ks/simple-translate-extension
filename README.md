# Simple Translate Extension

Just a simple extension that translates the current page using with Google Translate, without requiring any permissions.

## Install

Download the latest release from the Github releases tab.

Unzip the release.

Go to `chrome://extensions/` and click "Load unpacked extension", navigate to the extracted folder.

## Development

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

First, run the development server:

```bash
yarn dev
# or
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit Plasma Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
yarn build
# or
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

