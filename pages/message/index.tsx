import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";

export default function Message() {
  return (
    <div className="App">
      <SendbirdApp
        // Add the two lines below.
        appId={"0ABB2E0B-A5AA-4509-BF8B-7DE0D768282D"} // Specify your Sendbird application ID.
        userId={"test_user"} // Specify your user ID.
      />
    </div>
  );
}
