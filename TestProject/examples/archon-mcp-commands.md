# Archon MCP Server Commands Reference

Comprehensive reference for all Archon MCP server commands with practical examples.

## Project Management Commands

### mcp__archon__list_projects
Lists all projects in the Archon system.

**Usage:**
```python
mcp__archon__list_projects()
```

**Example Response:**
```json
{
  "success": true,
  "projects": [
    {
      "id": "6d0d8ce0-d80d-4132-8c26-2845a61518b8",
      "title": "MCP PIpeline Start",
      "description": "Start",
      "github_repo": null,
      "created_at": "2025-08-22T22:45:44.832277+00:00",
      "updated_at": "2025-08-22T22:45:44.83228+00:00"
    }
  ],
  "count": 1
}
```

### mcp__archon__get_project
Get detailed information about a specific project.

**Parameters:**
- `project_id` (string, required): UUID of the project

**Usage:**
```python
mcp__archon__get_project(project_id="6d0d8ce0-d80d-4132-8c26-2845a61518b8")
```

### mcp__archon__create_project
Create a new project in Archon.

**Parameters:**
- `title` (string, required): Project title
- `description` (string, optional): Project description
- `github_repo` (string, optional): GitHub repository URL

**Usage:**
```python
mcp__archon__create_project(
    title="New AI Project",
    description="Building multi-agent AI system",
    github_repo="https://github.com/user/repo"
)
```

### mcp__archon__update_project
Update an existing project's properties.

**Parameters:**
- `project_id` (string, required): UUID of project to update
- `title` (string, optional): New title
- `description` (string, optional): New description
- `github_repo` (string, optional): New GitHub repo URL

**Usage:**
```python
mcp__archon__update_project(
    project_id="6d0d8ce0-d80d-4132-8c26-2845a61518b8",
    title="Updated Project Title",
    description="Updated description"
)
```

### mcp__archon__delete_project
Delete a project from Archon.

**Parameters:**
- `project_id` (string, required): UUID of project to delete

**Usage:**
```python
mcp__archon__delete_project(project_id="6d0d8ce0-d80d-4132-8c26-2845a61518b8")
```

## Task Management Commands

### mcp__archon__list_tasks
List tasks with optional filtering.

**Parameters:**
- `filter_by` (string, optional): Filter type ("status", "project", "assignee")
- `filter_value` (string, optional): Filter value
- `project_id` (string, optional): Project UUID for additional filtering
- `include_closed` (boolean, optional): Include done tasks (default: false)
- `page` (integer, optional): Page number for pagination (default: 1)
- `per_page` (integer, optional): Items per page (default: 50)

**Usage Examples:**
```python
# List all open tasks
mcp__archon__list_tasks()

# List tasks for specific project
mcp__archon__list_tasks(
    filter_by="project", 
    filter_value="6d0d8ce0-d80d-4132-8c26-2845a61518b8"
)

# List tasks by status
mcp__archon__list_tasks(filter_by="status", filter_value="todo")
mcp__archon__list_tasks(filter_by="status", filter_value="doing")
mcp__archon__list_tasks(filter_by="status", filter_value="review")

# List tasks by assignee
mcp__archon__list_tasks(filter_by="assignee", filter_value="AI IDE Agent")
```

### mcp__archon__get_task
Get detailed information about a specific task.

**Parameters:**
- `task_id` (string, required): UUID of the task

**Usage:**
```python
mcp__archon__get_task(task_id="2854365f-778c-41d3-9ee6-4c2b96fe2bec")
```

### mcp__archon__create_task
Create a new task in a project.

**Parameters:**
- `project_id` (string, required): Project UUID
- `title` (string, required): Task title
- `description` (string, optional): Detailed description
- `assignee` (string, optional): Who will work on task (default: "User")
- `task_order` (integer, optional): Priority order (default: 0)
- `feature` (string, optional): Feature label for grouping
- `sources` (array, optional): Source references
- `code_examples` (array, optional): Code examples

**Usage:**
```python
mcp__archon__create_task(
    project_id="6d0d8ce0-d80d-4132-8c26-2845a61518b8",
    title="Implement user authentication",
    description="Build JWT-based auth system with refresh tokens",
    assignee="AI IDE Agent",
    task_order=100,
    feature="authentication"
)
```

