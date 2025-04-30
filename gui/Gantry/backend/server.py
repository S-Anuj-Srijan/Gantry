import socketio
from fastapi import FastAPI
import time
# Create a Socket.IO server with CORS configuration
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=["http://localhost:5173"],  # Allowed origins
    cors_credentials=True  # Allow credentials like cookies
)

# Create FastAPI app
app = FastAPI()

# Combine Socket.IO and FastAPI into a single ASGI app
socket_app = socketio.ASGIApp(sio, other_asgi_app=app)

# FastAPI route (optional)
@app.get("/")
async def index():
    return {"message": "Socket.IO server is running with CORS enabled"}

# Socket.IO event handlers
@sio.event
async def connect(sid, environ):
    print(f"Client {sid} connected")
    await sio.emit("message", {"data": "Welcome!"}, to=sid)

@sio.event
async def disconnect(sid):
    print(f"Client {sid} disconnected")

@sio.event
async def chat_message(sid, data):
    print(f"Received message: {data} from {sid}")
    await sio.emit("message", {"data": f"Echo: {data}"}, to=sid)
@sio.event
async def robotCmd(sid,data):
    if(data['cmd']=='home'):
        await sio.emit("rstatus",{"cmd":"homing"})
        #Home
        await sio.emit("rstatus",{"cmd":"Archiving"})
        
        time.sleep(1)
        await sio.emit("data",{"tt_id":"ABCD","pick":"1234","place":"4567","source":"s1","dest":"d1"})
        time.sleep(1)
        await sio.emit("data",{"tt_id":"ABCD","pick":"1234","place":4567,"source":"s1","dest":"d1"})

# Run the app using Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(socket_app, host="127.0.0.1", port=8000)
