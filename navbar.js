document.addEventListener("DOMContentLoaded", function () {
    const pageName = document.body.dataset.page; // 현재 페이지를 식별하기 위해 body의 data-page 속성 사용

    // 로그인 상태 확인
    const ad_id = localStorage.getItem("ad_id"); // 로컬 스토리지에서 ad_id 가져오기
    if (!ad_id) {
        alert("로그인이 필요합니다.");
        window.location.href = "advertiser_login.html"; // 로그인 페이지로 리디렉션
        return;
    }

    console.log("Logged in with ad_id:", ad_id); // 디버깅 용도


    // 네비게이션 HTML
    const navHTML = `
    <div class="nav-container">
        <button class="nav-button ${pageName === "home" ? "active" : ""}" onclick="location.href='advertiser_home.html'">
            <i class="fas fa-home"></i> 홈
            <span id="messengerAlert" class="red-dot" style="display: none;"></span>
        </button>
        <button class="nav-button ${pageName === "findInfluencers" ? "active" : ""}" onclick="location.href='find_influencers.html'">
            <i class="fas fa-search"></i> 인플루언서 찾기
            <span id="messengerAlert" class="red-dot" style="display: none;"></span>
        </button>
        <button class="nav-button ${pageName === "uploadProduct" ? "active" : ""}" onclick="location.href='upload_product.html'">
            <i class="fas fa-upload"></i> 상품 올리기
            <span id="messengerAlert" class="red-dot" style="display: none;"></span>
        </button>
        <button id="messengerButton" class="nav-button ${pageName === "messenger" ? "active" : ""}" onclick="location.href='messenger.html'">
            <i class="fas fa-envelope"></i> 연락중인 메신저
            <span id="messengerAlert" class="red-dot" style="display: none;"></span>
        </button>
        <button class="nav-button ${pageName === "myPage" ? "active" : ""}" onclick="location.href='my_page.html'">
            <i class="fas fa-user"></i> 마이페이지
            <span id="messengerAlert" class="red-dot" style="display: none;"></span>
        </button>
        <div class="nav-bottom-buttons">
            <button class="nav-button ${pageName === "main" ? "active" : ""}" onclick="location.href='index.html'">
                <i class="fas fa-globe"></i> 메인
                <span id="messengerAlert" class="red-dot" style="display: none;"></span>
            </button>
            <button class="nav-button logout" id="logoutButton">
                <i class="fas fa-sign-out-alt"></i> 로그아웃
            </button>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 빨간 점 상태 플래그 확인 및 설정
    if (localStorage.getItem('hasUnreadMessages') === 'true') {
        showMessengerAlert();
    }

    // 로그아웃 버튼 클릭 이벤트 처리
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('ad_id');  // 로컬 스토리지에서 email 삭제
        localStorage.removeItem('hasUnreadMessages'); // 플래그 삭제
        window.location.href = 'index.html';  // 로그인 페이지로 이동
    });

    // 소켓 부분
    const socket = io('http://localhost:4000', {
        withCredentials: true,
    });
    // 사용자가 로그인한 순간부터 알림 서버에 등록
    if (ad_id) {
        socket.emit('registerUser', ad_id);
    }

    // 서버에서 빨간 점 표시 업데이트 요청 수신
    socket.on('showMessengerAlert', () => {
        localStorage.setItem('hasUnreadMessages', 'true'); // 플래그 설정
        showMessengerAlert();
    });

    document.getElementById('messengerButton').addEventListener('click', () => {
        console.log("메신저 확인: 서버에 메시지 상태 확인 요청");
    
        // 서버에 메시지 확인 상태 요청
        socket.emit('messageRead', { chatRoomId: currentChatRoomId, receiverId: ad_id }, (response) => {
            if (response.hasUnreadMessages) {
                console.log("메시지 확인되지 않음: 빨간 점 유지");
                localStorage.setItem('hasUnreadMessages', 'true');
                showMessengerAlert();
            } else {
                console.log("모든 메시지 확인됨: 빨간 점 숨김");
                const messengerAlert = document.getElementById("messengerAlert");
                if (messengerAlert) messengerAlert.style.display = "none";
                localStorage.setItem('hasUnreadMessages', 'false');
            }
        });
    });
    
});

function showMessengerAlert() {
    const messengerAlert = document.getElementById("messengerAlert");
    if (messengerAlert) {
        console.log("알림 표시: 빨간 점 활성화");
        messengerAlert.style.display = "block"; // 빨간 점 표시
    }
}