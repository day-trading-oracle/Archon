name: "MCP Pipeline Architecture: Multi-Agent Development Environment"
description: |

## Purpose
Build a distributed AI development architecture using the Model Context Protocol (MCP) pipeline with Archon orchestration. This demonstrates advanced multi-agent coordination where specialized MCP servers handle different aspects of software development through role-based delegation.

## Core Principles
1. **Context is King**: Maintain comprehensive project context across all MCP servers
2. **Specialized Agents**: Each MCP server has focused expertise and responsibilities
3. **Efficient Orchestration**: Use Archon for intelligent task breakdown and coordination
4. **Token Optimization**: Minimize AI token usage through targeted, specialized queries
5. **Parallel Processing**: Execute independent tasks simultaneously across multiple servers

---

## Goal
Create a production-ready MCP pipeline architecture where a Central Coordinator (Claude Code) efficiently delegates work to specialized MCP servers including Archon for project management, Claude Context for code intelligence, Internet Search for external research, and Code Snippet Uploader for asset integration.

## Why
- **Business value**: Dramatically improves AI development efficiency and code quality
- **Scalability**: Enables handling of complex, multi-domain projects through specialization
- **Problems solved**: Eliminates context switching overhead, reduces token usage, enables parallel processing, and maintains consistent project memory

## What
A distributed MCP-based development environment where:
- Central Coordinator analyzes tasks and routes to appropriate specialized servers
- Archon Server manages complex task orchestration and project coordination
- Claude Context maintains semantic codebase indexing and historical knowledge
- Specialized servers handle domain-specific work (search, code integration, implementation)
- All components communicate through standardized MCP protocol

### Success Criteria
- [ ] Central Coordinator successfully routes tasks based on complexity analysis
- [ ] Archon Server creates and manages project tasks with proper orchestration
- [ ] Claude Context provides accurate codebase search and historical context
- [ ] MCP servers communicate seamlessly through protocol interfaces
- [ ] Parallel task execution reduces total development time by >40%
- [ ] Token usage optimization achieves >30% reduction compared to monolithic approach

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- file: C:\ME\Coding\Archon\archon\TestProject\CLAUDE.md
  why: Project-specific MCP configuration and Archon integration patterns
  
- file: examples/agent/agent.py
  why: Multi-agent coordination patterns and tool registration
  
- file: examples/cli.py
  why: CLI structure with streaming responses and agent coordination
  
- url: https://modelcontextprotocol.io/introduction
  why: Core MCP protocol specification and communication patterns
  
- url: https://ai.pydantic.dev/multi-agent-applications/
  why: Multi-agent system patterns and coordination strategies

- url: https://docs.anthropic.com/en/docs/claude-code/mcp
  why: Claude Code MCP integration patterns and tool usage
