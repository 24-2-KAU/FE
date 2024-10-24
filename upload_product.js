document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    const formData = new FormData(event.target); // 폼 데이터 수집

    try {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            body: formData, // FormData 객체를 직접 전송
        });

        if (!response.ok) {
            throw new Error('상품 등록에 실패했습니다.');
        }

        const result = await response.json();
        document.getElementById('message').textContent = result.message; // 성공 메시지 표시
    } catch (error) {
        document.getElementById('message').textContent = error.message; // 에러 메시지 표시
    }
});
