import { http, HttpResponse } from 'msw';
import dummyData from '../../dummyData.json';
import dummyDataUpdated from '../../dummyDataUpdated.json';

export const handlers = [
  http.get('/getbooks', () => {
    return new HttpResponse.json(dummyData);
  }),

  http.post('http://localhost:800/addbook', () => {
    const updatedData = JSON.stringify(dummyDataUpdated, null, 2);
    return new HttpResponse(updatedData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
