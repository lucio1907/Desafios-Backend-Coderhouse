import os from "os";

const cpus = os.cpus().length;

const info = {
    nodeVersion: process.version,
    platform: process.platform,
    directory: process.cwd(),
    processID: process.pid,
    memoryUsage: process.memoryUsage(),
    reservedMemoryRSS: process.memoryUsage().rss,
    executionPath: process.execPath,
    entryArguments: process.argv,
    cpus
}

export default info;