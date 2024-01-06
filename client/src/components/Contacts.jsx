import { useEffect, useState } from "react";
import Logo from "../utils/chitchat.avif";
import PropTypes from "prop-types";

function Contacts({ contacts, currentUser, darkMode, changeChat }) {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserAvatar(currentUser.avatar);
      setCurrentUsername(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUsername && currentUserAvatar && (
        <div className="flex flex-col flex-[0.5] gap-4">
          <div className="flex items-center justify-center gap-4">
            <img
              src={Logo}
              alt=""
              className="h-20 w-20 object-cover rounded-full"
            />
            <h3 className={`${darkMode && "text-white"}`}>Chat</h3>
          </div>
          <div className="flex flex-col overflow-auto gap-2 max-h-[400px]">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 rounded-lg cursor-pointer ${
                    darkMode ? "bg-zinc-700" : "bg-slate-300"
                  } ${index === currentSelected && "border-2"}`}
                  onClick={() => changeCurrentChat(index)}
                >
                  <div>
                    <img
                      className="h-20 w-20 p-2"
                      src={`data:image/svg+xml;base64,${contact.avatar}`}
                      alt=""
                    />
                  </div>
                  <h3 className={`${darkMode && "text-white"}`}>
                    {contact.username}
                  </h3>
                </div>
              );
            })}
          </div>
          <div
            className={`${
              darkMode && "text-white"
            } flex justify-center items-center gap-2`}
          >
            <div className="p-2">
              <img
                className="h-20 w-20 p-2"
                src={`data:image/svg+xml;base64,${currentUser.avatar}`}
                alt=""
              />
            </div>
            <div>
              <h3>{currentUser.username}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.array,
  currentUser: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string,
  }),
  darkMode: PropTypes.bool,
  changeChat: PropTypes.func,
};

export default Contacts;
