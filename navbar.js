document.addEventListener("DOMContentLoaded", function () {
    const pageName = document.body.dataset.page; // 현재 페이지를 식별하기 위해 body의 data-page 속성 사용

    const navHTML = `
    <div class="nav-container" style="
        width: 250px;
        background-color: #242526;
        color: #fff;
        display: flex;
        flex-direction: column;
        padding: 10px 0;
        box-sizing: border-box;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
    ">
        <button class="nav-button ${pageName === 'home' ? 'active' : ''}" onclick="location.href='advertiser_home.html'" style="
            width: 100%;
            background: none;
            border: none;
            color: ${pageName === 'home' ? '#fff' : '#fff'};
            padding: 15px 20px;
            text-align: left;
            font-size: 1em;
            cursor: pointer;
            transition: background 0.3s, color 0.3s;
            display: flex;
            align-items: center;
            background-color: ${pageName === 'home' ? '#49e274' : 'transparent'};
        ">홈</button>
        <button class="nav-button ${pageName === 'findInfluencers' ? 'active' : ''}" onclick="location.href='find_influencers.html'" style="
            width: 100%;
            background: none;
            border: none;
            color: ${pageName === 'findInfluencers' ? '#fff' : '#fff'};
            padding: 15px 20px;
            text-align: left;
            font-size: 1em;
            cursor: pointer;
            transition: background 0.3s, color 0.3s;
            display: flex;
            align-items: center;
            background-color: ${pageName === 'findInfluencers' ? '#49e274' : 'transparent'};
        ">인플루언서 찾기</button>
        <button class="nav-button ${pageName === 'uploadProduct' ? 'active' : ''}" onclick="location.href='upload_product.html'" style="
            width: 100%;
            background: none;
            border: none;
            color: ${pageName === 'uploadProduct' ? '#fff' : '#fff'};
            padding: 15px 20px;
            text-align: left;
            font-size: 1em;
            cursor: pointer;
            transition: background 0.3s, color 0.3s;
            display: flex;
            align-items: center;
            background-color: ${pageName === 'uploadProduct' ? '#49e274' : 'transparent'};
        ">상품올리기</button>
        <button class="nav-button ${pageName === 'messenger' ? 'active' : ''}" onclick="location.href='messenger.html'" style="
            width: 100%;
            background: none;
            border: none;
            color: ${pageName === 'messenger' ? '#fff' : '#fff'};
            padding: 15px 20px;
            text-align: left;
            font-size: 1em;
            cursor: pointer;
            transition: background 0.3s, color 0.3s;
            display: flex;
            align-items: center;
            background-color: ${pageName === 'messenger' ? '#49e274' : 'transparent'};
        ">연락중인 메신저</button>
        <button class="nav-button ${pageName === 'myPage' ? 'active' : ''}" onclick="location.href='my_page.html'" style="
            width: 100%;
            background: none;
            border: none;
            color: ${pageName === 'myPage' ? '#fff' : '#fff'};
            padding: 15px 20px;
            text-align: left;
            font-size: 1em;
            cursor: pointer;
            transition: background 0.3s, color 0.3s;
            display: flex;
            align-items: center;
            background-color: ${pageName === 'myPage' ? '#49e274' : 'transparent'};
        ">마이페이지</button>
        <button class="nav-button ${pageName === 'notifications' ? 'active' : ''}" onclick="location.href='notifications.html'" style="
            width: 100%;
            background: none;
            border: none;
            color: ${pageName === 'notifications' ? '#fff' : '#fff'};
            padding: 15px 20px;
            text-align: left;
            font-size: 1em;
            cursor: pointer;
            transition: background 0.3s, color 0.3s;
            display: flex;
            align-items: center;
            background-color: ${pageName === 'notifications' ? '#49e274' : 'transparent'};
        ">알림</button>
        <button class="nav-button ${pageName === 'influencerList' ? 'active' : ''}" onclick="location.href='influencer_list.html'" style="
            width: 100%;
            background: none;
            border: none;
            color: ${pageName === 'influencerList' ? '#fff' : '#fff'};
            padding: 15px 20px;
            text-align: left;
            font-size: 1em;
            cursor: pointer;
            transition: background 0.3s, color 0.3s;
            display: flex;
            align-items: center;
            background-color: ${pageName === 'influencerList' ? '#49e274' : 'transparent'};
        ">가입된 인플루언서 목록</button>
    </div>`;
    document.body.insertAdjacentHTML('afterbegin', navHTML);
});
