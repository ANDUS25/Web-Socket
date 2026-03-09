import Color from "../utils/Colors";

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: "100vh",
    width: "100vw",
  },
  childView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "space-between",
    backgroundColor: Color.OffWhite,
    padding: 50,
    borderRadius: 20,
  },
  userNameInput: { color: Color.LightGray },
  textInput: {
    border: "none",
    padding: 20,
    borderRadius: 20,
    backgroundColor: Color.White,
    color: Color.Black,
  },
  submitButton: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: Color.LightBlue,
    borderRadius: 20,
    marginTop: 20,
    cursor: "pointer",
  },
  submitText: { color: Color.Black },
  textError: { color: Color.Red },
  conversationView: {
    width: "50vw",
    height: "100vh",
    backgroundColor: Color.LightGrayBackground,
    borderRadius: 30,
    display: "flex",
    flexDirection: "column",
  },
  listQueue: { flex: 1, overflowY: "auto", padding: "20px" },
  messageView: {
    display: "flex",
    marginBottom: 10,
  },
  innerMessageView: {
    padding: "10px 15px",
    maxWidth: "70%",
    borderRadius: 20,
    wordWrap: "break-word",
  },
  inputView: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    borderTop: `1px solid ${Color.LightBorder}`,
  },
  inputMainView: {
    flex: 1,
    borderRadius: 30,
    padding: "10px 20px",
    border: "none",
    marginRight: "10px",
  },
  sendButtonView: {
    cursor: "pointer",
    backgroundColor: "green",
    padding: "10px 20px",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: Color.White,
  },
};

export default styles;
