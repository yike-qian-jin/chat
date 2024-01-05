import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import DarkMode from "../components/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-spinkit";
import Logo from "../utils/chitchat.avif";
import { updateUser } from "../redux/user/userSlice";

function SetAvatar() {
  const avatarApi = "https://api.multiavatar.com";
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { darkMode } = useSelector((state) => state.theme);
  const toastTheme = darkMode ? "dark" : "light";
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    const imageData = [];
    try {
      for (let i = 0; i < 4; i++) {
        const res = await axios.get(
          `${avatarApi}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(res.data);
        imageData.push(buffer.toString("base64"));
      }
      setAvatars(imageData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAvatar = async () => {
    if (selectedAvatar === null) {
      toast.error("Please select an avatar", {
        theme: toastTheme,
      });
    } else {
      try {
        const { data } = await axios.post(
          `${setAvatarRoute}/${currentUser._id}`,
          {
            avatar: avatars[selectedAvatar],
          }
        );
        if (data.isSet) {
          dispatch(updateUser({ avatar: data.avatar, isAvatarImageSet: true }));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col min-h-screen items-center justify-center">
          <img
            src={Logo}
            alt=""
            className="h-40 w-40 object-cover rounded-full"
          />
          <Spinner name="cube-grid" color="black" />
        </div>
      ) : (
        <div
          className={`${
            darkMode ? "bg-zinc-900" : "bg-white"
          }  min-h-screen flex flex-col`}
        >
          <DarkMode />
          <div className="flex flex-col gap-8 items-center flex-1 justify-center">
            <h1 className={`${darkMode && "text-white"} text-2xl`}>
              Pick an Avatar as your Profile Picture
            </h1>
            <div className="flex gap-8">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`${
                    selectedAvatar === index
                      ? `border-4 rounded-full ${
                          darkMode ? "border-white" : "border-black"
                        }`
                      : ""
                  }`}
                >
                  <img
                    onClick={() => setSelectedAvatar(index)}
                    className="h-20 w-20 cursor-pointer"
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <button
              className="text-white p-3 bg-indigo-600 rounded-lg"
              onClick={handleAvatar}
            >
              Choose and Confirm Avatar
            </button>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default SetAvatar;
