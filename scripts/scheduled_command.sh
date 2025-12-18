#!/bin/bash

# 11時間10分後に cco hello を実行するスクリプト
# 実行時刻の計算
SECONDS_TO_WAIT=$((11 * 3600 + 10 * 60))  # 11時間10分 = 40200秒
CURRENT_TIME=$(date '+%Y-%m-%d %H:%M:%S')
TARGET_TIME=$(date -v +${SECONDS_TO_WAIT}S '+%Y-%m-%d %H:%M:%S')

echo "現在時刻: $CURRENT_TIME"
echo "実行予定時刻: $TARGET_TIME"
echo "待機時間: 11時間10分 (${SECONDS_TO_WAIT}秒)"
echo ""
echo "待機中... (Ctrl+C でキャンセル可能)"

# 指定時間待機
sleep $SECONDS_TO_WAIT

# コマンド実行
echo ""
echo "コマンドを実行します: cco hello"
echo "実行時刻: $(date '+%Y-%m-%d %H:%M:%S')"
echo "----------------------------------------"

# ここで実際のコマンドを実行
cco hello