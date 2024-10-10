import { nanoid } from 'nanoid';
import DynamoDB from 'aws-sdk/clients/dynamodb.js';

const docClient = new DynamoDB.DocumentClient();

export const createUser = async (event) => {
    try {
        const { firstName, lastName, email, contactnumber, password } = JSON.parse(event.body);

        if (!firstName || !lastName || !email || !contactnumber || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Missing required fields: firstName, lastName, email, contactnumber, and password are required',
                }),
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
                }
            };
        }

        const now = new Date().toISOString();

        await docClient.put({
            TableName: 'Users',
            Item: {
                id: nanoid(8), 
                firstName,
                lastName,
                email,
                contactnumber,
                password, 
                createdAt: now,
            },
        }).promise();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
            },
            body: JSON.stringify({
                message: 'User created successfully',
            }),
        };
    } catch (error) {
        console.error('Error creating user:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error creating user. Please try again later.',
            }),
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
            }
        };
    }
};
