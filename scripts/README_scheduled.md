# 11時間10分後にコマンドを実行する方法

## 作成したスクリプト

### 1. scheduled_command.sh（フォアグラウンド実行）
ターミナルで待機し続ける方法。実行状況が確認できます。

```bash
# 実行方法
./scripts/scheduled_command.sh
```

**特徴:**
- ターミナルで実行状況が見える
- Ctrl+Cでキャンセル可能
- ターミナルを閉じると中断される

### 2. scheduled_command_bg.sh（バックグラウンド実行）
バックグラウンドで実行し、ログファイルに記録する方法。

```bash
# 実行方法
./scripts/scheduled_command_bg.sh
```

**特徴:**
- バックグラウンドで実行
- ログファイルに結果を記録
- ターミナルを閉じても実行継続（nohup使用推奨）

## その他の実行方法

### 方法1: ワンライナーコマンド
```bash
# 11時間10分後に実行（フォアグラウンド）
sleep $((11*3600 + 10*60)) && cco hello

# バックグラウンドで実行
(sleep $((11*3600 + 10*60)) && cco hello) &

# nohupでターミナルを閉じても実行継続
nohup bash -c 'sleep $((11*3600 + 10*60)) && cco hello' > ~/cco_output.log 2>&1 &
```

### 方法2: atコマンド（macOSでは要有効化）
```bash
# atデーモンを有効化（管理者権限必要）
sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist

# 11時間10分後に実行
echo "cco hello" | at now + 11 hours 10 minutes
```

### 方法3: cronを使用（定期実行向け）
特定の時刻に実行したい場合：
```bash
# crontab -e で編集
# 例: 毎日23:04に実行
4 23 * * * cco hello
```

## 実行時刻の確認

現在時刻から11時間10分後の時刻を確認：
```bash
date -v +$((11*3600 + 10*60))S '+%Y-%m-%d %H:%M:%S'
```

## プロセスの確認と停止

バックグラウンドプロセスの確認：
```bash
ps aux | grep scheduled_command
```

プロセスの停止：
```bash
kill <PID>
```

## 注意事項

1. **ターミナルセッション**: フォアグラウンド実行の場合、ターミナルを閉じると処理が中断されます
2. **電源管理**: スリープモードに入ると実行が遅延する可能性があります
3. **パス設定**: `cco` コマンドがPATHに含まれていることを確認してください
4. **権限**: スクリプト実行権限が必要です（`chmod +x`で設定済み）