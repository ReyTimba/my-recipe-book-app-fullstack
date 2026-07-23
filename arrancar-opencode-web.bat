@echo off
set OPENCODE_SERVER_PASSWORD=Reytimb@1985
start "OpenCode Web" cmd /c "cd /d C:\Users\Reynel\Desktop\sor-proyectos\recetario && opencode web --hostname 0.0.0.0 --port 4096"
timeout /t 5 /nobreak >nul
start "Cloudflare Tunnel" cmd /c "cloudflared tunnel --config C:\Users\Reynel\.cloudflared\config-opencode.yml run"
echo.
echo OpenCode web: https://opencode.timbalero.dev
echo Usuario: opencode
echo.
pause
