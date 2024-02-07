import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToRemove = "fileToRemove.txt";

  const pathToFilesFolder = path.join(__dirname, "files");

  fs.readdir(pathToFilesFolder, (err, data) => {
    const isFileToRemoveExists = data.includes(fileToRemove);

    if (isFileToRemoveExists) {
      fs.unlink(
        path.join(path.join(pathToFilesFolder, fileToRemove)),
        (err) => {
          if (err) throw err;
        },
      );
    } else {
      throw new Error("FS operation failed");
    }
  });
};

await remove();
