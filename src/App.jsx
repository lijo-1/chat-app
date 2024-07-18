import { useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import { Room } from "./components/Room";
import { Chat } from "./components/Chat";
import Cookies from "universal-cookie";

const cookie = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookie.get("auth-token"));
  const [room, setRoom] = useState(null);

  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }
  return <div>{room ? <Chat room={room} /> : <Room setRoom={setRoom} cookie={cookie} setIsAuth={setIsAuth} />}</div>;
}

export default App;
