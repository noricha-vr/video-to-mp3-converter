#!/bin/bash

# テスト用: 5秒後にコマンドを実行
SECONDS_TO_WAIT=5
CURRENT_TIME=$(date '+%Y-%m-%d %H:%M:%S')
TARGET_TIME=$(date -v +${SECONDS_TO_WAIT}S '+%Y-%m-%d %H:%M:%S')

echo "テスト実行"
echo "現在時刻: $CURRENT_TIME"
echo "実行予定時刻: $TARGET_TIME (5秒後)"
echo "待機中..."

sleep $SECONDS_TO_WAIT

echo ""
echo "実行時刻: $(date '+%Y-%m-%d %H:%M:%S')"
echo "テストコマンド: echo 'Hello from scheduled command!'"
echo "----------------------------------------"
echo "Hello from scheduled command!"