import schemas from "../schemas";
import {DEFAULT_CLIENT_TENANT} from "../constants";

describe("schemas", () => {
  describe("server", () => {
    describe("fetch", () => {
      it("should normalize any to server tenant", () => {
        const actual = {};
        const expected = {};

        expect(schemas.server.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server tenant casting correctly", () => {
        const actual = {
          flags: [1, 2, 3],
          location: {
            address: "some address",
            coordinates: {
              lat: "10",
              lng: "10",
            },
          },
          mercadopago: {
            token: "some-token",
          },
        };
        const expected = {
          flags: ["1", "2", "3"],
          location: {
            address: "some address",
            coordinates: {
              lat: 10,
              lng: 10,
            },
          },
          mercadopago: {
            token: "some-token",
            refresh: "",
            expiration: 0,
          },
        };

        expect(schemas.server.fetch.cast(actual)).toEqual(expected);
      });

      it("PENCY-2Z - Cache case", () => {
        const actual = {
          products: [],
          category: "jewelry-watches",
          slug: "michelejoyas",
          layout: DEFAULT_CLIENT_TENANT.layout,
          description: "Vendo Gran Variedad de Joyas en Acero Quirúrgico y de Cristal con Plata ",
          phone: "5491158267168",
          color: "gray",
          country: DEFAULT_CLIENT_TENANT.country,
          twitter: "",
          title: "Michele Joyas en Acero Quirúrgico ",
          highlight: "",
          hook: "",
          pixel: "",
          ga: "",
          facebook: "@Michele Joyas En Acero Quirúrgico ",
          location: {
            coordinates: {
              lng: -58.4555318,
              lat: -34.5680004,
            },
            address: "Virrey del Pino 2700, C1426 CABA",
          },
          fields: [
            {
              title: "De qué Forma pagarías?",
              note: "Se Retira por Barrio de Belgrano o se manda Moto a cargo del Cliente. ",
              required: true,
              id: "1DP_PA5zl",
              type: "text",
            },
            {
              title: "Tenes Varias Opciones de Pago",
              options: [
                {
                  id: "JHt3WLg2et",
                  title: "Efectivo",
                  note: "Mercado Pago",
                },
                {
                  id: "W79szT-jL4",
                  title: "Tarjeta de Credito",
                  note: "Tarjeta de Debito",
                },
              ],
              required: true,
              id: "-R-iRazoj",
              type: "radio",
            },
          ],
          keywords: "Anillos, Aros, Cadenas, Colgantes, Dijes, Pulseras",
          flags: DEFAULT_CLIENT_TENANT.flags,
          mercadopago: {token: "", expiration: null, refresh: ""},
          banner:
            "https://res.cloudinary.com/goncy/image/upload/v1593371612/pency/michelejoyas/cyath8rdaspggpi1qu8y.jpg",
          id: "QRWj1dEzx6g4BFwkupX79fhgYUH3",
          logo:
            "https://res.cloudinary.com/goncy/image/upload/v1593371400/pency/michelejoyas/a2eoe44p8s3khkbjjb10.jpg",
          instagram: "Michele_Joyas",
        };
        const expected = true;

        expect(schemas.server.fetch.isValidSync(actual)).toEqual(expected);
      });

      it("PENCY-30 - Cache case", () => {
        const actual = {
          products: [],
          category: "other",
          slug: "unalome",
          layout: "landscape",
          description: "Velas de cera de soja y aromas para el hogar",
          phone: "5491134495118",
          color: "pink",
          country: DEFAULT_CLIENT_TENANT.country,
          twitter: "",
          title: "UNALOME Velas & Aromas",
          highlight: "",
          hook: "",
          pixel: "",
          ga: "",
          facebook: "unalomevelas",
          location: DEFAULT_CLIENT_TENANT.location,
          fields: [],
          keywords:
            "pency, tienda, online, whatsapp, delivery, pedidos,cera de soja, deco, hogar, quilmes, velas, aromas",
          flags: DEFAULT_CLIENT_TENANT.flags,
          mercadopago: {token: "", expiration: null, refresh: ""},
          banner:
            "https://res.cloudinary.com/goncy/image/upload/v1594421698/pency/unalome/nkmyuziflvl4g79tnoha.jpg",
          id: "f0N6MLYGlXesZqZg8Bnigxty3Q22",
          logo:
            "https://res.cloudinary.com/goncy/image/upload/v1594420621/pency/unalome/iuorwdw8u5mb17grnop0.jpg",
          instagram: "unalome_velas",
        };
        const expected = true;

        expect(schemas.server.fetch.isValidSync(actual)).toEqual(expected);
      });

      it("PENCY-31 - Cache case", () => {
        const actual = {
          products: [],
          instagram: "sexshopsentidos",
          color: "red",
          twitter: "",
          hook: "",
          pixel: "",
          ga: "",
          keywords: "pency, tienda, online, whatsapp, delivery, pedidos, sex shop",
          logo:
            "https://res.cloudinary.com/goncy/image/upload/v1591988905/pency/sexshopsentidos/ide4humvpd3dpawxtdux.jpg",
          mercadopago: {token: "", expiration: null, refresh: ""},
          id: "ege30MHDe7Xw5qH0Dbmbp5PKsb13",
          category: "toys",
          layout: DEFAULT_CLIENT_TENANT.layout,
          title: "Sentidos Sex Shop",
          location: DEFAULT_CLIENT_TENANT.location,
          description: "Los mejores juguetes y lubricantes en la puerta de tu casa",
          phone: "5491132856279",
          facebook: "Sex Shop Sentidos",
          address: "",
          banner:
            "https://res.cloudinary.com/goncy/image/upload/v1591988962/pency/sexshopsentidos/elnptptcz39ygnh1oupo.jpg",
          slug: "sexshopsentidos",
          country: DEFAULT_CLIENT_TENANT.country,
          flags: DEFAULT_CLIENT_TENANT.flags,
          fields: [],
          highlight: "Animate a jugar 🔥🔥",
        };
        const expected = true;

        expect(schemas.server.fetch.isValidSync(actual)).toEqual(expected);
      });

      it("PENCY-39 - Cache case", () => {
        const actual = {
          products: [],
          category: "clothes-accessories",
          slug: "paroditas",
          layout: DEFAULT_CLIENT_TENANT.layout,
          description:
            "Somos una tienda de venta de indumentaria pedidos de lunes a viernes de 9 a 18 hr.",
          phone: "01157499042",
          color: "blue",
          country: DEFAULT_CLIENT_TENANT.country,
          twitter: "",
          title: "Paroditas indumentaria",
          highlight: "Solo se despacharan pedidos hecho por via whatsapp",
          hook: "",
          pixel: "",
          ga: "",
          facebook: "Paroditas indumentaria",
          location: {
            coordinates: {
              lng: -58.23555589999999,
              lat: -34.7243844,
            },
            address: "Av. Mozart, Quilmes, Provincia de Buenos Aires",
          },
          fields: [
            {
              required: true,
              id: "GHf75oAmx",
              type: "radio",
              title: "Forma de pago",
              options: [
                {
                  note: "",
                  id: "rPbhrwHt10",
                  title: "Efectivo",
                },
                {
                  id: "izPPtnyHUd",
                  title: "Tarjetas",
                  note: "",
                },
              ],
            },
          ],
          keywords: "Paroditas shop",
          flags: DEFAULT_CLIENT_TENANT.flags,
          mercadopago: null,
          banner:
            "https://res.cloudinary.com/goncy/image/upload/v1593959210/pency/paroditas/phtzirdrfva8hsqgqkaj.jpg",
          id: "3wo9AMAWUNPtGeFuppubZw7dEBr1",
          logo:
            "https://res.cloudinary.com/goncy/image/upload/v1593959197/pency/paroditas/xww2ij6tw0fjal9trjgs.jpg",
          instagram: "Paroditas indumentaria ",
        };
        const expected = true;

        expect(schemas.server.fetch.isValidSync(actual)).toEqual(expected);
      });

      it("PENCY-40 - Cache case", () => {
        const actual = {
          products: [],
          description: DEFAULT_CLIENT_TENANT.description,
          title: DEFAULT_CLIENT_TENANT.title,
          color: "cyan",
          twitter: null,
          slug: "zerditos",
          phone: 5491144444444,
          facebook: null,
          keywords: "pency, tienda, online, whatsapp, delivery, pedidos",
          message: "Hola, quería pedir:\n\n{{productos}}\n\nTotal: {{total}}\n\nGracias.",
          id: "QoBu9gs6Z9ZixHmQvgMMLD6QdPm1",
          instagram: null,
        };
        const expected = true;

        expect(schemas.server.fetch.isValidSync(actual)).toEqual(expected);
      });

      it("PENCY-5P - Cache case", () => {
        const actual = {
          products: [],
          color: "yellow",
          logo:
            "https://res.cloudinary.com/goncy/image/upload/v1587397932/pency/ab40esgl6xvdbvfomggr.png",
          slug: "eguez",
          title: "eguez",
          id: "iZ6m50JdNtRdtc84OUGyTcq4qM22",
          phone: "5491139033605",
        };
        const expected = true;

        expect(schemas.server.fetch.isValidSync(actual)).toEqual(expected);
      });
    });

    describe("update", () => {
      it("should normalize any to server tenant", () => {
        const actual = {};
        const expected = {};

        expect(schemas.server.update.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server tenant casting location", () => {
        const actual = {
          location: {
            address: "some adress",
            coordinates: {
              lat: "100.00",
              lng: "100.00",
            },
          },
        };
        const expected = {
          location: {
            address: "some adress",
            coordinates: {
              lat: 100,
              lng: 100,
            },
          },
        };

        expect(schemas.server.update.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server tenant casting text fields", () => {
        const actual = {
          fields: [
            {
              id: "some-id",
              title: "some-title",
              type: "text",
              required: "false",
            },
          ],
        };
        const expected = {
          fields: [
            {
              id: "some-id",
              title: "some-title",
              type: "text",
              note: "",
              required: false,
            },
          ],
        };

        expect(schemas.server.update.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server tenant casting radio fields", () => {
        const actual = {
          fields: [
            {
              id: "some-id",
              title: "some-title",
              type: "radio",
              required: "false",
              options: [
                {
                  id: "some-sub-id",
                  title: "some-title",
                },
              ],
            },
          ],
        };
        const expected = {
          fields: [
            {
              id: "some-id",
              title: "some-title",
              type: "radio",
              options: [
                {
                  id: "some-sub-id",
                  title: "some-title",
                  note: "",
                },
              ],
              required: false,
            },
          ],
        };

        expect(schemas.server.update.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server removing mercadopago", () => {
        const actual = {
          mercadopago: {
            token: "some-token",
            refresh: "some-refresh",
            expiration: 123,
          },
        };
        const expected = {};

        expect(schemas.server.update.cast(actual)).toEqual(expected);
      });
    });

    describe("create", () => {
      it("should normalize any to server tenant", () => {
        const actual = {
          slug: "goncy",
        };
        const expected = {
          slug: "goncy",
          color: DEFAULT_CLIENT_TENANT.color,
          country: DEFAULT_CLIENT_TENANT.country,
          description: DEFAULT_CLIENT_TENANT.description,
          keywords: DEFAULT_CLIENT_TENANT.keywords,
          location: DEFAULT_CLIENT_TENANT.location,
          createdAt: DEFAULT_CLIENT_TENANT.createdAt,
          updatedAt: DEFAULT_CLIENT_TENANT.createdAt,
          layout: DEFAULT_CLIENT_TENANT.layout,
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          phone: DEFAULT_CLIENT_TENANT.phone,
          products: DEFAULT_CLIENT_TENANT.products,
          title: DEFAULT_CLIENT_TENANT.title,
          flags: DEFAULT_CLIENT_TENANT.flags,
        };

        expect(schemas.server.create.cast(actual)).toEqual(expected);
      });

      it("should allow custom createdAt", () => {
        const actual = {
          slug: "goncy",
          createdAt: 1,
          updatedAt: 1,
        };
        const expected = {
          slug: "goncy",
          color: DEFAULT_CLIENT_TENANT.color,
          country: DEFAULT_CLIENT_TENANT.country,
          description: DEFAULT_CLIENT_TENANT.description,
          keywords: DEFAULT_CLIENT_TENANT.keywords,
          location: DEFAULT_CLIENT_TENANT.location,
          createdAt: 1,
          updatedAt: 1,
          layout: DEFAULT_CLIENT_TENANT.layout,
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          phone: DEFAULT_CLIENT_TENANT.phone,
          products: DEFAULT_CLIENT_TENANT.products,
          title: DEFAULT_CLIENT_TENANT.title,
          flags: DEFAULT_CLIENT_TENANT.flags,
        };

        expect(schemas.server.create.cast(actual)).toEqual(expected);
      });

      it("should normalize location if present", () => {
        const actual = {
          slug: "goncy",
          location: {
            address: "some-address",
            coordinates: {
              lat: "100",
              lng: "100",
            },
          },
        };
        const expected = {
          slug: "goncy",
          color: DEFAULT_CLIENT_TENANT.color,
          country: DEFAULT_CLIENT_TENANT.country,
          description: DEFAULT_CLIENT_TENANT.description,
          keywords: DEFAULT_CLIENT_TENANT.keywords,
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          phone: DEFAULT_CLIENT_TENANT.phone,
          products: DEFAULT_CLIENT_TENANT.products,
          createdAt: DEFAULT_CLIENT_TENANT.createdAt,
          updatedAt: DEFAULT_CLIENT_TENANT.createdAt,
          title: DEFAULT_CLIENT_TENANT.title,
          location: {
            address: "some-address",
            coordinates: {
              lat: 100,
              lng: 100,
            },
          },
          layout: DEFAULT_CLIENT_TENANT.layout,
          flags: DEFAULT_CLIENT_TENANT.flags,
        };

        expect(schemas.server.create.cast(actual)).toEqual(expected);
      });
    });

    describe("mercadopago", () => {
      it("should normalize any to server tenant mercadopago", () => {
        const actual = {
          mercadopago: null,
        };
        const expected = {
          mercadopago: null,
        };

        expect(schemas.server.mercadopago.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server tenant mercadopago casting correctly", () => {
        const actual = {
          mercadopago: {
            token: "some-token",
          },
        };
        const expected = {
          mercadopago: {
            expiration: 0,
            refresh: "",
            token: "some-token",
          },
        };

        expect(schemas.server.mercadopago.cast(actual)).toEqual(expected);
      });
    });
  });

  describe("client", () => {
    describe("fetch", () => {
      it("should normalize any to client tenant", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: DEFAULT_CLIENT_TENANT.color,
          phone: "1144444444",
          products: DEFAULT_CLIENT_TENANT.products,
        };
        const expected = {
          ...actual,
          banner: "",
          category: "",
          country: DEFAULT_CLIENT_TENANT.country,
          description: "",
          facebook: "",
          createdAt: DEFAULT_CLIENT_TENANT.createdAt,
          updatedAt: DEFAULT_CLIENT_TENANT.createdAt,
          fields: [],
          flags: DEFAULT_CLIENT_TENANT.flags,
          highlight: "",
          hook: "",
          pixel: "",
          ga: "",
          instagram: "",
          keywords: "",
          location: DEFAULT_CLIENT_TENANT.location,
          layout: DEFAULT_CLIENT_TENANT.layout,
          logo: "",
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should transform commercial to free if expired", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: DEFAULT_CLIENT_TENANT.color,
          phone: "1144444444",
          products: DEFAULT_CLIENT_TENANT.products,
        };
        const expected = {
          ...actual,
          banner: "",
          category: "",
          country: DEFAULT_CLIENT_TENANT.country,
          description: "",
          facebook: "",
          createdAt: DEFAULT_CLIENT_TENANT.createdAt,
          updatedAt: DEFAULT_CLIENT_TENANT.createdAt,
          fields: [],
          flags: DEFAULT_CLIENT_TENANT.flags,
          highlight: "",
          hook: "",
          pixel: "",
          ga: "",
          instagram: "",
          keywords: "",
          location: DEFAULT_CLIENT_TENANT.location,
          layout: DEFAULT_CLIENT_TENANT.layout,
          logo: "",
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to client tenant casting correctly", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: DEFAULT_CLIENT_TENANT.color,
          phone: 1144444444,
          highlight: "Some highlight",
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          products: DEFAULT_CLIENT_TENANT.products,
          banner: "",
          category: "",
          country: DEFAULT_CLIENT_TENANT.country,
          description: "",
          createdAt: DEFAULT_CLIENT_TENANT.createdAt,
          updatedAt: DEFAULT_CLIENT_TENANT.createdAt,
          facebook: "",
          fields: [],
          flags: DEFAULT_CLIENT_TENANT.flags,
          hook: "",
          pixel: "",
          ga: "",
          instagram: "",
          keywords: "",
          location: DEFAULT_CLIENT_TENANT.location,
          layout: DEFAULT_CLIENT_TENANT.layout,
          logo: "",
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to client tenant casting location correctly", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: DEFAULT_CLIENT_TENANT.color,
          phone: 1144444444,
          highlight: "Some highlight",
          location: {
            address: "some address",
            coordinates: {
              lat: "10.001",
              lng: "10.001",
            },
          },
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          products: DEFAULT_CLIENT_TENANT.products,
          banner: "",
          category: "",
          country: DEFAULT_CLIENT_TENANT.country,
          createdAt: DEFAULT_CLIENT_TENANT.createdAt,
          updatedAt: DEFAULT_CLIENT_TENANT.createdAt,
          description: "",
          facebook: "",
          fields: [],
          flags: DEFAULT_CLIENT_TENANT.flags,
          hook: "",
          pixel: "",
          ga: "",
          instagram: "",
          keywords: "",
          location: {
            address: "some address",
            coordinates: {
              lat: 10.001,
              lng: 10.001,
            },
          },
          layout: DEFAULT_CLIENT_TENANT.layout,
          logo: "",
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to client tenant casting flags correctly", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: DEFAULT_CLIENT_TENANT.color,
          phone: 1144444444,
          highlight: "Some highlight",
          flags: [1, 2, 3],
          location: {
            address: "some address",
            coordinates: {
              lat: "10.001",
              lng: "10.001",
            },
          },
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          products: DEFAULT_CLIENT_TENANT.products,
          banner: "",
          category: "",
          country: DEFAULT_CLIENT_TENANT.country,
          description: "",
          facebook: "",
          fields: [],
          flags: ["1", "2", "3"],
          hook: "",
          pixel: "",
          ga: "",
          createdAt: DEFAULT_CLIENT_TENANT.createdAt,
          updatedAt: DEFAULT_CLIENT_TENANT.createdAt,
          instagram: "",
          keywords: "",
          location: {
            address: "some address",
            coordinates: {
              lat: 10.001,
              lng: 10.001,
            },
          },
          layout: DEFAULT_CLIENT_TENANT.layout,
          logo: "",
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to client tenant allowing null location", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: DEFAULT_CLIENT_TENANT.color,
          phone: 1144444444,
          highlight: "Some highlight",
          flags: [1, 2, 3],
          location: DEFAULT_CLIENT_TENANT.location,
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          products: DEFAULT_CLIENT_TENANT.products,
          banner: "",
          category: "",
          country: DEFAULT_CLIENT_TENANT.country,
          description: "",
          facebook: "",
          fields: [],
          flags: ["1", "2", "3"],
          hook: "",
          pixel: "",
          ga: "",
          createdAt: DEFAULT_CLIENT_TENANT.createdAt,
          updatedAt: DEFAULT_CLIENT_TENANT.createdAt,
          instagram: "",
          keywords: "",
          location: DEFAULT_CLIENT_TENANT.location,
          layout: DEFAULT_CLIENT_TENANT.layout,
          logo: "",
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to client tenant adding location when not present", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: DEFAULT_CLIENT_TENANT.color,
          phone: 1144444444,
          highlight: "Some highlight",
          flags: [1, 2, 3],
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          products: DEFAULT_CLIENT_TENANT.products,
          banner: "",
          category: "",
          country: DEFAULT_CLIENT_TENANT.country,
          description: "",
          facebook: "",
          fields: [],
          createdAt: DEFAULT_CLIENT_TENANT.createdAt,
          updatedAt: DEFAULT_CLIENT_TENANT.createdAt,
          flags: ["1", "2", "3"],
          hook: "",
          pixel: "",
          ga: "",
          instagram: "",
          keywords: "",
          location: DEFAULT_CLIENT_TENANT.location,
          layout: DEFAULT_CLIENT_TENANT.layout,
          logo: "",
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should return false when mercadopago is not valid", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: DEFAULT_CLIENT_TENANT.color,
          phone: 1144444444,
          highlight: "Some highlight",
          flags: [1, 2, 3],
          mercadopago: {
            expiration: null,
            refresh: "",
            token: "",
          },
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          products: DEFAULT_CLIENT_TENANT.products,
          banner: "",
          category: "",
          country: DEFAULT_CLIENT_TENANT.country,
          description: "",
          facebook: "",
          fields: [],
          flags: ["1", "2", "3"],
          hook: "",
          pixel: "",
          ga: "",
          instagram: "",
          createdAt: DEFAULT_CLIENT_TENANT.createdAt,
          updatedAt: DEFAULT_CLIENT_TENANT.updatedAt,
          keywords: "",
          location: DEFAULT_CLIENT_TENANT.location,
          layout: DEFAULT_CLIENT_TENANT.layout,
          logo: "",
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should not update created at if present", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: DEFAULT_CLIENT_TENANT.color,
          phone: 1144444444,
          highlight: "Some highlight",
          createdAt: 1,
          updatedAt: 1,
          flags: [1, 2, 3],
          mercadopago: {
            expiration: null,
            refresh: "",
            token: "",
          },
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          products: DEFAULT_CLIENT_TENANT.products,
          banner: "",
          category: "",
          country: DEFAULT_CLIENT_TENANT.country,
          description: "",
          facebook: "",
          createdAt: 1,
          updatedAt: 1,
          fields: [],
          flags: ["1", "2", "3"],
          hook: "",
          pixel: "",
          ga: "",
          instagram: "",
          keywords: "",
          location: DEFAULT_CLIENT_TENANT.location,
          layout: DEFAULT_CLIENT_TENANT.layout,
          logo: "",
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should not update updated at if present", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: DEFAULT_CLIENT_TENANT.color,
          phone: 1144444444,
          highlight: "Some highlight",
          createdAt: 1,
          updatedAt: 1,
          flags: [1, 2, 3],
          mercadopago: {
            expiration: null,
            refresh: "",
            token: "",
          },
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          products: DEFAULT_CLIENT_TENANT.products,
          banner: "",
          category: "",
          country: DEFAULT_CLIENT_TENANT.country,
          description: "",
          facebook: "",
          createdAt: 1,
          updatedAt: 1,
          fields: [],
          flags: ["1", "2", "3"],
          hook: "",
          pixel: "",
          ga: "",
          instagram: "",
          keywords: "",
          location: DEFAULT_CLIENT_TENANT.location,
          layout: DEFAULT_CLIENT_TENANT.layout,
          logo: "",
          mercadopago: DEFAULT_CLIENT_TENANT.mercadopago,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });
    });
  });
});
