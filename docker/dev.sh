# Esse arquivo é um script para rodar o Next em modo de desenvolvimento
# Ele deve ser executado com o comando `bash docker/dev.sh`
# !/bin/bash - é um shebang que indica que o script deve ser executado com o bash

!/bin/bash

echo "🔨 Buildando imagem com cache..."
# Nesse comando, sea-pay é o nome da imagem
docker build -t sea-pay .

echo "🚀 Rodando o container..."
# Nesse comando, sea-pay-container é o nome do container
docker run -d -p 3000:3000 --name sea-pay-container sea-pay
