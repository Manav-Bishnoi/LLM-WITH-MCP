from langchain_mcp_adapters.client import MultiServerMCPClient
import asyncio

class MCPClientPool:
    def __init__(self):
        self.clients = {}

    async def get_client(self, tool):
        if tool.id not in self.clients:
            config = {
                tool.category: {
                    "url": tool.endpoint,
                    "transport": tool.transport,
                }
            }
            self.clients[tool.id] = MultiServerMCPClient(config)
        return self.clients[tool.id]

    async def test_tool(self, tool):
        try:
            client = await self.get_client(tool)
            tools = await client.get_tools()
            return True, tools
        except Exception as e:
            return False, str(e)

mcp_client_pool = MCPClientPool() 