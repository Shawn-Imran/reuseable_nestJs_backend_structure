CREATE TYPE status AS ENUM (
  'active',
  'inactive'
);

CREATE table roles(
    id UUID NOT NULL DEFAULT (gen_random_uuid ()),
    name varchar(30) NOT NULL UNIQUE,
    description varchar(500) NOT NULL,
    created_at text default timezone('Asia/Dhaka' :: text, now()) not null,
    updated_at text default timezone('Asia/Dhaka' :: text, now()) not null,
    PRIMARY KEY (id)
);


CREATE table admins(
    id UUID NOT NULL DEFAULT (gen_random_uuid ()),
    name varchar(30) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    mobile varchar(14) NOT NULL UNIQUE,
    avatar varchar(255) NOT NULL,
    role_id uuid NULL,
    password TEXT NOT NULL,
    status status NOT NULL DEFAULT 'active',

    created_at text default timezone('Asia/Dhaka' :: text, now()) not null,
    updated_at text default timezone('Asia/Dhaka' :: text, now()) not null,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE main_modules (
    id UUID NOT NULL DEFAULT (gen_random_uuid ()),
    name varchar(50) NOT NULL UNIQUE,
    description varchar(500) NULL,
    created_at text default timezone('Asia/Dhaka' :: text, now()) not null,
    updated_at text default timezone('Asia/Dhaka' :: text, now()) not null,
    PRIMARY KEY (id)
);


CREATE TABLE role_permissions (
    id UUID NOT NULL DEFAULT (gen_random_uuid ()),
    role_id UUID NOT NULL,
    module_id UUID NOT NULL,
    can_create BOOLEAN NOT NULL,
    can_update BOOLEAN NOT NULL,
    can_read BOOLEAN NOT NULL,
    can_delete BOOLEAN NOT NULL,
    can_get_all BOOLEAN NOT NULL,
    other_permission jsonb NULL,
    created_at text default timezone('Asia/Dhaka' :: text, now()) not null,
    updated_at text default timezone('Asia/Dhaka' :: text, now()) not null,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (module_id) REFERENCES main_modules (id)
);


CREATE table users(
    id UUID NOT NULL DEFAULT (gen_random_uuid ()),
    name varchar(50),
    email varchar(100) UNIQUE,
    mobile varchar(14) NOT NULL UNIQUE,
    avatar varchar(255),
    password varchar(250),
    is_verified BOOLEAN NOT NULL DEFAULT false,
    status status NOT NULL DEFAULT 'active',
    is_deleted BOOLEAN not null DEFAULT false,
    created_at text default timezone('Asia/Dhaka' :: text, now()) not null,
    updated_at text default timezone('Asia/Dhaka' :: text, now()) not null,
    PRIMARY KEY (id)
);
ALTER TABLE users ADD COLUMN is_disabled BOOLEAN DEFAULT false;