**Advanced Usage with Sources and Examples:**
```python
mcp__archon__create_task(
    project_id="6d0d8ce0-d80d-4132-8c26-2845a61518b8",
    title="Implement OAuth2 Google provider",
    description="Add Google OAuth2 with PKCE security",
    assignee="AI IDE Agent",
    task_order=10,
    feature="authentication",
    sources=[
        {
            "url": "https://developers.google.com/identity/protocols/oauth2",
            "type": "documentation",
            "relevance": "Official OAuth2 implementation guide"
        }
    ],
    code_examples=[
        {
            "file": "src/auth/base.py",
            "function": "BaseAuthProvider",
            "purpose": "Base class to extend"
        }
    ]
)
```

### mcp__archon__update_task
Update a task's properties.

**Parameters:**
- `task_id` (string, required): UUID of task to update
- `title` (string, optional): New title
- `description` (string, optional): New description
- `status` (string, optional): New status ("todo", "doing", "review", "done")
- `assignee` (string, optional): New assignee
- `task_order` (integer, optional): New priority order
- `feature` (string, optional): New feature label

**Usage Examples:**
```python
# Update task status
mcp__archon__update_task(
    task_id="2854365f-778c-41d3-9ee6-4c2b96fe2bec",
    status="doing"
)

# Update task with progress notes
mcp__archon__update_task(
    task_id="2854365f-778c-41d3-9ee6-4c2b96fe2bec",
    status="review",
    description="Authentication system implemented. JWT tokens working with refresh mechanism. All tests passing."
)

# Reassign task
mcp__archon__update_task(
    task_id="2854365f-778c-41d3-9ee6-4c2b96fe2bec",
    assignee="Backend Specialist",
    status="todo"
)
```

### mcp__archon__delete_task
Delete/archive a task.

**Parameters:**
- `task_id` (string, required): UUID of task to delete

**Usage:**
```python
mcp__archon__delete_task(task_id="2854365f-778c-41d3-9ee6-4c2b96fe2bec")
```

## Knowledge Base Commands

### mcp__archon__perform_rag_query
Search the knowledge base using RAG (Retrieval-Augmented Generation).

**Parameters:**
- `query` (string, required): Search query
- `match_count` (integer, optional): Number of results to return (default: 5)
- `source_domain` (string, optional): Filter by source domain

**Usage:**
```python
# Basic RAG query
mcp__archon__perform_rag_query(
    query="authentication best practices",
    match_count=5
)

# Query with source filtering
mcp__archon__perform_rag_query(
    query="JWT implementation patterns",
    match_count=10,
    source_domain="docs.anthropic.com"
)
```

### mcp__archon__search_code_examples
Search for code examples in the knowledge base.

**Parameters:**
- `query` (string, required): Search query
- `match_count` (integer, optional): Number of results to return (default: 5)
- `source_domain` (string, optional): Filter by source domain

**Usage:**
```python
# Search for code patterns
mcp__archon__search_code_examples(
    query="Pydantic AI agent implementation",
    match_count=3
)

# Search specific patterns
mcp__archon__search_code_examples(
    query="async function error handling",
    match_count=5
)
```

### mcp__archon__get_available_sources
Get list of available sources in the knowledge base.

**Usage:**
```python
mcp__archon__get_available_sources()
```

**Example Response:**
```json
{
  "success": true,
  "sources": [
    {
      "domain": "docs.anthropic.com",
      "type": "documentation",
      "description": "Anthropic documentation"
    }
  ],
  "count": 1
}
```

## Common Workflow Patterns

### Session Startup Pattern
```python
# 1. Check current project status
project = mcp__archon__get_project(project_id="6d0d8ce0-d80d-4132-8c26-2845a61518b8")

# 2. List current tasks
tasks = mcp__archon__list_tasks(filter_by="status", filter_value="todo")

# 3. Get tasks in progress
doing_tasks = mcp__archon__list_tasks(filter_by="status", filter_value="doing")
```

### Task Lifecycle Pattern
```python
# 1. Create task
task = mcp__archon__create_task(
    project_id="6d0d8ce0-d80d-4132-8c26-2845a61518b8",
    title="New Feature Implementation",
    description="Detailed requirements...",
    assignee="AI IDE Agent"
)

# 2. Start work
mcp__archon__update_task(task_id=task["task_id"], status="doing")

# 3. Mark for review
mcp__archon__update_task(
    task_id=task["task_id"], 
    status="review",
    description="Implementation complete. Ready for testing."
)

# 4. Complete task
mcp__archon__update_task(task_id=task["task_id"], status="done")
```

### Research Pattern
```python
# 1. Check available sources
sources = mcp__archon__get_available_sources()

# 2. Perform RAG query for best practices
best_practices = mcp__archon__perform_rag_query(
    query="authentication security patterns",
    match_count=5
)

# 3. Search for code examples
code_examples = mcp__archon__search_code_examples(
    query="JWT token validation",
    match_count=3
)
```