import socketio
from fastapi import FastAPI
import time

# Create a Socket.IO server with CORS configuration
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=["http://localhost:5173"],
    cors_credentials=True
)

# Create FastAPI app
app = FastAPI()
socket_app = socketio.ASGIApp(sio, other_asgi_app=app)

@app.get("/")
async def index():
    return {"message": "Socket.IO server is running"}

@sio.event
async def connect(sid, environ):
    print(f"Client {sid} connected")
    await sio.emit("message", {"data": "Welcome!"}, to=sid)

@sio.event
async def disconnect(sid):
    print(f"Client {sid} disconnected")

@sio.event
async def robotCmd(sid, data):
    if data['cmd'] == 'home':
        await sio.emit("rstatus", {"cmd": "homing"})
        time.sleep(1)
        await sio.emit("rstatus", {"cmd": "homed"})
        await sio.emit("rstatus", {"cmd": "Archiving"})
        await sio.emit("data", {"tt_id": "ABCD", "pick": "1234", "place": "4567", "source": "s1", "dest": "d1"})
        await sio.emit("data", {"tt_id": "EFGH", "pick": "5678", "place": "6789", "source": "s2", "dest": "d2"})

    elif data['cmd'] == 'calibrate':
        await sio.emit("rstatus", {"cmd": "calibrating"})
        await sio.emit("rstatus",{"cmd":"doin"})
        import socketio
        from fastapi import FastAPI
        import time
        import robotInterfaces as rb
        import serial.tools.list_ports

        ports = serial.tools.list_ports.comports()
        print(ports)
        for port in ports:
            device = port.device
            print(port)
            desc = port.description.lower()
            print(desc)
            if "ch340" in desc:
                print(f"{device} is the Arduino Mega.")
                robot1 = rb.Robot('gantry', device)
            else:
                print(f"{device} - {port.description}")
        robot1.home()
        cal_hieght=130
        print("calibrate the thing")
        print("is it fyn if not say xup or yup or ydown or xdown")
        input_user_cal="false"
        cal_const_x=0
        cal_const_y=0
        input_cal_const=""
        robot1.move_to(81+cal_const_x,20+cal_const_y,cal_hieght,49,0)
        while input_cal_const!="true":
            robot1.move_to(81+cal_const_x,20+cal_const_y,cal_hieght,49,0)
            input_cal_const=input("wasd for ws(x) ad(y)or true:")
            if input_cal_const=="w":
                cal_const_x+=1
                robot1.move_to(81+cal_const_x,20+cal_const_y,cal_hieght,49,0)
            elif input_cal_const=="s":
                cal_const_x-=1
                robot1.move_to(81+cal_const_x,20+cal_const_y,cal_hieght,49,0)
            elif input_cal_const=="a":
                cal_const_y+=1
                robot1.move_to(81+cal_const_x,20+cal_const_y,cal_hieght,49,0)
            elif input_cal_const=="d":
                cal_const_y-=1
                robot1.move_to(81+cal_const_x,20+cal_const_y,cal_hieght,49,0)
        with open("calibration.txt", "w") as file:
            file.write(f"{cal_const_x},{cal_const_y}\n")
            print(f"Saved calibration: x={cal_const_x}, y={cal_const_y}")
        await sio.emit("rstatus", {"cmd": "completed"})        
        await sio.emit("rstatus", {"cmd": "calibrated"})

# Run the app using Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(socket_app, host="127.0.0.1", port=8000)
