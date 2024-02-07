import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const targetFile = path.join(__dirname, "files", "fileToRead.txt");

  const { stdout } = process;

  const readableStream = fs.createReadStream(targetFile);
  readableStream.on("data", (chunk) => {
    stdout.write(chunk);
  });
};

await read();
