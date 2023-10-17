-- decision rooms definition

CREATE TABLE decision_rooms (
    id SERIAL PRIMARY KEY,
    settings JSONB,
    users JSONB,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE user_selections (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    room_id INTEGER,
    value VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
