# Project Vision and Architecture

This document outlines the core components and architectural vision for this project. The primary goal is to leverage a suite of advanced tools to create a robust, efficient, and intelligent development environment.

## Core Features & Technology Stack:

### 1. MCP (Model-Context-Protocol) Pipeline
The project will be built around an **MCP pipeline**. This will serve as the backbone for communication and data flow between different AI services and development tools, ensuring a standardized and extensible architecture.

### 2. Archon Server for Project Management
We will utilize an **Archon server** for intelligent project management. Its key roles will be:
-   **Task Decomposition:** Breaking down complex development tasks into smaller, manageable units.
-   **AI Token Reduction:** Optimizing prompts and managing context to minimize token usage for interactions with AI models, leading to cost savings and faster responses.

### 3. Claude Context for Code Intelligence
To maintain a consistent and accurate understanding of the codebase across development sessions, we will use **Claude Context**. Its responsibilities include:
-   **Code Indexing:** Creating and maintaining a semantic index of the entire project's codebase.
-   **Problem/Issue/Resolution Memory:** Tracking issues, the steps taken to resolve them, and the final solutions to build a persistent knowledge base, ensuring chat and agent memory is consistent over time.

### 4. Claude Code for Code Generation
**Claude Code** will be the primary engine for generating high-quality, context-aware code. It will be integrated into the MCP pipeline to receive tasks from the Archon server and use the knowledge from Claude Context.

### 5. Extensibility and Future Integrations
The architecture is designed to be modular and extensible. Future capabilities will be integrated as MCP-compliant components, including:
-   **Internet Search:** A tool for dynamically fetching information, documentation, and examples from the web.
-   **Code Snippet Uploading:** A mechanism to easily incorporate existing code snippets into the project.
-   **Future MCP Tools:** The ability to seamlessly add new tools and services that adhere to the Model-Context-Protocol.

## FEATURE:

- Pydantic AI agent that has another Pydantic AI agent as a tool.
- Research Agent for the primary agent and then an email draft Agent for the subagent.
- CLI to interact with the agent.
- Gmail for the email draft agent, Brave API for the research agent.

## EXAMPLES:

In the `examples/` folder, there is a README for you to read to understand what the example is all about and also how to structure your own README when you create documentation for the above feature.

- `examples/cli.py` - use this as a template to create the CLI
- `examples/agent/` - read through all of the files here to understand best practices for creating Pydantic AI agents that support different providers and LLMs, handling agent dependencies, and adding tools to the agent.

Don't copy any of these examples directly, it is for a different project entirely. But use this as inspiration and for best practices.

## DOCUMENTATION:

- waiting for project info 
## OTHER CONSIDERATIONS:

- Include a .env.example, README with instructions for setup including how to configure Gmail and Brave.
- Include the project structure in the README.
- Virtual environment has already been set up with the necessary dependencies.
- Use python_dotenv and load_env() for environment variables
