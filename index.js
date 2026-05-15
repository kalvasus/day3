require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const analyzeSentiment = require('./api/analyze');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 정적 파일 서빙 (프론트엔드 UI)
app.use(express.static(path.join(__dirname, 'public')));

// API 라우트
app.post('/api/analyze', analyzeSentiment);

// 서버 구동
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
