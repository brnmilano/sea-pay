#!/bin/bash

# Script para build e análise de imagens Docker

echo "🐳 Docker Build & Analysis Script"
echo "=================================="
echo ""

# Função para mostrar tamanho da imagem
show_image_size() {
    local image_name=$1
    echo "📊 Tamanho da imagem:"
    docker images $image_name --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
    echo ""
}

# Menu de opções
echo "Selecione uma opção:"
echo "1) Build imagem de desenvolvimento"
echo "2) Build imagem de produção"
echo "3) Build ambas e comparar tamanhos"
echo "4) Limpar imagens antigas"
echo "5) Analisar camadas da imagem"
echo ""
read -p "Opção: " option

case $option in
    1)
        echo "🔨 Buildando imagem de desenvolvimento..."
        docker build --target development -t sea-pay-dev:latest .
        show_image_size "sea-pay-dev"
        ;;
    2)
        echo "🔨 Buildando imagem de produção..."
        docker build --target runner -t sea-pay-prod:latest .
        show_image_size "sea-pay-prod"
        ;;
    3)
        echo "🔨 Buildando ambas as imagens..."
        docker build --target development -t sea-pay-dev:latest .
        docker build --target runner -t sea-pay-prod:latest .
        echo ""
        echo "📊 Comparação de tamanhos:"
        docker images | grep sea-pay
        ;;
    4)
        echo "🧹 Limpando imagens antigas..."
        docker image prune -f
        docker images | grep sea-pay
        ;;
    5)
        read -p "Nome da imagem (ex: sea-pay-prod:latest): " image_name
        echo "🔍 Analisando camadas da imagem $image_name..."
        docker history $image_name --human --format "table {{.CreatedBy}}\t{{.Size}}"
        ;;
    *)
        echo "❌ Opção inválida!"
        exit 1
        ;;
esac
