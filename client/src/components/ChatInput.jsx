import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import PropTypes from "prop-types";
import { useState } from "react";

function ChatInput({ darkMode, handleSendMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event) => {
    const sym = event.unified.split("_");
    const codeArray = [];
    sym.forEach((element) => {
      codeArray.push("0x" + element);
    });
    let emoji = String.fromCodePoint(...codeArray);
    setMessage(message + emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center gap-4 px-2">
      <div className="relative">
        <BsEmojiSmileFill
          onClick={handleEmojiPicker}
          className={` ${
            darkMode ? "text-stone-900" : "text-slate-500"
          } cursor-pointer`}
        />
        {showEmojiPicker && (
          <Picker
            onEmojiClick={handleEmojiClick}
            className="absolute top-[-370px] left-6 max-h-[350px] max-w-[300px]"
          />
        )}
      </div>
      <form
        onSubmit={(e) => sendChat(e)}
        className={`flex items-center w-full  rounded-2xl ${
          darkMode ? "bg-zinc-600" : "bg-slate-100"
        }`}
      >
        <input
          type="text"
          placeholder="message..."
          className="p-1 w-[95%] bg-transparent border-none outline-none"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          className={` px-5 py-2 rounded-2xl ${
            darkMode ? "bg-stone-800" : "bg-slate-400"
          }`}
        >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

ChatInput.propTypes = {
  darkMode: PropTypes.bool,
  handleSendMessage: PropTypes.func,
};

export default ChatInput;
