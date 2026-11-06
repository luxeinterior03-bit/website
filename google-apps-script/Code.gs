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
  return HtmlService.createHtmlOutput(
    `<p>${ok ? "Enquiry submitted." : "Enquiry could not be submitted."}</p>`,
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
