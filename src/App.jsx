import Login from "./components/Login/Login";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import List from "./components/list/List";
import Notification from "./components/notification/Notification";

const App = () => {
  const user = true;
  return (
    <div className="chat-container">
      {user ? (
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