```

### Current Codebase Structure
```bash
C:\ME\Coding\Archon\archon\TestProject\
├── context-engineering-intro/          # Current project directory
├── examples/
│   ├── agent/
│   │   ├── agent.py                    # Multi-agent patterns
│   │   ├── providers.py               # LLM provider configuration
│   │   └── ...
│   └── cli.py                         # CLI interaction patterns
├── PRPs/
│   ├── templates/
│   │   └── prp_base.md
│   └── EXAMPLE_multi_agent_prp.md     # This template
├── INITIAL.md                         # Core project vision
├── CLAUDE.md                          # MCP configuration and rules
└── requirements.txt
```

### Target MCP Pipeline Architecture
```bash
MCP Pipeline Components:
├── central_coordinator/
│   ├── __init__.py                    # Central AI coordinator
│   ├── task_analyzer.py              # Complexity and domain analysis
│   ├── routing_engine.py             # MCP server selection logic
│   └── integration_layer.py          # Result consolidation
├── mcp_servers/
│   ├── archon_integration/
│   │   ├── project_manager.py        # Archon MCP client
│   │   ├── task_orchestrator.py      # Complex task breakdown
│   │   └── rag_interface.py          # Knowledge base queries
│   ├── claude_context/
│   │   ├── codebase_indexer.py       # Semantic code search
│   │   ├── history_tracker.py        # Issue/resolution memory
│   │   └── dependency_mapper.py      # Code relationship analysis
│   ├── internet_search/
│   │   ├── search_client.py          # Web research tool
│   │   ├── documentation_fetcher.py  # API doc retrieval
│   │   └── best_practices.py         # Pattern research
│   └── code_integration/
│       ├── snippet_processor.py      # External code adaptation
│       ├── format_converter.py       # Code format standardization
│       └── validation_engine.py      # Integration testing
├── communication/
│   ├── mcp_protocol.py               # MCP communication layer
│   ├── message_router.py             # Inter-server messaging
│   └── context_sharing.py            # Cross-server knowledge
├── config/
│   ├── __init__.py
│   ├── mcp_settings.py              # MCP server configurations
│   └── pipeline_config.py           # Workflow and routing rules
├── tests/
│   ├── test_task_routing.py         # Central coordinator tests
│   ├── test_archon_integration.py   # Archon MCP tests
│   ├── test_context_sharing.py      # Cross-server communication
│   └── integration/
│       ├── test_full_pipeline.py    # End-to-end workflow tests
│       └── test_parallel_execution.py # Concurrent task tests
├── cli.py                           # Pipeline interface
├── .env.example                     # MCP server configuration
├── requirements.txt                 # Updated dependencies
└── README.md                        # Architecture documentation
```

### Known Gotchas & Integration Challenges
```python
# CRITICAL: MCP servers must be running and accessible before pipeline starts
# CRITICAL: Archon project ID must be configured: 6d0d8ce0-d80d-4132-8c26-2845a61518b8
# CRITICAL: Context sharing between servers requires careful serialization
# CRITICAL: Token usage tracking across multiple agents for cost optimization  
# CRITICAL: Error handling when MCP servers are unavailable or slow
# CRITICAL: Authentication and permissions for each MCP server endpoint
# CRITICAL: Parallel task coordination to avoid race conditions
# CRITICAL: Result consolidation from multiple asynchronous server responses
```

## Implementation Blueprint

### Data Models and Structures

```python
# models.py - Core MCP pipeline data structures
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Literal
from datetime import datetime
from enum import Enum

class TaskComplexity(str, Enum):
    SIMPLE = "simple"      # Single domain, <30 min, direct assignment
    MEDIUM = "medium"      # Multi-step, 30-120 min, may need orchestration  
    COMPLEX = "complex"    # Multi-domain, >120 min, requires Archon orchestration

class MCPServerType(str, Enum):
    ARCHON = "archon"
    CLAUDE_CONTEXT = "claude_context"  
    CLAUDE_CODE = "claude_code"
    INTERNET_SEARCH = "internet_search"
    CODE_INTEGRATION = "code_integration"

class TaskRequest(BaseModel):
    request_id: str = Field(..., description="Unique request identifier")
    user_input: str = Field(..., description="Original user request")
    timestamp: datetime = Field(default_factory=datetime.now)
    context: Dict[str, Any] = Field(default_factory=dict)

class TaskAnalysis(BaseModel):
    complexity: TaskComplexity
    estimated_time_minutes: int
    required_domains: List[str]
    requires_orchestration: bool
    parallel_eligible: bool
    dependencies: List[str] = Field(default_factory=list)

class MCPServerAssignment(BaseModel):
    server_type: MCPServerType
    server_url: str
    task_description: str
    context_data: Dict[str, Any] = Field(default_factory=dict)
    priority: int = Field(1, ge=1, le=10)
    depends_on: Optional[str] = None  # Task ID this depends on

class ArchonTask(BaseModel):
    task_id: str
    project_id: str = "6d0d8ce0-d80d-4132-8c26-2845a61518b8"
    title: str
    description: str
    assignee: str
    status: Literal["todo", "doing", "review", "done"]
    task_order: int = 100
    feature: str = "mcp-pipeline"
    parent_task_id: Optional[str] = None
    
class PipelineResult(BaseModel):
    request_id: str
    status: Literal["completed", "failed", "partial"]
    results: List[Dict[str, Any]]
    execution_time_seconds: float
    tokens_used: int
    servers_involved: List[MCPServerType]
    error_details: Optional[str] = None
```

### List of Tasks to be Completed

```yaml
Task 1: Central Coordinator Implementation
CREATE central_coordinator/task_analyzer.py:
  - PATTERN: Analyze user requests for complexity and domain requirements
  - Implement decision tree: simple vs complex task routing
  - Extract domain requirements (frontend, backend, database, etc.)
  - Estimate time and resource requirements

