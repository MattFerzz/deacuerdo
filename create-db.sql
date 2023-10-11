-- decision rooms definition

CREATE TABLE decision_rooms (
    id SERIAL PRIMARY KEY,
    settings JSONB,
    users JSONB,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
