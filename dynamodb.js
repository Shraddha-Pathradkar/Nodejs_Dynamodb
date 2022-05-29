const { Response } = require("aws-sdk")
const AWS = require("aws-sdk")
require("dotenv").config()


AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()

const TABLE_NAME = "Dynamodb-first"

const getData = async () => {
    const params = {
        TableName: TABLE_NAME
    }
    const response = await dynamoClient.scan(params).promise()
    console.log(response)
    return response

}

const addOrUpdateData = async (data) => {
    const params = {
        TableName: TABLE_NAME,
        Item: data
    }

    return await dynamoClient.put(params).promise()
}

const getDataById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id, }
    }
    return await dynamoClient.get(params).promise()

}

const deleteById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id, }
    }
    return await dynamoClient.delete(params).promise()

}

module.exports = {
    dynamoClient,
    deleteById,
    getDataById,
    addOrUpdateData,
    getData
}