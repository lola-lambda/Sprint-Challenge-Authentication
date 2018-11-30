import React from 'react';

const Jokes = ({ jokes }) => (
    <div className='jokes'>
        { jokes.map(joke => <div key={joke.id}>{`${joke.setup} ${joke.punchline}`}</div>) }
    </div>
)
            

export default Jokes;