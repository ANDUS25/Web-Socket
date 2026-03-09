import { useRef, useState } from "react";
import Color from "../utils/Colors";
import { checkSpecialChar } from "../utils/CommonUtils";
import { Error, Events, Title } from "../utils/String";
import { connectWebSocket } from "../ws";
import styles from "./Styles";

function App() {
  const socketRef = useRef(null)

  const [userName, setUserName] = useState('')
  const [error, setError] = useState({ isValid: false, message: '' })
  const [userMessageInfo, setUserMessageInfo] = useState("")
  const [messageQueue, setMessageQueue] = useState([])
  const [hideNameInfo, setHideNameInfo] = useState(false)

  const checkUserInfo = () => {
    setError({ isValid: false, message: '' })
    if (userName.length < 3) {
      setError({ isValid: true, message: Error.PLEASE_FILL_THE_CORRECT_USER_NAME })
      return
    }
    if (checkSpecialChar(userName)) {
      setError({ isValid: true, message: Error.SPECIAL_CHARACTER_NOT_ALLOWED })
      return
    }

    !error.isValid && makeSocketConnection()
    setHideNameInfo(true)
  }

  const makeSocketConnection = () => {
    // initiate the socket connection with useRef instead of useState 
    socketRef.current = connectWebSocket()

    // Add listeners once for new user join message
    socketRef.current.on(Events.NEW_USER_JOINED, (message) => {
      setMessageQueue(prev => [...prev, message])
    })

    socketRef.current.on(Events.NEW_CHAT_MESSAGE, (message) => {
      setMessageQueue(prev => [...prev, message])
    })

    // Emit joinRoom when connected
    socketRef.current.on(Events.CONNECT, () => {
      socketRef.current.emit(Events.JOIN_ROOM, { userName })
    })
  }

  const sendMessage = () => {
    if (!socketRef.current || !userMessageInfo.trim()) return;

    socketRef.current.emit(Events.CHAT_MESSAGE, { message: userMessageInfo, user: userName })
    setUserMessageInfo("")
  }

  return (
    <div style={styles.container}>

      {!hideNameInfo &&
        <div style={styles.childView}>

          <h3 style={styles.userNameInput}>{Title.PLEASE_ENTER_THE_USER_NAME}</h3>
          <input
            placeholder={Title.USER_NAME} style={styles.textInput}
            onChange={(e) => setUserName(e.target.value)}
            value={userName} />

          <div
            style={styles.submitButton}
            onClick={checkUserInfo}>
            <h5 style={styles.submitText}>{Title.SUBMIT}</h5>
          </div>
          {error && <p style={styles.textError}>{error.message}</p>}
        </div>
      }

      {hideNameInfo &&
        <div style={styles.conversationView}>

          <div style={styles.listQueue}>
            {messageQueue && messageQueue.map((item, index) => {
              const isSelf = item.user === userName;
              return (
                <div key={index} style={{ ...styles.messageView, justifyContent: isSelf ? 'flex-end' : 'flex-start' }}>
                  <div style={{ ...styles.innerMessageView, backgroundColor: isSelf ? Color.LightBlue : Color.LightOffWhite, color: isSelf ? Color.White : Color.Black }}>
                    {!isSelf && <strong>{item.user}: </strong>}
                    {item.message}
                  </div>
                </div>
              )
            })}
          </div>

          <div style={styles.inputView} >
            <input
              value={userMessageInfo}
              placeholder={Title.SEND_A_MESSAGE}
              style={styles.inputMainView}
              onChange={(e) => setUserMessageInfo(e.target.value)}
            />

            <div
              onClick={sendMessage}
              style={styles.sendButtonView}
            >
              {Title.SEND.toLowerCase()}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default App
