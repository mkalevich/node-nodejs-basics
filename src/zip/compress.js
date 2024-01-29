import zlib from "zlib";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const fileToCompress = path.join(__dirname, "files", "fileToCompress.txt");

  const gzip = zlib.createGzip();
  const input = fs.createReadStream(fileToCompress);
  const output = fs.createWriteStream(
    path.join(__dirname, "files", "archive.gz"),
  );

  input.pipe(gzip).pipe(output);
};

await compress();
