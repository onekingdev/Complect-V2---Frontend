import express from "express";
import restHandler from "./handlers/rest.js";
import { logger } from "./helpers/utils.js";

const apiServer = express();
const port = 6099;

apiServer.use(express.urlencoded({extended: true}));
apiServer.use(express.json())
apiServer.route( "/v1/:databaseName/:collectionName/:documentId?" ).all( restHandler );
apiServer.listen( port );
logger.log( `RESTful API server started on: ${port}` );
