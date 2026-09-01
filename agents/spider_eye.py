import asyncio
import time


async def spider_eye(stock: str):
    start = time.perf_counter()

    await asyncio.sleep(1)

    return {
        "agent": "Spider-Eye",
        "verdict": "bullish",
        "confidence": 0.82,
        "reasoning": f"{stock} shows positive momentum and increasing trading volume.",
        "sources": ["market_data"],
        "latency_ms": int((time.perf_counter() - start) * 1000)
    }