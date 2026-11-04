@echo off
chcp 65001 >nul
title سامانه ثبت نام پرسنل
color 0B

echo.
echo  ╔══════════════════════════════════════════════╗
echo  ║                                              ║
echo  ║       سامانه ثبت نام پرسنل                   ║
echo  ║       Personnel Registration System          ║
echo  ║                                              ║
echo  ╚══════════════════════════════════════════════╝
echo.
echo  در حال بارگذاری سامانه...
echo.

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"

REM Try to open personnel.html in default browser
if exist "%SCRIPT_DIR%personnel.html" (
    start "" "%SCRIPT_DIR%personnel.html"
    echo  سامانه با موفقیت در مرورگر باز شد!
) else (
    echo  خطا: فایل personnel.html یافت نشد!
    echo  لطفاً مطمئن شوید فایل personnel.html در کنار این فایل bat قرار دارد.
)

echo.
echo  برای خروج این پنجره را ببندید.
echo.
pause
