import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useEffect, useRef, useState } from "react";
import { BsChatFill } from "react-icons/bs";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { ImHome } from "react-icons/im";

export const Chat = (props) => {
  //sending the msg
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = collection(db, "messages"); //to specify which collection of those

  //listing the msg in the room
  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", props.room),
      orderBy("createdAt")
    ); //create query to search doc in collection
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      scrollToBottom();
      //   console.log(messages)
    });
    return () => unsubscribe();
  }, []);

  //sending msg
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage == "") return;

    await addDoc(messageRef, {
      //create and add msg as doc
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: props.room,
    });

    setNewMessage(""); //reinitialize the msg
  };

  //timeconversion
  const formatDate = (timestamp) => {
    if (!timestamp) return ""; // Handle case where timestamp is null or undefined

    const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
    return date.toLocaleString(); // Format the date as needed
  };

  //scrolldowntobuttom
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;
      setIsVisible(!scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-[#292F3F]">
      <div className="bg-[#272A35] px-7 py-5 flex text-white font-semibold text-3xl">
      <div className="mr-20">
          <ImHome
            className="cursor-pointer"
            onClick={() => {
              window.location.reload();
            }}
          />
        </div>
        <h1 className="" style={{justifySelf: "center"}}>Chatroom ~ {props.room}</h1>
      </div>
      <div className="px-5">
        <div className="pb-24">
          <div className="flex flex-col">
            {messages.map((message) => {
              const isCurrentUser =
                message.user === auth.currentUser.displayName;
              return (
                <div
                  className={`flex flex-col text-white mt-5 px-2 py-1 rounded-[10px] max-w-xs break-words ${
                    isCurrentUser
                      ? "bg-[#272A35] self-end"
                      : "bg-[#373e4e] self-start"
                  }`}
                  key={message.id}
                >
                  <span className="font-semibold text-lg">
                    {isCurrentUser ? "" : message.user}
                  </span>
                  <h1 className="mt-2">{message.text}</h1>
                  <h1 className="text-right mt-2 text-xs text-gray-400">
                    {formatDate(message.createdAt)}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <form
        className="fixed bottom-0 px-10 mb-5 w-screen flex flex-col items-center "
        onSubmit={handleSubmit}
      >
        <div
          className={`self-end w-[35px] h-[35px] rounded-[50px] bg-[#00AC83] flex justify-center items-center cursor-pointer ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
          } transition-opacity transition-transform duration-500 ease-in-out`}
          onClick={scrollToBottom}
        >
          <MdOutlineKeyboardDoubleArrowDown className="w-[34px] h-[33px] fill-gray-200" />
        </div>
        <div className="flex w-full mt-5 gap-3 justify-center">
          <input
            placeholder="Type your message here..."
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            value={newMessage}
            className="w-4/5 h-[45px] rounded-[10px] px-3 bg-[#1f232f] focus:outline-none text-white" //reinitialize the field
          />
          <button
            className={`text-center bg-[#837dff] w-[40px] h-[40px] rounded-[10px] flex justify-center items-center  ${
              newMessage ? "" : "hidden"
            }`}
            type="submit"          >
            <BsChatFill className="fill-white" />
          </button>
        </div>
      </form>
    </div>
  );
};
