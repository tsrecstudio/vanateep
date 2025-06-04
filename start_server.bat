@echo off
echo Запуск локального сервера для тестирования...
echo Приложение будет доступно по адресу: http://localhost:8000
echo Для остановки нажмите Ctrl+C
echo.
cd /d "%~dp0"
npx http-server -p 8000 -o
pause
