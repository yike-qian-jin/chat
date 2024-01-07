import Robot from "../utils/robot.gif";
import PropTypes from "prop-types";

function Welcome({ currentUser, darkMode }) {
  return (
    <div
      className={`flex flex-col flex-1 items-center justify-center ${
        darkMode ? "text-white" : "text-slate-700"
      }`}
    >
      <img src={Robot} alt="" className="h-80" />
      <h1 className="font-semibold text-2xl">
        Welcome, {currentUser.username}!
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </div>
  );
}

Welcome.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
  }),
  darkMode: PropTypes.bool,
};

export default Welcome;
