import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"

const App = () => {
  return (
    <div className="chat-container">
      <List></List>
      <Chat></Chat>
      <Details></Details>
    </div>
  )
}

export default App