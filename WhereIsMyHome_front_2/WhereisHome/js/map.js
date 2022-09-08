var mapContainer = document.getElementById("map");
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
var options = {
  center: new kakao.maps.LatLng(37.5012743, 127.039585),
  level: 9,
};
var map = new kakao.maps.Map(mapContainer, options);

var positions = [
  {
    title: "역삼점",
    latlng: new kakao.maps.LatLng(37.500613, 127.036431),
  },

  {
    title: "구미사업장",
    latlng: new kakao.maps.LatLng(36.109553, 128.415011),
  },
  {
    title: "부산사업장점",
    latlng: new kakao.maps.LatLng(35.095765, 128.856344),
  },
];

let imageSize = new kakao.maps.Size(50, 54); // 마커이미지의 크기입니다
const imageSrc = "assets/img/my_position.png"; // 마커이미지의 주소입니다

positions.forEach((data) => {
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: data.latlng, // 마커를 표시할 위치
    title: data.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    image: markerImage, // 마커 이미지
  });

  var infowindow = new kakao.maps.InfoWindow({
    content: `<div class="card" style="width: 18rem;">
      <img src="assets/img/coco.jfif" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      </div>`,
    removable: true, // x 표시가 나면 꺼지게
  });

  kakao.maps.event.addListener(marker, "click", function () {
    infowindow.open(map, marker);
  });
});

function aptMap(datas) {
  // 장소 검색 객체를 생성합니다
  var ps = new kakao.maps.services.Places();

  // 키워드로 장소를 검색합니다

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  datas.forEach((data) => {
    ps.keywordSearch(data, placesSearchCB);
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();
        displayMarker(data[0]);
        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }
  });
}
// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
  // 마커를 생성하고 지도에 표시합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", function () {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent(
      `<div style="padding:5px;font-size:12px;"> <span>${place.place_name}  </div>`
    );
    infowindow.open(map, marker);
  });
}
