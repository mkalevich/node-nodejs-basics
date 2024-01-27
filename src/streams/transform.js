import { Transform } from "stream";

const transform = async () => {
  const { stdin, stdout } = process;

  const reverseTextTransformStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split("").reverse().join("");

      callback(null, reversedChunk);
    },
  });

  stdin.pipe(reverseTextTransformStream).pipe(stdout);
};

await transform();
