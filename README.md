# REST API -käyttäjärekisteri (TypeScript, Express, MongoDB)

Tämä projekti on backend-sovellus, joka demonstroi käyttäjien rekisteröintiä, salasanan salausta, validointia ja MongoDB Atlas -integraatiota TypeScriptillä, Expressillä ja Mongoose-kirjastolla.

## 🔧 Teknologiat

- TypeScript
- Node.js + Express
- MongoDB Atlas (pilvipohjainen tietokanta)
- Mongoose (MongoDB ODM)
- Zod (syötteen validointiin)
- bcrypt (salasanojen salaamiseen)
- dotenv (ympäristömuuttujien hallintaan)
- lodash (apufunktioita)

---

## 🔐 Ympäristömuuttujat

Luo `.env`-tiedosto juurihakemistoon ja lisää seuraavat arvot:

```env
PORT=1337
MONGODB_URI=mongodb+srv://<käyttäjä>:<salasana>@<klusteri>.mongodb.net/?retryWrites=true&w=majority
SALT_WORK_FACTOR=10
```

> ⚠️ Älä koskaan lataa `.env`-tiedostoa GitHubiin – lisää se `.gitignore`-tiedostoon!

---

## 🚀 Käynnistys

1. Asenna riippuvuudet:
   ```bash
   npm install
   ```

2. Käynnistä kehityspalvelin:
   ```bash
   npm run dev
   ```

---

## 📬 API-reitit

### POST `/api/users` – Luo uusi käyttäjä

**Body (JSON):**
```json
{
  "email": "testi@example.com",
  "name": "Testikäyttäjä",
  "password": "salasana123",
  "passwordConfirmation": "salasana123"
}
```

**Vastauksen esimerkki:**
```json
{
  "_id": "64f1c123...",
  "email": "testi@example.com",
  "name": "Testikäyttäjä",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## palvelimen toiminnan tarkastus

### GET `/healthcheck`
Tarkistaa, että palvelin on käynnissä.

---

## 📁 Projektin rakenne

```
src/
├── controller/         // Reittien käsittelijät
├── models/             // Mongoose-skeemat
├── schema/             // Zod-validoinnit
├── service/            // Liiketoimintalogiikka
├── utils/              // Lokitus, tietokantayhteys
├── middleware/         // Validointimiddleware
└── app.ts              // Sovelluksen aloituspiste
```

---

## ✅ Ominaisuudet

- Käyttäjän rekisteröinti
- Salasanan hashays bcryptillä
- Zodilla tehty validointi ja virheiden käsittely
- MongoDB Atlas -integraatio
- Ei paljasta salasanaa vastauksissa
- Hyvät virheilmoitukset ja lokitus

---

## 👨‍💻 Kehittäjä

Tämä projekti on luotu osana oppimista TypeScript-pohjaisesta REST API -kehityksestä Node.js-ympäristössä.  
Projektin pohjana on käytetty YouTube-opetusvideota ja sitä on laajennettu.

---

## 🛡️ Lisenssi

Tämä projekti on vapaa harjoitustarkoituksiin, mutta älä käytä oikeaa MongoDB Atlas -salasanaa julkisesti.
