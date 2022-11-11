import { FC, useState } from "react";
import "./App.css";
import axios from "axios";

type Props = {
  id?: string;
  login: string;
  password: string;
  message: string;
  data?: {
    id: number;
    login: string;
    password: string;
    role: string;
    isAdmin: boolean;
  };
};

const App: FC = () => {
  const [props, setProps] = useState<Partial<Props>>({
    id: '',
    login: "",
    password: "",
    message: "",
  });

  const createUser = () => {
    axios
      .post("/api/user/create", {
        login: props.login,
        password: props.password,
      })
      .then((res) => setProps({ ...props, message: res.data.message }));
  };

  const getAllUser = () => {
    axios.get("/api/user/allUser").then((res) => console.log('All users: ', res.data));
  };

  const getUserById = () => {
    axios.get(`/api/user/get/${props.id}`).then(res => console.log('User find by id: ', res.data))
  }

  const changeUserData = () => {
    axios.put(`/api/user/change/${props.id}`).then(res => console.log('Change user: ', res.data));
  }

  const deleteUser = () => {
    axios.delete(`/api/user/delete/${props.id}`).then(res => setProps({ ...props, message: res.data.message }));
  }

  return (
    <div className="App">
      <div></div>
      <br />

      <div>
        <input
          type="number"
          value={props.id}
          onChange={(e) => setProps({ ...props, id: e.target.value })}
          placeholder="Input id..."
        />

        <input
          type="text"
          value={props.login}
          onChange={(e) => setProps({ ...props, login: e.target.value })}
          placeholder="Input login..."
        />

        <input
          type="password"
          value={props.password}
          onChange={(e) => setProps({ ...props, password: e.target.value })}
          placeholder="Input password..."
        />

        <button onClick={createUser}>create user</button>
        <button onClick={getAllUser}>get all user</button>
        <button onClick={getUserById}>find user by id</button>
        <button onClick={changeUserData}>change user data with "put"</button>
        <button onClick={deleteUser}>delete user by id</button>
      </div>

      <div>
        <h3>Message data: {props.message}</h3>
      </div>
    </div>
  );
};

export default App;
