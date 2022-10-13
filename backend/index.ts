// src/server/index.ts
import {
    Metadata,
    sendUnaryData,
    Server,
    ServerCredentials,
    ServerUnaryCall,
    StatusObject,
} from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { GreeterService } from "./proto/helloworld_grpc_pb";
import { HelloReply, HelloRequest } from "./proto/helloworld_pb";
import { port } from "./config";

function sayHello(
    call: ServerUnaryCall<HelloRequest, HelloReply>,
    callback: sendUnaryData<HelloReply>
) {
    const greeter = new HelloReply();
    const name = call.request.getName();
    const message = `Hello ${name}`;
    console.log(call.metadata.get('hoge'));
    greeter.setMessage(message);

    const meta = new Metadata();
    meta.add('hoge', 'header from server');
    const status: Partial<StatusObject> = {
        code: Status.OK,
        details: "details dayo-",
        metadata: meta,
    }
    const metaTrail = new Metadata();
    metaTrail.add('hoge', 'trailer from server');
    // callback(null, greeter);
    callback(null, greeter, metaTrail);
    // callback(status);
    // callback(status, greeter, metaTrail);
}

function startServer() {
    const server = new Server();
    server.addService(GreeterService, { sayHello });
    server.bindAsync(
        `0.0.0.0:${port}`,
        ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                console.error(error);
            }

            server.start();
            console.log(`server start listing on port ${port}`);
        }
    );
}

startServer();