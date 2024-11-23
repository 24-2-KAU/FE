// 필드 리스트
const fields = [
    "username",
    "phone",
    "email",
    "password",
    "confirmPassword",
    "company_id",
    "company_name",
    "profile_picture",
];

// 회원가입 버튼 클릭 이벤트
document.getElementById("registerButton").addEventListener("click", registerHandler);

// 회원가입 처리 함수
async function registerHandler() {
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const company_id = document.getElementById("company_id").value || "";
    const company_name = document.getElementById("company_name").value || "";
    const profile_picture = document.getElementById("profile_picture").value || "";

    // 필수 입력값 체크
    if (!username || !phone || !email || !password || !confirmPassword) {
        alert("필수 필드를 입력해주세요.");
        return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    try {
        const response = await fetch(`${window.config.apiURL}/api/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ad_id: username,
                phone,
                email,
                password,
                company_id,
                company_name,
                profile_picture,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.message === "Signup successful") {
                alert("회원가입 성공. 로그인 페이지로 이동합니다...");
                window.location.href = "advertiser_login.html";
            } else {
                alert("회원가입 실패: " + data.message);
            }
        } else {
            alert("회원가입 실패: " + (data.message || "알 수 없는 오류"));
        }
    } catch (error) {
        console.error("오류:", error);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
}

// 엔터키로 필드 이동 처리
fields.forEach((fieldId, index) => {
    const field = document.getElementById(fieldId);
    field.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            // 다음 필드로 포커스 이동
            if (index + 1 < fields.length) {
                document.getElementById(fields[index + 1]).focus();
            } else {
                // 마지막 필드에서는 회원가입 버튼 클릭
                registerHandler();
            }
        }
    });
});
