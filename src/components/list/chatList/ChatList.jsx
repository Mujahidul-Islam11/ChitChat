import { useEffect, useState } from 'react';
import './chatList.css';
import AddUsers from './addUsers/AddUsers';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase.config';
import { useUserStore } from '../../../lib/userStore';


const ChatList = () => {
    const [chats, setChats] = useState(false);
    const [addMode, setAddMode] = useState(false);

    const {currentUser} =  useUserStore();

    useEffect(()=> {
        const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async(res) => {
            const items = res.data().chats;

            const promises = items.map(async(item) => {
                const userDocRef = doc(db, "user", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();
                return {...item, user}
            })
            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a, b) => {b.updatedAt - a.updatedAt}))
        });

        return () => {
            unSub()
        }
    }, [currentUser])
    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder='Search' />
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className='add'
                onClick={() => setAddMode(!addMode)}/>
            </div>

            {chats?.map(chat => <div key={chat.chatId} className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Jhon Doe</span>
                    <p>{chat.lastMessage}</p>
                </div>
            </div>)}
            {addMode && <AddUsers></AddUsers>}
        </div>
    );
};

export default ChatList;