import React, { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import LoginForm from './components/LoginForm';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserServise';

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (!store.isAuth) {
    return (
      <>
        <div>
          <button onClick={getUsers}>Get users</button>
        </div>
        <LoginForm />
      </>
    );
  }
  return (
    <div className="App">
      <h1>User {store.isAuth ? `${store.user.email} is` : "is not"} authorized</h1>
      <h1>{store.user.isActivated ? "Account is activated" : "Please, activate your account"}</h1>
      <button onClick={() => store.logout()}>Log out</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map(user =>
        <div key={user.email}>{user.email}</div>
      )}
    </div>
  );
}

export default observer(App);
