#!/bin/bash

# Script auxiliar para desenvolvimento do SEA-PAY
# Fornece menu interativo para comandos Docker comuns

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}"
cat << "EOF"
   _____ ______   ___    ____  _____  __
  / ___// ____/  /   |  / __ \/ __  \/ /
  \__ \/ __/    / /| | / /_/ / /_/ / / 
 ___/ / /___   / ___ |/ ____/ __  /_/  
/____/_____/  /_/  |_/_/   /_/ /_(_)   
                                        
EOF
echo -e "${NC}"

show_menu() {
    echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║     SEA-PAY - Menu de Comandos        ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
    echo ""
    echo "1)  🚀 Iniciar Desenvolvimento"
    echo "2)  🛑 Parar Containers"
    echo "3)  🔨 Build Produção (otimizado)"
    echo "4)  📊 Ver Tamanhos das Imagens"
    echo "5)  🔍 Analisar Camadas"
    echo "6)  🧹 Limpar Cache Docker"
    echo "0)  ❌ Sair"
    echo ""
}

while true; do
    show_menu
    read -p "Escolha uma opção: " option
    echo ""
    
    case $option in
        1)
            echo -e "${YELLOW}🚀 Iniciando desenvolvimento...${NC}"
            docker-compose up -d
            echo -e "${GREEN}✅ Pronto! Acesse http://localhost:3000${NC}"
            ;;
        2)
            echo -e "${YELLOW}🛑 Parando containers...${NC}"
            docker-compose down
            echo -e "${GREEN}✅ Containers parados!${NC}"
            ;;
        3)
            echo -e "${YELLOW}🔨 Building produção...${NC}"
            docker build --target runner -t sea-pay:prod .
            docker images | grep sea-pay
            ;;
        4)
            echo -e "${YELLOW}📊 Tamanhos das imagens:${NC}"
            docker images | grep -E "(REPOSITORY|sea-pay)"
            ;;
        5)
            echo -e "${YELLOW}🔍 Analisando camadas:${NC}"
            docker history sea-pay:prod --human | head -15
            ;;
        6)
            echo -e "${YELLOW}🧹 Limpando cache...${NC}"
            docker builder prune -f
            echo -e "${GREEN}✅ Cache limpo!${NC}"
            ;;
        0)
            echo -e "${GREEN}👋 Até logo!${NC}"
            exit 0
            ;;
        *)
            echo -e "${YELLOW}❌ Opção inválida!${NC}"
            ;;
    esac
    
    echo ""
    read -p "Pressione ENTER para continuar..."
    clear
done
