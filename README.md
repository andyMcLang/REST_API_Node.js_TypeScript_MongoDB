# Rakennetaan kirjautumis- ja rekisteröitymiskäyttöliittymä React.js:llä JWT- ja Refresh Tokenien avulla

Tässä projektissa rakennetaan täysi Full Stack -sovellus, joka sisältää:
- Käyttäjän rekisteröitymisen ja kirjautumisen
- JWT-pohjaisen autentikoinnin (access + refresh tokens)
- Tuotesivun CRUD-toiminnot suojatuilla reiteillä
- MongoDB-tietokannan
- Node.js + Express backendin
- Next.js + React frontendin SWR-datalla

---

## 🔧 Tekniikat ja työkalut

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (RS256)
- Zod-validointi
- TypeScript
- CORS, cookie-parser, dotenv
- Session-järjestelmä tietokannassa

### Frontend
- React (Next.js App Router)
- Axios + SWR
- react-hook-form + Zod-resolver
- Tailwind CSS (valmius)
- TypeScript

---

## 📁 Hakemistorakenne (lyhyesti)

```
rest-api-with-ui/
│
├── server/                 # Backend
│   ├── src/
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── schema/
│   │   ├── service/
│   │   └── utils/
│   ├── config/
│   └── app.ts
│
├── ui/                     # Frontend (Next.js)
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   ├── styles/
│   ├── utils/
│   └── .env.local
│
└── README.md
```

---

## ⚙️ Asennusohjeet

### 1. Kloonaa projekti

```bash
git clone https://github.com/andyMcLang/REST_API_Node.js_TypeScript_MongoDB.git
cd rest-api-with-ui
```

### 2. Luo `.env`-tiedostot molempiin (tai käytä mukana tulleita esimerkkejä)

#### `server/.env`
```env
PORT=1337
MONGODB_URI=your_mongo_connection_uri
SALT_WORK_FACTOR=10
PRIVATE_KEY_PATH=./private.key
PUBLIC_KEY_PATH=./public.key
```

> Varmista, että `private.key` ja `public.key` ovat luotu `openssl`-komennolla.

#### `ui/.env.local`
```env
NEXT_PUBLIC_SERVER_ENDPOINT=http://localhost:1337
```

---

## 🔐 RSA-avainten generointi

```bash
# Luo avaimet server-kansioon
cd server
openssl genrsa -out private.key 2048
openssl rsa -in private.key -pubout -out public.key
```

---

## 🚀 Käynnistä palvelimet

### Backend

```bash
cd server
npm install
npm run dev
```

Palvelin käynnistyy osoitteeseen: [http://localhost:1337](http://localhost:1337)

### Frontend

```bash
cd ui
npm install
npm run dev
```

Sovellus osoitteessa: [http://localhost:3000](http://localhost:3000)

---

## ✅ Toiminnallisuudet

- 🔐 **Rekisteröityminen:** `/auth/register`
- 🔑 **Kirjautuminen:** `/auth/login`
- 🧠 **Autentikoitu käyttäjä:** `/api/me`
- 🛍️ **Tuotteiden CRUD:** `/api/products/...` (vain kirjautuneille)
- 🍪 Evästepohjainen todennus access- ja refresh-tokeneilla
- ♻️ Automaattinen access-tokenin uusinta (refresh tokenilla)
- 🧪 Valmius laajennettavalle testaukselle ja validoinneille

---

## 🔎 API-reitit (lyhyesti)

| Reitti                 | Tyyppi   | Kuvaus                    |
|------------------------|----------|---------------------------|
| `POST /api/users`      | Julkinen | Luo uusi käyttäjä        |
| `POST /api/sessions`   | Julkinen | Luo uusi istunto         |
| `GET /api/me`          | Suojattu | Palauttaa nykyisen käyttäjän |
| `DELETE /api/sessions` | Suojattu | Kirjaa käyttäjän ulos     |

---

## 🧪 Testaus

Testaamiseen voi käyttää esimerkiksi Postmania tai Insomniaa. Muista:
- Aseta `Content-Type: application/json`
- Käytä `withCredentials: true` tarvittaessa (esim. axios)

---

## 💡 Kehitysvinkkejä

- Next.js App Router **ei tue `getServerSideProps`ia** → käytä `useSWR` ja `fallbackData` + cookie-based auth
- Käytä `res.locals.user`-tarkistuksia backendissä jokaisessa suojatussa endpointissa
- Käytä `secure: true` evästeille vain tuotantoympäristössä HTTPS:n kanssa

---

## 🧑‍💻 Kirjoittaja

Projekti toteutettu YouTube-tutoriaalin pohjalta ja laajennettu omalla osaamisella:

**@andyMcLang**  
Metropolia AMK – Tieto- ja viestintätekniikka  
https://github.com/andyMcLang

---

## 🔗 Lisenssi

Tämä projekti on tarkoitettu oppimiskäyttöön. Vapaa käyttö omalla vastuulla.
