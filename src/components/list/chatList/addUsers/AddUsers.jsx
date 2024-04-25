import './addusers.css';

const AddUsers = () => {
    return (
        <div className='addUsers'>
            <form>
                <input type="text" placeholder='Username' name='username' />
                <button>Search</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Jhon Doe</span>
                </div>
                <button>Add user</button>
            </div>
        </div>
    );
};

export default AddUsers;