import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const write = async () => {
  const { stdin } = process;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const targetFile = path.join(__dirname, "files", "fileToWrite.txt");

  const writableStream = fs.createWriteStream(targetFile);

  stdin.on("data", (chunk) => {
    writableStream.write(chunk);
  });

  stdin.on("end", () => {
    writableStream.end();
  });
};

await write();
