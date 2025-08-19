# Run backend (Windows PowerShell)
$python = "C:\Users\AKASH VISHWAKARMA\AppData\Local\Programs\Python\Python312\python.exe"
& $python -m uvicorn app:app --host 127.0.0.1 --port 8000
