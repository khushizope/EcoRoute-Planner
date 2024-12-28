CREATE OR REPLACE FUNCTION calculate_eco_route(start GEOMETRY, end GEOMETRY)
RETURNS TABLE(route_geom GEOMETRY, score NUMERIC) AS $$
BEGIN
  RETURN QUERY
  SELECT ST_MakeLine(start, end) AS route_geom, 100 AS score;
END;
$$ LANGUAGE plpgsql;
