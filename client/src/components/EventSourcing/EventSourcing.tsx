import { useEffect, useState } from "react";
import styles from "./eventSourcing.module.scss";
import axios from "axios";
import CustomBtn from "../../ui/CustomBtn";

type TMessage = {
  message: string;
  id: number;
};

export default function EventSourcing() {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [value, setValue] = useState<string>("");

  const subscribeToMsgs = async () => {
    const eventSource = new EventSource("http://localhost:5000/connect");
    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
  };

  const handleSendMessage = async () => {
    if (!value.trim()) return;

    try {
      const message = {
        message: value.trim(),
        id: Date.now()
      };
      await axios.post("http://localhost:5000/new-messages", message);
      setValue("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    subscribeToMsgs();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Type your stuff"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <CustomBtn buttonText="Send" type="submit" onClick={handleSendMessage} />
        </div>
        <div className={styles.messages}>
          {messages.map((item: TMessage, idx: number) => (
            <div className={styles.message} key={idx}>
              {item.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
