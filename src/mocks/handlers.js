import { http } from 'msw';
import * as dummyData from '../../dummyData.json';

export const handlers = [
  /* http.get('/getbooks', async (req, res, ctx) => {
    const data = await dummyData(JSON.parse(req.body));
    return res(ctx.status(200), ctx.json({ data }));
  }), */

  http.get('/getbooks', () => {
    return new HttpResponse.json(dummyData);
  }),

  http.post('/addbook', () => {
    return new HttpResponse({ status: 200 });
  }),

  /* http.post('/addbook', async (req, res, ctx) => {
    const data = await dummyData(JSON.parse(req.body));
    return res(ctx.status(200));
  }), */
];
