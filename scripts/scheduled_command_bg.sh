#!/bin/bash

# 11時間10分後に cco hello をバックグラウンドで実行するスクリプト
SECONDS_TO_WAIT=$((11 * 3600 + 10 * 60))  # 11時間10分 = 40200秒
CURRENT_TIME=$(date '+%Y-%m-%d %H:%M:%S')
TARGET_TIME=$(date -v +${SECONDS_TO_WAIT}S '+%Y-%m-%d %H:%M:%S')
LOG_FILE="$HOME/scheduled_command_$(date +%Y%m%d_%H%M%S).log"

# バックグラウンドで実行する関数
run_scheduled_command() {
    sleep $SECONDS_TO_WAIT
    echo "----------------------------------------" >> "$LOG_FILE"
    echo "コマンド実行: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE"
    echo "実行コマンド: cco hello" >> "$LOG_FILE"
    echo "----------------------------------------" >> "$LOG_FILE"
    cco hello >> "$LOG_FILE" 2>&1
    echo "実行完了: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE"
}

echo "スケジュール設定完了"
echo "現在時刻: $CURRENT_TIME"
echo "実行予定時刻: $TARGET_TIME"
echo "ログファイル: $LOG_FILE"
echo ""
echo "バックグラウンドで実行中..."
echo "プロセスID: $$"

# バックグラウンドで実行
run_scheduled_command &
BG_PID=$!
echo "バックグラウンドプロセスID: $BG_PID"
echo ""
echo "プロセスを停止するには: kill $BG_PID"