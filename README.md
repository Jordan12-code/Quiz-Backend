# Quiz BACKEND

## Deskripsi
API backend untuk sistem gacha dengan Node.js, Express, dan MongoDB.

## Endpoint

### 1. Gacha
POST /api/gacha

Body:
{
  "userId": "string"
}

### 2. History
GET /api/gacha/history/:userId

### 3. Prize List
GET /api/gacha/prizes

### 4. Winners
GET /api/gacha/winners/:prizeId

## Fitur
- Limit 5x gacha per hari
- Sistem probabilitas hadiah
- Penyimpanan ke MongoDB
- Tracking history user
