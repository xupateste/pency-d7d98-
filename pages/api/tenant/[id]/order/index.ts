import {NextApiResponse, NextApiRequest} from "next";

import api from "~/product/api/server";
//import {Product} from "~/product/types";
import {ClientTenant} from "~/tenant/types";
//import sessionApi from "~/session/api/server";
//import schemas from "~/product/schemas";

interface PostRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
  query: {
    id: ClientTenant["id"];
  };
  body: {
    order: {};
  };
}



export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      query: {id},
      body: {order},
      headers: {},
    } = req as PostRequest;

    console.log('post order called')
    //if (!id || !order) return res.status(304).end('noid noorder');

    //if (uid !== id) return res.status(403).end();
    console.log('inside sessionApi')
    //const casted = schemas.client.create.cast(product, {stripUnkown: true});

    return api
      .hookorder(id, order)
      .then(() => res.status(200).json(order))
      .catch(() => res.status(400).end("Hubo un error creando el producto"));
  }

  return res.status(304).end('return end');
};