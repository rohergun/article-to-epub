# RLE (Read Later to EPUB)

CLI project helps you with converting articles to epub format in one line.

## Table of contents
1. [About](#about)
2. [Sento kindle flow](#send-to-kindle-flow)
3. [Installing Locally](#installing-locally)
4. [Usage](#usage)
5. [Send to Kindle](#send-to-kindle)

## About

I kept finding interesting articles and blog posts that I wanted to read later, so I built this to collect them in one place as .epub files.

I mainly made it for reading on my Kindle.


## Sending to kindle flow

What happens when you run `rle send`:

```
rle send <url>
      |
      v
check .env config ---- missing values? -> stop with an error
      |
      v
fetch page          (fetchPage.js)
      |
      v
extract article     (extractArticle.js, Mozilla Readability)
      |
      v
build epub          (buildEpub.js)
      |
      v
save to epuboutputs/<title>.epub   (output.js)
      |
      v
email the .epub     (sendToKindle.js, nodemailer over SMTP)
  from: SENDER_EMAIL
  to:   KINDLE_EMAIL
      |
      v
Amazon Send-to-Kindle -> your Kindle
(sender must be on the approved list)
```

## Installing Locally

Requires [Node.js](https://nodejs.org) 20.12 or newer.

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
| `send <article-url>` | Converts a web article and emails it to your Kindle |

Example:

```bash
rle epub https://example.com/some-article
```

The EPUB is saved to `epuboutputs/` inside the project folder, wherever you run the command from. The full path is printed when it's done.

Run `rle --help` to see all available commands.

## Send to Kindle

`rle send` builds the EPUB, saves it like `rle epub` does, then emails it to your Kindle.

1. Copy the example config and fill it in:

   ```bash
   cp .env.example .env
   ```

   | Variable | What it is |
   | --- | --- |
   | `KINDLE_EMAIL` | Your Send-to-Kindle address (Amazon > Manage Your Content and Devices > Preferences > Personal Document Settings) |
   | `SENDER_EMAIL` | The From address. Defaults to `SMTP_USER` |
   | `SMTP_HOST`, `SMTP_PORT` | Your mail server, e.g. `smtp.gmail.com` and `465` |
   | `SMTP_USER`, `SMTP_PASS` | Login for the sending account. For Gmail, use an [App Password](https://myaccount.google.com/apppasswords) |

2. Add the sender address to Amazon's **Approved Personal Document E-mail List**, or Kindle will silently drop the email.

3. Send an article:

   ```bash
   rle send https://example.com/some-article
   ```

`.env` is read from the project folder, so it works from any directory. Variables already set in your shell override the file. `.env` is gitignored.

