import mockPost from './mock.json' assert { type: 'json' };
console.log(mockPost);

const $postDetail = document.querySelector('#post-detail');
const $repliesList = document.querySelector('#replies-list');

/* 
    import(참조)한 json data를
    게시글 상세와 댓글창에 나타내고 게시글 객체의 상세 내용은 console.log로 출력해두었습니다

    댓글 추가 버튼을 누르면 댓글이 추가되도록 해보세요 :)

    삭제 및 수정기능은 본인의 자유로 구현하시면 됩니다 :)
*/

// 1. post-detail innerHTML에 게시글 제목, 컨텐트, 유저 표시하기
const mockContent = Object.keys(mockPost.post);
// console.log(mockContent)
// console.log(mockContent[0])

$postDetail.innerHTML = `
<div>${mockContent[0]} : ${mockPost.post.title}</div>
<div>${mockContent[1]} : ${mockPost.post.content}</div>
<div>${mockContent[2]} : ${mockPost.post.User.nickName}</div>
`

// 댓글 리스트 가져오기

// console.log(mockPost.post.Replies)
// console.log(replies[0].User.nickName) // 박메론
// console.log(replies[0].content) // 예시용 댓글입니다

const replies = mockPost.post.Replies;

const repliesLi = replies.map((v, i, arr) => `<li>${arr[i].User.nickName} : ${arr[i].content}</li>`).join('');
$repliesList.innerHTML = repliesLi;


// button 클릭 이벤트 -> li 추가하고 -> input.value이 들어감
// 공백일 경우 return

const $button = document.querySelector('button');
const $input = document.querySelector('input');
const $li = document.querySelector('li');


$button.addEventListener('click', () => {
    const inputValue = $input.value;
    if($input.value.length === 0) return;
    // const $li = document.createElement('li');
    // $li.innerHTML = $input.value;
    // $repliesList.appendChild($li);
    $repliesList.innerHTML += `
    <li>${inputValue}
    <button id="update">수정</button>
    <button class="delete">삭제</button>
    </li>
    `

    // 수정 버튼
    const $update = document.getElementById('update')
    $update.addEventListener('click', (e) => {
        // console.log($update.parentElement)
        // console.log(e.target.parentElement)
        e.target.parentElement.innerHTML = `<input id="checkInput"/>
        <button id="check">확인</button>`;

        const $check = document.getElementById('check')
        const $checkInput = document.getElementById('checkInput')
        $check.addEventListener('click', (e) => {
            // console.log($check)
            // console.log($checkInput.value)
            e.target.parentElement.innerHTML = `
            <li>${$checkInput.value}
            <button id="update">수정</button>
            <button class="delete">삭제</button>
            </li>`;
            $update.addEventListener('click', (e) => {
                // console.log($update)
                console.log(e.target.parentElement)
                e.target.parentElement.innerHTML = `<input id="checkInput"/>
                <button id="check">확인</button>`;
            })
            const $delete = document.querySelectorAll('.delete')
            $delete.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    console.log(e.target.parentElement)
                    e.target.parentElement.remove();
                })
            })
        })
    })
    const $delete = document.querySelectorAll('.delete')
    $delete.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            console.log(e.target.parentElement)
            e.target.parentElement.remove();
        })
    })
})


// 중복 되는 것 함수 기능으로 만들기
// 수정 > 확인 후 수정 기능 만들 것
// 수정 > 확인 후 삭제시 li marker가 삭제되지 않는다