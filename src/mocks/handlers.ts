import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.themoviedb.org/3/movie/now_playing', () => {
    return HttpResponse.json({
      results: [
        {
          id: 1,
          title: 'Mock Movie',
          poster_path: '/mock.jpg',
          vote_average: 8.5,
        },
      ],
    })
  }),
]
