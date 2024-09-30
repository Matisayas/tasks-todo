#!/bin/bash

echo "Seeding the database..."
(cd backend && npm run seed)

echo "Starting backend..."
(cd backend && npm run start:dev) &

echo "Starting frontend..."
(cd frontend && npm run dev)
