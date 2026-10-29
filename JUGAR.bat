@echo off
title Martin Fierro - Entre el Fuego y la Pampa
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  No se encontro Node.js en este equipo.
  echo  Abriendo el juego en modo basico ^(sin modelos animados^)...
  echo.
  start "" "%~dp0index.html"
  pause
  exit /b
)
node server.js 8080
pause
