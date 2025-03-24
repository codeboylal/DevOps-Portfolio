import http from "k6/http";
import { check } from "k6";
import { Trend } from "k6/metrics";

// Custom metrics to track the response time
let responseTime = new Trend('response_time');

export default function () {
   const res = http.get("http://localhost:5000");  // Change this to your API URL

  // Check if the response is okay (status code 200)
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  // Record the response time for analytics
  responseTime.add(res.timings.duration);
}
