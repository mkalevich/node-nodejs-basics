import zlib from "zlib";
import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const gzip = zlib.createGunzip();

  const fileToDecompress = path.join(__dirname, "files", "archive.gz");
  const fileToWrite = path.join(__dirname, "files", "fileToCompress.txt");

  const input = fs.createReadStream(fileToDecompress);
  const output = fs.createWriteStream(fileToWrite);

  input.pipe(gzip).pipe(output);
};
await decompress();
