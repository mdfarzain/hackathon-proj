from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

import asyncio
import hashlib
import json
import os
import time
import uuid

from models.schemas import (
    AnalyzeRequest,
    UserRegisterRequest,
    UserLoginRequest,
    UserProfileResponse,
    UpdateProfileRequest,
    ChangePasswordRequest,
)

from agents.spider_eye import spider_eye
from agents.spider_mind import spider_mind
from agents.spider_ear import spider_ear
from agents.spider_brain import spider_brain
from agents.spider_sense import spider_sense


app = FastAPI(
    title="Spider AI Council API",
    description="Multi-Agent Financial Intelligence Platform",
    version="1.0.0"
)


# Allow React frontend to connect seamlessly
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================================================
# PERSISTENT USER DATABASE MANAGEMENT (JSON STORE)
# ==============================================================
USERS_DB_FILE = os.path.join(os.path.dirname(__file__), "users_db.json")


def hash_password(password: str) -> str:
    """Hashes a password with SHA-256 and salt for secure storage."""
    salt = "spider_council_secure_salt_v1"
    return hashlib.sha256(f"{salt}{password}".encode("utf-8")).hexdigest()


def load_users_db() -> dict:
    if not os.path.exists(USERS_DB_FILE):
        return {}
    try:
        with open(USERS_DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def save_users_db(users: dict):
    with open(USERS_DB_FILE, "w", encoding="utf-8") as f:
        json.dump(users, f, indent=2)


@app.get("/")
async def home():
    return {
        "status": "online",
        "message": "Spider AI Council Multi-Agent Backend Active",
        "agents": [
            "Spider-Eye (Technical)",
            "Spider-Mind (Fundamental)",
            "Spider-Ear (Sentiment)",
            "Spider-Brain (Synthesis)",
            "Spider-Sense (Personalization)"
        ]
    }


# ==============================================================
# AUTHENTICATION ENDPOINTS
# ==============================================================

@app.post("/auth/register", response_model=UserProfileResponse)
async def register(request: UserRegisterRequest):
    email_clean = request.email.strip().lower()
    name_clean = request.name.strip()
    
    if not name_clean:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please enter your full name."
        )
    if not email_clean or "@" not in email_clean:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please enter a valid email address."
        )
    if len(request.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters."
        )

    users = load_users_db()
    if email_clean in users:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists."
        )

    user_id = str(uuid.uuid4())
    random_node_suffix = f"{int(time.time()) % 10000:04d}"
    node_id = f"NODE-SPIDER-{random_node_suffix}"
    
    user_record = {
        "id": user_id,
        "name": name_clean,
        "email": email_clean,
        "password_hash": hash_password(request.password),
        "node_id": node_id,
        "member_since": time.strftime("%B %Y"),
        "role": "Verified Council Member",
        "avatar_url": f"https://api.dicebear.com/7.x/bottts/svg?seed={email_clean}",
        "risk_profile": request.risk_profile or "low"
    }

    users[email_clean] = user_record
    save_users_db(users)

    return UserProfileResponse(
        id=user_record["id"],
        name=user_record["name"],
        email=user_record["email"],
        node_id=user_record["node_id"],
        member_since=user_record["member_since"],
        role=user_record["role"],
        avatar_url=user_record["avatar_url"],
        risk_profile=user_record["risk_profile"]
    )


# Track failed login attempts for brute-force defense
FAILED_LOGIN_ATTEMPTS: dict[str, list[float]] = {}
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_SECONDS = 35


def check_rate_limit(key: str):
    now = time.time()
    attempts = FAILED_LOGIN_ATTEMPTS.get(key, [])
    # Filter attempts within the lockout window
    recent_attempts = [t for t in attempts if now - t < LOCKOUT_SECONDS]
    FAILED_LOGIN_ATTEMPTS[key] = recent_attempts

    if len(recent_attempts) >= MAX_FAILED_ATTEMPTS:
        oldest = recent_attempts[0]
        cooldown_left = int(LOCKOUT_SECONDS - (now - oldest))
        cooldown_left = max(1, min(LOCKOUT_SECONDS, cooldown_left))
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Too many incorrect login attempts. Please wait {cooldown_left} seconds before trying again.",
            headers={"Retry-After": str(cooldown_left)}
        )


def record_failed_attempt(key: str) -> int:
    now = time.time()
    attempts = FAILED_LOGIN_ATTEMPTS.get(key, [])
    recent_attempts = [t for t in attempts if now - t < LOCKOUT_SECONDS]
    recent_attempts.append(now)
    FAILED_LOGIN_ATTEMPTS[key] = recent_attempts
    remaining = MAX_FAILED_ATTEMPTS - len(recent_attempts)
    return max(0, remaining)


def clear_failed_attempts(key: str):
    FAILED_LOGIN_ATTEMPTS.pop(key, None)


@app.post("/auth/login", response_model=UserProfileResponse)
async def login(request: UserLoginRequest):
    email_clean = request.email.strip().lower()

    # 1. Verify brute-force rate limit
    check_rate_limit(email_clean)

    users = load_users_db()

    if email_clean not in users:
        remaining = record_failed_attempt(email_clean)
        if remaining == 0:
            check_rate_limit(email_clean)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No account found with this email."
        )

    user_record = users[email_clean]
    if user_record.get("password_hash") != hash_password(request.password):
        remaining = record_failed_attempt(email_clean)
        if remaining == 0:
            check_rate_limit(email_clean)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Incorrect password. {remaining} attempt(s) remaining before temporary lockout." if remaining > 0 else "Incorrect password."
        )

    # Login successful: clear any failed attempt history
    clear_failed_attempts(email_clean)

    return UserProfileResponse(
        id=user_record["id"],
        name=user_record["name"],
        email=user_record["email"],
        node_id=user_record["node_id"],
        member_since=user_record["member_since"],
        role=user_record["role"],
        avatar_url=user_record["avatar_url"],
        risk_profile=user_record.get("risk_profile", "low")
    )


