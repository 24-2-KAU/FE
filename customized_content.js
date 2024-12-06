// customized_content.js

document.getElementById('search-button').addEventListener('click', () => {
    const channelId = document.getElementById('channel-id').value.trim();

    if (!channelId) {
        alert('채널 ID를 입력하세요.');
        return;
    }

    const url = `https://adinfluencerai.click/product_recommend/${channelId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
            return response.json();
        })
        .then(data => {
            if (data.products && data.products.length > 0) {
                displayProducts(data.products);
            } else {
                alert('결과가 없습니다.');
            }
        })
        .catch(error => {
            console.error(error);
            alert('요청 처리 중 문제가 발생했습니다.');
        });
});

function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // 기존 콘텐츠 지우기

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';

        const productImage = product.product_pic
            ? `<img src="${product.product_pic}" alt="${product.product_name}" class="product-image" />`
            : `<div class="no-image">이미지 없음</div>`;

        productElement.innerHTML = `
            ${productImage}
            <div class="product-info">
                <h2>${product.product_name}</h2>
                <p><strong>광고주 ID:</strong> ${product.ad_id}</p>
                <p><strong>점수:</strong> ${product.score}</p>
                <p><strong>가격:</strong> ${product.product_price}</p>
                <p><strong>상품설명:</strong> ${product.product_description}</p>
                <p><strong>예산:</strong> ${product.budget}</p>
                <p><strong>연령대:</strong> ${product.viewer_age}</p>
                <p><strong>성별:</strong> ${product.viewer_gender}</p>
                <p><strong>플랫폼:</strong> ${product.platform}</p>
                <p><strong>해시태그:</strong> ${product.hashtag}</p>
                <button class="chat-button" onclick="startChat('${product.ad_id}', '${product.product_name}')">채팅하기</button>
            </div>
        `;

        productContainer.appendChild(productElement);
    });
}
