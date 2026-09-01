from pydantic import BaseModel, Field, EmailStr
from typing import List, Literal, Optional


class PortfolioItem(BaseModel):
    symbol: str
    sector: str
    percentage: float


class AnalyzeRequest(BaseModel):
    stock: str
    risk_profile: Literal["low", "medium", "high"]
    simulate_timeout: bool = False
    portfolio: List[PortfolioItem] = Field(default_factory=list)


class AgentOutput(BaseModel):
    agent: str
    verdict: str
    confidence: float
    reasoning: str
    sources: List[str]
    latency_ms: int


class UserRegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    risk_profile: Optional[Literal["low", "medium", "high"]] = "low"


class UserLoginRequest(BaseModel):
    email: str
    password: str


class UserProfileResponse(BaseModel):
    id: str
    name: str
    email: str
    node_id: str
    member_since: str
    role: str
    avatar_url: str
    risk_profile: Literal["low", "medium", "high"]


class UpdateProfileRequest(BaseModel):
    email: str
    name: str
    risk_profile: Optional[Literal["low", "medium", "high"]] = None


class ChangePasswordRequest(BaseModel):
    email: str
    current_password: str
    new_password: str