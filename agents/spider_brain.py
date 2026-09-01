import time


async def spider_brain(agent_results):
    """
    🕸️ Spider-Brain — Central Synthesis Chairperson Agent
    Receives outputs from specialist agents (Spider-Eye, Spider-Mind, Spider-Ear).
    Detects agreement, detects conflict, calculates overall confidence, and synthesizes final verdict.
    """
    start = time.perf_counter()

    active_results = [
        r for r in agent_results
        if r.get("verdict", "").lower() != "abstain"
    ]
    abstained_results = [
        r for r in agent_results
        if r.get("verdict", "").lower() == "abstain"
    ]

    bullish_agents = []
    bearish_agents = []
    neutral_agents = []

    for r in active_results:
        agent_name = r.get("agent", "Agent")
        v = r.get("verdict", "").lower()
        if v in ["bullish", "positive"]:
            bullish_agents.append(agent_name)
        elif v in ["bearish", "negative"]:
            bearish_agents.append(agent_name)
        else:
            neutral_agents.append(agent_name)

    total_active = len(active_results)

    # Determine consensus verdict
    if len(bullish_agents) > len(bearish_agents) and len(bullish_agents) >= len(neutral_agents):
        final_verdict = "bullish"
    elif len(bearish_agents) > len(bullish_agents) and len(bearish_agents) >= len(neutral_agents):
        final_verdict = "bearish"
    else:
        final_verdict = "neutral"

    # Calculate average confidence of active specialists
    if active_results:
        avg_confidence = sum(r.get("confidence", 0.0) for r in active_results) / total_active
        # Slight penalty if an agent abstained due to incomplete information
        if abstained_results:
            avg_confidence = max(0.40, avg_confidence * 0.90)
    else:
        avg_confidence = 0.0

    # Build clear, transparent reasoning
    parts = []
    if final_verdict == "bullish":
        agree_list = ", ".join(bullish_agents)
        parts.append(f"Consensus is Bullish with alignment across {agree_list}.")
    elif final_verdict == "bearish":
        agree_list = ", ".join(bearish_agents)
        parts.append(f"Consensus is Bearish driven by risk signals from {agree_list}.")
    else:
        parts.append("Consensus is Neutral due to mixed signals across the council.")

    if bullish_agents and bearish_agents:
        parts.append(f"Conflict detected: {', '.join(bullish_agents)} signaled strength, while {', '.join(bearish_agents)} cautioned downward risk.")
    elif neutral_agents and (bullish_agents or bearish_agents):
        parts.append(f"Moderating factors noted by {', '.join(neutral_agents)} advising measured entry.")

    if abstained_results:
        abstained_names = ", ".join(r.get("agent", "Agent") for r in abstained_results)
        parts.append(f"Note: {abstained_names} abstained due to timeout/data unavailability; synthesis synthesized remaining {total_active} active specialists.")

    reasoning = " ".join(parts)

    # Collect unique sources
    sources = []
    for r in active_results:
        for s in r.get("sources", []):
            if s not in sources:
                sources.append(s)

    latency = int((time.perf_counter() - start) * 1000)

    return {
        "agent": "Spider-Brain",
        "verdict": final_verdict,
        "confidence": round(avg_confidence, 2),
        "reasoning": reasoning,
        "sources": sources,
        "latency_ms": max(latency, 8)
    }