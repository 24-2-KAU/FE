async function fetchProductRecommendations(channelId) {
    try {
        // 요청 URL
        const url = `https://adinfluencerai.click/product_recommend/${channelId}`;

        // API 호출
        const response = await fetch(url, {
            method: "POST", // POST 요청 사용
            headers: {
                "Content-Type": "application/json", // 요청 타입
                "Accept": "application/json"        // 응답 타입
            }
        });

        if (!response.ok) {
            throw new Error(`오류: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // 결과 표시
        console.log("API 응답 데이터:", data);
        displayProducts(data.products);

    } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = `<p class="error">추천 결과를 가져오는 중 오류가 발생했습니다.</p>`;
    }
}

// 검색 버튼 이벤트 연결
document.getElementById('search-button').addEventListener('click', async () => {
    const channelId = document.getElementById('channel-id').value.trim();

    if (!channelId) {
        alert('채널 ID를 입력하세요.');
        return;
    }

    // API 호출
    await fetchProductRecommendations(channelId);
});

// 결과 표시 함수
function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
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
