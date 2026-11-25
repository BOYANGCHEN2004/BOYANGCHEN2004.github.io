---
title: "How to build a website"
---

# How to build a website

## View the website locally with Docker

Install and start Docker Desktop. On Windows with WSL, enable Docker Desktop integration for your WSL distribution under Settings > Resources > WSL Integration.

From the repository root in a macOS terminal (or WSL terminal on Windows), run:
```bash
docker compose up --build
```

Open http://localhost:4000 in your browser. Press Ctrl+C to stop the server.
