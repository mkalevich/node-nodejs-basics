import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const calculateHash = async () => {
  const hash = crypto.createHash("sha256");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const pathToTargetFile = path.join(
    __dirname,
    "files",
    "fileToCalculateHashFor.txt",
  );

  const readableStream = fs.createReadStream(pathToTargetFile);

  readableStream.on("readable", () => {
    const data = readableStream.read();

    if (data) {
      hash.update(data);
    } else {
      console.log(hash.digest("hex"));
    }
  });
};

await calculateHash();
