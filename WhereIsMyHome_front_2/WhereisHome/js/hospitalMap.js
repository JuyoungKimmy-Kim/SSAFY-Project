var map;

//  카카오 지도 설정.
var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.5012743, 127.039585), //지도의 중심좌표. (멀티캠퍼스)
  level: 3, //지도의 레벨(확대, 축소 정도)
};

map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 마커가 표시될 위치입니다
var markerPosition = new kakao.maps.LatLng(37.5012743, 127.039585);

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
  position: markerPosition,
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

var iwContent =
    '<div style="padding:5px;">멀티캠퍼스 <br><a href="https://map.kakao.com/link/map/멀티캠퍼스,37.5012743, 127.039585" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/멀티캠퍼스,37.5012743, 127.039585" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
  iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
  position: iwPosition,
  content: iwContent,
});

// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
infowindow.open(map, marker);

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다
if (navigator.geolocation) {
  // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude, // 위도
      lon = position.coords.longitude; // 경도

    var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

    // 마커와 인포윈도우를 표시합니다
    displayMarker(locPosition, message);
  });
} else {
  // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

  var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
    message = "geolocation을 사용할수 없어요..";

  displayMarker(locPosition, message);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  var iwContent = message, // 인포윈도우에 표시할 내용
    iwRemoveable = true;

  // 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });

  // 인포윈도우를 마커위에 표시합니다
  infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}

document.querySelector("#btn-list").addEventListener("click", function () {
  var serviceKey =
    "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
  var pageNo = "1";
  var numOfRows = "30";
  // server에서 넘어온 data
  const url =
    "http://apis.data.go.kr/B551182/rprtHospService/getRprtHospService";
  let params =
    "serviceKey=" +
    serviceKey +
    "&pageNo=" +
    pageNo +
    "&numOfRows=" +
    numOfRows;
  fetch(`${url}?${params}`)
    .then((response) => response.text())
    .then((data) => {
      let parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      makeMarker(xml);
      makeList(xml);
    });
});

function makeMarker(xml) {
  let positions = [];
  let items = xml.getElementsByTagName("item");
  for (let item of items) {
    positions.push({
      title: `${item.getElementsByTagName("yadmNm")[0].textContent}`,
      content: `<div class="info">${
        item.getElementsByTagName("yadmNm")[0].textContent
      }</div>`,
      latlng: new kakao.maps.LatLng(
        `${item.getElementsByTagName("YPosWgs84")[0].textContent}`,
        `${item.getElementsByTagName("XPosWgs84")[0].textContent}`
      ),
    });
  }

  // 마커 이미지의 이미지 주소입니다
  var imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  for (var i = 0; i < positions.length; i++) {
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[i].latlng, // 마커를 표시할 위치
      title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage, // 마커 이미지
    });

    // 마커에 표시할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: positions[i].content, // 인포윈도우에 표시할 내용
    });

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(
      marker,
      "mouseover",
      makeOverListener(map, marker, infowindow)
    );
    kakao.maps.event.addListener(
      marker,
      "mouseout",
      makeOutListener(infowindow)
    );

    // 마커에 click 이벤트를 등록합니다
    kakao.maps.event.addListener(
      marker,
      "click",
      makeClickListener(map, marker, infowindow)
    );
  }

  //  지도의 중심을 첫번째 요양병원으로 이동.
  // 이동할 위도 경도 위치를 생성합니다
  var moveLatLon = new kakao.maps.LatLng(
    positions[0].latlng.Ma,
    positions[0].latlng.La
  );

  // 지도의 레벨 변경.
  map.setLevel(6);
  // 지도 중심을 이동 시킵니다
  map.setCenter(moveLatLon);
}

function makeClickListener(map, marker, infowindow) {
  return function () {
    var pos = marker.getPosition();
    console.log(pos);
    map.setLevel(5);
    map.panTo(pos);
  };
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
  return function () {
    infowindow.open(map, marker);
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
  return function () {
    infowindow.close();
  };
}

function makeList(xml) {
  let hospitalList = ``;
  let items = xml.getElementsByTagName("item");
  for (let item of items) {
    hospitalList += `
        <tr>
        	<td>${item.getElementsByTagName("yadmNm")[0].textContent}</td>
        	<td>${item.getElementsByTagName("telno")[0].textContent}</td>
        	<td>${item.getElementsByTagName("addr")[0].textContent}</td>
        	<td>${item.getElementsByTagName("pcrPsblYn")[0].textContent}</td>
        	<td>${item.getElementsByTagName("YPosWgs84")[0].textContent}</td>
        	<td>${item.getElementsByTagName("XPosWgs84")[0].textContent}</td>
        </tr>`;
  }
  let info = document.querySelector("#hospitalInfo");
  info.innerHTML = info.innerHTML += hospitalList;
}
