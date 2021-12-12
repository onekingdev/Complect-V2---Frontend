// Helpers
const AWS = require('aws-sdk')
import { getCollection } from "../helpers/mongo.js";
import { logger, requestGuard } from "../helpers/utils.js";
import { createDocuments, readDocuments, updateDocument, deleteDocuments } from "./crud.js"

let databaseName = "dev"
let collectionName = "sockets"
const success = {
	statusCode: 200  
}

const apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({
	apiVersion: '2029',
	endpoint: 'http://0.0.0.0:3001'
})



const saveConnectionId = async (userId, connectionId) => {
	let collection = await getCollection(databaseName, collectionName)
	await collection.findOneAndUpdate({ _id: userId }, { $push: { "connections": connectionId } }, { upsert: true });
}

const deleteConnectionId = async connectionId => {
	let collection = await getCollection(databaseName, collectionName);
	let connections = await collection.findOne({ "connections": connectionId });
	let userId = connections._id;
	await collection.findOneAndUpdate({ _id: userId }, { $pull: { "connections": connectionId } });
}

// Connect
const connect = async event => {
	logger.info( "Socket connection..." );
	try {
		let connectionId = event.requestContext.connectionId
		let userId = event.queryStringParameters.id
		saveConnectionId(userId, connectionId)
		logger.info( "Client connected" );
		return {statusCode: 200}
	} catch(error) {
		logger.error( error )
	}
}

// Disconnect
const disconnect = async event => {
	try {
		await deleteConnectionId(event.requestContext.connectionId)
		return {statusCode: 200}
	} catch(error) {
		logger.error( error )
	}
}




// Send Data to client
const sendData = async (connectionId, data) => {
	try {
		await apiGatewayManagementApi.postToConnection({
			ConnectionId: connectionId,
			Data: data
		}).promise()
	} catch(error) {
		logger.error( error )
		if(error.statusCode === 410) deleteConnectionId(connectionId) // Remove dead Connections
		if(error.statusCode !== 400 && error.statusCode !== 410) throw error
	}
}



// Transmit Data to client
const transmitData = async (userId, data) => {
	try {
		let collection = await getCollection(databaseName, collectionName);
		let connections = await collection.findOne({ _id: userId });
		const messages = connections.connections.map(async connection => {
			return await sendData(connection, "ok")
		})
		await Promise.all(messages)
		return success
	} catch(error) {
		logger.error( error )
	}
}


// Default Handler
const defaultHandler = async event => console.log('Socket defaultHandler')



// REST Handler
const restHandler = async event => {
	console.log('REST API')
	try {
		let body = JSON.parse(event.body)
		// const requestParams = await requestGuard( body );
		let {collectionName, newDocuments, documentId} = body
		const methods = {
			POST: () => createDocuments( databaseName, collectionName, newDocuments ),
			GET: () => readDocuments( databaseName, collectionName ),
			PUT: () => updateDocument( databaseName, collectionName, documentId, newDocuments ),
			DELETE: () => deleteDocuments( databaseName, collectionName, documentId )
		};
		const result = await methods[body.method]();
		console.log(result)
		await transmitData(body.userId, result)
		return result
	} catch(error) {
		logger.error( error )
	}
}



export { connect, disconnect, defaultHandler, restHandler }








// --------------------------
// const connection = async () => {
// 	console.log('connect')
// 	return success
// }

// const connect = async () => {
// 	console.log('connect')
// 	return success
// }


// const disconnect = async () => {
// 	console.log('disconnect')
// 	return success
// }


// const defaultHandler = async event => {
// 	console.log('Socket Default Handler')
// 	const connectionId = event.requestContext.connectionId;
// 	console.log(connectionId)
// 	return success
// }


// const getData = async event => {
// 	const body = JSON.parse(event.body)
// 	let lastCall = Date.now()
// 	let delay = lastCall - body.time
// 	console.log(`getData (${delay}ms)`)
// 	return {
// 		statusCode: 200,
// 		body: JSON.stringify({time: lastCall, delay: delay}),
// 	}
// }



