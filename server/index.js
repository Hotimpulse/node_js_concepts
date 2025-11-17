import express from "express";
import { Worker } from "worker_threads";

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.status(200).send(`result is ${data}`);
  });

  worker.on("error", (error) => {
    res.status(404).send(`An error occured ${error}`);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// import path from "node:path";
// import util from "node:util";
// import process from "node:process";
// import { pipeline } from "node:stream/promises";
// import { createReadStream, createWriteStream } from "node:fs";
// import { createGzip } from "node:zlib";
// import { Readable } from "node:stream";
// import cores from "os";
// import { cpus } from "node:os";
// import { cpus } from "os";
// import http from "node:http";
// import fs from "node:fs";

// const filePath = "./file.txt";

// const content = `Some content!\n`;
// fs.appendFile("file.log", content, (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(`done!`);
//   }
// });

// fs.watch(filePath, "utf-8").on("fileChange", function () {
//   console.log(`File changed`);
// }); // not working

// fs.watch(filePath, "utf-8", function () {
//   console.log(`File changed`);
// }); // working

// fs.watch(filePath, "utf-8").on("change", function () {
//   console.log(`File changed`);
// }); // working

// fs.watchFile(filePath, "utf-8", function () {
//   console.log(`File changed`);
// }); not working

// const strem = fs.createReadStream("file.txt");
// console.log("🚀 ~ strem:", strem);
// const strem2 = new Readable.from(["RSSchool", "NodeJS", "Course"]);
// console.log("🚀 ~ strem2:", strem2);

// const pro = process.stdout;
// console.log("🚀 ~ pro:", pro) // 🚀 ~ pro: <ref *1> WriteStream

// const typ1 = fs.promises.readFile("file.txt");
// console.log("🚀 ~ typ1:", typ1) // 🚀 ~ typ1: Promise { <pending> }
// const tp2 = fs.promises.readFileToStream;
// console.log("🚀 ~ tp2:", tp2) // 🚀 ~ tp2: undefined

// const debuglog = util.debuglog("LEV_MAN");
// debuglog("YOOOO from [%d]", 123);
