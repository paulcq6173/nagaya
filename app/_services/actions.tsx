'use server'; // Server Action

import AnimeCard, { AnimeProp } from '@/app/_components/AnimeCard';
import { queryAnime } from '@/app/_graphql/queries';

/**
 * Data-Fetching expression.
 *
 * @param page
 * @see https://graphql.org/learn/serving-over-http/#get-request
 * @returns
 */
export const fetchAnime = async (page: number) => {
  let response: Response;

  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}`, {
      // You can use GET method instead, but it can be problematic
      // with bigger queries since you can easily hit a 414 URI Too Long status
      // on certain servers.
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: queryAnime,
        variables: { page, limit: 8 },
      }),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unexpected Error occured when execute data-fetching.');
    }
  }

  const result: { data?: { animes?: Array<AnimeProp> } } =
    await response.json();
  const animeArray = result.data?.animes ? result.data.animes : [];

  return animeArray.map((item: AnimeProp, index: number) => (
    <AnimeCard key={item.id} anime={item} index={index} />
  ));
};
