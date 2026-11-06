# Luxe Interior

## Enquiry form setup

The website sends enquiries through Google Apps Script, which emails
`luxeinterior03@gmail.com`. Deploy the included script once from that Google
account:

1. Create a project at [script.google.com](https://script.google.com/) and
   replace its `Code.gs` with `google-apps-script/Code.gs`.
2. Select **Deploy → New deployment → Web app**.
3. Set **Execute as** to **Me** and **Who has access** to **Anyone**, then
   deploy and approve the requested email permission.
4. Copy the web app URL ending in `/exec` into a `.env.local` file in the
   project root:

   ```text
   VITE_CONTACT_FORM_ENDPOINT=https://script.google.com/macros/s/your-deployment-id/exec
   ```

5. Rebuild and redeploy the website. Do not commit `.env.local`.

The form submits directly to the script; the script emails each enquiry to the
configured address. Until the endpoint is configured, the form stays disabled
and shows the contact email as a fallback.

## Project photos

The Projects section embeds the public `Panchsheel Project` folder from Google
Drive. Add photos to that folder and make sure visitors with the link can view
them; the embedded folder will reflect its contents automatically.
