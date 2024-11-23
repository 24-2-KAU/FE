document.addEventListener("DOMContentLoaded", function () {
    const pageName = document.body.dataset.page; // 현재 페이지를 식별하기 위해 body의 data-page 속성 사용

    const email = localStorage.getItem('email');  // 로컬 스토리지에서 email 가져옴
    if (!email) {
        alert('로그인이 필요합니다.');
        window.location.href = 'influencer_login.html';  // 로그인 페이지로 리디렉션
        return;
    } else {
        console.log("Logged in with email:", email);  // 디버깅 용도
    }

    const navHTML = `
    <div class="nav-container">
        <button class="nav-button ${pageName === 'home' ? 'active' : ''}" onclick="location.href='influencer_home.html'">
            <i class="fas fa-home"></i> 홈
        </button>
        <button class="nav-button ${pageName === 'customizedContent' ? 'active' : ''}" onclick="location.href='customized_content.html'">
            <i class="fas fa-th"></i> 맞춤컨텐츠
        </button>
        <button class="nav-button ${pageName === 'messenger' ? 'active' : ''}" onclick="location.href='influencer_messenger.html'">
            <i class="fas fa-envelope"></i> 연락중인 메신저
        </button>
        <button class="nav-button ${pageName === 'myPage' ? 'active' : ''}" onclick="location.href='influencer_my_page.html'">
            <i class="fas fa-user"></i> 마이페이지
        </button>
        <button class="nav-button ${pageName === 'notifications' ? 'active' : ''}" onclick="location.href='influencer_notifications.html'">
            <i class="fas fa-bell"></i> 알림
        </button>
        <div class="nav-bottom-buttons">
            <button class="nav-button ${pageName === 'main' ? 'active' : ''}" onclick="location.href='index.html'">
                <i class="fas fa-globe"></i> 메인
            </button>
            <button class="nav-button logout" id="logoutButton">
                <i class="fas fa-sign-out-alt"></i> 로그아웃
            </button>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 로그아웃 버튼 클릭 이벤트 처리
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('email');  // 로컬 스토리지에서 email 삭제
        window.location.href = 'influencer_login.html';  // 로그인 페이지로 이동
    });
});
