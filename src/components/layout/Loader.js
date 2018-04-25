import React from 'react';

const Loader = ({ loading }) => (
  <div className={loading ? 'loading frame-load frame': 'frame loading frame-loading'}>
      <div>
          <img src='/images/preloader2.gif'/>
      </div>
  </div>
);

export default Loader;
