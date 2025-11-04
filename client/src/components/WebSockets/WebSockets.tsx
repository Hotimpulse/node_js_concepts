import { useRef, useState } from "react";
import styles from "./webSockets.module.scss";
import CustomBtn from "../../ui/CustomBtn";

type TMessage = {
  message: string;
  id: number;
  username: string;
  event: string;
  date: string;
};

export default function WebSockets() {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [value, setValue] = useState<string>("");
  const socket = useRef<WebSocket>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const connect = () => {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.onopen = () => {
      setConnected(true);

      const message = {
        event: "connection",
        id: Date.now() + Math.random(),
        username,
        date: new Date().toISOString()
      };

      socket?.current?.send(JSON.stringify(message));

      console.log(`Connection established!`);
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };

    socket.current.onclose = () => {
      console.log(`Socket closed`);
    };

    socket.current.onerror = () => {
      console.log(`Socket errored out`);
    };
  };

  const handleSendMessage = async () => {
    if (!value.trim() || !socket.current) return;

    try {
      const message = {
        event: "message",
        id: Date.now() + Math.random(),
        username,
        message: value.trim(),
        date: new Date().toISOString()
      };
      socket.current.send(JSON.stringify(message));
      setValue("");
    } catch (error) {
      console.error(error);
    }
  };

  if (!connected) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Type your name"
          />
          <CustomBtn buttonText="Enter" type="submit" onClick={connect} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
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
        {messages.map((item: TMessage) => (
          <div className={styles.message} key={item.id}>
            {item.event === "connection" ? (
              <div className={styles.message_connected}>
                {`User ${item.username} connected`}
                <p className={styles.timestamp}>
                  {new Date(item.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            ) : (
              <div className={styles.message}>
                <div className={styles.messageHeader}>
                  <strong>{item.username}</strong>
                  <p className={styles.timestamp}>
                    {new Date(item.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
                <div>{item.message}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
