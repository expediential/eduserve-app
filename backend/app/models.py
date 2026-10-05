from pydantic import BaseModel, Field
from typing import Protocol

class Profile(BaseModel):
    name: str
    register_number: str
    programme: str
    semester: int

class SignInRequest(BaseModel):
    """Contract for a future, server-authorized identity provider."""
    email: str = Field(min_length=3, max_length=254)
    password: str = Field(min_length=8, max_length=256)

class SessionResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'
    expires_in: int

class StudentDataProvider(Protocol):
    async def get_profile(self) -> Profile: ...
    async def get_attendance(self) -> dict: ...
    async def get_timetable(self) -> list[dict]: ...
    async def get_marks(self) -> list[dict]: ...
    async def get_exams(self) -> list[dict]: ...
    async def get_fees(self) -> dict: ...
    async def get_notifications(self) -> list[dict]: ...
