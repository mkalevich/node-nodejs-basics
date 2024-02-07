import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const oldFolder = join(__dirname, "files");
  const newFolder = join(__dirname, "files_copy");

  fs.access(oldFolder, fs.constants.F_OK, (noSuchFile) => {
    if (noSuchFile) {
      throw new Error("FS operation failed");
    } else {
      fs.access(newFolder, fs.constants.F_OK, (noSuchFile) => {
        if (noSuchFile) {
          fs.cp(oldFolder, newFolder, { recursive: true }, (err) => {
            if (err) {
              throw err;
            }
          });
        } else {
          throw new Error("FS operation failed");
        }
      });
    }
  });
};

await copy();
