create table instagram.user_details
(
    id                      text not null primary key,
    is_deleted              boolean default false,
    created_by              jsonb,
    created_date_time       timestamp,
    last_modified_by        jsonb,
    last_modified_date_time timestamp,
    first_name              text,
    last_name               text,
    user_name               text,
    email                   text,
    user_image              text,
    roles                   jsonb,
    bio                     text,
    phone_number            text,
    selected_theme          text,
    is_active               boolean,
    is_blocked              boolean
);

create table instagram.user_credentials
(
    id                      text not null primary key,
    is_deleted              boolean default false,
    created_by              jsonb,
    created_date_time       timestamp,
    last_modified_by        jsonb,
    last_modified_date_time timestamp,
    user_id                 text,
    max_login_attempts      integer default 5,
    login_attempts          integer default 0,
    password                text,
    password_history        jsonb
);
CREATE TABLE kafka_dlq
(
    id        SERIAL PRIMARY KEY,
    topic     text not null,
    message   TEXT NOT NULL,
    error     TEXT NOT NULL,
    timestamp TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    status    VARCHAR(20) DEFAULT 'pending' -- Status of the message (optional: 'pending', 'retried', 'failed')
);
