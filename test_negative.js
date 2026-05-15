const http = require('http');

async function testNegative() {
  const data = JSON.stringify({ text: "최악의 경험이었습니다. 다시는 오지 않겠습니다." });
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/analyze',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = http.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => { responseBody += chunk; });
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      console.log('Response:', responseBody);
    });
  });

  req.on('error', (e) => console.error(e));
  req.write(data);
  req.end();
}

testNegative();
