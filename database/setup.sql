CREATE DATABASE ecoroute;

\c ecoroute;

CREATE EXTENSION postgis;

CREATE TABLE green_routes (
  id SERIAL PRIMARY KEY,
  route_geom GEOMETRY(LineString, 4326),
  score NUMERIC
);
