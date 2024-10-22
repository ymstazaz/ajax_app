# デプロイ用の設定ファイル。手作業で入力
#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean
# bundle exec rake db:migrate
# 終わったらデータベースヤムにもMySQLだけじゃなくてこっちも使うよっていう設定をする
DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rake db:migrate:reset
# デプロイ時に自動でデータベースをからにするやつ。これを入れるのにあたって、 bundle exec rake db:migrateをコメントに移行
# テキスト8311