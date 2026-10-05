from fastapi import FastAPI, HTTPException
from .provider import MockStudentDataProvider
from .models import SignInRequest

app = FastAPI(title="Karunya One API", version="0.1.0")
provider = MockStudentDataProvider()

@app.get('/health')
async def health(): return {'status': 'ok', 'provider': 'mock'}

@app.post('/api/auth/login', status_code=501)
async def login(request: SignInRequest):
    # Do not log request.password. This remains unavailable until an authorized
    # university identity provider has been configured.
    raise HTTPException(status_code=501, detail='Production sign-in is not configured. Use development mock mode locally.')
@app.get('/api/student/profile')
async def profile(): return await provider.get_profile()
@app.get('/api/student/attendance')
async def attendance(): return await provider.get_attendance()
@app.get('/api/student/timetable')
async def timetable(): return await provider.get_timetable()
@app.get('/api/student/marks')
async def marks(): return await provider.get_marks()
@app.get('/api/student/exams')
async def exams(): return await provider.get_exams()
@app.get('/api/student/fees')
async def fees(): return await provider.get_fees()
@app.get('/api/student/notifications')
async def notifications(): return await provider.get_notifications()
@app.post('/api/assistant/query')
async def assistant_query():
    raise HTTPException(status_code=501, detail='Configure an authorized AI provider before enabling server assistant queries.')
