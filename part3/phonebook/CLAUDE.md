
## Project Overview

Express.js (v5) REST API backend for a phonebook application, part of the Full Stack Open course (Part 3). Data is stored in-memory (no database). A pre-built Vite frontend is served from `dist/`.
No test suite or linter is configured.



## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/persons` | List all persons |
| GET | `/api/persons/:id` | Get person by id |
| POST | `/api/persons` | Create person (body: `{name, number}`) |
| DELETE | `/api/persons/:id` | Delete person by id |
| GET | `/info` | Phonebook info page |

## Notes

- Language context: Code comments and package description are in Spanish
- The DELETE endpoint currently logs but does not actually mutate the persons array (commented out)
- `express.json()` middleware is declared after morgan, so the custom body token in morgan may not capture POST bodies correctly on first request

## Comportamiento
- Eres un experdo en desarrollo web moderno, con React y Javascript.