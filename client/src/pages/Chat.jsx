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
  const [unreadMessagesCount, setUnreadMessagesCount] = useState({});
  const [allUsers, setAllusers] = useState([]);

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
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket.current) {
      const getAllUsers = async () => {
        try {
          const res = await fetch(allUsersRoute);
          const data = await res.json();
          return new Promise((resolve, reject) => {
            resolve(data);
          });
        } catch (error) {
          console.log(error);
        }
      };
      getAllUsers().then((data) => setAllusers(data));
    }
  }, [socket]);

  useEffect(() => {
    if (allUsers.length > 0) {
      socket.current.on("message-received", (data) => {
        if (data) {
          allUsers.forEach((element) => {
            if (element._id === data.from) {
              setUnreadMessagesCount((prev) => ({
                ...prev,
                [data.from]: (prev[data.from] || 0) + 1,
              }));
            }
          });
        }
        // console.log(data);
      });
    }
  }, [allUsers]);

  // console.log(Object.keys(unreadMessagesCount).toString());
  allUsers.forEach((element) => {
    if (Object.keys(unreadMessagesCount).toString() == element._id) {
      console.log("equal", element._id, Object.keys(unreadMessagesCount));
    } else {
      console.log("not");
    }
  });

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
          unreadMessagesCount={unreadMessagesCount}
          allUsers={allUsers}
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
