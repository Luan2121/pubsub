
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

import middleware from '../../src/middlewares';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req : any, res : NextApiResponse ) => {
  if( req.files.file && req.files.file?.length ){
    cloudinary.v2.uploader.upload( req.files.file[0].path, ( err : any ,result : any ) => {
      if(err){
        res.status(400).send({ message: "Error while loading image"});
      }
      res.status(201).send({
        url: result.url,
        name: result.public_id
      });
    });
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler;

