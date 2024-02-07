import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const rename = () => {
  // Write your code here
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fileName = join(__dirname, "files", "wrongFilename.txt");
  const newFileName = join(__dirname, "files", "properFilename.md");

  fs.access(fileName, fs.constants.F_OK, (noSuchFile) => {
    if (noSuchFile) {
      throw new Error("FS operation failed");
    } else {
      fs.access(newFileName, fs.constants.F_OK, (noSuchFile) => {
        if (noSuchFile) {
          fs.rename(fileName, newFileName, (err) => {
            if (err) throw err;
          });
        } else {
          throw new Error("FS operation failed");
        }
      });
    }
  });
};

await rename();
