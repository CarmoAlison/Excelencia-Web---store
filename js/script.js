    // Dados dos produtos
        const produtos = [
            {
                id: 1,
                nome: "Notebook UltraSlim",
                preco: 4299.99,
                categoria: "Tecnologia",
                imagem: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                descricao: "Notebook com processador Intel Core i7, 16GB RAM, SSD 512GB, tela Full HD de 15.6 polegadas. Ideal para trabalho e entretenimento."
            },
            {
                id: 2,
                nome: "Smartphone Pro Max",
                preco: 3599.00,
                categoria: "Tecnologia",
                imagem: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                descricao: "Smartphone com câmera tripla de 48MP, tela AMOLED de 6.7 polegadas, 128GB de armazenamento e bateria de 5000mAh."
            },
            {
                id: 3,
                nome: "Fone Bluetooth Premium",
                preco: 599.90,
                categoria: "Tecnologia",
                imagem: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                descricao: "Fones de ouvido sem fio com cancelamento de ruído ativo, bateria para 30 horas de uso e design ergonômico."
            },
            {
                id: 4,
                nome: "Smart Watch Pro",
                preco: 1299.00,
                categoria: "Tecnologia",
                imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                descricao: "Relógio inteligente com monitoramento de saúde, GPS integrado, resistente à água e tela AMOLED sempre ligada."
            },
            {
                id: 5,
                nome: "Camiseta Premium",
                preco: 129.90,
                categoria: "Vestuário",
                imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                descricao: "Camiseta de algodão orgânico, alta qualidade, diversas cores disponíveis. Confortável e durável para o dia a dia."
            },
            {
                id: 6,
                nome: "Tênis Esportivo",
                preco: 299.90,
                categoria: "Vestuário",
                imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                descricao: "Tênis para corrida com amortecimento avançado, solado antiderrapante e material respirável. Ideal para atividades físicas."
            },
            {
                id: 7,
                nome: "Livro: O Poder do Hábito",
                preco: 49.90,
                categoria: "Livros",
                imagem: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                descricao: "Best-seller que explora a ciência por trás da criação e transformação de hábitos. Leitura essencial para desenvolvimento pessoal."
            },
            {
                id: 8,
                nome: "Kit Panelas Antiaderentes",
                preco: 399.00,
                categoria: "Casa",
                imagem: "https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                descricao: "Conjunto de 5 panelas antiaderentes com revestimento de cerâmica, alças frias e tampa de vidro. Prático e durável."
            },
            {
                id: 9,
                nome: "Console de Games Pro",
                preco: 2599.90,
                categoria: "Games",
                imagem: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                descricao: "Console de última geração com processador de alta performance, 1TB de armazenamento e compatibilidade 4K."
            },
            {
                id: 10,
                nome: "Suplemento Energético",
                preco: 89.90,
                categoria: "Saúde",
                imagem: "https://images.unsplash.com/photo-1597074866923-dc0589150358?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                descricao: "Suplemento vitamínico com 60 cápsulas, fórmula energética com vitaminas B, C e minerais essenciais."
            }
        ];

        // Elementos do DOM
        const productsContainer = document.getElementById('products-container');
        const cartCount = document.querySelector('.cart-count');
        const cartButton = document.getElementById('cart-button');
        const overlay = document.getElementById('overlay');
        const cartDrawer = document.getElementById('cart-drawer');
        const closeCartBtn = document.querySelector('.close-cart');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalPrice = document.getElementById('cart-total-price');
        const btnContinue = document.getElementById('btn-continue');
        const btnCheckout = document.getElementById('btn-checkout');
        const checkoutModal = document.getElementById('checkout-modal');
        const closeModalButtons = document.querySelectorAll('.close-modal');
        const searchInput = document.getElementById('search-input');
        const categoryItems = document.querySelectorAll('.categories li');
        const deliveryOptions = document.querySelectorAll('.delivery-option');
        const paymentOptions = document.querySelectorAll('.payment-option');
        const addressFields = document.getElementById('address-fields');
        const submitOrderBtn = document.getElementById('submit-order');

        // Variáveis globais
        let carrinho = [];
        let selectedCategory = "all";

        // Inicialização
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts(produtos);
            setupEventListeners();
            updateCartCount();
        });

        // Renderizar produtos
        function renderProducts(products) {
            productsContainer.innerHTML = '';
            
            let filteredProducts = products;
            
            // Aplicar filtro de categoria
            if (selectedCategory !== "all") {
                filteredProducts = products.filter(produto => 
                    produto.categoria === selectedCategory
                );
            }
            
            filteredProducts.forEach(produto => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-badge">Destaque</div>
                    <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
                    <div class="product-info">
                        <div class="product-category">${produto.categoria}</div>
                        <h3 class="product-name">${produto.nome}</h3>
                        <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
                        <div class="product-actions">
                            <button class="btn-details" data-id="${produto.id}">Detalhes</button>
                            <button class="btn-add-cart" data-id="${produto.id}">
                                <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });
            
            // Adicionar event listeners aos botões
            document.querySelectorAll('.btn-details').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    openProductDetail(id);
                });
            });
            
            document.querySelectorAll('.btn-add-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = parseInt(e.target.closest('.btn-add-cart').dataset.id);
                    addToCart(id);
                });
            });
        }

        // Configurar event listeners
        function setupEventListeners() {
            // Carrinho
            cartButton.addEventListener('click', openCartDrawer);
            closeCartBtn.addEventListener('click', closeCartDrawer);
            overlay.addEventListener('click', closeCartDrawer);
            btnContinue.addEventListener('click', closeCartDrawer);
            btnCheckout.addEventListener('click', openCheckoutModal);
            
            // Filtro por categoria
            categoryItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Remover classe ativa de todos os itens
                    categoryItems.forEach(i => i.classList.remove('active'));
                    
                    // Adicionar classe ativa ao item clicado
                    item.classList.add('active');
                    
                    // Atualizar categoria selecionada
                    selectedCategory = item.dataset.category;
                    
                    // Renderizar produtos com a nova categoria
                    renderProducts(produtos);
                });
            });
            
            // Fechar modais
            closeModalButtons.forEach(button => {
                button.addEventListener('click', () => {
                    checkoutModal.style.display = 'none';
                });
            });
            
            // Opções de entrega
            deliveryOptions.forEach(option => {
                option.addEventListener('click', () => {
                    deliveryOptions.forEach(o => o.classList.remove('active'));
                    option.classList.add('active');
                    
                    // Mostrar/ocultar campos de endereço
                    if (option.dataset.type === 'delivery') {
                        addressFields.style.display = 'block';
                    } else {
                        addressFields.style.display = 'none';
                    }
                });
            });
            
            // Opções de pagamento
            paymentOptions.forEach(option => {
                option.addEventListener('click', () => {
                    paymentOptions.forEach(o => o.classList.remove('active'));
                    option.classList.add('active');
                });
            });
            
            // Enviar pedido
            submitOrderBtn.addEventListener('click', submitOrder);
            
            // Pesquisa
            searchInput.addEventListener('input', filterProducts);
        }

        // Abrir carrinho lateral
        function openCartDrawer() {
            if (carrinho.length === 0) {
                alert('Seu carrinho está vazio! Adicione produtos antes de visualizar.');
                return;
            }
            updateCartDrawer();
            cartDrawer.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Fechar carrinho lateral
        function closeCartDrawer() {
            cartDrawer.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Atualizar carrinho lateral
        function updateCartDrawer() {
            cartItemsContainer.innerHTML = '';
            
            carrinho.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.imagem}" alt="${item.nome}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.nome}</div>
                        <div class="cart-item-price">R$ ${item.preco.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span class="quantity-value">${item.quantidade}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            
            // Atualizar total
            const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
            cartTotalPrice.textContent = `R$ ${total.toFixed(2)}`;
            
            // Adicionar event listeners aos botões de quantidade
            document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    updateQuantity(id, -1);
                });
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    updateQuantity(id, 1);
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.closest('.remove-item').dataset.id);
                    removeFromCart(id);
                });
            });
        }

        // Atualizar quantidade de um item
        function updateQuantity(id, change) {
            const item = carrinho.find(i => i.id === id);
            if (item) {
                item.quantidade += change;
                
                if (item.quantidade <= 0) {
                    removeFromCart(id);
                } else {
                    updateCartCount();
                    updateCartDrawer();
                }
            }
        }

        // Remover item do carrinho
        function removeFromCart(id) {
            carrinho = carrinho.filter(item => item.id !== id);
            updateCartCount();
            
            if (carrinho.length === 0) {
                closeCartDrawer();
            } else {
                updateCartDrawer();
            }
        }

        // Adicionar ao carrinho
        function addToCart(id) {
            const produto = produtos.find(p => p.id === id);
            if (produto) {
                const existingItem = carrinho.find(item => item.id === id);
                
                if (existingItem) {
                    existingItem.quantidade++;
                } else {
                    carrinho.push({
                        id: produto.id,
                        nome: produto.nome,
                        preco: produto.preco,
                        imagem: produto.imagem,
                        quantidade: 1
                    });
                }
                
                updateCartCount();
                
                // Feedback visual
                const button = document.querySelector(`.btn-add-cart[data-id="${id}"]`);
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-cart-plus"></i>';
                    button.style.backgroundColor = '';
                }, 1000);
            }
        }

        // Atualizar contador do carrinho
        function updateCartCount() {
            const count = carrinho.reduce((total, item) => total + item.quantidade, 0);
            cartCount.textContent = count;
        }

        // Abrir modal de finalização
        function openCheckoutModal() {
            checkoutModal.style.display = 'flex';
            closeCartDrawer();
        }

        // Filtrar produtos
        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredProducts = produtos.filter(produto => 
                produto.nome.toLowerCase().includes(searchTerm) || 
                produto.categoria.toLowerCase().includes(searchTerm) ||
                produto.descricao.toLowerCase().includes(searchTerm)
            );
            renderProducts(filteredProducts);
        }

        // Enviar pedido via WhatsApp
        function submitOrder() {
            const name = document.getElementById('name').value;
            const deliveryType = document.querySelector('.delivery-option.active').dataset.type;
            const paymentMethod = document.querySelector('.payment-option.active').dataset.method;
            
            if (!name) {
                alert('Por favor, preencha seu nome.');
                return;
            }
            
            let address = "";
            let neighborhood = "";
            
            if (deliveryType === 'delivery') {
                address = document.getElementById('address').value;
                neighborhood = document.getElementById('neighborhood').value;
                
                if (!address || !neighborhood) {
                    alert('Por favor, preencha todos os campos de endereço.');
                    return;
                }
            }
            
            // Construir mensagem para WhatsApp
            let message = "Olá, tudo bem?\nVenho aqui pelo site excelenciawebstore.com.br queria fazer um pedido da sua loja virtual.\n\n";
            
            message += `*Nome:* ${name}\n`;
            
            if (deliveryType === 'delivery') {
                message += `*Endereço:* ${address}\n`;
                message += `*Bairro:* ${neighborhood}\n`;
            } else {
                message += "*Retirada na loja*\n";
            }
            
            message += `*Forma de pagamento:* ${paymentMethod.toUpperCase()}\n\n`;
            
            
            carrinho.forEach(item => {
                message += `- ${item.nome}\n`;
                message += `  Preço: R$ ${item.preco.toFixed(2)}\n`;
                message += `  Quantidade: ${item.quantidade}\n`;
                message += `  Foto: ${item.imagem}\n\n`;
            });
            
            const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
            message += `*Total do pedido: R$ ${total.toFixed(2)}*`;
            
            // Codificar a mensagem para URL
            const encodedMessage = encodeURIComponent(message);
            
            // Abrir WhatsApp com a mensagem
            window.open(`https://wa.me/5584996002433?text=${encodedMessage}`, '_blank');
            
            // Fechar o modal
            checkoutModal.style.display = 'none';
            
            // Limpar carrinho
            carrinho = [];
            updateCartCount();
        }