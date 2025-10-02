# Word Select Fixer

A lightweight Chrome extension that removes trailing spaces when you double-click to select words.

## The Problem

By default, Chrome includes the space after a word when you double-click to select it. This is annoying when you want to copy a word without extra whitespace, especially for passwords, code snippets, or precise text selection.

## The Solution

This extension automatically removes trailing spaces from your selection immediately after you double-click a word. The selection becomes cleaner and more precise, matching your actual intent.

## Features

- Automatic removal of trailing spaces on double-click
- Works on all websites
- Zero performance impact
- No configuration needed
- Lightweight (less than 1KB)
- Written in TypeScript with professional error handling

## Installation

### From Chrome Web Store

Coming soon.

### Manual Installation (Development)

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" in the top-right corner
6. Click "Load unpacked"
7. Select the `dist` folder
8. The extension is now active

## Usage

Simply double-click any word on any webpage. The word will be selected without the trailing space.

No configuration or additional steps required.

## Development

### Build Scripts

- `npm run build` - Compile TypeScript and copy files to dist/
- `npm run watch` - Watch for changes and recompile
- `npm run clean` - Remove dist folder

### Local Development

1. Make changes to TypeScript files in `src/`
2. Run `npm run build` to compile
3. Go to `chrome://extensions/`
4. Click the refresh icon on the extension card
5. Test on any webpage

## Browser Compatibility

- Chrome (Manifest V3)
- Edge (Chromium-based)
- Brave
- Other Chromium-based browsers

## Privacy

This extension does not collect, store, or transmit any data. It runs entirely locally in your browser.

## License

MIT License - feel free to use, modify, and distribute.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## Support

If you encounter any issues, please report them on the GitHub issues page.