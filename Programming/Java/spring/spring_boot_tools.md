# Druid
connection pool to db monitor

# Swagger
## OpenAPI
collection of over 500 company's API
API description format for REST API
- available endpoints (/user) and operations on each endpoint (GET /users, POST /users)
- operation parameters input and output for each operation
- auth method
- contact info, license

spec can be written in JSON / YAML

## Swagger
set of open source tools built around OpenAPI spec
- Swagger Editor: browser based editor for writing OpenAPI spec
- swagger UI: render OpenAPI spec as interactive API doc
- Swagger Codegen: gen server stubs and client lib from OpenAPI spec

## why use
design-first users
try out API first in browser

## exmple
```yaml
openapi: 3.0.0
info:
  title: Sample API  # API name
  description: Optional desc
  version: 0.1.9

servers:
  - url: http://api.example.com/v1
    description: Main production server
  - url: http://staging-api.example.com
    description: Internal staging server for test

paths:  # individual endpoints in API, HTTP methods(operations)
  /users:
    get:
      summary: Returns a list of users
      description: Optional extended description
      responses:
        '200':
          description: A json array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
    post:
      summary: create a user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string

  /user/{userId}:
    get:
      summary: Returns a user by Id
      parameters:
        - name: userId
          in: path
          required: true
          description: param description in xxx
          schema:
            type: ineger
            format: int64
            minimum: 1
      responses:
        '200':
          description: OK
          content: 
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: the specified user ID is invalid
        '404':
          description: user not found
        default:
          description: unexpected error
# {
#   "id": 4,
#   "name": "Arthur dent"
# }
components:
  schemas:
    Users:
      properties:
        id:
          type: integer
        name:
          type: string          
      required:
        - id
        - name

  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic

security:
  - BasicAuth: []
  
```
















