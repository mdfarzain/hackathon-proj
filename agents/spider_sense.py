import time


async def spider_sense(brain_result, portfolio, risk_profile):
    start = time.perf_counter()

    sector_exposure = {}

    for item in portfolio:
        sector = item["sector"]
        percentage = item["percentage"]

        sector_exposure[sector] = (
            sector_exposure.get(sector, 0) + percentage
        )

    if sector_exposure:
        highest_sector = max(
            sector_exposure,
            key=sector_exposure.get
        )

        highest_exposure = sector_exposure[highest_sector]

    else:
        highest_sector = "Unknown"
        highest_exposure = 0

    brain_verdict = brain_result["verdict"]

    if highest_exposure >= 60 and risk_profile == "low":

        verdict = "high_risk"

        reasoning = (
            f"Your portfolio has {highest_exposure}% exposure "
            f"to the {highest_sector} sector, which is risky "
            "for a low-risk investor."
        )

    elif brain_verdict == "bullish" and risk_profile == "high":

        verdict = "opportunity"

        reasoning = (
            "The positive market outlook matches your "
            "higher risk tolerance."
        )

    elif brain_verdict == "bearish":

        verdict = "high_risk"

        reasoning = (
            "The overall market outlook is bearish, "
            "which increases investment risk."
        )

    else:

        verdict = "moderate_risk"

        reasoning = (
            "The market outlook should be considered alongside "
            "your portfolio exposure and risk tolerance."
        )

    return {
        "agent": "Spider-Sense",
        "verdict": verdict,
        "confidence": 0.85,
        "reasoning": reasoning,
        "sources": ["user_portfolio", "risk_profile"],
        "latency_ms": int((time.perf_counter() - start) * 1000)
    }