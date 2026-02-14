# Anime Presence Parser
**MAINLY FOR RUSSIAN-SPEAKING USERS**

> [!NOTE]
>  **New update!**  
> Added support for CVH videoplayer. It's recommended to update files.

Anime Presence Parser is a tool for displaying your anime watching status in Discord from the AnimeGO website and the Kodik player (integrated into AnimeGO). Created in a couple of hours just for personal use. Inspired by the official Crunchyroll Discord integration. 😊

## Features

- Shows the anime, current episode and it's progress in Discord Rich Presence
- Works right after entering an AnimeGO anime page
- Automatically updates your activity status

## Prerequisites

- [**Node.js**](https://nodejs.org/) (version 14 or higher recommended)
- **Discord** account (for creating an application)
- **Cloudinary** account (for image processing)

## Downloading & Installation Guide

### 1. Download the Project

**Using Git (Recommended):**
```bash
git clone https://github.com/your-username/anime-presence-parser.git
cd anime-presence-parser
```

**Or Download ZIP:**
1. Go to the [GitHub repository page](https://github.com/your-username/anime-presence-parser)
2. Click the **Code** button and select **Download ZIP**
3. Extract the ZIP file and open the folder in your terminal

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```
2. Fill in:
   - CLIENT_ID — your Discord application ID ([guide](https://discord.com/developers/applications))
   - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET — from your Cloudinary dashboard ([guide](https://cloudinary.com/))

### 4. Run the Application

```bash
node src/main.js
```

### 5. Install the userscript or the extensions

**Installing the UserScript:**

1. Install [Tampermonkey](https://www.tampermonkey.net/) or a similar browser extension
2. Copy the contents of `src/userscript.js` and create a new userscript in the extension

(Make sure userscripts are enabled in your browser. In Chrome, go to chrome://extensions, enable Developer Mode in the top right corner, open Tampermonkey settings, and turn on the relevant toggle with a descriptive name.)

3. Save the script and open animego.me

**Installing the browser extension:**

1. Enter chrome://extensions (or your browser’s equivalent) into the address bar.
2. Drag and drop the extension folder into the extensions page.
3. Open any anime page on animego.me and verify that the extension works.

### 6. Load assets (optional)

1. Go to your discord app webpage (where you've copied the client id) and click the Rich Presence section button
2. Load Art Assets from the assets folder with names pause.png and play.png

## Usage
- Run the application (Step 4)
- Open an anime page on animego.me
- Your Discord status will update automatically

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

**Need help?**  
Open an issue on [<u>___GitHub___</u>](https://github.com/your-username/anime-presence-parser/issues) or dm me at discord (linked in my profile)