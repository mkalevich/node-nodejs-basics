import { spawn, exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const pathToScript = path.join(__dirname, "files", "script.js");

  const { stdin, stdout } = process;

  const childProcess = spawn("node", [pathToScript, ...args]);

  stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["someArgument1", "someArgument2"]);
