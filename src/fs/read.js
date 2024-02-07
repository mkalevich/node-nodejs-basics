import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesFolderPath = path.join(__dirname, "files");

  const { stdout } = process;

  fs.readFile(path.join(filesFolderPath, "fileToRead.txt"), (err, file) => {
    if (err) {
      throw new Error("FS operation failed");
    } else {
      stdout.write(file.toString());
    }
  });
};

await read();
