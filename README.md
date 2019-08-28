# Issue Tracker

> FreeCodeCamp Issue Tracker challenge.

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat-square)](https://badges.mit-license.org)
[![Build Status](https://travis-ci.com/alasdairmoffat/Personal-Library.svg?branch=master)](https://travis-ci.com/alasdairmoffat/Personal-Library)
[![codecov](https://codecov.io/gh/alasdairmoffat/Personal-Library/branch/master/graph/badge.svg)](https://codecov.io/gh/alasdairmoffat/Personal-Library)

## Table of Contents

- [Preview](#preview)
- [General Info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [License](#license)

## Preview

[Glitch](https://alasdairmoffat-personal-library.glitch.me/)

## General Info

Project built to fulfill the following User Stories:

1. Nothing from my website will be cached in my client as a security measure.
2. I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure.
3. I can **post** a `title` to /api/books to add a book and returned will be the object with the `title` and a unique `_id`.
4. I can **get** /api/books to retrieve an aray of all books containing `title`, `_id`, & `commentcount`.
5. I can **get** /api/books/{\_id} to retrieve a single object of a book containing `title`, `_id`, & an array of `comments` (empty array if no comments present).
6. I can **post** a `comment` to /api/books/{\_id} to add a comment to a book and returned will be the books object similar to **get** /api/books/{\_id}.
7. I can **delete** /api/books/{\_id} to delete a book from the collection. Returned will be 'delete successful' if successful.
8. If I try to request a book that doesn't exist I will get a 'no book exists' message.
9. I can send a **delete** request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.
10. All 6 functional tests required are complete and passing.

### Example usage

|        API        |      GET       |        POST         |      DELETE      |
| :---------------: | :------------: | :-----------------: | :--------------: |
|   `/api/books`    | list all books |    add new book     | delete all books |
| `/api/books/1234` | show book 1234 | add comment to 1234 |   delete 1234    |

### Example return

**GET** `/api/books`

```json
[
  { "_id": "5cd44771f1a11f7a28377c31", "title": "new book", "commentcount": 2 },
  { "_id": "5d63aa7afbd32800e21824ea", "title": "test book", "commentcount": 0 }
]
```

**GET** `api/books/5cd44771f1a11f7a28377c31`

```json
{
  "comments": ["comment", "new comment"],
  "_id": "5cd44771f1a11f7a28377c31",
  "title": "new book",
  "__v": 0
}
```

## Technologies

- Node.js version: 10.15
- Express version: 4.17
- Chai version: 4.2
- Mocha version: 6.2
- Helmet version: 3.20
- MongoDB version: 3.3
- Mongoose version: 5.6

## Setup

### Clone

Clone from repository

```bash
git clone https://github.com/alasdairmoffat/Personal-Library.git
```

### Installation

```bash
cd Personal-Library
npm install
npm start
```

## License

> **[MIT license](https://opensource.org/licenses/mit-license.php)**
