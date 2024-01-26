import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fileName = join(__dirname, "files", "fresh.txt");
  const text = "I am fresh and young";

  fs.access(fileName, fs.constants.F_OK, (noSuchFile) => {
    if (noSuchFile) {
      fs.writeFile(fileName, text, (err) => {
        if (err) {
          throw err;
        }
      });
    } else {
      throw new Error("FS operation failed");
    }
  });
};

await create();
