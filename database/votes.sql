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

CREATE TABLE regional_candidate_vote(
	id SERIAL PRIMARY KEY,
	candidate_id INTEGER REFERENCES totalvotes(id),
	regional_name VARCHAR(255),
	data_sirekap NUMERIC,
	data_quickcount NUMERIC,
	updated_at TIMESTAMP
);

insert into regional_candidate_vote(candidate_id,data_sirekap,data_quickcount,regional_name,updated_at) VALUES
(1,1117,1117,'AMAR',NOW()),
(1,1401,1401,'MIMIKA BARAT',NOW()),
(1,1339,1343,'MIMIKA TENGAH',NOW()),
(1,834,834,'AGIMUGA',NOW()),
(1,0,2002,'ALAMA',NOW()),
(1,0,0,'HOYA',NOW()),
(1,517,2737,'IWAKA',NOW()),
(1,0,922,'JILA',NOW()),
(1,655,1005,'JITA',NOW()),
(1,1883,6210,'KUALA KENCANA',NOW()),
(1,661,2938,'KWAMKI NARAM',NOW()),
(1,1088,1095,'MIMIKA BARAT JAUH',NOW()),
(1,1183,913,'MIMIKA BARAT TENGAH',NOW()),
(1,30636,32017,'MIMIKA BARU',NOW()),
(1,74,2614,'MIMIKA TIMUR',NOW()),
(1,0,1745,'MIMIKA TIMUR JAUH',NOW()),
(1,2770,3138,'TEMBAGAPURA',NOW()),
(1,15158,15517,'WANIA',NOW());