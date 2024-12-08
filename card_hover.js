// 페이지 내 모든 카드 요소를 선택하여 비디오 재생 및 정지 이벤트 처리
const cards = document.querySelectorAll('.card'); // 모든 카드 요소 선택
cards.forEach(card => {
    const video = card.querySelector('.card-video'); // 각 카드 내의 비디오 요소 선택

    // "소리 켜기" 버튼 생성
    const unmuteButton = document.createElement('button');
    unmuteButton.innerText = '소리 켜기';
    unmuteButton.style.position = 'absolute';
    unmuteButton.style.bottom = '10px';
    unmuteButton.style.right = '10px';
    unmuteButton.style.zIndex = '10';
    unmuteButton.style.backgroundColor = '#fff';
    unmuteButton.style.color = '#333';
    unmuteButton.style.padding = '5px 10px';
    unmuteButton.style.border = 'none';
    unmuteButton.style.borderRadius = '5px';
    unmuteButton.style.cursor = 'pointer';
    unmuteButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    unmuteButton.style.display = 'none'; // 초기 상태에서 버튼 숨김

    // 카드 마우스 오버 시 비디오 재생
    card.addEventListener('mouseenter', () => {
        video.style.display = 'block'; // 비디오 요소를 보이게 설정
        video.muted = true; // 기본 음소거 상태로 재생
        video.play(); // 비디오 재생 시작
        unmuteButton.style.display = 'block'; // 버튼 표시
    });

    // 카드 마우스 떠날 시 비디오 정지
    card.addEventListener('mouseleave', () => {
        video.pause(); // 비디오 일시정지
        video.currentTime = 0; // 비디오 재생 위치를 처음으로 돌림
        video.style.display = 'none'; // 비디오 요소를 다시 숨김
        unmuteButton.style.display = 'none'; // 버튼 숨김
    });

    // "소리 켜기" 버튼 클릭 시 음소거 해제 및 이벤트 전파 차단
    unmuteButton.addEventListener('click', (event) => {
        event.stopPropagation(); // 이벤트 전파 차단
        video.muted = false; // 비디오 음소거 해제
        unmuteButton.style.display = 'none'; // 버튼 숨김
    });

    // 버튼을 카드에 추가
    card.appendChild(unmuteButton);
});

// 페이지 내 각 카드 클릭 시 이동 이벤트 처리
document.getElementById('advertiserCard').addEventListener('click', function () {
    window.location.href = 'advertiser_login.html'; // 광고주 로그인 페이지로 이동
});

document.getElementById('influencerCard').addEventListener('click', function () {
    window.location.href = 'influencer_login.html'; // 인플루언서 로그인 페이지로 이동
});

document.getElementById('userCard').addEventListener('click', function () {
    // 일반 사용자 로그인 페이지로 이동 (원하는 URL로 대체 가능)
    alert('일반 사용자 페이지로 이동하는 기능을 추가해주세요.');
});
