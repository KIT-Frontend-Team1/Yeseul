const musicListData = [
  {
    src: './assets/img/iu_0.jpg',
    color: ['#0272a4', '#f6a564'],
  },
  {
    src: './assets/img/iu_1.jpg',
    color: ['#b6bfc8', '#36595b'],
  },
  {
    src: './assets/img/iu_2.jpg',
    color: ['#e58e82', '#6f569f'],
  },
];
console.log(musicListData[0].color[0])
console.log(musicListData[0].color[1])
/*

문제1.
    디스크 문제 구현하기. 필요한 html, css, animation은 모두 구현하였으나
    혹 본인 재량하에 추가하고 싶은 css와 animation이 있으면 추가해두시면 됩니다.

    요구사항
    
        (1) 구현영상을 참고하여 구현영상과 같은 효과를 진행해보세요
        (2) play 버튼 클릭시에는 해당 이미지에 맞는 이미지가 배경화면으로 보이고 disk가 회전되어야합니다
        (3) stop 버튼을 누르면 배경화면이 사라지고 disk는 멈추어야합니다.
        (4) 앨범은 총 3개가 있으며 만약 진행 중 다른 앨범을 선택하고 play를 누르면 다른 앨범이 play 되어야합니다.
        (5) 앨범 리스트는 (next, prev) 버튼으로도 움직일 수 있으며 클릭으로도 원하는 앨범으로 이동할 수 있습니다.
        (6) 현재 선택된 앨범은 focus되어 크기가 커지는 효과를 추가해야합니다.
        (7) 저작권 상 음악은 넣지 못했지만 만약 넣고 싶다면 본인이 다운로드 하여 audio 태그를 활용하여 실행할 수 있습니다.
        (8) 이 외 다른 구현 사항은 영상을 참고하여 만들어보세요 :)

    주의사항

        단, 아래의 조건만 채운다면 반드시 똑같이 만들 필요는 없습니다.
        즉 애니메이션과 css를 구현 영상과 똑같이 하실 필요는 없으며, 이를 위해 html이나 css를 따로 건드셔도 괜찮습니다.
        해당 html과 css, animation은 제가 빠른 시일 내에 급히 작성한 것이기 때문에 이해가 조금 어려울 수 있습니다

        (1) 각 노래에 맞는 앨범 자켓 이미지로 배경이 바뀌어야함 
        (2) 각 노래에 맞는 색상으로 disk_inner와 stop 상태의 배경이 바뀌어야함
        (3) start 시에는 disk가 돌아가고 stop 시에는 disk가 멈춰야함
        (4) 선택된 앨범에는 하이라이트 효과가 있어야하며 클릭 및 버튼을 통해 선택이 가능함
*/

// 1. ul 안에 li 태그 > img 태그 만들고, src 속성으로 musicListData 배열의 src 값 가져오기
const $ul = document.querySelector('ul');

// musicListData 순회하여 li와 img 태그 동적 생성하기
const iuAlbum = musicListData.map(
  (album, i, arr) => `<li><img src="${arr[i].src}"/></li>`
).join('');

// ul 안에 innerHTML로 집어넣기
$ul.innerHTML = iuAlbum;

// 2. li click 할때마다 class 넣어주기
// .play { transform: scale(1.4); border: 3px solid #fff; }

const $li = document.querySelectorAll('li');
const $img = document.querySelectorAll('li > img');
const $main = document.querySelector('main');
const $diskInner = document.querySelector('.disk_inner');
const $playBtnGroup = document.querySelectorAll('.play_btn_group button');
const $disk = document.querySelector('.disk');
const $filter = document.querySelector('.filter');
let albumIndex = 0;

// 1. 앨범 이미지 바꾸는 메서드
const changeImg = (index) => {
  $img.forEach((e) => {
    e.classList.remove('play');
  });
  $img[index].classList.add('play')
}

