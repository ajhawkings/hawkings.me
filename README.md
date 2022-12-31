# hawkings.me

Hawkings.me is my personal website built using [solid.js](https://github.com/solidjs/solid) and deployed using [Vercel](https://vercel.com)

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
