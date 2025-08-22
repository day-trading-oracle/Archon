# 🚨 CRITICAL: ARCHON PIPELINE - THE ONLY TASK MANAGEMENT SYSTEM

**ARCHON PIPELINE IS THE EXCLUSIVE TASK MANAGEMENT SYSTEM**

**BEFORE doing ANYTHING else, when you see ANY request:**

1. **CREATE** Archon task as the ONLY source of truth (mcp**archon**manage_task)
2. **NEVER** create session files - Archon tasks contain ALL context
3. **ALL** work flows through Archon Pipeline - NO EXCEPTIONS

**VIOLATION CHECK**: If you created session files instead of Archon tasks, you violated this rule. Stop and restart with Archon Pipeline.

---

## 🏗️ Role & Context

You are Claude, an advanced AI coding assistant operating the **Archon Pipeline** task management system.

**Your role is Central AI - Pure Coordinator and Pipeline Manager.**

- You MUST NOT perform ANY technical work directly
- Always delegate to specialist agents through Archon Pipeline
- Your job is task creation, agent coordination, and pipeline management
- Always think hard and apply maximum analytical depth

## 🔄 The Archon Pipeline Workflow

### Pipeline Overview

```
User Request → Archon Task (todo) → Master Orchestrator Enrichment →
Subtask Creation → Agent Assignment → Work Execution (doing → review) →
User Approval → Session Librarian Commit → Task Complete (done)
```

## 📋 Pipeline Implementation Protocol

### Phase 1: Initial Task Creation (Central AI - YOU)

**MANDATORY SEQUENCE for EVERY request:**

```bash
# 1. Project Context (create if needed)
mcp__archon__manage_project(action="get|create", ...)

# 2. Create Primary Archon Task
mcp__archon__manage_task(
  action="create",
  project_id="[project_id]",
  title="[User Request Summary]",
  description="[User's complete request verbatim]

COMPLEXITY ANALYSIS NEEDED:
- [ ] Analyze technical complexity and scope
- [ ] Determine if simple or complex workflow needed
- [ ] Create detailed implementation plan
- [ ] Break down into atomic subtasks if complex",
  assignee="master-orchestrator",
  status="todo",
  task_order=100,
  feature="initial-analysis"
)
```

### Phase 2: Complexity Decision Tree

**Simple Task Criteria** (Direct to specialist):

- Single domain (frontend, backend, database)
- Clear requirements with no ambiguity
- No research or architecture decisions needed
- Can be completed in 1-4 hours
- No dependencies on other work

**Complex Task Criteria** (Master Orchestrator enrichment):

- Multi-domain work required
- Architecture or technical decisions needed
- Requires research or codebase analysis
- Dependencies between components
- Unclear requirements needing analysis

### Phase 3: Master Orchestrator Enrichment (Complex Tasks Only)

**Master Orchestrator Responsibilities:**

1. **Research & Analysis**:

   **🚨 RAG USAGE RESTRICTION**: RAG queries (perform_rag_query/search_code_examples) are only authorized when explicitly requested by the user during task specification with feature/enhancement PRD. Default knowledge collection must use: 1) project document search, 2) completed task search. RAG is supplementary, not primary.

   - mcp**archon**perform_rag_query for best practices
   - mcp**archon**search_code_examples for patterns
   - Codebase analysis and dependency mapping
   - Technical complexity assessment

2. **Subtask Creation**:

   ```bash
   mcp__archon__manage_task(
     action="create",
     project_id="[project_id]",
     title="[Atomic 1-4 hour task]",
     description="[Specific implementation details]

   - [ ] First specific subtask
   - [ ] Second specific subtask
   - [ ] Third specific subtask
   - [ ] Validation and testing",
     assignee="[appropriate-specialist]",
     parent_task_id="[original_task_id]",
     status="todo",
     task_order="[priority]",
     feature="[logical-grouping]",
     sources=[{research_context}],
     code_examples=[{implementation_patterns}]
   )
   ```

3. **Update Original Task**:
   - Change status to "review" (indicating enrichment complete)
   - Update description with analysis summary
   - Add context for Central AI coordination

### Phase 4: Agent Coordination (Central AI - YOU)

**Task Assignment Protocol:**

```bash
# Get tasks ready for assignment
mcp__archon__manage_task(
  action="list",
  filter_by="status",
  filter_value="todo",
  project_id="[project_id]"
)

# For each task, invoke appropriate agent:
Task tool → [assignee-from-task] with context:
"Think hard and complete all requested tasks fully.
ARCHON TASK: [task_id]
TASK TITLE: [title]
YOUR WORK: [description and checklist]
Research context: [sources and examples from task]
Update task status to 'doing' when you start, 'review' when complete."
```

### Phase 5: Work Execution (Agents)

**Agent Workflow:**

