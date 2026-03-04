import { useState } from "react"

function App() {

  const [userName, setUserName] = useState('')

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100vh', width: '100vw' }}>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'space-between', backgroundColor: '#f0f0f0', padding: 50, borderRadius: 20 }}>
        
        <h3 style={{ color: '#333' }}>Please Enter The User Name</h3>
        <input
          placeholder="User name" style={{ border: "none", padding: 20, borderRadius: 20, backgroundColor: '#fff', color: "#000" }}
          onChange={(e) => setUserName(e.target.value)} />

        <div
          style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#007BFF', borderRadius: 20, marginTop: 20, cursor: 'pointer', }}>
          <h5 style={{ color: "#000" }}>Submit</h5>
        </div>
      </div>
    </div>
  )
}

export default App
