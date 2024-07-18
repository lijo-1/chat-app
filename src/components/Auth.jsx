import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";

import { FcGoogle } from "react-icons/fc";

const cookie = new Cookies();

export const Auth = (props) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("auth-token", result.user.refreshToken);
      props.setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#292F3F]">
    <div className="bg-[#272A35] p-8 rounded-[18px] shadow-lg flex flex-wrap justify-center items-center" style={{boxShadow: "20px 24px 34px #000000"}}>
      <h1 className="text-5xl font-bold mb-4 text-white w-full text-center">Chatter Box</h1>
      {/* <p className="mb-4 text-gray-600">Sign in with Google<  /p> */}
      <button
        onClick={signInWithGoogle}
        className="mt-5 bg-gray-200 font-medium w-[130px] h-[40px] py-1 px-3 rounded-[10px] hover:bg-black hover:text-white flex justify-center items-center gap-2 border border-black"
      ><FcGoogle className="w-7 h-7"/>
        Sign in
      </button>
    </div>
  </div>
  );
};