CREATE central_coordinator/routing_engine.py:
  - PATTERN: Route tasks to appropriate MCP servers based on analysis
  - Handle direct assignment for simple tasks
  - Delegate complex tasks to Archon orchestration
  - Manage parallel task execution coordination

Task 2: Archon MCP Integration
CREATE mcp_servers/archon_integration/project_manager.py:
  - PATTERN: Interface with Archon server via MCP protocol
  - Implement project management functions using configured project ID
  - Handle task creation, updates, and status tracking
  - Provide RAG query interface for knowledge base access

CREATE mcp_servers/archon_integration/task_orchestrator.py:
  - PATTERN: Break down complex tasks into manageable subtasks
  - Create atomic, assignable work units with clear success criteria
  - Manage task dependencies and execution order
  - Coordinate between multiple specialized agents

Task 3: Claude Context Integration  
CREATE mcp_servers/claude_context/codebase_indexer.py:
  - PATTERN: Semantic search and code analysis capabilities
  - Index project codebase for intelligent search and retrieval
  - Provide code context and dependency information
  - Track historical decisions and issue resolutions

CREATE mcp_servers/claude_context/history_tracker.py:
  - PATTERN: Maintain persistent memory of project decisions
  - Track issue resolution patterns and successful approaches
  - Provide contextual recommendations based on project history
  - Enable learning from previous development cycles

Task 4: MCP Communication Layer
CREATE communication/mcp_protocol.py:
  - PATTERN: Standardized MCP server communication interface
  - Handle authentication and connection management
  - Implement retry logic and error handling for server failures
  - Provide async communication for parallel processing

CREATE communication/context_sharing.py:
  - PATTERN: Share relevant context between MCP servers
  - Serialize and transmit complex data structures
  - Manage context scope and access permissions
  - Optimize context size for token efficiency

Task 5: Parallel Execution Framework
CREATE central_coordinator/integration_layer.py:
  - PATTERN: Coordinate multiple concurrent MCP server requests
  - Collect and consolidate results from parallel operations
  - Handle partial failures and retry mechanisms  
  - Maintain execution order for dependent tasks

Task 6: Configuration and Settings
CREATE config/mcp_settings.py:
  - PATTERN: Centralized MCP server endpoint configuration
  - Environment-based configuration for different deployment stages
  - Authentication credentials and timeout settings
  - Server health monitoring and failover configuration

CREATE config/pipeline_config.py:
  - PATTERN: Workflow routing rules and decision thresholds
  - Task complexity classification parameters
  - Parallel execution limits and resource constraints
  - Token usage optimization settings

Task 7: CLI Interface and User Interaction
CREATE cli.py:
  - PATTERN: Follow examples/cli.py for streaming responses
  - Provide visibility into MCP server assignments and progress
  - Display parallel task execution status in real-time
  - Handle user input and context management across sessions

Task 8: Comprehensive Testing
CREATE tests/integration/:
  - PATTERN: End-to-end pipeline testing with mock MCP servers
  - Test parallel execution and result consolidation
  - Validate error handling and server failure scenarios
  - Performance testing for token usage optimization

CREATE tests/:
  - Unit tests for each component with proper mocking
  - Integration tests for MCP server communication
  - Load testing for concurrent task execution
  - Regression tests for pipeline optimization
```

### Per Task Pseudocode

```python
# Task 1: Central Coordinator Task Analysis
async def analyze_task(user_request: str) -> TaskAnalysis:
    # Parse user request for complexity indicators
    complexity_indicators = [
        "multiple components", "full stack", "database", "authentication",
        "integration", "architecture", "refactoring", "migration"
    ]
    
    estimated_time = estimate_time_from_request(user_request)
    domains = extract_domains(user_request)
    
    if estimated_time < 30 and len(domains) == 1:
        return TaskAnalysis(
            complexity=TaskComplexity.SIMPLE,
            estimated_time_minutes=estimated_time,
            required_domains=domains,
            requires_orchestration=False,
            parallel_eligible=False
        )
    else:
        return TaskAnalysis(
            complexity=TaskComplexity.COMPLEX,
            estimated_time_minutes=estimated_time,
            required_domains=domains,
            requires_orchestration=True,
            parallel_eligible=True
        )

