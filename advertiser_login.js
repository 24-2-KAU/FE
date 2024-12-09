document.addEventListener("DOMContentLoaded", function () {
    localStorage.removeItem('email');
});

document.getElementById('loginButton').addEventListener('click', loginHandler);

document.getElementById('registerButton').addEventListener('click', function () {
    window.location.href = 'advertiser_register.html';
});

document.getElementById('forgotPassword').addEventListener('click', function () {
    window.location.href = 'forgot_password.html';
});

// ID 입력 후 엔터 → 비밀번호로 이동
document.getElementById('ad_id').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('password').focus();
    }
});

// 비밀번호 입력 후 엔터 → 로그인
document.getElementById('password').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        loginHandler();
    }
});

// 로그인 함수
async function loginHandler() {
    const ad_id = document.getElementById('ad_id').value;
    const password = document.getElementById('password').value;

    if (!ad_id || !password) {
        alert('아이디와 비밀번호를 입력해주세요.');
        return;
    }

    try {
        const response = await fetch(`${window.config.apiURL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ad_id, password }),
        });

        const data = await response.json();
        if (response.ok && data.message === 'Login success!') {
            localStorage.setItem('ad_id', data.ad_id);
            alert('로그인 성공! 광고주 홈으로 이동합니다.');
            window.location.href = 'advertiser_home.html';
        } else {
            alert('로그인 실패: ' + data.message);
        }
    } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
}
