class PostsController < ApplicationController
  def index
    @posts = Post.order(id: "DESC")
  end

  def new
  end

  def create
    post = Post.create(content: params[:content])
    # もともとあったPost以下をJsonで使うためにpost変数に格納しておく
    render json:{ post: post }
    # redirect_to action: :index　リダイレクトで更新されたインデックスにもっていっていたのをジェイソンに変更
    # リダイレクトはURLを指定　レンダーはURLは変更せず
  end
end
