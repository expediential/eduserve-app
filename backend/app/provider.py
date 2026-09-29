from .models import Profile, StudentDataProvider

class MockStudentDataProvider(StudentDataProvider):
    """Development-only provider. Replace only with documented, authorized access."""
    async def get_profile(self) -> Profile:
        return Profile(name="James Martin", register_number="KU24CS1007", programme="B.Tech CSE — Cyber Security", semester=1)
    async def get_attendance(self) -> dict: return {"overall": 84.8, "threshold": 75, "source": "mock"}
    async def get_timetable(self) -> list[dict]: return []
    async def get_marks(self) -> list[dict]: return []
    async def get_exams(self) -> list[dict]: return []
    async def get_fees(self) -> dict: return {"source": "mock"}
    async def get_notifications(self) -> list[dict]: return []

# Implement AuthorizedEduServeStudentDataProvider in a separate module only after
# receiving written authorization, official endpoints, and least-privilege credentials.
