import http from "node:http";
import { WebSocketServer } from 'ws';
import { RpcTarget, newWebSocketRpcSession } from "capnweb";

export class Api extends RpcTarget {
  async getFileSize(file: Uint8Array): Promise<number> {
    return file.length;
  }
}

const httpServer = http.createServer();

const wsServer = new WebSocketServer({ server: httpServer })
wsServer.on('connection', (ws) => {
  newWebSocketRpcSession(ws as any, new Api());
});

httpServer.listen(8000);