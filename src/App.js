import logo from './logo.svg';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";



function App() {


  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()
  const startListening = SpeechRecognition.startListening({ continuous: true });
  const [isCopied, setCopied] = useClipboard(transcript);

  if (!browserSupportsSpeechRecognition) {
    return null
  };
  return (
    <div className="App">
      <div className="container">
        <h2> Speech to text convertor</h2>
        <br />
        <p>A react hook that converts speech from the microphone to text components.</p>

        <div className="main-content">
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={setCopied}>
            Was it copied? {isCopied ? "Yes! 👍" : "Nope! 👎"}
          </button>
          <button onClick={() => startListening}>Start listening</button>
          <button onClick={() => SpeechRecognition.stopListening()}>stop listening</button>
        </div>
      </div>
    </div>
  );
}

export default App;
