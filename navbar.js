document.addEventListener("DOMContentLoaded", function () {
    const pageName = document.body.dataset.page; // 현재 페이지를 식별하기 위해 body의 data-page 속성 사용

    const navHTML = `
    <div class="nav-container">
        <button class="nav-button ${pageName === 'home' ? 'active' : ''}" onclick="location.href='advertiser_home.html'">홈</button>
        <button class="nav-button ${pageName === 'findInfluencers' ? 'active' : ''}" onclick="location.href='find_influencers.html'">인플루언서 찾기</button>
        <button class="nav-button ${pageName === 'uploadProduct' ? 'active' : ''}" onclick="location.href='upload_product.html'">상품 올리기</button>
        <button class="nav-button ${pageName === 'messenger' ? 'active' : ''}" onclick="location.href='messenger.html'">연락중인 메신저</button>
        <button class="nav-button ${pageName === 'myPage' ? 'active' : ''}" onclick="location.href='my_page.html'">마이페이지</button>
        <button class="nav-button ${pageName === 'notifications' ? 'active' : ''}" onclick="location.href='notifications.html'">알림</button>
        <button class="nav-button ${pageName === 'influencerList' ? 'active' : ''}" onclick="location.href='influencer_list.html'">가입된 인플루언서 목록</button>
        <button class="nav-button ${pageName === 'main' ? 'active' : ''}" onclick="location.href='index.html'">메인</button>
    </div>`;
    document.body.insertAdjacentHTML('afterbegin', navHTML);
});
