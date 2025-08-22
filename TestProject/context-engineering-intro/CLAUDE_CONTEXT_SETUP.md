# Claude Context MCP Server Setup Guide

## Overview
Claude Context is a semantic code search MCP server that makes your entire codebase available as context for Claude Code. It provides ~40% token reduction while maintaining equivalent retrieval quality.

## Prerequisites

### System Requirements
- Node.js version 20.0.0 to < 24.0.0
- Git (for cloning repositories)

### API Keys Required
1. **OpenAI API Key**: For embeddings (starts with `sk-`)
2. **Zilliz Cloud API Key**: For vector database storage

## Step-by-Step Setup

### 1. Get Required API Keys

#### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (format: `sk-...`)

#### Zilliz Cloud API Key
1. Sign up at [Zilliz Cloud](https://cloud.zilliz.com/)
2. Create a new cluster
3. Get your API token from cluster settings

### 2. Install Claude Context MCP Server

```bash
# Install Claude Context as MCP server for Claude Code
claude mcp add claude-context \
 -e OPENAI_API_KEY=sk-your-openai-api-key \
 -e MILVUS_TOKEN=your-zilliz-cloud-api-key \
 -- npx @zilliz/claude-context-mcp@latest
```

### 3. Verify Installation

```bash
# Check if MCP server is running
claude mcp list
```

You should see `claude-context` in the list of active MCP servers.

## Available Tools

### Core Tools
- **`index_codebase`**: Index your entire project for semantic search
- **`search_code`**: Perform semantic search across indexed codebase  
- **`clear_index`**: Reset/clear the current search index
- **`get_indexing_status`**: Check indexing operation progress

### Usage Examples

#### Index Your Codebase
```
Hey Claude, please index my codebase using Claude Context
```
Claude will use the `index_codebase` tool to process your project files.

#### Search for Code
```
Find all authentication-related code in the project
```
Claude will use `search_code` to find relevant authentication code across your codebase.

#### Check Status
```
What's the status of codebase indexing?
```
Claude will use `get_indexing_status` to report progress.

## Configuration Options

### Supported Languages
- **Frontend**: TypeScript, JavaScript
- **Backend**: Python, Java, Go, Rust, C++, C#
- **Mobile**: Swift, Kotlin, Scala  
- **Scripting**: PHP, Ruby
- **Documentation**: Markdown

### Embedding Providers
- **OpenAI** (default): Best quality, requires API key
- **VoyageAI**: Alternative high-quality option
- **Ollama**: Local embedding model
- **Gemini**: Google's embedding service

### Advanced Configuration
You can customize file inclusion/exclusion rules by modifying the MCP server configuration:

```json
{
  "ignore_patterns": [
    "node_modules/**",
    ".git/**", 
    "*.log",
    "dist/**",
    "build/**"
  ],
  "include_extensions": [
    ".js", ".ts", ".py", ".java", ".go", 
    ".rs", ".cpp", ".cs", ".md"
  ]
}
```

## Integration with MCP Pipeline

### Role in Architecture
Claude Context serves as the **knowledge and memory layer** in your MCP pipeline:

```
User Request → Task Analysis → Claude Context Search → Implementation
     ↓              ↓              ↓                    ↓
Central AI → Complexity Check → Code Context → Claude Code
     ↓              ↓              ↓                    ↓  
Route Task → Archon Orchestrate → Semantic Search → Execute
```

### Workflow Integration
1. **Pre-Implementation**: Search for existing patterns and implementations
2. **During Development**: Find related code and dependencies
3. **Code Review**: Check for similar patterns and consistency
4. **Refactoring**: Identify code that needs updating

## Performance Optimization

### Token Efficiency
- **Before**: Loading entire directories can use 10,000+ tokens
- **After**: Semantic search typically uses 2,000-3,000 tokens
- **Savings**: ~40% reduction in token usage

### Search Quality
- Uses hybrid search (BM25 + dense vector)
- AST-based code splitting for better context
- Automatic fallback to character-based splitting

## Troubleshooting

### Common Issues

#### Installation Fails
```bash
# Clear MCP cache and reinstall
claude mcp remove claude-context
claude mcp add claude-context -e OPENAI_API_KEY=... -e MILVUS_TOKEN=... -- npx @zilliz/claude-context-mcp@latest
```

#### Indexing Slow/Fails
- Check API key validity
- Ensure sufficient API credits
- Verify network connectivity to Zilliz Cloud

#### Search Returns No Results
- Confirm codebase was indexed successfully
- Check file extensions are supported
- Verify search query matches code patterns

### Debug Commands
```bash
# Check MCP server logs
claude mcp logs claude-context

# Test connectivity
curl -X GET "https://api.openai.com/v1/models" -H "Authorization: Bearer sk-your-key"
```

## Best Practices

### When to Index
- After major code changes
- Before starting new features
- When onboarding team members
- After refactoring sessions

### Search Strategies
- Use specific technical terms
- Include function/class names
- Describe functionality, not implementation
- Combine multiple search terms

### Maintenance
- Re-index weekly for active projects
- Clear index when changing project structure
- Monitor token usage for cost optimization

## Next Steps

1. **Index your current project**: Start with `index_codebase`
2. **Test search functionality**: Try finding specific code patterns
3. **Integrate with workflow**: Use before implementing new features
4. **Monitor performance**: Track token savings and search quality
5. **Configure for team**: Set up shared configuration for consistency

## Integration with Archon

Claude Context works seamlessly with your Archon MCP pipeline:

### In Archon Tasks
When Archon creates subtasks, Claude Context can:
- Find existing implementations to avoid duplication
- Identify dependencies that need consideration
- Provide historical context for similar tasks

### Task Context Example
```yaml
Task: "Implement user authentication system"
Claude Context Search: 
  - Find existing auth patterns
  - Identify security implementations
  - Locate database user models
  - Check API authentication methods
```

This provides rich context for implementation without manual code exploration.