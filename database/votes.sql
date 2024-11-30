CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    kandidat  NUMERIC,
    kabupaten VARCHAR(255),
    kecamatan VARCHAR(255),
    kelurahan VARCHAR(255),
    tps       VARCHAR(255),
    hasil_suara NUMERIC
);