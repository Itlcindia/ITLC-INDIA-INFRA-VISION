const fs = require("fs");
const path = require("path");

const rootApi = path.join(__dirname, "..", "api");
const publicApi = path.join(__dirname, "..", "client", "public", "api");

function copyRecursiveSync(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(rootApi)) {
  copyRecursiveSync(rootApi, publicApi);
  console.log("Synchronized api/ -> client/public/api/");
}