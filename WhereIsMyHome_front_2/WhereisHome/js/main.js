// index page 로딩시 설문조사 실시여부 검사.
let storagePoll = localStorage.getItem("poll");
let pollContent;
if (storagePoll) {
  var poll = JSON.parse(storagePoll);
  var sdate = poll.sdate;
  var edate = poll.edate;
  var question = poll.question;
  var answers = poll.answers;
  pollContent = `
        <div class="text-center text-secondary mb-3"><h5>[ 투표해주세요 ]</h5></div>
        <div class="fw-bold text-info bg-light"><h6>${question}</h6></div>
        <div class="text-start p-3">
            <ul class="nav flex-column">
        `;
  answers.forEach(function (answer) {
    pollContent += `
              <li class="nav-item">
                  <label><input type="radio" name="poll-answer" value="${answer}" /> ${answer}</label>
              </li>
            `;
  });
  pollContent += `
            </ul>
        </div>
        <div class="text-end">
            <button class="btn btn-outline-primary btn-sm" id="btn-poll-action">투표하기</button>
            <button class="btn btn-outline-danger btn-sm" id="btn-poll-result">결과보기</button>
        </div>
        <div class="text-end text-secondary mt-1">투표기간 : ${sdate} ~ ${edate}</div>
        `;
  document.querySelector("#poll-area").innerHTML = pollContent;
  // 설문조사 투표하기!!!
  document.querySelector("#btn-poll-action").addEventListener("click", function () {
    let selItem = document.querySelector("input[name=poll-answer]:checked");
    if (selItem) alert(selItem.value + "을 선택했습니다.");
    else alert("답변항목 하나 이상을 선택해 주세요.");
  });
} else {
  pollContent = `<h3>진행중인 투표가 없습니다.</h3>`;
  document.querySelector("#poll-area").innerHTML = pollContent;
}

// 설문조사 모달창
// 설문조사 답변항목 추가.
document.querySelector("#btn-answer-add").addEventListener("click", function () {
  let answerListDiv = document.querySelector("#poll-answer-list");
  let answerItem = `
  <div class="row mb-1 poll-answer-list-item">
    <div class="col-md-10">
      <input type="text" class="form-control" name="answer">
    </div>
    <div class="col-md-2">
      <button type="button" class="btn btn-outline-danger btn-remove" onclick="javascript:removeAnswer(this);"><i class="bi bi-x-square-fill"></i> 삭제</button>
    </div>
  </div>`;
  answerListDiv.innerHTML = answerListDiv.innerHTML += answerItem;
});

// 설문조사 답변항목 삭제.
function removeAnswer(el) {
  let parentEl = el.parentNode.parentNode;
  document.querySelector("#poll-answer-list").removeChild(parentEl);
}

// 설문조사 생성.
document.querySelector("#btn-poll-create").addEventListener("click", function () {
  let sdate = document.querySelector("#start-date").value;
  let edate = document.querySelector("#end-date").value;
  if (!sdate || !edate) {
    alert("설문기간 입력!!!");
    return;
  }
  let question = document.querySelector("#question").value;
  if (!question) {
    alert("설문제목 입력!!");
    return;
  }
  let answerInputs = document.querySelectorAll("input[name=answer]");
  let isValid = true;
  answerInputs.forEach(function (answerInput) {
    if (!answerInput.value) {
      alert("답변항목 입력!!!");
      isValid = false;
      return false; //break;
      // return true; // continue;
    }
  });
  if (!isValid) return;
  let answers = [];
  answerInputs.forEach(function (answerInput) {
    answers.push(answerInput.value);
  });

  // let poll = {
  //   sdate: sdate,
  //   edate: edate,
  //   question: question,
  //   answers: answers
  // }
  // property shorthand(단축 속성명)
  let poll = {
    sdate,
    edate,
    question,
    answers,
  };

  localStorage.setItem("poll", JSON.stringify(poll));
  alert("설문조사 생성!!!");
  location.reload();
  document.querySelector("#pollModal").modal("hide");
});

// 지점 선택시 지도 이동.
let offices = document.querySelectorAll(".accordion-body");
offices.forEach(function (office) {
  office.addEventListener("click", function () {
    viewMarker(this);
  });
});

function viewMarker(office) {
  officeLatLng = officePosition[office.textContent];
  marker.setMap(null);
  myLatLng = new kakao.maps.LatLng(officeLatLng.lat, officeLatLng.lng);
  let message = `<div style="padding:5px;">${office.textContent}</div>`;
  const imageSrc = "../assets/img/my_position.png"; // 마커이미지의 주소입니다
  let imageSize = new kakao.maps.Size(50, 54); // 마커이미지의 크기입니다
  let imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  displayMarker(myLatLng, message, markerImage);
}


// 로그인
function login() {
  console.log("로그인 하러 들어옴!");
  // 사용자 정보를 입력받는다.
  var userEmail = prompt("이메일을 입력하세요", "ssafy@mail.com");
  if (userEmail.length == 0) {
    alert("아이디 입력!!!");
    return;
  }
  var userpass = prompt("비밀번호를 입력하세요", "1234");
  if (userpass.length == 0) {
    alert("비밀번호 입력!!!");
    return;
  }

  if (userEmail == "ssafy@mail.com" && userpass == "1234") {
    //alert("로그인 되었습니다");
    var html=`
        <div class="alert alert-primary" role="alert">
      A simple primary alert—check it out!
    </div>`;


    document.getElementById("header_nav_confirm_off").style.display = "none"; //로그인 없애기
    document.getElementById("header_nav_register").style.display = "none";    //회원가입 없애기

    document.getElementById("header_nav_confirm_on").style.display = "block"; //로그 아웃 추가
    document.getElementById("header_nav_update").style.display = "block";     //회원 정보 수정 추가
    document.getElementById("header_nav_delete").style.display = "block";     //회원 탈퇴 추가
    document.getElementById("header_nav_hello").style.display = "block";     //인사 추가
    


  } else {
    alert("아이디 혹은 비밀번호가 틀렸습니다");
  }
}

// 로그아웃
function logout() {

  document.getElementById("header_nav_confirm_off").style.display = "block"; //로그인 없애기
  document.getElementById("header_nav_register").style.display = "block";    //회원가입 없애기
  document.getElementById("header_nav_hello").style.display = "block";    //회원가입 없애기

  document.getElementById("header_nav_confirm_on").style.display = "none"; //로그 아웃 추가
  document.getElementById("header_nav_update").style.display = "none";     //회원 정보 수정 추가
  document.getElementById("header_nav_delete").style.display = "none";     //회원 탈퇴 추가
  document.getElementById("header_nav_hello").style.display = "none";     //회원 탈퇴 추가
}

function deleteUser() {

  var userMsg = prompt("회원을 탈퇴하고 싶다면 아래 글자를 입력하세요", "회원 탈퇴 하겠습니다.");
    document.getElementById("header_nav_confirm_off").style.display = "block"; //로그인 없애기
    document.getElementById("header_nav_register").style.display = "block";    //회원가입 없애기
    document.getElementById("header_nav_hello").style.display = "block";    //회원가입 없애기
  
    document.getElementById("header_nav_confirm_on").style.display = "none"; //로그 아웃 추가
    document.getElementById("header_nav_update").style.display = "none";     //회원 정보 수정 추가
    document.getElementById("header_nav_delete").style.display = "none";     //회원 탈퇴 추가
    document.getElementById("header_nav_hello").style.display = "none"; 
    alert("회원 탈퇴가 완료되었습니다");
    return ;
    }



