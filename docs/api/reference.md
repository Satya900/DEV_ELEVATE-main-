# API Reference

This document provides detailed information about Dev Elevate's API endpoints.

## Authentication

All API endpoints use Supabase authentication. Include the JWT token in the Authorization header:

```http
Authorization: Bearer your_jwt_token
```

## Endpoints

### Articles

#### Get All Articles

```http
GET /api/articles
```

Response:
```json
{
  "articles": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "content": "string",
      "author": "string",
      "category": "string",
      "tags": ["string"],
      "publishedAt": "string"
    }
  ]
}
```

#### Get Article by ID

```http
GET /api/articles/:id
```

### Contact Form

#### Submit Contact Form

```http
POST /api/contact
```

Request Body:
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

### Newsletter

#### Subscribe to Newsletter

```http
POST /api/newsletter/subscribe
```

Request Body:
```json
{
  "email": "string"
}
```

## Error Handling

All endpoints return standard HTTP status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error Response Format:
```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for anonymous users

## Webhooks

Webhook notifications are sent for:
- New article publications
- Comment notifications
- User registrations

## Need Help?

- [Report API Issues](https://github.com/dev-elevate/dev-elevate/issues)
- [API Integration Guide](integration-guide.md)
- [Authentication Guide](authentication.md)