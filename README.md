# LSP From Scratch

A minimal Language Server Protocol (LSP) implementation wired into a VS Code extension.

## Features
- Spelling diagnostics powered by `aspell`
- Quick-fix code actions to replace misspellings
- Dictionary-based word completions

## Requirements
- Node.js (for building/running the extension)
- VS Code (for running the extension host)
- `aspell` available on your PATH
- A word list file for completions

## Setup
1) Install dependencies from the repo root:

```sh
npm install
```

2) Point completions at your word list:

Edit `server/src/methods/textDocument/completion.ts` and update the `words` file path.

3) Build the TypeScript projects:

```sh
npm run compile
```

## Run in VS Code
1) Open this repo in VS Code.
2) Press `F5` (Run > Start Debugging) to launch the extension host.
3) Open any text file and try:
   - Typing misspelled words to see diagnostics.
   - Triggering quick fixes for spelling suggestions.
   - Using completion to see dictionary-based suggestions.

## Project Layout
- `client/` VS Code extension that launches the LSP server
- `server/` LSP server implementation

## Notes
- Diagnostics and suggestions use `aspell pipe` output; if `aspell` is missing, diagnostics will be empty.
- Completions are sourced from the word list file specified in `completion.ts`.
