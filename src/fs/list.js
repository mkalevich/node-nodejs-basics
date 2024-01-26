import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesFolderPath = path.join(__dirname, "files");

  const { stdout } = process;

  fs.readdir(filesFolderPath, (err, data) => {
    if (err) {
      throw new Error("FS operation failed");
    } else {
      stdout.write(JSON.stringify(data));
    }
  });
};

await list();
