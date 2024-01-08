import PropTypes from "prop-types";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

function ChatContainer({ currentChat, darkMode }) {
  const handleSendMessage = async (msg) => {
    console.log(msg);
  };

  return (
    <main
      className={`flex-1 rounded-lg mx-6 ${
        darkMode ? "bg-neutral-700" : "bg-slate-300"
      }`}
    >
      <div
        className={`flex items-center justify-between mx-4 ${
          darkMode ? "text-white" : "text-slate-700"
        }`}
      >
        <div className="flex items-center">
          <div>
            <img
              className="h-14 w-14 p-2"
              src={`data:image/svg+xml;base64,${currentChat.avatar}`}
              alt=""
            />
          </div>
          <h3>{currentChat.username}</h3>
        </div>
      </div>
      <div className="flex flex-col">
        <Messages />
        <ChatInput handleSendMessage={handleSendMessage} darkMode={darkMode} />
      </div>
    </main>
  );
}

ChatContainer.propTypes = {
  currentChat: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
  darkMode: PropTypes.bool,
};

export default ChatContainer;
