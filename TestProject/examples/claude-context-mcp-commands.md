# Claude Context MCP Server Commands Reference

Comprehensive reference for all Claude Context MCP server commands with practical examples.

## Overview
Claude Context MCP server provides semantic code search capabilities, enabling ~40% token reduction by intelligently loading only relevant code sections. Uses vector database (Zilliz Cloud) for scalable search across large codebases.

## Core Commands

### index_codebase
Index the entire project for semantic search capabilities.

**Description:** 
Analyzes and indexes all project files using AST-based code splitting with automatic fallback to character-based splitting. Creates embeddings using OpenAI models and stores in Zilliz Cloud vector database.

**Parameters:**
- No parameters required - automatically indexes current working directory

**Usage:**
```python
# Index entire codebase
index_codebase()
```

**What it does:**
- Scans all supported file types in the project
- Splits code using AST (Abstract Syntax Tree) analysis
- Generates embeddings using OpenAI embedding models
- Stores vectors in Zilliz Cloud for fast retrieval
- Supports Python, JavaScript, TypeScript, Java, C++, C#, Go, Rust, PHP, Ruby, Swift, Kotlin, Scala, Markdown

**Expected Output:**
```
Indexing started...
Processing: 127 files found
Analyzing: src/main.py (Python)
Analyzing: src/utils.py (Python)
...
Indexing complete. 127 files processed, 1,247 code chunks indexed.
```

### search_code
Perform semantic search across the indexed codebase.

**Parameters:**
- `query` (string, required): Natural language or code-related search query
- `limit` (integer, optional): Maximum number of results to return (default: 5)
- `threshold` (float, optional): Similarity threshold 0.0-1.0 (default: 0.7)

**Usage Examples:**
```python
# Basic semantic search
search_code("authentication implementation")

# Search with specific limit
search_code("JWT token validation", limit=10)

# Search for specific patterns
search_code("async function error handling", limit=5)

# Search for class definitions
search_code("user model database schema")

# Search for specific functionality
search_code("file upload with validation")
```

**Example Response:**
```json
{
  "results": [
    {
      "file": "src/auth/jwt.py",
      "function": "validate_jwt_token",
      "line_start": 45,
      "line_end": 67,
      "similarity_score": 0.92,
      "code_snippet": "def validate_jwt_token(token: str) -> dict:\n    \"\"\"Validate JWT token and return payload.\"\"\"\n    try:\n        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])\n        return payload\n    except jwt.ExpiredSignatureError:\n        raise HTTPException(401, \"Token expired\")\n    except jwt.InvalidTokenError:\n        raise HTTPException(401, \"Invalid token\")"
    },
    {
      "file": "src/auth/middleware.py", 
      "function": "auth_middleware",
      "line_start": 23,
      "line_end": 38,
      "similarity_score": 0.87,
      "code_snippet": "async def auth_middleware(request: Request, call_next):\n    token = request.headers.get('Authorization')\n    if token and token.startswith('Bearer '):\n        jwt_token = token[7:]\n        try:\n            payload = validate_jwt_token(jwt_token)\n            request.state.user = payload\n        except HTTPException:\n            pass\n    return await call_next(request)"
    }
  ],
  "total_results": 7,
  "query_time_ms": 234
}
```

### clear_index
Reset/clear the entire search index.

**Description:**
Removes all indexed data from the vector database. Useful for complete reindexing or cleanup.

**Usage:**
```python
clear_index()
```

**What it does:**
- Deletes all vectors from Zilliz Cloud collection
- Clears local cache and metadata
- Resets indexing status to clean state

**Expected Output:**
```
Clearing index...
Removed 1,247 indexed chunks
Index cleared successfully.
```

### get_indexing_status
Check the progress and status of indexing operations.

**Description:**
Returns current indexing status, progress information, and statistics about the indexed codebase.

**Usage:**
```python
get_indexing_status()
```

**Example Response:**
```json
{
  "status": "completed",
  "progress": {
    "files_processed": 127,
    "files_total": 127,
    "chunks_indexed": 1247,
    "percentage_complete": 100
  },
  "statistics": {
    "total_files": 127,
    "total_chunks": 1247,
    "languages_detected": ["Python", "JavaScript", "Markdown"],
    "last_indexed": "2025-08-22T23:45:12.345Z",
    "index_size_mb": 15.7
  },
  "supported_languages": [
    "Python", "JavaScript", "TypeScript", "Java", 
    "C++", "C#", "Go", "Rust", "PHP", "Ruby", 
    "Swift", "Kotlin", "Scala", "Markdown"
  ]
}
```

## Common Workflow Patterns

### Session End Protocol Pattern
```python
# 1. Index any new or modified files
index_codebase()

# 2. Log issues and solutions encountered
search_code("error handling patterns", limit=3)

# 3. Check indexing status
status = get_indexing_status()

# 4. Store context for next session
# (This is automatically handled by the indexing process)
```

### Research and Context Pattern
```python
# 1. Search for existing implementations
existing_code = search_code("user authentication flow", limit=5)

# 2. Find related patterns
patterns = search_code("JWT token refresh mechanism", limit=3)

# 3. Look for error handling examples
error_handling = search_code("async exception handling", limit=3)
```

### Debugging and Issue Resolution Pattern
```python
# 1. Search for similar error patterns
error_examples = search_code("database connection timeout", limit=5)

# 2. Find resolution patterns
solutions = search_code("retry mechanism implementation", limit=3)

# 3. Index the solution for future reference
index_codebase()  # This will include your new solution
```

### Code Review and Learning Pattern
```python
# 1. Search for best practices
best_practices = search_code("input validation patterns", limit=5)

# 2. Find testing examples
test_patterns = search_code("unit test async functions", limit=3)

# 3. Look for documentation patterns  
docs = search_code("API documentation examples", limit=3)
```

## Integration Benefits

### Token Reduction
- **~40% fewer tokens** compared to loading entire directories
- **Focused context**: Only loads relevant code sections
- **Cost efficiency**: Significant savings in production environments

### Semantic Understanding
- **Natural language queries**: Search using plain English descriptions
- **Code pattern recognition**: Finds similar implementations across languages
- **Context-aware results**: Understands relationships between code components

### Scalability
- **Large codebase support**: Handles millions of lines of code
- **Vector database backend**: Efficient similarity search using Zilliz Cloud
- **Incremental indexing**: Only processes changed files on reindex

## Configuration

### Environment Variables
```bash
# Required for Claude Context MCP
OPENAI_API_KEY=sk-your-openai-api-key
MILVUS_TOKEN=your-zilliz-cloud-api-key

# Optional configuration
EMBEDDING_MODEL=text-embedding-ada-002
CHUNK_SIZE=1000
OVERLAP_SIZE=200
SIMILARITY_THRESHOLD=0.7
```

### Supported File Types
- **Code**: .py, .js, .ts, .java, .cpp, .cs, .go, .rs, .php, .rb, .swift, .kt, .scala
- **Documentation**: .md, .rst, .txt
- **Configuration**: .json, .yaml, .toml, .ini
- **Web**: .html, .css, .vue, .jsx, .tsx

### Exclusions (Automatic)
- **Dependencies**: node_modules/, venv/, __pycache__/
- **Build outputs**: dist/, build/, target/
- **Version control**: .git/, .svn/
- **IDE files**: .vscode/, .idea/
- **Large binaries**: Images, videos, executables