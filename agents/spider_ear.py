import asyncio
import time


async def spider_ear(stock: str):
    start = time.perf_counter()

    await asyncio.sleep(1.5)

    return {
        "agent": "Spider-Ear",
        "verdict": "neutral",
        "confidence": 0.68,
        "reasoning": f"Recent news about {stock} shows mixed market sentiment.",
        "sources": ["news_source_1", "news_source_2"],
        "latency_ms": int((time.perf_counter() - start) * 1000)
    }