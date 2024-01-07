import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiPowerOff } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Contacts({ contacts, currentUser, darkMode, changeChat }) {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {currentUsername && currentUserAvatar && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col overflow-auto gap-2 max-h-[400px]">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row items-center rounded-lg cursor-pointer ${
                    darkMode ? "bg-zinc-700" : "bg-slate-300"
                  } ${
                    index === currentSelected &&
                    (darkMode ? "border-2" : "border-2 border-black")
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div>
                    <img
                      className="h-20 w-20 p-1"
                      src={`data:image/svg+xml;base64,${contact.avatar}`}
                      alt=""
                    />
                  </div>
                  <h3
                    className={`${
                      darkMode ? "text-white" : "text-slate-700"
                    } p-1`}
                  >
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
            <div className="p-1">
              <img
                className="h-20 w-20 p-1"
                src={`data:image/svg+xml;base64,${currentUser.avatar}`}
                alt=""
              />
            </div>
            <h3>{currentUser.username}</h3>
          </div>
          <div
            className={`bottom-1 flex items-center gap-2 cursor-pointer `}
            onClick={logoutUser}
          >
            <span className={`${darkMode ? "text-white" : "text-slate-700"} `}>
              logout
            </span>
            <button
              className={`${darkMode ? "bg-white" : "bg-black"} p-1 rounded-lg`}
            >
              <BiPowerOff
                className={`${darkMode ? "" : "bg-black text-white"}`}
              />
            </button>
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
