# Luxe Interior

## Enquiry form setup

The website sends enquiries through Google Apps Script, which emails
`luxeinterior03@gmail.com`. Deploy the included script once from that Google
account:

1. Create a project at [script.google.com](https://script.google.com/), replace
   `Code.gs` with `google-apps-script/Code.gs`, and add an HTML file named
   `Gallery` with the contents of `google-apps-script/Gallery.html`.
2. Select **Deploy → New deployment → Web app**.
3. Set **Execute as** to **Me** and **Who has access** to **Anyone**, then
   deploy and approve the requested email and Drive permissions.
4. Copy the web app URL ending in `/exec` into a `.env.local` file in the
   project root:

   ```text
   VITE_CONTACT_FORM_ENDPOINT=https://script.google.com/macros/s/your-deployment-id/exec
   ```

5. In **Deploy → Manage deployments**, edit the web app deployment and select
   **New version**. Keep the same web app URL. Rebuild and redeploy the website
   after setting `.env.local`. Do not commit `.env.local`.

Visitors provide their name, 10-digit phone number, and project details; they
do not need to provide an email address. The script emails the enquiry,
including the visitor's phone number, to `luxeinterior03@gmail.com`. The form
submits directly to the script in a new tab, which confirms whether the email
was sent. Until the endpoint is configured, the form stays disabled and shows
the phone number as a fallback.

## Site work photo gallery

The website reads projects from the configured Google Drive folder (the `Photos`
folder shown in Drive). For a single project, the `Before`, `After`, and
`Album` folders can sit directly inside it. For multiple projects, create a
folder for each project and put these three folders inside each project:

- `Before`
- `After`
- `Album`

Upload matching before/after photos to their respective folders, using the
same base name for each pair (for example, `living-room-before.jpg` and
`living-room-after.jpg`). Matching filenames are only used to pair the photos;
they are never shown on the website. Add the rest of the project photos to
`Album`; they appear in a filename-free, swipeable photo carousel. Before/after
pairs and album photos support horizontal scrolling, with next/previous
controls and automatic sliding when multiple images are available. Project
folder names appear as gallery headings.

The Apps Script web app supports both layouts and discovers project folders
automatically. Put photos inside the matching category folder; files left
directly in the root or project folder are not included. New folders and
photos appear after refreshing the website.
After changing `google-apps-script/Code.gs` or
`google-apps-script/Gallery.html`, deploy a new Apps Script version while
keeping the existing web app URL.

To let website visitors view the photos without giving them edit access, open
the configured root folder (`Photos`) and its project/photo folders' **Share**
settings. Set **General access** to **Anyone with the link — Viewer**. Confirm
that only you and people you trust are listed as editors; remove any other
editors. Do not give website visitors Editor access.
