import { useEffect, useState } from "react";
import CustomBtn from "./components/CustomBtn";
import styles from "./longPolling.module.scss";
import axios from "axios";

type TMessage = {
  message: string;
  id: number;
};

export default function LongPolling() {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [value, setValue] = useState<string>("");

  const subscribeToMsgs = async (signal: AbortSignal) => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages", {
        signal // Pass the abort signal to axios
      });
      setMessages((prev) => {
        // Prevent duplicate messages
        if (prev.some((msg) => msg.id === data.id)) {
          return prev;
        }
        return [data, ...prev];
      });
      return true;
    } catch (error) {
      if (axios.isCancel(error)) {
        return false;
      }
      console.log(error);
      return true;
    }
  };

  const handleSendMessage = async () => {
    if (!value.trim()) return; // Don't send empty messages

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
    const controller = new AbortController();
    let isSubscribed = true;

    const poll = async () => {
      while (isSubscribed) {
        const shouldContinue = await subscribeToMsgs(controller.signal);
        if (!shouldContinue) break;
      }
    };

    poll();

    return () => {
      isSubscribed = false;
      controller.abort(); // Cancel any pending requests
    };
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
