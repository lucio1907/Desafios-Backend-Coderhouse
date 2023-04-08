import express from "express";
import cluster from "cluster";
import os from "os";
import router from "./routes/mainRoutes.routes.js";

const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || "fork";
const cpus = os.cpus().length;

if (cluster.isPrimary && MODE === "cluster") {
    console.log(`Primary pid ${process.pid} is running on port ${PORT}, Mode = ${MODE}`);

    for (let i = 0; i <= cpus; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} killed`);
    });
} else {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/", router);
 
    app.listen(PORT, () => console.log("Server up!"));
}