# Task 2: Archon Task Creation via MCP
async def create_archon_task(
    task_request: TaskRequest, 
    analysis: TaskAnalysis
) -> ArchonTask:
    # PATTERN: Use configured Archon project ID
    mcp_client = get_archon_mcp_client()
    
    task_data = {
        "action": "create",
        "project_id": "6d0d8ce0-d80d-4132-8c26-2845a61518b8",
        "title": extract_title_from_request(task_request.user_input),
        "description": f"""
        {task_request.user_input}
        
        COMPLEXITY ANALYSIS:
        - Estimated time: {analysis.estimated_time_minutes} minutes
        - Required domains: {', '.join(analysis.required_domains)}
        - Orchestration needed: {analysis.requires_orchestration}
        - Parallel execution: {analysis.parallel_eligible}
        """,
        "assignee": "master-orchestrator",
        "status": "todo",
        "task_order": 100,
        "feature": "mcp-pipeline"
    }
    
    # CRITICAL: Use MCP tool interface
    result = await mcp_client.call_tool("mcp__archon__manage_task", task_data)
    return ArchonTask(**result.data)

# Task 4: MCP Server Communication
class MCPClient:
    def __init__(self, server_url: str, timeout: int = 30):
        self.server_url = server_url
        self.timeout = timeout
        self.session = None
    
    async def call_tool(self, tool_name: str, parameters: Dict[str, Any]) -> Any:
        """Call MCP tool with error handling and retries."""
        max_retries = 3
        for attempt in range(max_retries):
            try:
                async with httpx.AsyncClient(timeout=self.timeout) as client:
                    response = await client.post(
                        f"{self.server_url}/tools/{tool_name}",
                        json=parameters
                    )
                    
                    if response.status_code == 200:
                        return response.json()
                    else:
                        raise MCPServerError(
                            f"Server returned {response.status_code}: {response.text}"
                        )
                        
            except (httpx.TimeoutException, httpx.ConnectError) as e:
                if attempt == max_retries - 1:
                    raise MCPServerError(f"Failed to connect after {max_retries} attempts: {e}")
                await asyncio.sleep(2 ** attempt)  # Exponential backoff

# Task 5: Parallel Task Coordination
async def execute_parallel_tasks(assignments: List[MCPServerAssignment]) -> List[Any]:
    """Execute multiple MCP server tasks concurrently."""
    # Group by dependencies to respect execution order
    dependency_groups = group_by_dependencies(assignments)
    results = []
    
    for group in dependency_groups:
        # Execute all tasks in group concurrently
        group_tasks = [
            execute_mcp_task(assignment) 
            for assignment in group
        ]
        
        group_results = await asyncio.gather(
            *group_tasks, 
            return_exceptions=True
        )
        
        # Handle partial failures
        for i, result in enumerate(group_results):
            if isinstance(result, Exception):
                logger.error(f"Task {group[i].task_description} failed: {result}")
                # Implement retry or fallback logic
            else:
                results.append(result)
    
    return results
```

### Integration Points
```yaml
ENVIRONMENT:
  - add to: .env
  - vars: |
      # MCP Server Endpoints
      ARCHON_SERVER_URL=http://localhost:8051
      CLAUDE_CONTEXT_URL=http://localhost:8052
      INTERNET_SEARCH_URL=http://localhost:8053
      CODE_INTEGRATION_URL=http://localhost:8054
      
      # Archon Configuration
      ARCHON_PROJECT_ID=6d0d8ce0-d80d-4132-8c26-2845a61518b8
      
      # Pipeline Settings
      MCP_PIPELINE_ENABLED=true
      AUTO_TASK_ROUTING=true
      PARALLEL_PROCESSING=true
      MAX_CONCURRENT_TASKS=5
      
      # Performance Optimization
      TOKEN_OPTIMIZATION=true
      CONTEXT_COMPRESSION=true
      CACHE_RESPONSES=true

CONFIG:
  - MCP Server Health Checks: Verify all servers accessible on startup
  - Authentication: Configure API keys and tokens for each MCP server
  - Failover: Implement fallback servers for critical components
  
