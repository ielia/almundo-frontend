# almundo-hotels-api

## Iniciar

### Precondiciones
Instalar un servidor MongoDB en local y crear una base llamada 'almundo-hotels'. Luego, compilar e iniciar el servicio:
```
npm install
PORT=8080 npm start
```

## Modelo
La definición del modelo se encuentra en el siguiente archivo: `src/models/hotels.js`.

## URLs importantes
```
GET  /api/availability/:location/:inYear/:inMonth/:inDay/:outYear/:outMonth/:outDay/:guests?price=MIN-MAX&stars=1,2,3,4,5
GET  /api/hotels (devuelve todos los hoteles en la base)
GET  /api/hotels/:_id (_id = MongoDB document id, returns a single hotel)
POST /api/hotels (Content-Type: application/json, el contenido deberá corresponder al modelo citado anteriormente)
```

