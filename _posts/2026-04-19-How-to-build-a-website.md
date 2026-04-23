# How to build a website

## How to use the docker to view the website in a local environment
I put my source codes on WSL side so 
Install Docker Desktop on Windows.
In Docker Desktop, enable WSL integration for your Ubuntu distro:
Settings > Resources > WSL Integration > enable your Ubuntu.
Restart your WSL terminal.
Verify from WSL:
```bash
docker --version
docker compose version
```
Run the site from WSL
From your repo root:
```bash
docker compose up --build
```

Then open:
http://localhost:4000
That URL should work both in a browser inside WSL and in your normal Windows browser because WSL2 forwards localhost.