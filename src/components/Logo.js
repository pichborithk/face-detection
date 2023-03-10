import React from 'react';
// import Tilt from 'react-tilt';
import Tilt from 'react-parallax-tilt';
import Face from '../asset/face.png';

const Logo = () => {
  return (
    <>
      <div className='ma4 mt0'>
        <Tilt
          className='Tilt br2 shadow-2 my-color'
          options={{ max: 55 }}
          style={{ height: 150, width: 150 }}
        >
          <div className='Tilt-inner pa3'>
            <img style={{ paddingTop: '5px' }} alt='logo' src={Face} />
          </div>
        </Tilt>
      </div>
    </>
  );
};

export default Logo;
