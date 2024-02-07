import { Worker } from "worker_threads";
import os from "os";
import { fileURLToPath } from "url";
import path from "path";

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const workerPath = path.join(__dirname, "worker.js");

  const createWorkers = (workerPath) => {
    let coresAmount = os.cpus().length;

    let INCREMENTAL_NUMBER = 10;

    const workers = [];

    for (let i = 0; i < coresAmount; i++) {
      const worker = new Worker(workerPath, {
        workerData: INCREMENTAL_NUMBER,
      });

      workers.push(worker);
      INCREMENTAL_NUMBER += 1;
    }

    return workers;
  };

  const workers = createWorkers(workerPath);

  const createPromisesForWorkers = (workers) => {
    return workers.map((worker) => {
      return new Promise((resolve, reject) => {
        worker.on("message", resolve);
        worker.on("message", reject);
      });
    });
  };

  const workerPromises = createPromisesForWorkers(workers);

  const sendMessageToWorkers = (workerPromises) =>
    Promise.allSettled(workerPromises);

  const result = sendMessageToWorkers(workerPromises);

  const getStatusMessage = (status) =>
    status === "fulfilled" ? "resolved" : "error";

  const getData = (status, value) => (status === "fulfilled" ? value : null);

  const formattedResult = (await result).map(({ status, value }) => ({
    status: getStatusMessage(status),
    data: getData(status, value),
  }));

  console.log(formattedResult);

  return formattedResult;
};

await performCalculations();
