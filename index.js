// import express from "express";

// const app = express();
// const port = process.env.PORT || 3000;

// app.get("/non-blocking", (req, res) => {
//   res.status(200).send("This page is non-blocking");
// });

// app.get("/blocking", async (req, res) => {
//   let counter = 0;
//   for (let i = 0; i < 20_000_000_000; i++) {
//     counter++;
//   }

//   res.status(200).send(`result is ${counter}`);
// });

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

import fs from "node:fs";
import path from "node:path";
import util from "node:util";
import process from "node:process";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";

const filePath = "./file.txt";
fs.watch(filePath, "utf-8").on("change", function () {
  let pathName = path.basename(filePath);
  console.log(pathName);
});

const strem = fs.createReadStream("file.txt");
const strem2 = new Readable.from(["RSSchool", "NodeJS", "Course"]);
const pro = process.stdout;
const typ1 = fs.promises.readFile("file.txt");
const tp2 = fs.promises.readFileToStream;

// const debuglog = util.debuglog("LEV_MAN");
// debuglog("YOOOO from [%d]", 123);

