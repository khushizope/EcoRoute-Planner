const express = require('express');
const pg = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// PostgreSQL configuration
const pool = new pg.Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'ecoroute',
  password: 'your_db_password',
  port: 5432,
});

// API endpoint to calculate eco-friendly route
app.post('/api/route', async (req, res) => {
  const { start, end } = req.body;

  try {
    const query = `
      SELECT ST_AsGeoJSON(route_geom) AS route, score
      FROM calculate_eco_route($1, $2)
      LIMIT 1;
    `;
    const values = [start, end];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error calculating route:', err);
    res.status(500).send('Error calculating route');
  }
});

app.listen(PORT, () => {
  console.log(`EcoRoute Planner server running on http://localhost:${PORT}`);
});
