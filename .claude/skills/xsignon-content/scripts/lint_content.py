#!/usr/bin/env python3
"""Mechanical checker for XSignOn website copy (Markdown).

Usage: python lint_content.py <file.md> [--strict]

Prints ERROR (must fix) and WARN (fix or justify) lines. Exit code 1 if any ERROR
(or any WARN with --strict). It checks mechanics only. It cannot check that a fact is true;
every claim still needs a source in the claims log.
"""
import re
import sys

# Hype and unsafe security claims: never publish.
ERROR_PHRASES = [
    "unhackable", "bulletproof", "100% secure", "military grade", "military-grade",
    "foolproof", "guaranteed protection", "never breached", "impenetrable",
    "zero risk", "complete protection", "totally secure", "hack-proof",
    "click here", "lorem ipsum", "nullam dignissim", "the deck identifies",
    "[check", "todo", "tbd", "xxx",
]

# Weak or vague words: replace with the fact.
WARN_WORDS = [
    "innovative", "cutting-edge", "cutting edge", "state-of-the-art", "next-generation",
    "next generation", "world-class", "best-in-class", "seamless", "seamlessly",
    "effortless", "revolutionary", "game-changing", "robust", "holistic", "synergy",
    "leverage", "leverages", "leveraged", "leveraging", "utilize", "utilizes", "utilized", "utilizing", "utilise", "facilitate", "facilitates", "facilitated", "comprehensive", "powerful",
    "passionate", "dedicated team", "proven track record", "very", "really",
    "extremely", "successfully", "furthermore", "moreover", "delve", "tapestry",
    "ever-evolving", "in today's fast-paced world", "it is important to note",
    "in order to", "due to the fact that", "at this point in time",
    "please do not hesitate", "welcome to our website", "read more",
    "turnkey", "mission-critical", "best of breed", "low-hanging fruit", "ballpark",
]

# Claims that need proof: flagged so a human confirms the source.
CLAIM_PATTERNS = [
    (r"\bSOC\s?2\b", "SOC 2 mentioned: state exactly what exists (report type and period) or remove."),
    (r"\bISO\s?27001\b", "ISO 27001 mentioned: only if certified; name the body and date."),
    (r"\bGDPR\b(?!\s+(requirements|obligations|fines))", "GDPR mentioned: a product is not 'GDPR compliant'. Say it helps support GDPR obligations, if true."),
    (r"\bHIPAA\b|\bPCI\s?DSS\b", "Regulation mentioned: say what the product helps with, not that it is 'compliant'."),
    (r"\b\d{2,3}(\.\d+)?\s?%\s*(uptime|accuracy|faster|reduction|savings?|fewer)", "Percentage claim: needs source, method and date."),
    (r"\b\d[\d,.]*\s?[KMB]\+", "Large count with a plus sign: needs a verified source."),
    (r"\b(only|first|leading|largest|fastest|best)\b", "Superlative or exclusivity claim: needs proof or a specific replacement."),
    (r"\b(guarantee[sd]?|ensure[sd]?\s+(that\s+)?(you|your))", "Guarantee wording: avoid unless a written guarantee exists."),
    (r"\b(customers?|clients?)\b.*\b(trust|choose|rely)\b", "Customer claim: needs permission and a source."),
    (r"\b(Ensurity|WhiteSwan|Symmetry|Illumio)\b", "Partner named: needs written permission recorded in the claims log."),
    (r"\bAI-powered\b", "AI-powered: explain what the AI does, or cut."),
]

# Product names: correct spellings.
NAME_FIXES = {
    r"\bXsignon\b": "XSignOn",
    r"\bxsignon\b(?!\.com)": "XSignOn",
    r"\bxSignOn\b": "XSignOn",
    r"\bX Sign On\b": "XSignOn",
    r"\bX-SignOn\b": "XSignOn",
    r"\bPosture One\b": "PostureOne",
    r"\bPosture-One\b": "PostureOne",
    r"\bEval One\b": "EvalOne",
    r"\bX-Sense\b": "XSense",
    r"\bXsense\b": "XSense",
    r"\bFido ?2\b": "FIDO2",
    r"\bNIST AI RMF\b": "NIST AI-RMF",
    r"\bZeroTrust\b": "zero trust",
    r"\blog-?in\b": "sign-in (noun) / sign in (verb)",
}

