from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.tool import Tool, ToolCreate
from app.services.tool_registry import (
    load_tools, get_tool, add_tool, update_tool, delete_tool
)
from app.client import mcp_client_pool

router = APIRouter()

@router.get("/tools", response_model=List[Tool])
def list_tools(
    category: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    tools = load_tools()
    if category:
        tools = [t for t in tools if t.category == category]
    if region:
        tools = [t for t in tools if t.region == region]
    if status:
        tools = [t for t in tools if t.status == status]
    if search:
        tools = [t for t in tools if search.lower() in t.name.lower() or search.lower() in t.description.lower()]
    return tools

@router.post("/tools", response_model=Tool)
def create_tool(tool: ToolCreate):
    return add_tool(tool)

@router.get("/tools/{tool_id}", response_model=Tool)
def get_tool_route(tool_id: str):
    tool = get_tool(tool_id)
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    return tool

@router.put("/tools/{tool_id}", response_model=Tool)
def update_tool_route(tool_id: str, tool: ToolCreate):
    updated = update_tool(tool_id, tool)
    if not updated:
        raise HTTPException(status_code=404, detail="Tool not found")
    return updated

@router.delete("/tools/{tool_id}")
def delete_tool_route(tool_id: str):
    if not delete_tool(tool_id):
        raise HTTPException(status_code=404, detail="Tool not found")
    return {"detail": "Tool deleted"}

@router.post("/tools/{tool_id}/test")
async def test_tool_route(tool_id: str):
    tool = get_tool(tool_id)
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    ok, result = await mcp_client_pool.test_tool(tool)
    if ok:
        # result may be a list of tool names (strings)
        return {"status": "success", "tools": result}
    else:
        return {"status": "error", "error": result} 