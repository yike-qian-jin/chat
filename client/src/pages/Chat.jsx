import Contacts from "../components/Contacts";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { allUsersRoute, host } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import DarkMode from "../components/DarkMode";
import Logo from "../utils/chitchat.avif";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { darkMode } = useSelector((state) => state.theme);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  const socket = useRef();
  const [userStatus, setUserStatus] = useState({});

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser.isAvatarImageSet) {
        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data);
      } else navigate("/setAvatar");
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host, {
        query: { userId: currentUser._id },
      });
      socket.current.emit("add-user", currentUser._id);
      socket.current.on("userStatus", (onlineUsers) => {
        setUserStatus(onlineUsers);
        console.log(onlineUsers);
      });
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  // const disconnectSocket = () => {
  //   if (socket.current) {
  //     socket.current.disconnect();
  //   }
  // };

  // useEffect(() => {
  //   socket.current.on("disconnect", () => {
  //     const newArr = Object.keys(userStatus).filter(
  //       (dcCurrentUser) => dcCurrentUser !== currentUser._id
  //     );
  //     console.log(newArr);
  //   });
  // });

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-white"}`}>
      <DarkMode />
      {/* <button onClick={disconnectSocket}>dc</button> */}
      <div className="flex items-center justify-center gap-4">
        <img
          src={Logo}
          alt=""
          className="h-20 w-20 object-cover rounded-full"
        />
        <h3 className={`${darkMode && "text-white"}`}>Chat</h3>
      </div>
      <div
        className={`max-w-4xl mx-auto mt-6 flex flex-col sm:flex-row rounded-md p-2 ${
          darkMode ? "bg-zinc-800" : "bg-slate-100"
        }`}
      >
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          darkMode={darkMode}
          changeChat={handleChatChange}
          userStatus={userStatus}
          socket={socket}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} darkMode={darkMode} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            darkMode={darkMode}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
}

export default Chat;
