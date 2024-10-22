class ApplicationController < ActionController::Base
  # 公開したウェブアプリのリンクにユーザー登録してる人しか見れないように設定↓
  before_action :basic_auth

# ↓定義してビフォアアクションで呼び出し.
# 試す際にはレイルズSで更新
  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]  # 環境変数を読み込む記述に変更ら
    end
    # ユーザーネームとかを引っ張るために、ターミナルで（vim ~/.zshrc）してiでインサートモードに移行
  end
end