// 2. 배경 컬러(그라디언트)와 disk 컬러 변경해주는 메서드
const ColorModeChange = (index) => {
  $main.style.background = `linear-gradient(120deg, ${musicListData[index].color[0]}, ${musicListData[index].color[1]})`
  $diskInner.style.backgroundColor = musicListData[index].color[0];
}

// 3. forEach 로 각 img 요소에 클릭 이벤트 등록
// 클릭 시 img 중 play 클래스가 있는 img에 클래스를 모두 제거한 후, 클릭한 img에만 play 클래스를 추가하는 코드
$img.forEach((album, i) => {
  album.addEventListener('click', () => {
    changeImg(i) // 앨범 이미지 바꾸기
    ColorModeChange(i) // 배경 그라디언트와 disk 컬러 변경
  })
  // 첫번째 앨범 고정시켜놓기, 초기에 0번 인덱스에 add classList 하는 코드
  if (i === 0) {
    album.classList.add('play');
  }
})

// 4. < > 버튼 클릭 구현
// 버그가 있다..! 두번째 앨범 클릭 후 > 누르면 세번째 앨범으로 이동할 때가 있다,
// 아마 클릭한 이미지가 0번 인덱스로 인식해서 마지막 img로 이동하는 것 같은데..
// 현재 보이는 이미지의 인덱스를 기준으로 수정해야한다!
// $img 클릭시 play 클래스를 포함하는 img 태그의 인덱스를 찾아 currentImgIndex로 설정한다
const $pageBtn = document.querySelectorAll('.list_btn_group > button');
$pageBtn[0].addEventListener('click', () => {
  const currentImgIndex = Array.from($img).findIndex(img => img.classList.contains('play'));
  if(currentImgIndex < 1) {
    albumIndex = $li.length - 1;
    // console.log(currentImgIndex) // 0
    changeImg(albumIndex)
    ColorModeChange(albumIndex)
  } else {
    albumIndex = currentImgIndex - 1;
    changeImg(albumIndex)
    ColorModeChange(albumIndex)
  }
})

$pageBtn[1].addEventListener('click', () => {
  const currentImgIndex = Array.from($img).findIndex(img => img.classList.contains('play'));
  if(currentImgIndex === $li.length - 1) {
    albumIndex = 0;
    changeImg(albumIndex);
    ColorModeChange(albumIndex);
  } else {
    albumIndex = currentImgIndex + 1;
    changeImg(albumIndex);
    ColorModeChange(albumIndex);
  }
})

// 5. play 누르면 bg로 앨범이미지 꽉채워서 위에서 아래로 내려오게 + 디스크 돌아가기
// const $playBtnGroup = document.querySelectorAll('.play_btn_group button');
// const $disk = document.querySelector('.disk');
// const $filter = document.querySelector('.filter');

const bgAlbum = (index) => {
  $filter.style.background = `url(${musicListData[index].src}) no-repeat center center/cover`;
  $filter.classList.add('upToDown')
}

const bgAlbumDelete = (index) => {
  $filter.style.background = 'none'; // 여기가 막히네 사라지게 하는 거 
  $filter.classList.add('downToUp')
}

$playBtnGroup.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    const currentImgIndex = Array.from($img).findIndex(img => img.classList.contains('play'));
    if(i === 0) { // play 버튼 눌렀을 때
      // 회전 속성 class(active) 넣기
      $disk.classList.add('active');
      bgAlbum(currentImgIndex)
    }
    // 5. stop 누르면 bg로 앨범이미지 아래에서 위로 사라짐 + 디스크 멈추기
    else { // play 버튼 눌렀을 때
      // 회전 속성 제거
      $disk.classList.remove('active');
      bgAlbumDelete(currentImgIndex) // 여기가 막혀요
    }
  })
})

// $playBtnGroup[0].addEventListener('click', (e) => {
//   $filter.style.background = `url(${musicListData[0].src}) no-repeat center center/cover`;
//   $filter.classList.add('upToDown')
// })
// $playBtnGroup[1].addEventListener('click', (e) => {
//   $filter.classList.add('downToUp')
// })


