import { useRef, useState } from "react";
import Color from "../utils/Colors";
import { checkSpecialChar } from "../utils/CommonUtils";
import { Error, Title } from "../utils/String";
import { connectWebSocket } from "../ws";

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

    // Add listeners once
    socketRef.current.on("newUserJoined", (message) => {
      setMessageQueue(prev => [...prev, message])
    })

    socketRef.current.on("newChatMessage", (message) => {
      console.log('message', message);
      setMessageQueue(prev => [...prev, message])
    })

    // Emit joinRoom when connected
    socketRef.current.on("connect", () => {
      socketRef.current.emit("joinRoom", { userName })
    })
  }

  const sendMessage = () => {
    if (!socketRef.current || !userMessageInfo.trim()) return;

    socketRef.current.emit('ChatMessage', { message: userMessageInfo, user: userName })
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
                <div key={index} style={[styles.messageView, { justifyContent: isSelf ? 'flex-end' : 'flex-start', }]}>
                  <div style={[styles.innerMessageView, {
                    backgroundColor: isSelf ? '#007bff' : '#f1f1f1',
                    color: isSelf ? Color.White : '#000',
                  }]}>
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
              placeholder="Send a message"
              style={styles.inputMainView}
              onChange={(e) => setUserMessageInfo(e.target.value)}
            />

            <div
              onClick={sendMessage}
              style={styles.sendButtonView}
            >
              {Title.SEND}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

const styles = {
  container: { justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100vh', width: '100vw' },
  childView: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'space-between', backgroundColor: Color.OffWhite, padding: 50, borderRadius: 20 },
  userNameInput: { color: Color.LightGray },
  textInput: { border: "none", padding: 20, borderRadius: 20, backgroundColor: Color.White, color: Color.Black },
  submitButton: { display: 'flex', justifyContent: 'center', backgroundColor: Color.LightBlue, borderRadius: 20, marginTop: 20, cursor: 'pointer', },
  submitText: { color: Color.Black },
  textError: { color: Color.Red },
  conversationView: { width: '50vw', height: '100vh', backgroundColor: "#5d605d", borderRadius: 30, display: 'flex', flexDirection: 'column' },
  listQueue: { flex: 1, overflowY: 'auto', padding: '20px' },
  messageView: {
    display: 'flex',
    marginBottom: '10px'
  },
  innerMessageView: {
    padding: '10px 15px',
    borderRadius: '20px',
    maxWidth: '70%',
    wordWrap: 'break-word'
  }, inputView: { display: "flex", justifyContent: "space-between", padding: '20px', borderTop: '1px solid #ccc' },
  inputMainView: { flex: 1, borderRadius: 30, padding: "10px 20px", border: "none", marginRight: '10px' },
  sendButtonView: { cursor: 'pointer', backgroundColor: "green", padding: '10px 20px', borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', color: Color.White }
}

export default App
