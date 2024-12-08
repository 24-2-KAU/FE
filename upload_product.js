document.getElementById('product_pic').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const imagePreview = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result; // 선택한 이미지의 데이터 URL
            imagePreview.style.display = 'block'; // 이미지 미리보기 표시
        }
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none'; // 파일 선택이 없으면 미리보기 숨김
    }
});

document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    const file = formData.get('product_pic')

    if(!file || !(file instanceof File)){
      alert("이미지를 선택하세요");
      return;
    }
    
    let Url;

    try {
      const lambdaResponse = await fetch('https://t6hh2eryfxwh3namlj4qie3osu0elpbo.lambda-url.ap-northeast-2.on.aws/',{
        method:'POST',
        body: file,
        headers: {
          'content-type': file.type,
        },
      });

      lambdares = await lambdaResponse.json();
      const {fileUrl} = lambdares;

      if (!fileUrl) {
        console.log('error: ',error);
        throw new Error( `${error}}`);
      }
      Url=fileUrl;
    }catch(Error){
      console.log('람다에서 에러 발생',Error);
      alert('사진 저장에 문제 발생');
    }

    /*
    const encodeImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const result = reader.result;
                if (result && result.startsWith("data:image/")) {
                    resolve(result); // 이미지 전체 Base64 문자열 포함
                } else {
                    reject("이미지 인코딩 실패: Base64 데이터가 유효하지 않습니다.");
                }
            };
            reader.onerror = (error) => {
                console.error('이미지 인코딩 에러:', error);
                reject(error);
            };
        });
    };
    */
    
    for (const [key, value] of formData.entries()) {
        if (key === 'product_pic') {          
          data.product_pic = Url; // 전체 Base64 데이터 추가
          console.log(data.product_pic);
        }
        else {
            data[key] = value;
        }
    }
    
    const ad_id = localStorage.getItem('ad_id');
    if (ad_id) {
        data.ad_id = ad_id;
    } else {
        alert('로그인이 필요합니다. 광고주 ID를 찾을 수 없습니다.');
        return;
    } 
    
    try {
        const response = await fetch(`${window.config.apiURL}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        document.getElementById('message').textContent = result.message;
    } catch (error) {
        document.getElementById('message').textContent = error.message;
    }
});