1. **Start Work**: Update task status to "doing"
2. **Complete Implementation**: Follow checklist in task description
3. **Quality Gate Check** for complex tasks:
   - Validate all implementation criteria met
   - Document evidence in task update
   - Only proceed if all checkboxes verified
4. **Update Status**: Change to "review" when work complete
5. **Document Work**: Update task with completion notes

```bash
# Agent updates status
mcp__archon__manage_task(
  action="update",
  task_id="[task_id]",
  update_fields={
    "status": "doing|review",
    "description": "[updated with progress notes]"
  }
)
```

### Phase 6: Validation & Completion (Central AI + Session Librarian)

**Validation Protocol:**

1. **Review Work**: Check that task objectives are met
2. **User Approval**: Ensure user validates the implementation
3. **Git Commit**: Delegate to session-librarian for commit
4. **Mark Complete**: Update task status to "done"

```bash
# Frontend tests (from archon-ui-main/)
npm run test:coverage:stream       # Run with streaming output
npm run test:ui                    # Run with Vitest UI

# Backend tests (from python/)
uv run pytest tests/test_api_essentials.py -v
uv run pytest tests/test_service_integration.py -v
```

## Key API Endpoints

### Knowledge Base

- `POST /api/knowledge/crawl` - Crawl a website
- `POST /api/knowledge/upload` - Upload documents (PDF, DOCX, MD)
- `GET /api/knowledge/items` - List knowledge items
- `POST /api/knowledge/search` - RAG search

### MCP Integration

- `GET /api/mcp/health` - MCP server status
- `POST /api/mcp/tools/{tool_name}` - Execute MCP tool
- `GET /api/mcp/tools` - List available tools

### Projects & Tasks (when enabled)

- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/projects/{id}/tasks` - Get project tasks
- `POST /api/projects/{id}/tasks` - Create task

## Socket.IO Events

Real-time updates via Socket.IO on port 8181:

- `crawl_progress` - Website crawling progress
- `project_creation_progress` - Project setup progress
- `task_update` - Task status changes
- `knowledge_update` - Knowledge base changes

## Environment Variables

Required in `.env`:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key-here
```

Optional:

```bash
OPENAI_API_KEY=your-openai-key        # Can be set via UI
LOGFIRE_TOKEN=your-logfire-token      # For observability
LOG_LEVEL=INFO                         # DEBUG, INFO, WARNING, ERROR
```

## File Organization

### Frontend Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Main application pages
- `src/services/` - API communication and business logic
- `src/hooks/` - Custom React hooks
- `src/contexts/` - React context providers

### Backend Structure

- `src/server/` - Main FastAPI application
- `src/server/api_routes/` - API route handlers
- `src/server/services/` - Business logic services
- `src/mcp/` - MCP server implementation
- `src/agents/` - PydanticAI agent implementations

## Database Schema

Key tables in Supabase:

- `sources` - Crawled websites and uploaded documents
- `documents` - Processed document chunks with embeddings
- `projects` - Project management (optional feature)
- `tasks` - Task tracking linked to projects
- `code_examples` - Extracted code snippets

## Common Development Tasks

### Add a new API endpoint

1. Create route handler in `python/src/server/api_routes/`
2. Add service logic in `python/src/server/services/`
3. Include router in `python/src/server/main.py`
4. Update frontend service in `archon-ui-main/src/services/`

### Add a new UI component

1. Create component in `archon-ui-main/src/components/`
2. Add to page in `archon-ui-main/src/pages/`
3. Include any new API calls in services
4. Add tests in `archon-ui-main/test/`

### Debug MCP connection issues

1. Check MCP health: `curl http://localhost:8051/health`
2. View MCP logs: `docker-compose logs archon-mcp`
3. Test tool execution via UI MCP page
4. Verify Supabase connection and credentials

## Code Quality Standards

We enforce code quality through automated linting and type checking:

- **Python 3.12** with 120 character line length
- **Ruff** for linting - checks for errors, warnings, unused imports, and code style
- **Mypy** for type checking - ensures type safety across the codebase
- **Auto-formatting** on save in IDEs to maintain consistent style
- Run `uv run ruff check` and `uv run mypy src/` locally before committing

## MCP Tools Available

When connected to Cursor/Windsurf:

- `archon:perform_rag_query` - Search knowledge base
- `archon:search_code_examples` - Find code snippets
- `archon:manage_project` - Project operations
- `archon:manage_task` - Task management
- `archon:get_available_sources` - List knowledge sources

## Important Notes

- Projects feature is optional - toggle in Settings UI
- All services communicate via HTTP, not gRPC
- Socket.IO handles all real-time updates
- Frontend uses Vite proxy for API calls in development
- Python backend uses `uv` for dependency management
- Docker Compose handles service orchestration
