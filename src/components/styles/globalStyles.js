import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
}

input {
    font-size: 14px;
}

body {
    line-height: 1.4;
    color: #333333;
    font-family: Helvetica, Arial, sans-serif;
}

h1 {
    margin-bottom: 16px;
}

label {
    display: block;
    font-size: 14px;
    margin-bottom: 8px;
    color: #777;
}

input {
    border: 1px solid #eeeeee;
    padding: 12px;
    outline: none;
}

button {
    cursor: pointer;
    padding: 12px;
    background: #7C5CBF;
    border: none;
    color: white;
    font-size: 16px;
    transition: background .3s ease;
}

button:hover {
    background: #6b47b8;
}

button:disabled {
    cursor: default;
    background: #7c5cbf94;
}

/* Join Page Styles */

.centered-form {
    background: #333744;
    width: 100vw;
    height: 100vh;   
    display: flex;
    justify-content: center;
    align-items: center;
}

.centered-form__box {
    box-shadow: 0px 0px 17px 1px #1D1F26;
    background: #F7F7FA;
    padding: 24px;
    width: 250px;
}

.centered-form button {
    width: 100%;
}

.centered-form input {
    margin-bottom: 16px;
    width: 100%;
}

/* Chat Page Layout */

.chat {
    display: flex;
}

.chat__sidebar {
    height: 100vh;
    color: white;
    background: #333744;
    width: 225px;
    overflow-y: scroll
}

/* Chat styles */

.chat__main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
}

.chat__messages {
    flex-grow: 1;
    padding: 24px 24px 0 24px;
    overflow-y: scroll;
}

/* Message Styles */

.message {
    margin-bottom: 16px;   
}

.message__name {
    font-weight: 600;
    font-size: 14px;
    margin-right: 8px;
}

.message__meta {
    color: #777;
    font-size: 14px;
}

.message a {
    color: #0070CC;
}

/* Message Composition Styles */

.compose {
    display: flex;
    flex-shrink: 0;
    margin-top: 16px;
    padding: 24px;
}

.compose form {
    display: flex;
    flex-grow: 1;
    margin-right: 16px;
}

.compose input {
    border: 1px solid #eeeeee;
    width: 100%;
    padding: 12px;
    margin: 0 16px 0 0;
    flex-grow: 1;
}

.compose button {
    font-size: 14px;
}

/* Chat Sidebar Styles */

.room-title {
    font-weight: 400;
    font-size: 22px;
    background: #2c2f3a;
    padding: 24px;   
}

.list-title {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 4px;
    padding: 12px 24px 0 24px;
}

.users {
    list-style-type: none;
    font-weight: 300;
    padding: 12px 24px 0 24px;
}

.hideBtn {
    display: none;
}

.jumbotron {
    margin-top: 15px;
    background-color: #dfb0ff;
}

#logoutBtn {
    margin-right: 10px;
}
`

export default GlobalStyle;