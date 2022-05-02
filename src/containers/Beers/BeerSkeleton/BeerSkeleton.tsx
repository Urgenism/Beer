import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import './BeerSkeleton.scss';

const BeerSkeleton: React.FC<{}> = () => {
  return (
    <div className="beer-skeleton">
      <div className="beer-skeleton__img">
        <Skeleton circle width="50px" height="50px" />
      </div>
      <div className="beer-skeleton__body">
        <Skeleton width="40%" height="20px" />
        <Skeleton width="30%" />
        <Skeleton height="30px" />
      </div>
    </div>
  );
};

export default BeerSkeleton;
