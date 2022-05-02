import React from 'react';

import { IconChevronDown } from 'assets/icons';
import { useFetchInfiniteBeers } from 'hooks/useFetchInfinteBeer';

import Beer from './Beer';
import BeerSkeleton from './BeerSkeleton';
import './Beers.scss';

interface IBeersProps {}

const Beers: React.FC<IBeersProps> = () => {
  const { data, errors, isFetching, fetchMoreBeers, hasMore } = useFetchInfiniteBeers();

  return (
    <div className="beers">
      <h2 className="beers__title">Beers</h2>
      {errors ? <p>{errors.message}</p> : null}
      <div className="beers__list">
        {Array.isArray(data) && data.length ? data.map(beerItem => <Beer data={beerItem} key={beerItem.id} />) : null}
        {isFetching ? Array.from(new Array(10)).map((_, index) => <BeerSkeleton key={index} />) : null}
      </div>
      {hasMore ? (
        <div className="beers__btn-wrap">
          <button onClick={fetchMoreBeers} className="beers__btn">
            Load More
            <IconChevronDown />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Beers;
