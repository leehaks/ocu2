'use strict';

function slider() {
    var slider = document.querySelector('.slider-component');

    if (!slider) {
        return;
    }

    var pageBox = document.querySelector('.slider-box'),
        page = document.querySelectorAll('.slider-page'),
        pageIndex = 0;

    var dotBox = document.createElement('ul');

    for (var i = 0; i < page.length; i++) {
        var list = document.createElement('li');
        list.setAttribute("name", i);
        dotBox.appendChild(list);
    }

    // slider dot button 

    document.querySelector('.slider-dot').appendChild(dotBox);
    document.querySelector('li[name="0"]').classList.add('active');

    var dot = document.querySelectorAll('.slider-dot ul li');

    function setIndex() {
        for (var _i = 0; _i < dot.length; _i++) {
            dot[_i].classList.remove('active');
        }

        pageBox.style.transform = "translate(" + pageIndex * -100 + "%)";
    }

    var indicatorParents = document.querySelector('.slider-dot ul');

    var _loop = function _loop(_i2) {
        dot[_i2].addEventListener('click', function () {
            pageIndex = _i2;
        });
    };

    for (var _i2 = 0; _i2 < dot.length; _i2++) {
        _loop(_i2);
    }

    document.querySelectorAll('.slider-dot ul li').forEach(function (indicator, ind) {
        indicator.addEventListener('click', function () {
            pageIndex = ind;
            setIndex();
            indicator.classList.add('active');
        });
    });

    // slider arrow button 
    var leftArrow = document.querySelector('.arrow-btn.left'),
        rightArrow = document.querySelector('.arrow-btn.right');

    leftArrow.addEventListener('click', function () {
        pageIndex = pageIndex > 0 ? pageIndex - 1 : 0;
        setIndex();
        indicatorParents.children[pageIndex].classList.add('active');
    });

    rightArrow.addEventListener('click', function () {
        pageIndex = pageIndex < page.length - 1 ? pageIndex + 1 : page.length - 1;
        setIndex();
        indicatorParents.children[pageIndex].classList.add('active');
    });

    // slider timer 
    setInterval(function () {
        pageIndex += 1;
        if (pageIndex === page.length) pageIndex = 0;
        setIndex();
        slider.querySelectorAll('.slider-dot ul li')[pageIndex].classList.add('active');
    }, 8000);
}

slider();

function modalOpen(elem, event) {
    event.preventDefault();
    elem.classList.add('active');
    // document.querySelector('body').classList.add('scroll-hidden');
}

function modalClose(elem) {
    elem.classList.remove('active');
    // document.querySelector('body').classList.remove('scroll-hidden');
}

function tabController() {
    var tabComponent = document.querySelectorAll(".tab-component");

    tabComponent.forEach(function (tab) {

        var btn = tab.querySelectorAll('.tab-btn');
        var content = tab.querySelectorAll('.tab-content');

        function active(elem) {
            elem.classList.add('active');
            return elem;
        }

        function inactive(elem) {
            elem.classList.remove('active');
            return elem;
        }

        var currentMenu = active(btn[0]);
        var currentContent = active(content[0]);

        btn.forEach(function (target) {
            target.addEventListener('click', function (e) {
                console.log(currentMenu, currentContent);
                if (currentMenu) {
                    inactive(currentMenu);
                }
                active(e.currentTarget);
                currentMenu = e.currentTarget;

                var targetValue = e.currentTarget.getAttribute('data-target');
                var targetContent = tab.querySelector("#" + targetValue);

                if (currentContent) {
                    inactive(currentContent);
                };
                active(targetContent);
                currentContent = targetContent;
            });
        });
    });
}

tabController();

function hover() {
    var hover = document.querySelector('.download-btn');

    if (!hover) {
        return;
    }

    hover.addEventListener('mouseover', function () {
        hover.querySelector('img').setAttribute('src', '../img/icon-down-wh.png');
    });

    hover.addEventListener('mouseout', function () {
        hover.querySelector('img').setAttribute('src', '../img/icon-down-lg.png');
    });
}

hover();

function menuActive() {
    var menu = document.querySelector(".gnb-menu");

    if (!menu) {
        return;
    }

    var menuItem = menu.querySelectorAll('.menu-box');
    var currentMenu = void 0;

    menuItem.forEach(function (box) {

        function deactive(elem) {
            elem.classList.remove('active');
        }

        function active(elem) {
            elem.classList.add('active');
            currentMenu = elem;
        }

        box.addEventListener('click', function (e) {
            if (currentMenu) {
                deactive(currentMenu);
            }
            active(e.currentTarget);
        });

        box.querySelectorAll('ul li a').forEach(function (a) {
            a.addEventListener('click', function () {
                menu.classList.remove('active');
            });
        });
    });
}

menuActive();

$("#language").ddslick({
    width: "105px",
    imagePosition: "left",
    selectText: ""
});

$("#studyBoard").ddslick({
    width: "105px"
});

$("#noticeBoard").ddslick({
    width: "105px"
});

$("#mapBoard").ddslick({
    width: "145px"
});