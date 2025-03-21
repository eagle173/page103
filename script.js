document.getElementById('comboBox').addEventListener('change', function() {
    const additionalFields = document.getElementById('additionalFields');
    additionalFields.innerHTML = ''; // 기존 필드 초기화

    if (this.value === '영혼각차') {
        const fields = [
            '신청', '이름', '성별', '음력생일', '사주팔자', '한자주소', '피드백', '요구', '통령사지정'
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field + ':';
            const input = document.createElement('input');
            input.type = 'text';
            input.name = field;
            input.required = true;
            additionalFields.appendChild(label);
            additionalFields.appendChild(input);
            additionalFields.appendChild(document.createElement('br'));
            additionalFields.appendChild(document.createElement('br'));
        });
    }
});

document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const formData = new FormData(this);
    const emailContent = Array.from(formData.entries()).map(entry => `${entry[0]}: ${entry[1]}`).join('\n');

    console.log("Form Data:", Object.fromEntries(formData.entries())); // 폼 데이터 로그 출력
    console.log("Email Content:", emailContent); // 이메일 내용 로그 출력

    // 사용자에게 이메일 전송
    emailjs.send("service_5fe2i95", "template_q2w2mt8", {
        email: formData.get('email'), // 폼에서 입력된 이메일 주소
        name: "관리자", // 관리자의 이름
        subject: "양식 제출", // 이메일 제목
        message: emailContent // 폼 데이터 내용
    }).then(function(response) {
        console.log('사용자에게 이메일 전송 성공:', response);
    }, function(error) {
        console.error('사용자에게 이메일 전송 실패:', error);
    });

    // 관리자에게 이메일 전송
    emailjs.send("service_5fe2i95", "template_q2w2mt8", {
        email: "jazzgiant9@gmail.com", // 관리자의 이메일 주소
        name: formData.get('name'), // 폼에서 입력된 이름
        subject: "양식 제출", // 이메일 제목
        message: emailContent // 폼 데이터 내용
    }).then(function(response) {
        console.log('관리자에게 이메일 전송 성공:', response);
        alert('이메일이 성공적으로 전송되었습니다!');
    }, function(error) {
        console.error('관리자에게 이메일 전송 실패:', error);
        alert('이메일 전송에 실패했습니다.');
    });
});
