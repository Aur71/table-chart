import React from 'react';

const Error = ({ error }) => {
  return (
    <div className='error'>
      <h1>{error.message}</h1>
    </div>
  );
};

export default Error;
