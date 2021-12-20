import express from "express";
// import { logger } from "./helpers/utils.js";

const apiServer = express();
const port = 6099;

apiServer.use(express.urlencoded({extended: true}));
apiServer.use(express.json());
apiServer.listen( port );
// logger.log( `Server started on: ${port}` );
