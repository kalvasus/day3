const http = require('http');

async function sendRequest(text) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ text });

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
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(responseBody) });
        } catch (e) {
          resolve({ status: res.statusCode, body: responseBody });
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log('=== AI Sentiment Analyzer Automated Tests ===\n');

  // Test 1: Positive
  console.log('Test 1: 긍정 문장');
  let res = await sendRequest('오늘 서비스가 정말 만족스러웠어요.');
  console.log(`Status: ${res.status}`);
  console.log(`Response: ${JSON.stringify(res.body, null, 2)}\n`);

  // Test 2: Negative
  console.log('Test 2: 부정 문장');
  res = await sendRequest('배송이 너무 늦고 실망스러웠습니다.');
  console.log(`Status: ${res.status}`);
  console.log(`Response: ${JSON.stringify(res.body, null, 2)}\n`);

  // Test 3: Neutral
  console.log('Test 3: 중립 문장');
  res = await sendRequest('오늘 오후 3시에 회의가 있습니다.');
  console.log(`Status: ${res.status}`);
  console.log(`Response: ${JSON.stringify(res.body, null, 2)}\n`);

  // Test 4: Empty string
  console.log('Test 4: 빈 문자열');
  res = await sendRequest('');
  console.log(`Status: ${res.status}`);
  console.log(`Response: ${JSON.stringify(res.body, null, 2)}\n`);

  // Test 5: Over 1000 chars
  console.log('Test 5: 1000자 초과');
  res = await sendRequest('A'.repeat(1001));
  console.log(`Status: ${res.status}`);
  console.log(`Response: ${JSON.stringify(res.body, null, 2)}\n`);
}

runTests().catch(console.error);
