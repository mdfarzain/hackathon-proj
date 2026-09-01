import time


async def spider_sense(brain_result, portfolio, risk_profile):
    """
    🕷️ Spider-Sense — Personalization & Risk Agent
    Combines Spider-Brain's market synthesis with the investor's specific portfolio,
    sector concentration, and risk tolerance profile.
    Answers: What does this actually mean for THIS investor?
    """
    start = time.perf_counter()

    sector_exposure = {}
    total_percentage = 0.0

    for item in portfolio:
        sec = item.get("sector", "General")
        pct = float(item.get("percentage", 0.0))
        sector_exposure[sec] = sector_exposure.get(sec, 0.0) + pct
        total_percentage += pct

    if sector_exposure:
        highest_sector = max(sector_exposure, key=sector_exposure.get)
        highest_exposure = round(sector_exposure[highest_sector], 1)
    else:
        highest_sector = "General"
        highest_exposure = 0.0

    brain_verdict = brain_result.get("verdict", "neutral").lower()
    risk = risk_profile.lower()

    # Determine personalized risk verdict and actionable rationale
    if highest_exposure >= 50.0 and risk == "low":
        verdict = "high_risk"
        reasoning = (
            f"Caution: Your portfolio holds a heavy {highest_exposure}% concentration in the {highest_sector} sector. "
            f"For a Low-Risk investor, this concentration significantly magnifies systemic drawdown risk. "
            f"Recommendation: Prioritize capital preservation and rebalance across non-correlated sectors."
        )
        confidence = 0.88

    elif brain_verdict == "bullish" and risk == "high":
        verdict = "opportunity"
        reasoning = (
            f"Opportunity: The Council's bullish consensus aligns well with your High risk tolerance. "
            f"With {highest_sector} exposure at {highest_exposure}%, you are well-positioned to deploy capital "
            f"or capture upside momentum while monitoring stop-losses."
        )
        confidence = 0.89

    elif brain_verdict == "bullish" and risk == "medium":
        verdict = "moderate_risk"
        reasoning = (
            f"Calculated Growth: Market signals are bullish, but your Moderate risk profile warrants disciplined sizing. "
            f"Ensure {highest_sector} allocation remains within 30-40% limits and scale in systematically."
        )
        confidence = 0.84

    elif brain_verdict == "bullish" and risk == "low":
        verdict = "moderate_risk"
        reasoning = (
            f"Conservative Stance: While the market view is bullish, your Low-Risk profile requires defensive asset allocation. "
            f"Avoid excessive chasing; maintain cash reserves and favor high-dividend, stable large-caps."
        )
        confidence = 0.82

    elif brain_verdict == "bearish":
        verdict = "high_risk"
        if risk == "low":
            reasoning = (
                f"Defensive Posture Required: Bearish market consensus detected. For your Low-Risk profile, "
                f"downward volatility poses capital loss risk. Consider hedging or trimming high-beta positions."
            )
            confidence = 0.90
        else:
            reasoning = (
                f"Downside Advisory: Bearish signals dominate the market outlook. While your {risk.capitalize()} risk profile "
                f"permits holding volatility, exercise caution before increasing equity allocations."
            )
            confidence = 0.85

    else:  # Neutral or mixed
        verdict = "moderate_risk"
        reasoning = (
            f"Hold & Monitor: Neutral market consensus with {highest_exposure}% in {highest_sector}. "
            f"Aligned with your {risk.capitalize()} risk profile, maintain existing weightings and wait for clear catalyst confirmation."
        )
        confidence = 0.80

    latency = int((time.perf_counter() - start) * 1000)

    return {
        "agent": "Spider-Sense",
        "verdict": verdict,
        "confidence": round(confidence, 2),
        "reasoning": reasoning,
        "sources": ["user_portfolio", "risk_profile", "sector_concentration_matrix"],
        "latency_ms": max(latency, 5)
    }