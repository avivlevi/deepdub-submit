import { useEffect, useRef, useState } from 'react';
import './App.css';

import { vttToArray, getCharactersJSON } from 'utils'

// components
import { CaptionsViewer } from 'components/CaptionViewer';

function App() {
  const [captions, setCaptions] = useState([]);
  const [charactersArray, setCharacters] = useState([]);
  const [error, setError] = useState('');
  const didRun = useRef(false);


  useEffect(() => {
    const fetchAndSetVttAndCharacters = async () => {
      const [vttArray, characters] = await Promise.all([vttToArray('/the-bridge-s01e01.vtt'), getCharactersJSON()]);

      if (vttArray?.valid && characters?.length) {
        setCaptions(vttArray.cues);
        setCharacters(characters)
      } else {
        setError('captions or characters are invalid')
      }
    }

    if (!didRun.current) {
      fetchAndSetVttAndCharacters();
      didRun.current = true;
    }
  }, [])


  if (error) {
    return (
      <div className='error'>
        {error}
      </div>
    )
  }

  return (
    <>
      <h1 className='title'>Deepdub's Cues Challenge</h1>
      <h3 className='subtitle'>By Aviv Levi</h3>
      <div className="main-wrapper">
        <div class="sub-wrapper">
          {
            captions.length && charactersArray.length ?
            <CaptionsViewer captions={captions} characters={charactersArray} />
            : <div className='loading'>Loading...</div>
          }
        </div>
      </div>
    </>
  );
}

export default App;
