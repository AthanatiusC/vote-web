CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    kandidat  NUMERIC,
    kabupaten VARCHAR(255),
    kecamatan VARCHAR(255),
    kelurahan VARCHAR(255),
    tps       VARCHAR(255),
    hasil_suara NUMERIC
);

CREATE TABLE totalvotes (
    id SERIAL PRIMARY KEY
    candidate_name VARCHAR(255),
    total_vote NUMERIC,
    update_at TIMESTAMP,
    created_at TIMESTAMP
);