DEPENDENCIES:
  - Update requirements.txt with:
    - httpx (async HTTP client)
    - websockets (MCP protocol support)
    - pydantic (data validation)
    - asyncio (concurrent execution)
```

## Validation Loop

### Level 1: MCP Server Connectivity
```bash
# Verify all MCP servers are accessible
python -m tests.health_check

# Expected output:
# ✅ Archon Server: http://localhost:8051 - OK
# ✅ Claude Context: http://localhost:8052 - OK  
# ✅ Internet Search: http://localhost:8053 - OK
# ✅ Code Integration: http://localhost:8054 - OK
```

### Level 2: Task Routing Logic
```python
# test_task_routing.py
async def test_simple_task_routing():
    """Test simple tasks route directly to Claude Code"""
    request = TaskRequest(
        request_id="test-1",
        user_input="Add a comment to the calculateTotal function"
    )
    analysis = await analyze_task(request.user_input)
    assert analysis.complexity == TaskComplexity.SIMPLE
    assert not analysis.requires_orchestration
    
async def test_complex_task_orchestration():
    """Test complex tasks route through Archon orchestration"""
    request = TaskRequest(
        request_id="test-2", 
        user_input="Implement user authentication with database and API endpoints"
    )
    analysis = await analyze_task(request.user_input)
    assert analysis.complexity == TaskComplexity.COMPLEX
    assert analysis.requires_orchestration
    assert analysis.parallel_eligible

async def test_archon_task_creation():
    """Test task creation via Archon MCP interface"""
    task_data = await create_archon_task(complex_request, complex_analysis)
    assert task_data.project_id == "6d0d8ce0-d80d-4132-8c26-2845a61518b8"
    assert task_data.status == "todo"
    assert task_data.assignee == "master-orchestrator"
```

```bash
# Run routing tests:
pytest tests/test_task_routing.py -v

# Expected: All tests pass with proper MCP server mocking
```

### Level 3: End-to-End Pipeline Test
```bash
# Test complete pipeline workflow
python cli.py

# Test interaction 1 - Simple task:
# You: Add type hints to the User class in models.py
# 🤖 Assistant: [Routes directly to Claude Code]
# 🛠 Tools Used:
#   1. claude_code (direct_assignment: add type hints)
# ⏱ Execution: 15 seconds, 1 server

# Test interaction 2 - Complex task:
# You: Implement user authentication system with JWT tokens, database models, and API endpoints
# 🤖 Assistant: [Routes through Archon orchestration]
# 🛠 Servers Coordinating:
#   1. archon_server (task_breakdown: 4 subtasks created)
#   2. claude_context (codebase_analysis: existing auth patterns)
#   3. internet_search (jwt_best_practices: security guidelines)
#   4. claude_code (implementation: parallel execution of 3 components)
# ⏱ Execution: 8 minutes, 4 servers, 60% time saved vs sequential
```

## Final Validation Checklist
- [ ] All MCP servers respond to health checks
- [ ] Task routing correctly identifies simple vs complex tasks  
- [ ] Archon integration creates and tracks tasks successfully
- [ ] Context sharing works between MCP servers
- [ ] Parallel execution reduces total time for eligible tasks
- [ ] Token usage is optimized through server specialization
- [ ] Error handling gracefully manages server failures
- [ ] CLI provides clear visibility into pipeline operations
- [ ] End-to-end tests validate complete workflow
- [ ] Documentation includes setup and troubleshooting guides

---

## Anti-Patterns to Avoid
- ❌ Don't create monolithic functions that try to handle multiple domains
- ❌ Don't skip complexity analysis - routing decisions are critical
- ❌ Don't ignore MCP server failures - implement proper fallbacks
- ❌ Don't pass entire context to every server - optimize for relevance
- ❌ Don't execute dependent tasks in parallel - respect dependencies
- ❌ Don't hardcode server URLs - use environment configuration
- ❌ Don't skip authentication for MCP server endpoints
- ❌ Don't ignore token usage tracking across multiple agents

## Confidence Score: 8/10

High confidence due to:
- Clear separation of concerns through MCP server specialization
- Established patterns from examples and documentation
- Well-defined task routing and orchestration logic
- Comprehensive validation and testing strategy

Moderate uncertainty on:
- MCP protocol implementation details and edge cases
- Optimal context sharing strategies between servers
- Performance characteristics under high concurrent load