require('dotenv').config();
const supabase = require('./lib/supabase');

async function checkDatabase() {
  console.log('=== Checking Supabase Data ===');
  
  if (!supabase) {
    console.error('Supabase client not initialized.');
    return;
  }

  const { data, error, count } = await supabase
    .from('sentiment_analyses')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching data:', error.message);
  } else {
    console.log(`Total rows in table: ${count}`);
    console.log('Last 5 entries:');
    console.table(data.map(row => ({
      text: row.input_text.substring(0, 30) + '...',
      sentiment: row.sentiment_label,
      confidence: row.confidence,
      time: row.created_at
    })));
  }
}

checkDatabase();
