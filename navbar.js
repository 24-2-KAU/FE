document.addEventListener("DOMContentLoaded", function () {
    // 로그인 상태 확인
    const ad_id = localStorage.getItem("ad_id"); // 로컬 스토리지에서 ad_id 가져오기
    if (!ad_id) {
        alert("로그인이 필요합니다.");
        window.location.href = "advertiser_login.html"; // 로그인 페이지로 리디렉션
        return;
    }

    console.log("Logged in with ad_id:", ad_id); // 디버깅 용도

    // 현재 페이지 식별
    const pageName = document.body.dataset.page;

    // 네비게이션 HTML
    const navHTML = `
    <div class="nav-container">
        <button class="nav-button ${pageName === "home" ? "active" : ""}" onclick="location.href='advertiser_home.html'">
            <i class="fas fa-home"></i> 홈
        </button>
        <button class="nav-button ${pageName === "findInfluencers" ? "active" : ""}" onclick="location.href='find_influencers.html'">
            <i class="fas fa-search"></i> 인플루언서 찾기
        </button>
        <button class="nav-button ${pageName === "uploadProduct" ? "active" : ""}" onclick="location.href='upload_product.html'">
            <i class="fas fa-upload"></i> 상품 올리기
        </button>
        <button class="nav-button ${pageName === "messenger" ? "active" : ""}" onclick="location.href='messenger.html'">
            <i class="fas fa-envelope"></i> 연락중인 메신저
        </button>
        <button class="nav-button ${pageName === "myPage" ? "active" : ""}" onclick="location.href='my_page.html'">
            <i class="fas fa-user"></i> 마이페이지
        </button>
        <button class="nav-button ${pageName === "notifications" ? "active" : ""}" onclick="location.href='notifications.html'">
            <i class="fas fa-bell"></i> 알림
        </button>
        <button class="nav-button ${pageName === "influencerList" ? "active" : ""}" onclick="location.href='influencer_list.html'">
            <i class="fas fa-users"></i> 가입된 인플루언서 목록
        </button>
        <div class="nav-bottom-buttons">
            <button class="nav-button ${pageName === "main" ? "active" : ""}" onclick="location.href='index.html'">
                <i class="fas fa-globe"></i> 메인
            </button>
            <button class="nav-button logout" id="logoutButton">
                <i class="fas fa-sign-out-alt"></i> 로그아웃
            </button>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", navHTML);

    // 로그아웃 버튼 이벤트
    document.getElementById("logoutButton").addEventListener("click", () => {
        localStorage.removeItem("ad_id"); // 로컬 스토리지에서 광고주 ID 삭제
        window.location.href = "advertiser_login.html"; // 로그인 페이지로 이동
    });
});
