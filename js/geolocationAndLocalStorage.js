var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('YMapsID', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [56.286622, 44.084532], // Москва
        zoom: 15,
        controls: ['routePanelControl']
    });
    myMap.geoObjects
        .add(new ymaps.Placemark([56.286622, 44.084532], {
            balloonContent: 'Как добраться <br><button onclick="routeTo()" class="location_button">Постоить маршрут</button>',
            iconCaption: 'Neuracore'
        }));
}
function routeTo() {
    var control = myMap.controls.get('routePanelControl');
    var location = ymaps.geolocation.get();
    location.then(function (res) {
        // Получение адреса местоположения пользователя.
        var userTextLocation = res.geoObjects.get(0).properties.get('text');
        control.routePanel.state.set({
            // В качестве начальной точки маршрута будет установлено
            // местоположение пользователя.
            from: userTextLocation,
            // Адрес конечной точки.
            to: 'Казанское шоссе, 12к6'
        });
    });
}
let feedbackForm = document.getElementById('feedbackForm');

let userInfo = localStorage.getItem('userInfo');

if (userInfo) { userInfo = JSON.parse(userInfo); //проверка наличия информации в Local Storage
    document.getElementById('name').value = userInfo.name;
    document.getElementById('email').value = userInfo.email;
}

feedbackForm.addEventListener('submit', (e) => { e.preventDefault(); //listen for form submit
    let name = document.getElementById('name').value; //получение значений из форм
    let email = document.getElementById('email').value;
    let userInfo = { name: name, email: email, message: message }; //Сохранение в local storage
    localStorage.setItem('userInfo', JSON.stringify(userInfo)); });