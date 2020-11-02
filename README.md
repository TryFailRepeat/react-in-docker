# Viele Schöne Bilder

## Use in production
```
    docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
```

## Use in development
```
    docker-compose up -d
```
## ports
add `.env` with

```
    PORT_DEV=9000
    PORT_PROD=80
```
