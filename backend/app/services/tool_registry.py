import json
import os
from typing import List, Optional
from datetime import datetime
from uuid import uuid4
from app.models.tool import Tool, ToolCreate

REGISTRY_PATH = os.path.join(os.path.dirname(__file__), '../../data/tools_registry.json')


def load_tools() -> List[Tool]:
    if not os.path.exists(REGISTRY_PATH):
        return []
    with open(REGISTRY_PATH, 'r') as f:
        data = json.load(f)
        return [Tool(**tool) for tool in data]

def save_tools(tools: List[Tool]):
    with open(REGISTRY_PATH, 'w') as f:
        json.dump([tool.dict() for tool in tools], f, default=str, indent=2)

def get_tool(tool_id: str) -> Optional[Tool]:
    tools = load_tools()
    for tool in tools:
        if tool.id == tool_id:
            return tool
    return None

def add_tool(tool_data: ToolCreate) -> Tool:
    tools = load_tools()
    new_tool = Tool(
        id=str(uuid4()),
        created_at=datetime.utcnow(),
        status="active",
        **tool_data.dict()
    )
    tools.append(new_tool)
    save_tools(tools)
    return new_tool

def update_tool(tool_id: str, tool_data: ToolCreate) -> Optional[Tool]:
    tools = load_tools()
    for i, tool in enumerate(tools):
        if tool.id == tool_id:
            updated_tool = tool.copy(update=tool_data.dict())
            tools[i] = updated_tool
            save_tools(tools)
            return updated_tool
    return None

def delete_tool(tool_id: str) -> bool:
    tools = load_tools()
    new_tools = [tool for tool in tools if tool.id != tool_id]
    if len(new_tools) == len(tools):
        return False
    save_tools(new_tools)
    return True 