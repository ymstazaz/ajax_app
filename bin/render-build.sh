# デプロイ用の設定ファイル。手作業で入力
#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
# 終わったらデータベースヤムにもMySQLだけじゃなくてこっちも使うよっていう設定をする