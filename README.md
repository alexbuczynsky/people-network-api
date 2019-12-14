# People Network API

[![Build Status](https://travis-ci.com/alexbuczynsky/people-network-api.svg?branch=master)](https://travis-ci.com/alexbuczynsky/people-network-api)


## Installation

```bash
$ npm install
```

App will listen on port 3000

## Prompt

> Background: We are trying build an API that answers questions about a network of people.

There are two data sets attached to the email. First file contains list of 100 people and their names. Second file has the relationship of each person with at least 5 other folks on the list.
 

**Requirements:**
- Create an API Server with the following functionality
  - [x] Get a user by `id`
  - [x] Get the connections from user `id=X`
  - [x] How many total connections  does user `id=X `has?
  - [x] Who can introduce user `id=X` to user `id=Y`?
  - [x] Which connections are common between user `id=X` and user `id=Y`?
    - Note: This is the same requirement as the previous requirement.
  - [x] Which user has the most connections?
  - [x] Which user has the least connections?
- The APIs should accept “degree” as a parameter
  - [ ] `1st-degree connections` - People you're directly connected.
  - [ ] `2nd-degree connections` - People who are connected to your 1st-degree connections.
  - [ ] `3rd-degree connections` - People who are connected to your 2nd-degree connections
  - [ ] `Nth-degree connections` – People who are connected to your (n-1)th-degree connections
 

You are free to use any language and technology in your solution.

## Models

```mermaid
classDiagram
    class User{
      id int
      name string
    }

    User --> Relationship

    class Relationship {
      userId int
      connections int[] :: a collection of user ids
    }
```

## Routes

| Method | Route                                    | Description                                                                                               |
| ------ | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| GET    | /api                                     | Swagger documentation is hosted here                                                                      |
| GET    | /api/users                               | Returns all users and optionally the most / least popular                                                 |
| GET    | /api/users?popularity=most               | Returns the most popular user. It will return more than one user if they have the same number of friends  |
| GET    | /api/users?popularity=least              | Returns the least popular user. It will return more than one user if they have the same number of friends |
| GET    | /api/users                               | Returns all users and optionally the most / least popular                                                 |
| GET    | /api/users/{id}                          | Returns a user by id                                                                                      |
| GET    | /api/users/{id}/relationships            | Returns the users the target user knows                                                                   |
| GET    | /api/users/{id}/relationships/count      | Returns the number of users the target user knows                                                         |
| GET    | /api/users/{id}/mutual-connections/{id2} | Returns the users both user 1 and user 2 know                                                             |


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
