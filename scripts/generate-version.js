const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const count = execSync("git rev-list --count HEAD").toString().trim();

fs.writeFileSync(
  path.join(__dirname, "..", "version.json"),
  JSON.stringify({ version: Number(count) }, null, 2) + "\n"
);
