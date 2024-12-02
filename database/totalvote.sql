create table totalvotes
(
    id             serial primary key,
    candidate_name varchar(255),
    total_vote     numeric,
    updated_at     timestamp,
    created_at     timestamp,
    types           varchar(256)
);

alter table totalvotes
    owner to postgres;

