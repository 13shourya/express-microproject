document.addEventListener('DOMContentLoaded', function() {
    const fetchButton = document.getElementById('fetchData');
    
    if (fetchButton) {
        fetchButton.addEventListener('click', fetchProductsData);
    }
    
    async function fetchProductsData() {
        const loadingElement = document.getElementById('loading');
        const productsContainer = document.getElementById('productsContainer');
        const errorElement = document.getElementById('error');
        
        // Show loading state
        loadingElement.classList.remove('hidden');
        errorElement.classList.add('hidden');
        productsContainer.innerHTML = '';
        
        if (fetchButton) {
            fetchButton.disabled = true;
        }
        
        try {
            const response = await fetch('/api/products');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const products = await response.json();
            displayProducts(products);
            
        } catch (error) {
            console.error('Error fetching products:', error);
            errorElement.textContent = 'Error loading products. Please try again.';
            errorElement.classList.remove('hidden');
        } finally {
            loadingElement.classList.add('hidden');
            if (fetchButton) {
                fetchButton.disabled = false;
            }
        }
    }
    
    function displayProducts(products) {
        const productsContainer = document.getElementById('productsContainer');
        
        if (!products || products.length === 0) {
            productsContainer.innerHTML = '<p>No products found.</p>';
            return;
        }
        
        const productsHTML = products.map(product => {
            const imageContent = product.image 
                ? `<img src="${product.image}" alt="${product.name}" onerror="handleImageError(this)">`
                : '<div class="placeholder">📷 No image available</div>';
            
            return `
                <div class="product-card">
                    <div class="product-image">
                        ${imageContent}
                    </div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">$${product.price}</div>
                    <span class="product-category">${product.category}</span>
                    <p class="product-description">${product.description}</p>
                </div>
            `;
        }).join('');
        
        productsContainer.innerHTML = productsHTML;
    }
    
    window.handleImageError = function(img) {
        const parent = img.parentElement;
        parent.classList.add('image-missing');
        parent.innerHTML = '<div class="placeholder"> Image not found</div>';
    };
});