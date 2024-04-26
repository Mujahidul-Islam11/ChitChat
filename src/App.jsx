import { useEffect } from "react";
import Login from "./components/Login/Login";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import List from "./components/list/List";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase.config";
import { useUserStore } from "./lib/userStore";

const App = () => {
  const {currentUser, isLoading, fetchUserInfo} = useUserStore()

  useEffect(()=> {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    })
    return () => {
      unSub();
    }
  }, [fetchUserInfo])


  if(isLoading) return <div className="loading">Loading...</div>
  return (
    <div className="chat-container">
      {currentUser ? (
        <>
          <List></List>
          <Chat></Chat>
          <Details></Details>
        </>
      ) : (
        <Login></Login>
      )}
      <Notification></Notification>
    </div>
  );
};

export default App;
