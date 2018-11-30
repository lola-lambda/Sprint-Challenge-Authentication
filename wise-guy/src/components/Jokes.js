import React from 'react';

const Jokes = ({ jokes }) => (
    <div className='jokes'>
        { jokes.map(joke => <div className='joke' key={joke.id}>{`${joke.setup} ~~~ ${joke.punchline}`}</div>) }
    </div>
)
            

export default Jokes;