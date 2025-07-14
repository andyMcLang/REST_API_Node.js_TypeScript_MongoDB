import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/server";
import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import { createUserSessionHandler } from "../controller/session.controller";

const userId = new mongoose.Types.ObjectId().toString();

export const userPayload = {
  _id: userId,
  email: "matti.meikalainen@esimerkki.com",
  name: "Matti Meikäläinen",
  toJSON: () => ({
    _id: userId,
    email: "matti.meikalainen@esimerkki.com",
    name: "Matti Meikäläinen",
  }),
};

const userInput = {
  email: `test-${Date.now()}@esimerkki.com`,
  name: "Erkki Esimerkki",
  password: "Salasana123",
  passwordConfirmation: "Salasana123",
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  createdAt: new Date("2025-07-14T22:24:07.674Z"),
  updatedAt: new Date("2025-07-14T22:24:07.674Z"),
  __v: 0,
};

describe("user", () => {
  // Testaa käyttäjän rekisteröintiä

  describe("user registration", () => {
    // kun sähköposti ja salasanat ovat kelvollisia ja täsmäävät
    describe("kun sähköposti ja salasana ovat voimassa", () => {
      it("tulisi palauttaa käyttäjän tiedot", async () => {
        const createdUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const app = createServer();

        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(201);

        expect(body).toEqual(userPayload.toJSON());

        expect(createdUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    // tarkistaa, että salasanojen on vastattava toisiaan
    describe("kun annettu salasana ei täsmää", () => {
      it("tulisi palauttaa 400", async () => {
        const createdUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const app = createServer();

        const { statusCode } = await supertest(app)
          .post("/api/users")
          .send({ ...userInput, passwordConfirmation: "eimatsaa" });

        expect(statusCode).toBe(400);

        expect(createdUserServiceMock).not.toHaveBeenCalled();
      });
    });

    // käsittelee virheen kun käyttäjäpalvelu epäonnistuu
    describe("kun käyttäjäpalvelu heittää virheen", () => {
      it("tulisi palauttaa 409 virhe", async () => {
        const createdUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockRejectedValue("voi ei :(");

        const app = createServer();

        const { statusCode } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(409);

        expect(createdUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  // käyttäjän kirjautuminen
  describe("luodaan käyttäjän istunto", () => {
    // Käyttäjä voi kirjautua sisään voimassa olevalla sähköpostilla ja salasanalla.
    describe("kun sähköposti ja salasana täsmäävät", () => {
      it("tulisi palauttaa allekirjoitettu accessToken ja refreshToken", async () => {
        jest
          .spyOn(UserService, "validatePassword")
          // @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(SessionService, "createSession")
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return "a user agent";
          },
          body: {
            email: "testi@esimerkki.com",
            password: "Salasana123",
          },
        };

        const send = jest.fn();

        const res = {
          send,
        };

        // @ts-ignore
        await createUserSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });
});
