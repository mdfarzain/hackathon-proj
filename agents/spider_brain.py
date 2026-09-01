import time


async def spider_brain(agent_results):
    start = time.perf_counter()

    positive = 0
    negative = 0
    neutral = 0

    for result in agent_results:
        verdict = result["verdict"].lower()

        if verdict in ["bullish", "positive"]:
            positive += 1

        elif verdict in ["bearish", "negative"]:
            negative += 1

        elif verdict != "abstain":
            neutral += 1

    if positive > negative and positive >= neutral:
        final_verdict = "bullish"
        reasoning = "Most available specialist agents indicate a positive market outlook."

    elif negative > positive and negative >= neutral:
        final_verdict = "bearish"
        reasoning = "Most available specialist agents indicate a negative market outlook."

    else:
        final_verdict = "neutral"
        reasoning = "The specialist agents show mixed signals."

    active_results = [
        result for result in agent_results
        if result["verdict"] != "abstain"
    ]

    if active_results:
        confidence = sum(
            result["confidence"] for result in active_results
        ) / len(active_results)
    else:
        confidence = 0.0

    sources = []

    for result in active_results:
        sources.extend(result["sources"])

    return {
        "agent": "Spider-Brain",
        "verdict": final_verdict,
        "confidence": round(confidence, 2),
        "reasoning": reasoning,
        "sources": sources,
        "latency_ms": int((time.perf_counter() - start) * 1000)
    }