@app.post("/auth/update-profile", response_model=UserProfileResponse)
async def update_profile(request: UpdateProfileRequest):
    email_clean = request.email.strip().lower()
    users = load_users_db()

    if email_clean not in users:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User account not found."
        )

    user_record = users[email_clean]
    if request.name.strip():
        user_record["name"] = request.name.strip()
    if request.risk_profile:
        user_record["risk_profile"] = request.risk_profile

    users[email_clean] = user_record
    save_users_db(users)

    return UserProfileResponse(
        id=user_record["id"],
        name=user_record["name"],
        email=user_record["email"],
        node_id=user_record["node_id"],
        member_since=user_record["member_since"],
        role=user_record["role"],
        avatar_url=user_record["avatar_url"],
        risk_profile=user_record.get("risk_profile", "low")
    )


@app.post("/auth/change-password")
async def change_password(request: ChangePasswordRequest):
    email_clean = request.email.strip().lower()
    users = load_users_db()

    if email_clean not in users:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User account not found."
        )

    user_record = users[email_clean]
    if user_record.get("password_hash") != hash_password(request.current_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Current password is incorrect."
        )

    if len(request.new_password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must be at least 6 characters."
        )

    user_record["password_hash"] = hash_password(request.new_password)
    users[email_clean] = user_record
    save_users_db(users)

    return {"status": "success", "message": "Password changed successfully."}


# ==============================================================
# FINANCIAL MULTI-AGENT COUNCIL ANALYSIS ENDPOINT
# ==============================================================

@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    total_start = time.perf_counter()

    # Convert portfolio items to standard dictionary representation
    portfolio_data = [
        item.model_dump()
        for item in request.portfolio
    ]

    # ==========================================================
    # RUN 3 SPECIALIST AGENTS IN PARALLEL WITH FAULT TOLERANCE
    # ==========================================================

    async def safe_agent_call(agent_func, name, *args):
        try:
            return await agent_func(*args)
        except Exception as e:
            return {
                "agent": name,
                "verdict": "abstain",
                "confidence": 0.0,
                "reasoning": f"Agent encountered an unexpected issue: {str(e)}",
                "sources": [],
                "latency_ms": 0
            }

    eye_task = safe_agent_call(spider_eye, "Spider-Eye", request.stock)
    ear_task = safe_agent_call(spider_ear, "Spider-Ear", request.stock)

    if not request.simulate_timeout:
        mind_task = safe_agent_call(spider_mind, "Spider-Mind", request.stock)
        eye_result, mind_result, ear_result = await asyncio.gather(
            eye_task,
            mind_task,
            ear_task
        )
    else:
        # Run Spider-Eye and Spider-Ear normally
        eye_result, ear_result = await asyncio.gather(
            eye_task,
            ear_task
        )

        # Force timeout simulation for Spider-Mind
        try:
            mind_result = await asyncio.wait_for(
                spider_mind(request.stock),
                timeout=0.5
            )
        except (asyncio.TimeoutError, TimeoutError):
            mind_result = {
                "agent": "Spider-Mind",
                "verdict": "abstain",
                "confidence": 0.0,
                "reasoning": (
                    "Fundamental data source timed out (simulated). "
                    "Unable to retrieve financial filings within latency threshold."
                ),
                "sources": [],
                "latency_ms": 500
            }
        except Exception as e:
            mind_result = {
                "agent": "Spider-Mind",
                "verdict": "abstain",
                "confidence": 0.0,
                "reasoning": f"Fundamental agent error: {str(e)}",
                "sources": [],
                "latency_ms": 500
            }

    # ==========================================================
    # SPIDER-BRAIN SYNTHESIS
    # ==========================================================
    specialist_results = [
        eye_result,
        mind_result,
        ear_result
    ]

    brain_result = await spider_brain(specialist_results)

    # ==========================================================
    # SPIDER-SENSE PERSONALIZATION
    # ==========================================================
    sense_result = await spider_sense(
        brain_result,
        portfolio_data,
        request.risk_profile
    )

    # ==========================================================
    # METRICS CALCULATION
    # ==========================================================
    active_results = [
        result for result in specialist_results
        if result.get("verdict", "").lower() != "abstain"
    ]

    positive_count = sum(
        1 for result in active_results
        if result.get("verdict", "").lower() in ["bullish", "positive"]
    )

    negative_count = sum(
        1 for result in active_results
        if result.get("verdict", "").lower() in ["bearish", "negative"]
    )

    neutral_count = (
        len(active_results)
        - positive_count
        - negative_count
    )

    agreement_count = max(
        positive_count,
        negative_count,
        neutral_count
    ) if active_results else 0

    disagreement_count = (
        len(active_results) - agreement_count
    )

    total_latency = int(
        (time.perf_counter() - total_start) * 1000
    )

    # ==========================================================
    # FINAL STRUCTURED RESPONSE
    # ==========================================================
    return {
        "technical": eye_result,
        "fundamental": mind_result,
        "sentiment": ear_result,
        "synthesis": brain_result,
        "personalized_result": sense_result,
        "metrics": {
            "total_latency_ms": total_latency,
            "agreement_count": agreement_count,
            "disagreement_count": disagreement_count
        }
    }