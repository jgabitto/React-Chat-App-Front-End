import React, { useState, useReducer, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

import socket from '../../utils/socketConnection';
import ErrorModal from './ErrorModal';

// const autoscroll = (containerRef, messageRef) => {
//   const lastMessage = messageRef.current;
//   const container = containerRef.current;

//   const newMessageMargin = parseInt(getComputedStyle(lastMessage).marginBottom);
//   const newMessageHeight = lastMessage.offsetHeight + newMessageMargin;

//   const visibleHeight = lastMessage.offsetHeight;
//   const conatinerHeight = container.scrollHeight;
//   const scrollOffset = container.scrollTop + visibleHeight;

//   if (conatinerHeight - newMessageHeight <= scrollOffset) {
//     container.scrollTop = container.scrollHeight;
//   }
// }

const INITIAL_STATE = {
  message: { username: "", createdAt: "", text: "" },
  messages: [],
  users: [],
  error: null

}

const ACTIONS = {
  SET_MESSAGE: "message",
  SET_MESSAGES: "messages",
  SET_USERS: "users",
  SET_ERROR: "error"
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_MESSAGE:
      return { ...state, [action.payload.field]: action.payload.value }
    case ACTIONS.SET_MESSAGES:
      return { ...state, [action.payload.field]: [...state.messages, action.payload.value] }
    case ACTIONS.SET_USERS:
      return { ...state, [action.payload.field]: [...action.payload.value] }
    case ACTIONS.SET_ERROR:
      return { ...state, [action.payload.field]: action.payload.value }
  }
}

const Chat = ({ history, match }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { message, messages, users, error } = state;
  const [disabledButton, setDisabledButton] = useState(false);
  const textInput = React.createRef();
  const messagesContainerRef = useRef(null);
  const lastMessageRef = React.createRef();
  const { params: { username, room } } = match;

  const scrollToWithContainer = () => {

    let goToContainer = new Promise((resolve, reject) => {

      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo('messages', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });

    });

    goToContainer.then(() =>
      scroller.scrollTo("scroll-container-last-message", {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'messages'
      }));
  }

  // Welcome chat message
  useEffect(() => {
    socket.on("welcome", (welcome) => {
      // Format time for message
      const time = <Moment format="h:mm a">{welcome.createdAt}</Moment>;
      // Welcome message text
      const text = welcome.text;
      // Clear input in form
      dispatch({ type: ACTIONS.SET_MESSAGE, payload: { field: ACTIONS.SET_MESSAGE, value: { username: "Admin", createdAt: "", text: "" } } });
      // Display welcome message in chat
      dispatch({ type: ACTIONS.SET_MESSAGES, payload: { field: ACTIONS.SET_MESSAGES, value: { username: "Admin", createdAt: time, text } } });
    })
  }, [])

  // Receive message object from server
  useEffect(() => {
    socket.on('serverMessage', (serverMessage) => {
      // Get properties from message object
      let { username, createdAt, text } = serverMessage;
      // Format time for message
      createdAt = <Moment format="h:mm a">{createdAt}</Moment>;
      // Display message in chat
      dispatch({ type: ACTIONS.SET_MESSAGES, payload: { field: ACTIONS.SET_MESSAGES, value: { username, createdAt, text } } });
      scrollToWithContainer();
      // autoscroll(messagesContainerRef, lastMessageRef);
    })

  }, [])
  // When user joins chat room
  useEffect(() => {
    socket.emit('join', { username, room }, (error) => {
      if (error) {
        alert(error);
        // dispatch({ type: ACTIONS.SET_ERROR, payload: { field: ACTIONS.SET_ERROR, value: error } })
        history.push('/join')
      }
    });
  }, [])
  // Users list on left sidebar
  useEffect(() => {
    socket.on('roomData', ({ room, users }) => {
      // Update state with list of users in room
      dispatch({ type: ACTIONS.SET_USERS, payload: { field: ACTIONS.SET_USERS, value: users } })
    })
  }, [])

  const onSubmit = async (event) => {
    // event.persist();
    // Prevent page refresh
    event.preventDefault();
    // Disable submit button
    setDisabledButton(true);
    // Send client message to server
    socket.emit('clientMessage', message, (response) => {
      // Clear input with empty string
      dispatch({ type: ACTIONS.SET_MESSAGE, payload: { field: ACTIONS.SET_MESSAGE, value: { username: "", createdAt: "", text: "" } } });
      // enable send button after sending message
      setDisabledButton(false);

      // Confirmation message when form info is submitted
      // console.log(`the form message, "${response}" was delivered`)
    })
  }

  const onChange = (e) => {
    // Save input value in message state
    dispatch({ type: ACTIONS.SET_MESSAGE, payload: { field: ACTIONS.SET_MESSAGE, value: { username: "", createdAt: "", text: e.target.value } } })
  }

  const focus = () => {
    // Refocus cursor in input after form submission
    textInput.current.focus();
  }

  const saveChat = async () => {
    try {
      // if messages array has messages
      if (messages.length !== 0) {
        // Send messages array to be saved in server
        const res = await fetch('http://localhost:5000/saveChat', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify(messages),
          headers: { 'Content-Type': 'application/json' }
        });
        const savedMessages = await (await fetch('http://localhost:5000/getMessages', {
          mode: 'cors',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        })).json();
        console.log(savedMessages)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div>
      <div className="chat">
        <div id="sidebar" className="chat__sidebar">
          <h2 className="room-title">Chat Room: {room}</h2>
          <h3 className="list-title">Users</h3>
          <ul className="users">
            {users ?
              users.map((user, index) => {
                return <li key={index}>{user.username}</li>
              })
              : null
            }
          </ul>
        </div>
        <div className="chat__main">
          <div ref={messagesContainerRef} id="messages" className="chat__messages">
            <div className="message">
              <div>
                {messages ?
                  messages.map(({ username, createdAt, text }, index) => {
                    if (index === messages.length - 1) {
                      return (
                        <div ref={lastMessageRef} key={index} name="scroll-container-last-message">
                          <span className="message__name">{username}</span>
                          <span className="message__meta">{createdAt}</span>
                          <p>{text}</p>
                        </div>
                      )
                    }
                    return (
                      <React.Fragment key={index}>
                        <span className="message__name">{username}</span>
                        <span className="message__meta">{createdAt}</span>
                        <p>{text}</p>
                      </React.Fragment>
                    )
                  }) :
                  null}
              </div>

            </div>
          </div>

          <div className="compose">
            <form onSubmit={onSubmit}>
              <input type="text" name="message" value={message.text} onChange={onChange} ref={textInput} placeholder="Message" autoComplete="off" required />
              <button onClick={focus} disabled={disabledButton ? 'disabled' : null}>Send</button>
              <button className="ml-2" onClick={saveChat}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat;