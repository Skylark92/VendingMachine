const 상품 = [
    {
        No: 0,
        이름: "Original_Cola",
        가격: 1000,
        사진: "img/Original_Cola.png",
        재고: 5,
        개수: 0,
    },
    {
        No: 1,
        이름: "Violet_Cola",
        가격: 1000,
        사진: "img/Violet_Cola.png",
        재고: 5,
        개수: 0,
    },
    {
        No: 2,
        이름: "Yellow_Cola",
        가격: 1000,
        사진: "img/Yellow_Cola.png",
        재고: 5,
        개수: 0,
    },
    {
        No: 3,
        이름: "Cool_Cola",
        가격: 1000,
        사진: "img/Cool_Cola.png",
        재고: 5,
        개수: 0,
    },
    {
        No: 4,
        이름: "Green_Cola",
        가격: 1000,
        사진: "img/Green_Cola.png",
        재고: 5,
        개수: 0,
    },
    {
        No: 5,
        이름: "Orange_Cola",
        가격: 1000,
        사진: "img/Orange_Cola.png",
        재고: 10,
        개수: 0,
    },
];

// 메인 노드
const main = document.querySelector("main");

// 소지금 노드
const 소지금 = main.querySelector("#assets");

// 숫자 컴마 추가
function 컴마(money) {
    money = "" + money;
    for (i = money.length - 3; i > 0; i -= 3) {
        money = money.slice(0, i) + "," + money.slice(i);
    }
    return money;
}

// 소지금 입력
소지금.onclick = () => {
    let money = NaN;
    while (isNaN(money)) {
        money = +prompt("돈이 얼마나 있습니까?");
    }
    소지금.textContent = 컴마(money) + "원";
};

function 숫자변환(string) {
    return +String(string).replace(/[^0-9]/gm, "");
}

const 잔액 = main.querySelector("#remains");

const 입금액입력 = main.querySelector(".input-money");

const 입금버튼 = main.querySelector(".input");

// 입금 버튼
입금버튼.onclick = () => {
    let 가진돈 = 숫자변환(소지금.textContent);
    let 넣은돈 = 숫자변환(잔액.textContent);
    if (입금액입력.value <= 0) {
        alert("입금할 금액을 입력해주세요.");
        입금액입력.value = "";
        return;
    } else if (입금액입력.value > 가진돈) {
        alert("소지금이 부족합니다.");
        입금액입력.value = "";
        return;
    } else {
        let money = 가진돈 - 입금액입력.value;
        소지금.textContent = money.toLocaleString() + "원";
        money = +넣은돈 + +입금액입력.value;
        잔액.textContent = money.toLocaleString() + " 원";
    }
    입금액입력.value = "";
};

const 반환버튼 = main.querySelector(".return");

// 반환 버튼
반환버튼.onclick = () => {
    let money = 숫자변환(잔액.textContent) + 숫자변환(소지금.textContent);
    잔액.textContent = "0 원";
    소지금.textContent = 컴마("" + money) + "원";
};

function 음료개수(증감) {
    let count = 0;
    return () => {
        count = 증감(count);
        return count;
    };
}

function 증가(n) {
    return ++n;
}

function 감소(n) {
    return --n;
}

let 음료추가 = 음료개수(증가);
let 음료감소 = 음료개수(감소);

const 상품버튼 = main.querySelectorAll(".btn-item");

const 장바구니 = main.querySelector("#kart");

let 총가격 = 0;

상품버튼.forEach((element, index) => {
    element.addEventListener("click", () => {
        if (상품[index].재고 <= 0) {
            alert("재고가 없습니다.");
            return;
        } else if (숫자변환(잔액.textContent) < 상품[index].가격) {
            alert("잔액이 부족합니다.");
            return;
        } else if (!장바구니.innerText.includes(`${상품[index].이름}`)) {
            const li = document.createElement("li");
            li.innerHTML = `
            <img src="${상품[index].사진}" alt="기본 콜라" />
            <p class="item-name">${상품[index].이름}</p>
            <span class="count list${index}">1</span>
`;
            let money = 숫자변환(잔액.textContent);
            money -= 상품[index].가격;
            잔액.textContent = money.toLocaleString() + " 원";

            상품[index].재고--;
            상품[index].개수++;
            총가격 += 상품[index].가격;
            장바구니.appendChild(li);
        } else {
            const counter = main.querySelector(`.list${index}`);

            let money = 숫자변환(잔액.textContent);
            money -= 상품[index].가격;
            잔액.textContent = money.toLocaleString() + " 원";

            상품[index].재고--;
            상품[index].개수++;
            총가격 += 상품[index].가격;
            counter.innerText = 상품[index].개수;

            if (상품[index].재고 <= 0) {
                const 라벨 = main.querySelector(`#item-${index}`);
                라벨.classList.add("sold-out");
            }
        }
    });
});

const 획득버튼 = main.querySelector(".get");
const 획득음료 = main.querySelector("#earned");
const 총금액 = main.querySelector(".result-money");

획득버튼.addEventListener("click", () => {
    if (!장바구니.textContent) {
        alert("선택된 상품이 없습니다.");
        return;
    } else {
        // while (장바구니.textContent) {
        //     const li = 장바구니.querySelector("li");
        //     if (!획득음료.innerText) {
        //         획득음료.appendChild(장바구니.removeChild(li));
        //     }
        //     총가격 = 총가격.toLocaleString();
        //     총금액.innterText = `총금액 : ${총가격} 원`;
        // }
        획득음료.innerHTML = "";
        while (장바구니.textContent) {
            const li = 장바구니.querySelector("li");
            획득음료.appendChild(장바구니.removeChild(li));
        }
        총가격 = 총가격.toLocaleString();
        총금액.innerText = `총금액 : ${총가격} 원`;
        총가격 = 0;
    }
});
