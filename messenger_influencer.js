// Socket.IO 클라이언트 연결
const socket = io('http://localhost:3000'); // 서버 주소로 변경

// 현재 로그인된 사용자 ID 가져오기
const currentUserId = localStorage.getItem('email');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded - Starting to register user with ID:', currentUserId);
    loadFriends();

    const chatMessagesContainer = document.getElementById('chatMessages');
    if (!chatMessagesContainer) {
        console.error('chatMessagesContainer가 DOM에 없습니다.');
    }

    if (chatRoomId) {
        loadMessageHistory(chatRoomId);
    } else {
        alert('채팅방 ID가 누락되었습니다.');
    }
});

// 메시지 입력 이벤트
document.getElementById('messageInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    } else {
        socket.emit('typing', { chatRoomId, senderId: currentUserId });
    }
});

// 메시지 전송
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (!message) {
        alert('메시지를 입력하세요!');
        return;
    }

    const messageData = {
        chatRoomId: chatRoomId,
        senderId: currentUserId,
        receiverId: receiverId,
        content: message,
        sentAt: new Date().toISOString()
    };

    socket.emit('sendMessage', messageData, (response) => {
        if (response.error) {
            console.error('Message send failed:', response.error);
            alert('메시지 전송에 실패했습니다.');
        } else {
            console.log('Message sent successfully:', response);
            appendMessage(messageData, true); // UI 업데이트
        }
    });

    messageInput.value = ''; // 입력창 초기화
}

socket.on('receiveMessage', (messageData) => {
    console.log('messenger_advertiser - 메시지 수신:', messageData);
    const isCurrentUser = messageData.senderId === currentUserId;
    appendMessage(messageData, isCurrentUser); // UI 업데이트
});

// 사용자 입력 표시 (Typing Indicator)
socket.on('typing', ({ senderId }) => {
    if (senderId !== currentUserId) {
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.innerText = `${senderId} is typing...`;
        clearTimeout(typingIndicator.timer); // 기존 타이머 제거
        typingIndicator.timer = setTimeout(() => {
            typingIndicator.innerText = '';
        }, 2000); // 2초 후 표시 제거
    }
});


socket.on('registerUser', (userId, callback) => {
    console.log(`registerUser event received for userId: ${userId}`);
    userSockets.set(userId, socket.id);
    console.log('Current userSockets map:', Array.from(userSockets.entries())); // 현재 등록된 사용자 목록
    if (callback) callback(); // 클라이언트에 등록 성공 알림
});

// 친구목록 불러오기
async function loadFriends() {
    console.log("@@@@@@@@@@@@@@@@" + currentUserId);
    try {
        const response = await fetch(`http://localhost:3000/api/friends`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'userId': currentUserId })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log('API Response:', data.friends); // 응답 데이터 확인
        displayFriends(data.friends);
    } catch (error) {
        console.error('친구 목록 불러오기 오류:', error);
    }
}

// 친구 목록 표시하기
function displayFriends(friends) {
    const friendsContainer = document.getElementById('friendsList');
    friendsContainer.innerHTML = ''; // 기존 리스트 초기화

    if (friends.length === 0) {
        friendsContainer.innerHTML = '<p>표시할 친구가 없습니다.</p>';
        return;
    }

    friends.forEach(friend => {
        const friendElement = document.createElement('li');

        // 친구 이름 및 friend_id 표시
        friendElement.textContent = `${friend.friend_id}`;

        // 클릭 시 friend_id와 함께 작업
        friendElement.onclick = () => {
            alert(`친구 ${friend.friend_id}와의 채팅을 시작합니다.`);
            receiverId = friend.friend_id;
            chatRoomId = `${friend.friend_id}_${currentUserId}`;
            socket.emit('joinRoom', chatRoomId);
            console.log(`chatRoomId: ${chatRoomId}`);
            selectChatRoom(chatRoomId);
        };

        friendsContainer.appendChild(friendElement);
    });
}

// 친구목록에서 친구를 선택하면 -> 즉, 채팅방을 선택하면 메세지히스토리 함수로 이동
async function selectChatRoom(chatRoomId) {
    console.log('Selected Chat Room ID:', chatRoomId); // 선택된 chatRoom_id 확인 로그
    await loadMessageHistory(chatRoomId);
}

// 메세지 히스토리 로드
async function loadMessageHistory(chatRoomId) {
    try {
        const response = await fetch(`${window.config.apiURL}/room/${chatRoomId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Message History:', data);

        const chatMessagesContainer = document.getElementById('chatMessages');
        chatMessagesContainer.innerHTML = ''; // 기존 메시지 제거

        data.messages.forEach((message) => {
            const isCurrentUser = message.senderId === currentUserId; // 송신자 여부 확인
            appendMessage(message, isCurrentUser);
        });

        scrollToBottom(chatMessagesContainer);
    } catch (error) {
        console.error('Error loading message history:', error.message || error);
    }
}

// ui에 메세지 추가하기
function appendMessage(messageData, isCurrentUser = false) {
    const chatMessagesContainer = document.getElementById('chatMessages');

    if (!chatMessagesContainer) {
        console.error('chatMessagesContainer 요소를 찾을 수 없습니다.');
        return;
    }

    // 현재 사용자가 송신자인지 확인
    const isSender = messageData.senderId === currentUserId;

    const messageElement = document.createElement('div');
    messageElement.id = `message-${messageData.msg_id}`; // 메시지 ID 추가
    messageElement.className = isSender ? 'sent' : 'received'; // 송신자/수신자에 따라 클래스 설정

    let statusHTML = '';


    messageElement.innerHTML = `
        <span class="message-sender">${isSender ? '나' : messageData.senderId}</span>
        <span class="message-content">${messageData.content}</span>
        <span class="message-timestamp">${formatTimestamp(messageData.sentAt)}</span>
        ${statusHTML}
    `;

    chatMessagesContainer.appendChild(messageElement);
    scrollToBottom(chatMessagesContainer);
}

// 스크롤 아래로 내리기
function scrollToBottom(container) {
    if (container) {
        container.scrollTop = container.scrollHeight;
    } else {
        console.error('스크롤 컨테이너를 찾을 수 없습니다.');
    }
}

// 타임스탬프 포맷팅
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${date.toDateString()}`;
}

// 입력 중 표시 (Typing Indicator 요소 추가)
const typingIndicator = document.createElement('div');
typingIndicator.id = 'typingIndicator';
typingIndicator.className = 'typing-indicator';
document.getElementById('chatMessages').appendChild(typingIndicator);



