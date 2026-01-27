# hawkings.me

Hawkings.me is my personal website built with [Astro](https://astro.build) and deployed to [Cloudflare Workers](https://workers.cloudflare.com)

## Development

### Set up

1. Clone the repository

   ```shell
   git clone https://github.com/ajhawkings/hawkings.me
   ```

2. Install [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)

3. Install the latest LTS version of Node.js:

   ```powershell
   # MacOS/Linux
   nvm use
   # Windows
   nvm install lts
   nvm use lts
   ```

4. Update npm to the latest version:

   ```shell
   npm install -g npm
   ```

5. Install the packages in the cloned directory:

   ```shell
   npm install
   ```

### IDE/Code Editor

[VS Code](https://code.visualstudio.com/) is recommended. Please install the recommended extensions (in [vscode/extensions.json](./vscode/extensions.json))

### Imports

Please sort imports alphabetically, in three groups separated by new lines:

- TS functions/data
- JSX Components
- Type definitions

## Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

### Running Tests

```shell
# Run tests in headless mode
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# View HTML test report
npm run test:report
```

### Writing Tests

Tests are located in the `tests/` directory. Each test file should be named with the `.spec.ts` extension.

The test configuration is in `playwright.config.ts`. The tests will automatically start the dev server before running.
