# Test Tube Archival System

This project is a computer vision–enabled test tube archiving system, combining a Python backend for automation and object handling, with a Dockerized frontend GUI. Depending on your use case, the system supports both **dynamic** (camera-based) and **static** (predefined) archival modes.

---

## 🔧 Requirements

- Python **3.10**
- Docker & Docker Compose
- `pip` for installing dependencies

---

## 📦 Backend Setup

1. **Create a virtual environment (optional but recommended):**
   ```bash
   python3.10 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt 
   pip install -r requirementscam(Python3.10).txt
2. **For static archiving, run:**
     ```bash
       python archival.py
   ```
   **For  dynamic archiving (camera-based picking), run:**
     ```bash
       python archivingcam.py
   ```
## 🖥️ Frontend (GUI) Setup
1. In gui/Gantry/src/socket.ts add the server url which uvicorn shows
   
3. From the root of the project, start the Docker container:
  ``` bash
    docker compose up
```
3. The frontend will be available at:
   localhost:5173

