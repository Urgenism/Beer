import { useState, useEffect, useCallback, useRef } from 'react';

import http from 'utils/http';
import { config } from 'config';

export interface IBeerInterface {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: {
    value: number;
    unit: string;
  };
  boil_volume: {
    value: number;
    unit: string;
  };
  method: {
    mash_temp: Array<{
      temp: {
        value: number;
        unit: string;
      };
      duration: number;
    }>;
    fermentation: {
      temp: {
        value: number;
        unit: string;
      };
    };
    twist: any;
  };
  ingredients: {
    malt: Array<{
      name: string;
      amount: {
        value: number;
        unit: string;
      };
    }>;
    hops: Array<{
      name: string;
      amount: {
        value: number;
        unit: string;
      };
      add: string;
      attribute: string;
    }>;
    yeast: string;
  };
  food_pairing: Array<string>;
  brewers_tips: string;
  contributed_by: string;
}

const PER_PAGE = 10;

export const useFetchInfiniteBeers = () => {
  const pageIndex = useRef<number>(1);

  const [data, setData] = useState<Array<IBeerInterface>>([]);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [errors, setErrors] = useState<null | Error>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchBeers = useCallback(async () => {
    setFetching(true);
    try {
      const data = await http().get(`${config.endpoints.beers}?page=${pageIndex.current}&per_page=${PER_PAGE}`);

      if (Array.isArray(data) && data.length) {
        if (data.length !== PER_PAGE) {
          setHasMore(false);
        }
        setData((prevItems: Array<any>) => [...prevItems, ...data]);
      } else {
        setHasMore(false);
      }
    } catch (err: any) {
      setErrors(err);
      setHasMore(false);
    } finally {
      setFetching(false);
    }
  }, []);

  const fetchMoreBeers = useCallback(() => {
    if (!hasMore) return;
    pageIndex.current = pageIndex.current + 1;
    fetchBeers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchBeers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isFetching, errors, hasMore, fetchMoreBeers };
};
