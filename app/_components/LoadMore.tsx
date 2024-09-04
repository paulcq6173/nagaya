'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchAnime } from '../_services/actions';

export type AnimeCard = JSX.Element;

function LoadMore() {
  // A hook that can be used to detect monitor elements.
  const { ref, inView } = useInView();
  const [page, setPage] = useState<number>(2);
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    if (!inView) {
      return;
    }

    async function fetchMore() {
      const fetchMoreResult: Array<AnimeCard> = await fetchAnime(page);

      if (fetchMoreResult?.length !== 0) {
        // Combine incoming data with existing data and ensure sync state
        setData((prevData) => prevData.concat(fetchMoreResult));
        setPage((prevPage) => prevPage + 1);
      }
    }

    fetchMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, data]);

  return (
    <div>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </div>
  );
}

export default LoadMore;
