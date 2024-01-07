import { http, HttpResponse } from 'msw';
import * as dummyData from '../../dummyData.json';

export const handlers = [
  http.get('/getbooks', () => {
    return new HttpResponse.json(dummyData);
  }),

  http.post('/addbook', async () => {
    return new HttpResponse(null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
