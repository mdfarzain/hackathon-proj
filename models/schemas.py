from pydantic import BaseModel, Field
from typing import List, Literal


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