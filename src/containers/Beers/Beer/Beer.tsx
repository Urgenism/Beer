import React, { useMemo } from 'react';

import { IBeerInterface } from 'hooks/useFetchInfinteBeer';

import './Beer.scss';

interface IBeerProps {
  data: IBeerInterface;
}

const Beer: React.FC<IBeerProps> = ({ data }) => {
  const ingredientsInTooltip = useMemo(() => {
    return data.ingredients ? Object.keys(data.ingredients).join(', ') : '';
  }, [data]);

  return (
    <div className="beer">
      <div className="beer__img-wrap">
        <span className="beer__img">
          <img src={data.image_url} alt={data.name} />
          {ingredientsInTooltip ? (
            <>
              <span className="img-tooltip">ingredients: {ingredientsInTooltip}</span>
            </>
          ) : null}
        </span>
      </div>
      <div className="beer__body">
        <h3 className="beer__title">{data.name}</h3>
        <span className="beer__tagline">{data.tagline}</span>
        <p className="beer__desc">{data.description}</p>
      </div>
    </div>
  );
};

export default Beer;
