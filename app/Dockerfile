# ベースイメージとしてNode.jsを使用
FROM node:20

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# ソースコードをコピー
COPY . .

# uvをインストール
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# uvのパスを通す
ENV PATH="/root/.local/bin:${PATH}"

# Pythonをインストール
RUN uv python install 3.10

# ポートの公開
EXPOSE 4111

# アプリケーションの起動
CMD ["npm", "run", "dev"]
