import { signOut } from "firebase/auth";
import { useRef } from "react";
import { auth } from "../firebase-config";

export const Room = (props) => {
  const roomInputRef = useRef(null);
  const signUserOut = async () => {
    await signOut(auth);
    props.cookie.remove("auth-token");
    props.setIsAuth(false);
    props.setRoom(null);
  };
  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#292F3F]">
    <div className="p-14 bg-[#272A35] p-8 rounded-[18px] shadow-lg flex flex-col justify-center items-center" style={{boxShadow: "20px 24px 34px #000000"}}>
        <div className="w-full text-center">
          <input ref={roomInputRef} className="ml-4 px-2 w-[340px] h-[40px] rounded-[10px] bg-[#292F3F]  text-white focus:outline-none" placeholder="Enter Room Name"/>
        </div>
        <div className="flex mt-8 gap-3 justify-center items-center">
          <button
            className="= w-[130px] h-[40px] bg-[#00AC83] text-white rounded-[10px]  font-light"
            onClick={() => props.setRoom(roomInputRef.current.value)}
          >
            Enter Chat
          </button>
          {/* signout */} 
          <button
            onClick={() => signUserOut()}
           className=" w-[130px] h-[40px] bg-[#f18303] text-white rounded-[10px]  font-light"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
