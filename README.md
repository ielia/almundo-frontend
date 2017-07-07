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
GET  /api/availability/:location/:inYear/:inMonth/:inDay/:outYear/:outMonth/:outDay/:guests?name=INSTR&price=MIN-MAX&stars=1,2,3,4,5
GET  /api/hotels (devuelve todos los hoteles en la base)
GET  /api/hotels/:_id (_id = MongoDB document id, returns a single hotel)
POST /api/hotels (Content-Type: application/json, el contenido deberá corresponder al modelo citado anteriormente)
```

## Notas

No hay nada hecho de minificación ni ofuscación de código. Tampoco existen tests, cosa que en un contexto productivo no
debería darse jamás. Además, faltan el ordenamiento, pero es trivial y no lo estoy utilizando en el proyecto de Angular,
así que decidí dejarlo para un momento que jamás llegó.
