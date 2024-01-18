import PropTypes from "prop-types";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/ApiRoutes";
import { useEffect, useRef, useState } from "react";

function ChatContainer({ currentChat, darkMode, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const scrollRef = useRef();

  const handleSendMessage = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-message", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message-received", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg.message });
        // setUnreadMessagesCount((prevCount) => prevCount + 1);
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getAllMessages = async () => {
      if (currentChat) {
        const res = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(res.data);
      }
    };
    getAllMessages();
  }, [currentChat]);

  return (
    <main
      className={`flex-1 rounded-lg mx-6 ${
        darkMode ? "bg-neutral-700" : "bg-slate-300"
      }`}
    >
      <div
        className={`flex items-center justify-between mx-4 ${
          darkMode ? "text-white" : "text-slate-700"
        }`}
      >
        <div className="flex items-center">
          <div>
            <img
              className="h-14 w-14 p-2"
              src={`data:image/svg+xml;base64,${currentChat.avatar}`}
              alt=""
            />
          </div>
          <h3>{currentChat.username}</h3>
        </div>
      </div>
      <div className="flex flex-col">
        {/* <Messages /> */}
        <div className="p-2 flex flex-col gap-1 overflow-auto min-h-[420px] max-h-[420px]">
          {messages.map((message, index) => (
            <div
              ref={scrollRef}
              key={index}
              className={`flex items-center ${
                message.fromSelf ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[40%] p-2 rounded-lg my-2 ${
                  darkMode && message.fromSelf && "text-white bg-stone-600"
                } ${darkMode && !message.fromSelf && "text-white bg-stone-800"} 
                ${
                  !darkMode &&
                  message.fromSelf &&
                  "text-slate-700 bg-emerald-200"
                } 
                ${
                  !darkMode &&
                  !message.fromSelf &&
                  "text-slate-700 bg-amber-200"
                } 
                
                `}
              >
                <p>{message.message}</p>
              </div>
            </div>
          ))}
        </div>
        <ChatInput handleSendMessage={handleSendMessage} darkMode={darkMode} />
      </div>
    </main>
  );
}

ChatContainer.propTypes = {
  currentChat: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
  currentUser: PropTypes.shape({
    _id: PropTypes.string,
  }),
  darkMode: PropTypes.bool,
  socket: PropTypes.object,
};

export default ChatContainer;
