import React, { useMemo } from 'react'
import './CaptionsViewer.css';

import { ProgressBar } from 'components/ProgressBar';
const CaptionsViewer = React.memo(({ captions, characters }) => {

	const charactersAndCaptions = useMemo(() => {

		let currentCueAndCharacterWrapper = [];

		return characters.map((character, index) => {

			if (!currentCueAndCharacterWrapper.length) {
				currentCueAndCharacterWrapper = [
					<div className='character-name' key={`character_${captions[index].identifier}`}>{character}</div>,
					<div className='cue' key={`cue${captions[index].identifier}`}>{captions[index].text}</div>
				];

				return false;

			} else {

				// if the same character, only add the cue
				if (characters[index] === characters[index - 1]) {
					currentCueAndCharacterWrapper.push(<div className='cue' key={`cue${captions[index].identifier}`}>
						{captions[index].text}
					</div>)

					return false;

				}

				// a different character -> return all as 1 wrapper and reset the current wrapper
				const duplicatedWrapper = [...currentCueAndCharacterWrapper];

				currentCueAndCharacterWrapper = [
					<div className='character-name' key={`character_${captions[index].identifier}`}>{character}</div>,
					<div className='cue' key={`cue${captions[index].identifier}`}>{captions[index].text}</div>
				];

				if (index === characters.length - 1) {
					// last iteration, return previous and current
					return (
						<React.Fragment key='last_fragment'>
							<div className='character-and-cue' key={`character_cue_${captions[index - 1].identifier}`}>
								{duplicatedWrapper}
							</div>
							<div className='character-and-cue' key={`character_cue_${captions[index].identifier}`}>
								{currentCueAndCharacterWrapper}
							</div>
						</React.Fragment>
					);
				}

				return (
					<div className='character-and-cue' key={`character_cue_${captions[index].identifier}`}>
						{duplicatedWrapper}
					</div>
				);
			}

		})
	}, [captions, characters])

	return (

		<div className='captions-viewer-wrapper'>
			<ProgressBar totalMovieSeconds={captions[captions.length - 1].end}/>
			<div>
			{charactersAndCaptions}
			</div>
				
		</div>
	)
})

export default CaptionsViewer