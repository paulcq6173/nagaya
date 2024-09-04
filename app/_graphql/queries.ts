export const queryAnime = /* GraphQL */ `
  query animes(
    $page: PositiveInt!
    $limit: PositiveInt!
    $search: String
    $kind: AnimeKindString
  ) {
    animes(page: $page, limit: $limit, search: $search, kind: $kind) {
      id
      name
      kind
      score
      status
      episodes
      episodesAired
      poster {
        mainUrl
      }
    }
  }
`;
