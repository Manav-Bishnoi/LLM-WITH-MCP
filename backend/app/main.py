from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and include routers
from app.routes import tools, chat
app.include_router(tools.router, prefix="/api")
app.include_router(chat.router, prefix="/api")

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/stats")
def stats():
    try:
        from app.services.tool_registry import load_tools
        tools = load_tools()
        return {
            "total_tools": len(tools),
            "active_tools": len([t for t in tools if t.status == "active"]),
            "categories": list(set(t.category for t in tools)),
        }
    except Exception:
        return {"total_tools": 0, "active_tools": 0, "categories": []}
