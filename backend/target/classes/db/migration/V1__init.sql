-- V1__init.sql
-- Core tables for Red Team Exercise Manager

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE red_team_exercises (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PLANNED',
    severity VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
    assigned_to VARCHAR(100),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    ai_description TEXT,
    ai_recommendation TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster search
CREATE INDEX idx_exercises_status ON red_team_exercises(status);
CREATE INDEX idx_exercises_severity ON red_team_exercises(severity);
CREATE INDEX idx_exercises_created_by ON red_team_exercises(created_by);
CREATE INDEX idx_users_email ON users(email);