// src/client/helloClient.ts
import { HelloRequest } from "./proto/helloworld_pb";
import { GreeterClient } from "./proto/helloworld_grpc_pb";
import { credentials, Metadata } from "@grpc/grpc-js";
import { host, port } from "./config";

const serverURL = `${host}:${port}`;

export type RequestParams = {
    name?: string;
};

export function sayHello({ name = "World" }: RequestParams) {
    const Request = new HelloRequest();
    const Client = new GreeterClient(
        serverURL,
        credentials.createInsecure()
    );
    Request.setName(name);

    return new Promise((resolve, reject) => {
        const meta = new Metadata();
        meta.add('hoge', 'from client');

        const sayHelloCall = Client.sayHello(Request, meta, (error, response) => {
            if (error) {
                console.error(error);
                reject({
                    code: error?.code || 500,
                    message: error?.message || "something went wrong",
                });
            }
            // console.log(response.getMessage());

            // return resolve({ hoge: 'fuga' });
            return resolve(response.toObject());
        });
    });
}