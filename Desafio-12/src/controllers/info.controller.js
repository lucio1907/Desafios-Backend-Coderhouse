import path from "path"

const showInfoHtml = (req, res) => {
    res.sendFile(path.resolve("public/pages/info.html"))
}

const showInfo = (req, res) => {
    const info = {
        argv: process.argv,
        os: process.platform,
        nodeVersion: process.version,
        rss: process.memoryUsage().rss,
        execPath: process.execPath,
        id: process.pid,
        dirname: process.cwd()
    }

    res.json(info);
}

export { showInfoHtml, showInfo }