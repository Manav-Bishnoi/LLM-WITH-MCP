from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class Tool(BaseModel):
    id: str
    name: str
    description: str
    endpoint: str
    transport: str  # "stdio" | "streamable_http"
    category: str
    region: str
    model: Optional[str] = None
    status: str = "active"
    created_at: datetime
    config: Dict[str, Any] = {}

class ToolCreate(BaseModel):
    name: str
    description: str
    endpoint: str
    transport: str
    category: str
    region: str
    model: Optional[str] = None
    config: Dict[str, Any] = {}

class ChatMessage(BaseModel):
    tool_id: Optional[str] = None
    message: str
    context: Optional[str] = None