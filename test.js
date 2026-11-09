import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  iterations:5,

  thresholds:{
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01']
  }
};

export default function() {
  let res = http.get('https://quickpizza.grafana.com');
  check(res, {
     "status is 200": (res) => res.status === 200, 
    
     "body is not empty": (res) => res.body.length > 0,

      "responce time < 1000 ms": (res) => res.timings.duration < 1000
    });
  sleep(1);
}
