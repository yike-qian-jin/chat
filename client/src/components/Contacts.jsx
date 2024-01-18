import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiPowerOff } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Contacts({
  contacts,
  currentUser,
  darkMode,
  changeChat,
  userStatus,
  socket,
  unreadMessagesCount,
  allUsers,
}) {
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
    if (socket.current) {
      socket.current.disconnect();
    }

    // socket.current.on("disconnect", () => {
    //   const newArr = Object.keys(userStatus).filter(
    //     (dcCurrentUser) => dcCurrentUser !== currentUser._id
    //   );
    //   console.log(newArr);
    // });

    dispatch(logout());
    navigate("/login");
  };

  // console.log(userStatus);

  return (
    <>
      {currentUsername && currentUserAvatar && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row sm:flex-col flex-wrap sm:flex-nowrap overflow-auto gap-2 max-h-[400px]">
            {contacts.map((contact, index) => {
              const isUserOnline = Object.keys(userStatus).includes(
                contact._id
              );
              return (
                <div
                  key={index}
                  className={`relative flex flex-row items-center rounded-lg cursor-pointer max-w-[200px] ${
                    darkMode ? "bg-zinc-700" : "bg-slate-300"
                  } ${
                    index === currentSelected &&
                    (darkMode ? "border-2" : "border-2 border-black")
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  {/* {allUsers.forEach((element) => {
                    if (Object.keys(unreadMessagesCount) == element._id) {
                      return (
                        <div className="p-3 flex items-center justify-center absolute bg-red-500 top-[-10px] right-0 rounded-full h-4 w-4 text-white">
                          2
                        </div>
                      );
                    }
                  })} */}
                  {/* <p className="p-3 flex items-center justify-center absolute bg-red-500 top-[-10px] right-0 rounded-full h-4 w-4 text-white">
                    25
                  </p> */}
                  <div>
                    <img
                      className="h-10 w-10 sm:h-20 sm:w-20 p-1"
                      src={`data:image/svg+xml;base64,${contact.avatar}`}
                      alt=""
                    />
                  </div>
                  <div
                    className={`flex flex-col ${
                      darkMode ? "text-white" : "text-slate-700"
                    } p-1`}
                  >
                    <h3>{contact.username}</h3>
                    <p
                      className={`text-sm  ${
                        isUserOnline ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isUserOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`${
              darkMode && "text-white"
            } flex justify-center items-center gap-2`}
          >
            <div className="p-1 flex flex-col items-center gap-2 sm:flex-row">
              <img
                className="h-10 w-10 sm:h-20 sm:w-20 p-1"
                src={`data:image/svg+xml;base64,${currentUser.avatar}`}
                alt=""
              />
              <h3
                className={`${darkMode ? "text-white" : "text-slate-700"} my-2`}
              >
                {currentUser.username}
              </h3>
            </div>
          </div>
          <div
            className={`bottom-1 flex items-center gap-2 cursor-pointer `}
            onClick={logoutUser}
          >
            <span
              className={`${darkMode ? "text-white" : "text-slate-700"} my-2`}
            >
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
    _id: PropTypes.string,
    avatar: PropTypes.string,
    username: PropTypes.string,
  }),
  darkMode: PropTypes.bool,
  changeChat: PropTypes.func,
  userStatus: PropTypes.object,
  socket: PropTypes.object,
};

export default Contacts;
