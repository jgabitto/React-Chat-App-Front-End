import React, { useReducer, useEffect } from 'react';

const INITIAL_STATE = {
  username: '',
  room: ''
}

const ACTIONS = {
  SET_USERNAME: 'username',
  SET_ROOM: 'room'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USERNAME:
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTIONS.SET_ROOM:
      return { ...state, [action.payload.field]: action.payload.value };

  }
}

const JoinChat = ({ history }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { username, room } = state;

  const onChange = (e) => {
    dispatch({ type: e.target.name, payload: { field: e.target.name, value: e.target.value } })
  }

  const onSubmit = async (event) => {
    // event.persist();
    event.preventDefault();

    const form = {
      username,
      room
    }

    history.push(`/chat/username=${username}&room=${room}`)
  }

  return (
    <div>
      <div className="centered-form container">
        <div className="centered-form__box">
          <h1>Join</h1>
          <form onSubmit={onSubmit}>
            <label>Display name</label>
            <input type="text" name="username" value={username} onChange={onChange} placeholder="Display name" autoComplete="off" required />
            <label>Room</label>
            <input type="text" name="room" value={room} onChange={onChange} placeholder="Room" autoComplete="off" required />
            <button>Join</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JoinChat;