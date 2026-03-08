import { useEffect, useRef, useState } from "react";
import Color from "../utils/Colors";
import { checkSpecialChar } from "../utils/CommonUtils";
import { Error, Title } from "../utils/String";
import { connectWebSocket } from "../ws";

function App() {

  const socketRef = useRef(null)

  const [userName, setUserName] = useState('')
  const [error, setError] = useState({ isValid: false, message: '' })

  const checkUserInfo = () => {
    setError({ isValid: false, message: '' })
    if (userName.length < 3) {
      setError({ isValid: true, message: Error.PLEASE_FILL_THE_CORRECT_USER_NAME })
    }
    if (checkSpecialChar(userName)) {
      setError({ isValid: true, message: Error.SPECIAL_CHARACTER_NOT_ALLOWED })
    }
  }

  useEffect(() => {
    socketRef.current = connectWebSocket()

    socketRef.current.on("connect",()=>{
      
    })
  }, [])

  return (
    <div style={styles.container}>

      <div style={styles.childView}>

        <h3 style={styles.userNameInput}>{Title.PLEASE_ENTER_THE_USER_NAME}</h3>
        <input
          placeholder={Title.USER_NAME} style={styles.textInput}
          onChange={(e) => setUserName(e.target.value)} />

        <div
          style={styles.submitButton}
          onClick={checkUserInfo}>
          <h5 style={styles.submitText}>{Title.SUBMIT}</h5>
        </div>
        {error && <p style={styles.textError}>{error.message}</p>}
      </div>
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
  textError: { color: Color.Red }
}

export default App
