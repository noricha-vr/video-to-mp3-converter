# Changelog

## 2026-10-27

### Changed

- Tailwind CSS と PostCSS plugin を 4.3.3 に更新し、CSS の読み込みと既存設定を対応させました。角丸・影・フォーカス表示を維持し、対応ブラウザは Safari 16.4 / Chrome 111 / Firefox 128 以降です。

## 2026-10-22 TypeScript

- TypeScript 7.0.2 に更新し、削除された baseUrl 設定を相対 paths に置き換えました。アプリの import 解決と動画変換は維持しています。

## 2026-10-22

### Fixed

- Vite 8.3.4 と対応する React plugin 6.1.2 / PWA plugin 1.3.0 を併せて更新し、ビルド時のpeer互換性を維持。
