from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import asyncio
import time

from models.schemas import AnalyzeRequest

from agents.spider_eye import spider_eye
from agents.spider_mind import spider_mind
from agents.spider_ear import spider_ear
from agents.spider_brain import spider_brain
from agents.spider_sense import spider_sense


app = FastAPI(
    title="Spider AI Council API",
    description="Multi-Agent Financial Intelligence System",
    version="1.0.0"
)


# Allow React frontend to connect later
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {
        "message": "Spider AI Council Backend Running"
    }


@app.post("/analyze")
async def analyze(request: AnalyzeRequest):

    total_start = time.perf_counter()

    # Convert portfolio objects into dictionaries
    portfolio_data = [
        item.model_dump()
        for item in request.portfolio
    ]

    # =====================================
    # RUN 3 SPECIALIST AGENTS IN PARALLEL
    # =====================================

    eye_task = spider_eye(request.stock)
    ear_task = spider_ear(request.stock)

    if not request.simulate_timeout:

        eye_result, mind_result, ear_result = await asyncio.gather(
            eye_task,
            spider_mind(request.stock),
            ear_task
        )

    else:

        # Run Spider-Eye and Spider-Ear normally
        eye_result, ear_result = await asyncio.gather(
            eye_task,
            ear_task
        )

        # Force timeout for Spider-Mind
        try:
            mind_result = await asyncio.wait_for(
                spider_mind(request.stock),
                timeout=0.5
            )

        except asyncio.TimeoutError:

            mind_result = {
                "agent": "Spider-Mind",
                "verdict": "abstain",
                "confidence": 0.0,
                "reasoning": (
                    "Fundamental data source timed out. "
                    "Unable to provide a grounded conclusion."
                ),
                "sources": [],
                "latency_ms": 500
            }

    # =====================================
    # SPIDER-BRAIN SYNTHESIS
    # =====================================

    specialist_results = [
        eye_result,
        mind_result,
        ear_result
    ]

    brain_result = await spider_brain(specialist_results)

    # =====================================
    # SPIDER-SENSE PERSONALIZATION
    # =====================================

    sense_result = await spider_sense(
        brain_result,
        portfolio_data,
        request.risk_profile
    )

    # =====================================
    # METRICS
    # =====================================

    active_results = [
        result for result in specialist_results
        if result["verdict"] != "abstain"
    ]

    positive_count = sum(
        1 for result in active_results
        if result["verdict"] in ["bullish", "positive"]
    )

    negative_count = sum(
        1 for result in active_results
        if result["verdict"] in ["bearish", "negative"]
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

    # =====================================
    # FINAL RESPONSE
    # =====================================

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