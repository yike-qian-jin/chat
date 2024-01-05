import Light from "../utils/light.png";
import Dark from "../utils/dark.avif";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

function DarkMode() {
  const dispatch = useDispatch();

  return (
    <div className="p-2 flex gap-2 justify-end">
      <img
        className="h-10 w-10 object-cover rounded-full cursor-pointer"
        onClick={() => dispatch(toggleTheme(true))}
        src={Dark}
        alt=""
      />
      <img
        className="h-10 w-10 object-cover rounded-full cursor-pointer"
        onClick={() => dispatch(toggleTheme(false))}
        src={Light}
        alt=""
      />
    </div>
  );
}

export default DarkMode;
