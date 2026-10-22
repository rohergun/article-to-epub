# RLS (Read Later 2 EPUB)

CLI project helps you with converting articles to epub format in one line.

## Table of contents
1. [About](#about)
2. [Installing Locally](#installing-locally)
3. [Usage](#usage)

## About

I kept finding interesting articles and blog posts that I wanted to read later, so I built this to collect them in one place as .epub files.

I mainly made it for reading on my Kindle.

**Basic flow:**

```
url -> fetch page -> extract article -> build epub
                                         |
                                         v
                                    store in epub outputs
                                    (gitignored by default)
                       
```

## Installing Locally

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
git clone <repo-url>
```

```bash
cd read-later-epub
```

```bash
npm install
```

```bash
npm link
```

`npm link` makes the `read-later-epub` command and its short alias `rle` available from any folder. It points at your local copy, so code changes take effect right away.

To remove the commands later:

```bash
npm unlink -g read-later-epub
```

## Usage

```bash
rle <command> <article-url>
```

| Command | What it does |
| --- | --- |
| `epub <article-url>` | Converts a web article into an EPUB file |

Example:

```bash
rle epub https://example.com/some-article
```

The EPUB is saved to `epuboutputs/` inside the project folder, wherever you run the command from. The full path is printed when it's done.

Run `rle --help` to see all available commands.
