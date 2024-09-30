# Note-Taking Project

## Description

This is a web note-taking application that allows users to create, edit, archive, and list notes. The application is divided into a Frontend built with Next.js, TypeScript, and ReactJs, and a Backend developed with NestJS, TypeScript, and Prisma ORM.

## Technologies used

-Frontend: Next.js, React, TypeScript
-Backend: NestJS, TypeScript, Prisma ORM
-Database: PostgreSQL (or your choice)

## Project Structure

The project is a Mono Repo and contains a folder with the Backend and another with the Frontend.

## Requirements

Make sure you have the following programs installed:

-Node.js (version 14 or higher)
-npm or yarn

- PostgreSQL (or the database you use)

## Installation

1. ## Clone the repository:

   git clone https://github.com/ensolvers-github-challenges/Sayas-db47a5.git

## Navigate to the backend folder:

`cd ensolvers-challenge/Sayas-db47a5`

2. ## Navega a la carpeta del backend:

   -Run: `cd backend`

3. ## Install dependencies:

   -Run: `npm install`

4. ## Configure the database:

-Asegurate de tener tu archivo .env configurado correctamente segun el .env.example

Make sure your .env file is configured correctly according to the .env.example

-Run `npx prisma migrate` dev CHECK

-Add tables to your schema.prisma to be able to load data

- Run `npx prisma db push` to upload the tables to the database

- Run `npx prisma generate` to generate prisma in your project

5. ## Navigate to the frontend folder:

-Run `cd ../frontend`

6. ## Install dependencies:

-Run `npm install`

## Running the project to start the backend

Run `cd backend`
Run `npm run start:dev`

## Running the project to start the frontend

Run `cd frontend`
Run `npm run dev`

## Running Unit Tests

Run `npm run test`

## Running the Project

## To start both the backend and frontend together, run the following command at the root of the project:

Run `./start.sh`

## The session must be logged in with a default user

email: test@test.com
password: 123456
