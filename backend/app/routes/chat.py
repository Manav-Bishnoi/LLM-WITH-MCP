from fastapi import APIRouter, HTTPException
from app.models.tool import ChatMessage
from app.services.tool_registry import get_tool, load_tools
from app.client import mcp_client_pool

router = APIRouter()

@router.post("/chat")
async def chat_with_tool(msg: ChatMessage):
    tool = get_tool(msg.tool_id) if msg.tool_id else None
    if not tool:
        # fallback: first active tool
        tools = load_tools()
        tool = next((t for t in tools if t.status == "active"), None)
    if not tool:
        raise HTTPException(status_code=404, detail="No active tool available")
    client = await mcp_client_pool.get_client(tool)
    try:
        response = await client.ainvoke({"messages": [{"role": "user", "content": msg.message}]})
        return {"response": response['messages'][-1].content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 