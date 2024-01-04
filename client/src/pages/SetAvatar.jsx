import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";

function SetAvatar() {
  const avatarApi = "https://api.multiavatar.com";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

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

  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-screen">
      <h1 className="text-2xl">Pick an Avatar as your Profile Picture</h1>
      <div className="flex gap-4">
        {avatars.map((avatar, index) => (
          <div key={index}>
            <img
              onClick={() => setSelectedAvatar(index)}
              className="h-20 w-20 cursor-pointer"
              src={`data:image/svg+xml;base64,${avatar}`}
              alt=""
            />
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default SetAvatar;
