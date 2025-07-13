import requests
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Healthcare")

def query_ollama(prompt, model="gemma3:4b"):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": model,
            "prompt": prompt,
            "stream": False
        }
    )
    return response.json()["response"]


@mcp.tool()
async def query_ollama_with_context(prompt, context="", model="gemma3:4b"):
    full_prompt = f"""
Previous conversation context:
{context}

Current request:
{prompt}

Please provide a response that considers the conversation history above.
"""
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": model,
            "prompt": full_prompt,
            "stream": False
        }
    )
    return response.json()["response"]


if __name__ == "__main__":
    mcp.run(transport="streamable-http")
