import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useRef, useEffect } from 'react';

// Components & Pages
import Home from './pages/Home';
import Next from './components/Next';
import Sad from './components/Sad';
import Free from './components/Free';
import Want from './components/Want';
import Excited from './components/Excited';

function AppRoutes({ playYesAudio, playNoAudio, stopAudio }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      stopAudio();
    }
  }, [location, stopAudio]);

  return (
    <Routes>
      <Route path="/" element={<Home onYesClick={playYesAudio} onNoClick={playNoAudio} />} />
      <Route path="/next" element={<Next />} />
      <Route path="/sad" element={<Sad />} />
      <Route path="/free" element={<Free />} />
      <Route path="/want" element={<Want />} />
      <Route path="/excited" element={<Excited stopAudio={stopAudio} />} />
    </Routes>
  );
}

function App() {
  const yesAudioRef = useRef(null);
  const noAudioRef = useRef(null);

  const playYesAudio = () => {
    stopAudio();
    if (yesAudioRef.current) {
      yesAudioRef.current.volume = 0.1;
      yesAudioRef.current.play();
    }
  };

  const playNoAudio = () => {
    stopAudio();
    if (noAudioRef.current) {
      noAudioRef.current.volume = 0.5;
      noAudioRef.current.play();
    }
  };

  const stopAudio = () => {
    if (yesAudioRef.current) {
      yesAudioRef.current.pause();
      yesAudioRef.current.currentTime = 0;
    }
    if (noAudioRef.current) {
      noAudioRef.current.pause();
      noAudioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <AppRoutes 
            playYesAudio={playYesAudio} 
            playNoAudio={playNoAudio} 
            stopAudio={stopAudio} 
          />
        </div>
      </BrowserRouter>
      <audio ref={yesAudioRef} loop>
        <source src="/yes-song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={noAudioRef} loop>
        <source src="/no-song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;