import { useState } from "react";
import Color from "../utils/Colors";
import { checkSpecialChar } from "../utils/CommonUtils";

function App() {

  const [userName, setUserName] = useState('')
  const [error, setError] = useState("")

  console.log('userName', userName);

  const checkUserInfo = (name) => {
    if (name.length < 3) {
      setError("Please fill the correct user name")
      return
    }
    if (checkSpecialChar(name)) {
      setError("Special character not allowed.")
      return
    }

    setUserName(name)
  }


  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100vh', width: '100vw' }}>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'space-between', backgroundColor: Color.OffWhite, padding: 50, borderRadius: 20 }}>

        <h3 style={{ color: Color.LightGray }}>Please Enter The User Name</h3>
        <input
          placeholder="User name" style={{ border: "none", padding: 20, borderRadius: 20, backgroundColor: Color.White, color: Color.Black }}
          onChange={(e) => checkUserInfo(e.target.value)} />

        <div
          style={{ display: 'flex', justifyContent: 'center', backgroundColor: Color.LightBlue, borderRadius: 20, marginTop: 20, cursor: 'pointer', }}>
          <h5 style={{ color: Color.Black }}>Submit</h5>
        </div>
        {error && <p style={{ color: Color.Red }}>{error}</p>}
      </div>
    </div>
  )
}

export default App
