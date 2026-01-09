import type { Api } from "./server";
import { newWebSocketRpcSession } from "capnweb";

const session = newWebSocketRpcSession<Api>("ws://localhost:8000");

for (let i = 0; i < 100; i++) {
  const size = 1024 * (10 * i);
  try {
    const file = new Uint8Array(size);
    const result = await session.getFileSize(file);
    console.log(`Sent file of size ${size} bytes, received result ${result}`);
  } catch (error) {
    console.error(`Error sending file of size ${size} bytes:`, error);
    break;
  }
}