VAGUE_LINKS = {"click here", "here", "read more", "learn more", "more", "link", "this link"}


def sentences(text):
    text = re.sub(r"`[^`]*`", " ", text)
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9\"“(\[])", text)
    return [p.strip() for p in parts if p.strip()]


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    strict = "--strict" in sys.argv
    if not args:
        print(__doc__)
        return 2
    path = args[0]
    raw = open(path, encoding="utf-8").read()
    problems = []  # (level, line_no, message)

    # strip fenced code blocks and front matter from prose checks, keep line numbers
    lines = raw.splitlines()
    in_code = False
    prose_lines = []
    for i, line in enumerate(lines, 1):
        if line.strip().startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        prose_lines.append((i, line))

    # headings
    last_level = 0
    h1_count = 0
    for i, line in prose_lines:
        m = re.match(r"^(#{1,6})\s+(.*)", line)
        if not m:
            continue
        level = len(m.group(1))
        title = m.group(2).strip()
        if level == 1:
            h1_count += 1
        if last_level and level > last_level + 1:
            problems.append(("ERROR", i, f"Heading level skipped (H{last_level} to H{level}): {title}"))
        last_level = level
        if title.endswith("."):
            problems.append(("WARN", i, f"Heading ends with a full stop: {title}"))
        words = title.split()
        if len(words) >= 3 and sum(1 for w in words if w[:1].isupper()) == len(words):
            problems.append(("WARN", i, f"Heading looks like Title Case; use sentence case: {title}"))
    if h1_count == 0:
        problems.append(("WARN", 1, "No H1 found."))
    if h1_count > 1:
        problems.append(("ERROR", 1, f"{h1_count} H1 headings; use exactly one."))

    for i, line in prose_lines:
        low = line.lower()
        text = re.sub(r"^\s*(#{1,6}|[-*+]|\d+[.)])\s+", "", line)

        # em dash, en dash used as dash
        if "—" in line:
            problems.append(("ERROR", i, "Em dash found; use a comma, colon or full stop."))
        if re.search(r"\s–\s", line):
            problems.append(("WARN", i, "Spaced en dash used as a dash; use a comma, colon or full stop."))
        if "&" in text and not re.search(r"&\w+;|\[.*&.*\]\(|https?://\S*&", text):
            if re.search(r"\w\s&\s\w", text):
                problems.append(("WARN", i, "Ampersand in copy; write 'and' (except in proper names)."))
        if re.search(r"[\U0001F300-\U0001FAFF☀-➿]", line):
            problems.append(("WARN", i, "Emoji in copy; remove."))
        if re.search(r"  +\S", text) and not line.lstrip().startswith("|"):
            problems.append(("WARN", i, "Double space."))
        if re.search(r"\b(\w+)\s+\1\b", low) and not re.search(r"\b(that that|had had)\b", low):
            problems.append(("ERROR", i, "Repeated word: " + re.search(r"\b(\w+)\s+\1\b", low).group(0)))
        if re.search(r"\s[,.;:!?]", text) and "..." not in text:
            problems.append(("WARN", i, "Space before punctuation."))
        if re.search(r"\b\d{1,2}/\d{1,2}/\d{2,4}\b", text):
            problems.append(("ERROR", i, "Numeric date; write 'March 4, 2026'."))
        if re.search(r"\b(colour|organise|centre|licence\b(?! plate)|behaviour|realise|analyse|favour|programme)\b", low):
            problems.append(("WARN", i, "UK spelling; house style is US English."))

        for phrase in ERROR_PHRASES:
            if phrase in low:
                problems.append(("ERROR", i, f"Banned or unsafe phrase: '{phrase}'"))
        for word in WARN_WORDS:
            if re.search(r"(?<![\w-])" + re.escape(word) + r"(?![\w-])", low):
                problems.append(("WARN", i, f"Weak or vague word: '{word}'. Replace with the fact."))
        for pattern, msg in CLAIM_PATTERNS:
            if re.search(pattern, text, flags=re.I):
                problems.append(("WARN", i, "CLAIM: " + msg))
        for pattern, fix in NAME_FIXES.items():
            if re.search(pattern, text):
                problems.append(("ERROR", i, f"Name or term spelling: use '{fix}'."))

        # links
        for m in re.finditer(r"\[([^\]]*)\]\(([^)]*)\)", line):
            label = m.group(1).strip().lower()
            if label in VAGUE_LINKS:
                problems.append(("ERROR", i, f"Vague link text '{m.group(1)}'; describe the destination."))
            if not m.group(2).strip():
                problems.append(("ERROR", i, "Link with empty address."))
            if len(label.split()) > 8:
                problems.append(("WARN", i, "Link text over 8 words."))
        # images
        for m in re.finditer(r"!\[([^\]]*)\]\(([^)]*)\)", line):
            if not m.group(1).strip():
                problems.append(("WARN", i, "Image with empty alt text; fine only if purely decorative."))
        # buttons written as "Submit"
        if re.search(r"\bbutton[^a-z]*[:\-]\s*['\"“]?(submit|click here|read more)\b", low):
            problems.append(("ERROR", i, "Button label must be verb plus outcome, not Submit / Click here / Read more."))

    # sentence length and passive voice (body paragraphs and list items, not tables or headings)
    for i, line in prose_lines:
        s = line.strip()
        if not s or s.startswith("|") or re.match(r"^#{1,6}\s", s) or s.startswith(">") and False:
            continue
        s = re.sub(r"^([-*+]|\d+[.)])\s+", "", s)
        s = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", s)
        for sent in sentences(s):
            words = re.findall(r"[A-Za-z0-9'’$%.-]+", sent)
            n = len(words)
            if n > 30:
                problems.append(("ERROR", i, f"Sentence has {n} words (limit 25, hard stop 30): {sent[:70]}..."))
            elif n > 25:
                problems.append(("WARN", i, f"Sentence has {n} words (aim for 15 to 20): {sent[:70]}..."))
            if re.search(r"\b(is|are|was|were|been|being|be)\s+(\w+ly\s+)?\w+(ed|en)\b(?!\s+to\b)\s+by\b", sent):
                problems.append(("WARN", i, f"Passive voice: {sent[:70]}..."))

    # text-wide checks
    body = "\n".join(l for _, l in prose_lines)
    if re.search(r"\bsoc\s?2\b.*\bcertified\b|\bcertified\b.*\bsoc\s?2\b", body, flags=re.I):
        problems.append(("ERROR", 1, "'SOC 2 certified' is not an accurate phrase. SOC 2 is an audit report."))
    if re.search(r"gdpr[- ]compliant", body, flags=re.I):
        problems.append(("ERROR", 1, "'GDPR compliant' as a product claim; say it helps support GDPR obligations."))

    # report
    problems.sort(key=lambda p: (p[1], p[0]))
    errors = [p for p in problems if p[0] == "ERROR"]
    warns = [p for p in problems if p[0] == "WARN"]
    for level, line_no, msg in problems:
        print(f"{level:5} line {line_no:>4}: {msg}")
    words_total = len(re.findall(r"\w+", body))
    print(f"\n{path}: {len(errors)} error(s), {len(warns)} warning(s), about {words_total} words.")
    if not problems:
        print("lint: clean")
    return 1 if errors or (strict and warns) else 0


if __name__ == "__main__":
    sys.exit(main())
