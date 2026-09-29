# Authorized EduServe integration

This repository does **not** connect to EduServe, scrape it, bypass a login, solve CAPTCHA, or use private endpoints. The mobile app currently receives a fictional student's mock data from `MockStudentDataProvider`.

When Karunya provides written authorization and official API credentials, add `AuthorizedEduServeStudentDataProvider` behind `StudentDataProvider` in both the mobile application and FastAPI service. Keep authentication tokens on the server, map official response models to the domain types, validate all input, and retain mock mode for local development. No screen should call EduServe directly.
