const OWNER_EMAIL = "luxeinterior03@gmail.com";

function doPost(event) {
  try {
    const fields = event.parameter || {};
    if (fields.website) {
      return responsePage(false);
    }

    const name = cleanLine(fields.name, 120);
    const email = cleanLine(fields.email, 254).toLowerCase();
    const brief = String(fields.brief || "").trim().slice(0, 5000);

    if (
      name.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      brief.length < 10
    ) {
      return responsePage(false);
    }

    const cache = CacheService.getScriptCache();
    const emailDigest = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      email,
    )
      .map((byte) => (byte + 256).toString(16).slice(-2))
      .join("");
    const cacheKey = `inquiry:${emailDigest}`;
    if (cache.get(cacheKey)) {
      return responsePage(false);
    }

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      replyTo: email,
      name: "Luxe Interior website",
      subject: `New website enquiry from ${name}`,
      body: `Name: ${name}\nEmail: ${email}\n\nProject details:\n${brief}`,
    });

    cache.put(cacheKey, "sent", 60);
    return responsePage(true);
  } catch (error) {
    console.error("Could not send Luxe Interior enquiry", error);
    return responsePage(false);
  }
}

function cleanLine(value, maxLength) {
  return String(value || "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function responsePage(ok) {
  const message = JSON.stringify({ type: "luxe-contact-result", ok });
  return HtmlService.createHtmlOutput(
    `<script>window.parent.postMessage(${message}, "*");</script>`,
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
