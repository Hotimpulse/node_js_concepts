import express from "express";
import cors from "cors";
import events from "node:events";

const PORT = 5000;

const emitter = new events.EventEmitter();
emitter.setMaxListeners(0);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/get-messages", (req, res) => {
  const handler = (message) => {
    res.json(message);
  };

  emitter.once("newMessage", handler);

  req.on("close", () => {
    emitter.removeListener("newMessage", handler);
  });
});

app.post("/new-messages", (req, res) => {
  const message = req.body;
  emitter.emit("newMessage", message);
  res.status(200).json(message);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
