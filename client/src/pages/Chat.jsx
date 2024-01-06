import Contacts from "../components/Contacts";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allUsersRoute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import DarkMode from "../components/DarkMode";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { darkMode } = useSelector((state) => state.theme);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser.isAvatarImageSet) {
        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data);
      } else navigate("/setAvatar");
    };
    fetchContacts();
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-white"}`}>
      <DarkMode />
      <div
        className={`max-w-4xl mx-auto mt-6 flex rounded-md p-2 ${
          darkMode ? "bg-zinc-800" : "bg-slate-100"
        }`}
      >
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          darkMode={darkMode}
          changeChat={handleChatChange}
        />
        <div>kgldflgldfgl</div>
      </div>
    </div>
  );
}

export default Chat;
