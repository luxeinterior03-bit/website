const OWNER_EMAIL = "luxeinterior03@gmail.com";
const SITE_WORK_FOLDER_ID = "1-KT5nFIEZJIluCKAf7A_ZIi41yIocjmr";

function doGet(event) {
  const template = HtmlService.createTemplateFromFile("Gallery");
  template.gallery = loadGallery();
  return template
    .evaluate()
    .setTitle("Site Work | Luxe Interior")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(event) {
  try {
    const fields = event.parameter || {};
    if (fields.website) {
      return responsePage(false);
    }

    const name = cleanLine(fields.name, 120);
    const phone = String(fields.phone || "").trim();
    const brief = String(fields.brief || "").trim().slice(0, 5000);

    if (
      name.length < 2 ||
      !/^\d{10}$/.test(phone) ||
      brief.length < 10
    ) {
      return responsePage(false);
    }

    const cache = CacheService.getScriptCache();
    const phoneDigest = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      phone,
    )
      .map((byte) => (byte + 256).toString(16).slice(-2))
      .join("");
    const cacheKey = `inquiry:${phoneDigest}`;
    if (cache.get(cacheKey)) {
      return responsePage(false);
    }

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      name: "Luxe Interior website",
      subject: `New website enquiry from ${name}`,
      body: `Name: ${name}\nContact number: ${phone}\n\nProject details:\n${brief}`,
    });

    cache.put(cacheKey, "sent", 60);
    return responsePage(true);
  } catch (error) {
    console.error("Could not send Luxe Interior enquiry", error);
    return responsePage(false);
  }
}

function loadGallery() {
  try {
    const root = DriveApp.getFolderById(SITE_WORK_FOLDER_ID);
    const projects = [];
    const rootCategories = getCategoryFolders(root);
    if (Object.keys(rootCategories).length) {
      projects.push(buildProject(root, rootCategories));
    }

    const projectFolders = root.getFolders();
    while (projectFolders.hasNext()) {
      const projectFolder = projectFolders.next();
      if (
        ["before", "after", "album"].includes(
          projectFolder.getName().trim().toLowerCase(),
        )
      ) {
        continue;
      }

      projects.push(buildProject(projectFolder, getCategoryFolders(projectFolder)));
    }

    return {
      projects: projects.sort((a, b) => a.name.localeCompare(b.name)),
      error: false,
    };
  } catch (error) {
    console.error("Could not load Luxe Interior project photos", error);
    return { projects: [], error: true };
  }
}

function getCategoryFolders(parentFolder) {
  const folders = {};
  const categoryFolders = parentFolder.getFolders();
  while (categoryFolders.hasNext()) {
    const folder = categoryFolders.next();
    const category = folder.getName().trim().toLowerCase();
    if (["before", "after", "album"].includes(category)) {
      folders[category] = folder;
    }
  }
  return folders;
}

function buildProject(folder, categories) {
  return {
    name: folder.getName(),
    pairs: pairPhotos(
      listImages(categories.before),
      listImages(categories.after),
    ),
    album: listImages(categories.album).map((photo) => photo.url),
    setupNeeded:
      !categories.before || !categories.after || !categories.album,
  };
}

function listImages(folder) {
  if (!folder) {
    return [];
  }

  const images = [];
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    if (file.getMimeType().startsWith("image/")) {
      images.push({
        name: file.getName(),
        url: `https://drive.google.com/thumbnail?id=${file.getId()}&sz=w1600`,
      });
    }
  }
  return images.sort((a, b) => a.name.localeCompare(b.name));
}

function pairPhotos(before, after) {
  const afterByKey = new Map();
  after.forEach((photo) => {
    const key = pairKey(photo.name, "after");
    if (!afterByKey.has(key)) {
      afterByKey.set(key, []);
    }
    afterByKey.get(key).push(photo);
  });

  const pairCounts = new Map();
  const pairs = [];
  before.forEach((photo) => {
    const key = pairKey(photo.name, "before");
    const matchingPhotos = afterByKey.get(key);
    const pairIndex = pairCounts.get(key) || 0;
    if (matchingPhotos && matchingPhotos[pairIndex]) {
      pairs.push({
        before: photo.url,
        after: matchingPhotos[pairIndex].url,
      });
      pairCounts.set(key, pairIndex + 1);
    }
  });
  return pairs;
}

function pairKey(filename, side) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(new RegExp(`(^|[\\s_-])${side}($|[\\s_-])`, "i"), "$1$2")
    .replace(/[\s_-]+/g, " ")
    .trim()
    .toLowerCase();
}

function cleanLine(value, maxLength) {
  return String(value || "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function responsePage(ok) {
  const title = ok ? "Enquiry received" : "Enquiry not sent";
  const message = ok
    ? "Thank you. Your enquiry has been emailed to Luxe Interior."
    : "We could not send your enquiry. Please call Luxe Interior at +91 99179 93855.";
  const color = ok ? "#a9c98c" : "#e8a99d";

  return HtmlService.createHtmlOutput(`<!doctype html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title} | Luxe Interior</title>
        <style>
          body {
            display: grid;
            min-height: 100vh;
            place-items: center;
            margin: 0;
            padding: 24px;
            color: #eee9df;
            background: #11110f;
            font: 16px/1.7 Arial, sans-serif;
          }
          main { width: min(100%, 560px); }
          h1 {
            margin: 0 0 14px;
            color: ${color};
            font: 400 clamp(36px, 8vw, 56px)/1.1 Georgia, serif;
          }
          p { color: #b7b0a4; }
          a { color: #e4bd7d; }
        </style>
      </head>
      <body>
        <main>
          <h1>${title}</h1>
          <p>${message}</p>
          <p>You can close this tab and return to the website.</p>
        </main>
      </body>
    </html>`).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
