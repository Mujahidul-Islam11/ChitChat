import { useEffect, useState } from 'react';
import './chatList.css';
import AddUsers from './addUsers/AddUsers';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase.config';
import { useUserStore } from '../../../lib/userStore';


const ChatList = () => {
    const [chats, setChats] = useState(false);
    const [addMode, setAddMode] = useState(false);

    const {currentUser} =  useUserStore();

    useEffect(()=> {
        const unSub = onSnapshot(doc(db, "userChats", currentUser.id), (doc) => {
            setChats(doc.data())
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

            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Jhon Doe</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Jhon Doe</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Jhon Doe</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Jhon Doe</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Jhon Doe</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Jhon Doe</span>
                    <p>Hello</p>
                </div>
            </div>
            {addMode && <AddUsers></AddUsers>}
        </div>
    );
};

export default ChatList;