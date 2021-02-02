function slider() { 
    let slider = document.querySelector('.slider-component');
    
    if(!slider) { return; }

    let pageBox = document.querySelector('.slider-box'),
        page = document.querySelectorAll('.slider-page'), 
        pageIndex = 0; 
    
    let dotBox = document.createElement('ul');  
    
    for(let i=0; i<page.length; i++){
        let list = document.createElement('li'); 
        list.setAttribute("name", i); 
        dotBox.appendChild(list); 
    }
    
    // slider dot button 
  
    document.querySelector('.slider-dot').appendChild(dotBox); 
    document.querySelector('li[name="0"]').classList.add('active'); 

    let dot = document.querySelectorAll('.slider-dot ul li')

    function setIndex() { 
        for(let i=0; i<dot.length; i++){
            dot[i].classList.remove('active');
        }

        pageBox.style.transform = "translate("+ (pageIndex) * -100 +"%)";
    }
    
    let indicatorParents = document.querySelector('.slider-dot ul');
    
    for(let i=0; i<dot.length; i++){
        dot[i].addEventListener('click', function() { 
            pageIndex = i
            
        })
    }

    document.querySelectorAll('.slider-dot ul li').forEach((indicator, ind) => {
        indicator.addEventListener('click', function() { 
            pageIndex = ind; 
            setIndex();     
            indicator.classList.add('active'); 
        }); 
    }); 
    
    // slider arrow button 
    let leftArrow = document.querySelector('.arrow-btn.left'),
        rightArrow = document.querySelector('.arrow-btn.right');
    
    leftArrow.addEventListener('click', function() { 
        pageIndex = pageIndex > 0 ? pageIndex - 1 : 0; 
        setIndex(); 
        indicatorParents.children[pageIndex].classList.add('active');
    });
    
    rightArrow.addEventListener('click', function() { 
        pageIndex = pageIndex < page.length-1 ? pageIndex + 1 : page.length-1; 
        setIndex(); 
        indicatorParents.children[pageIndex].classList.add('active')
    });

    // slider timer 
    setInterval( function() { 
        pageIndex += 1
        if(pageIndex === page.length) pageIndex = 0; 
        setIndex(); 
        slider.querySelectorAll('.slider-dot ul li')[pageIndex].classList.add('active'); 
    }, 8000); 
}

slider(); 

function modalOpen(elem, event) {
    event.preventDefault(); 
    elem.classList.add('active'); 
    document.querySelector('body').classList.add('scroll-hidden'); 
}

function modalClose(elem) { 
    elem.classList.remove('active'); 
    document.querySelector('body').classList.remove('scroll-hidden');
}

function tabController() { 
    let tabComponent = document.querySelectorAll(".tab-component")

    tabComponent.forEach( function(tab){ 

        let btn = tab.querySelectorAll('.tab-btn'); 
        let content = tab.querySelectorAll('.tab-content'); 

        function active(elem) {
            elem.classList.add('active'); 
            return elem; 
        }

        function inactive(elem) { 
            elem.classList.remove('active'); 
            return elem; 
        }

        let currentMenu = active(btn[0]); 
        let currentContent = active(content[0]); 

        btn.forEach( function(target) {
            target.addEventListener('click', (e) => { 
                console.log(currentMenu, currentContent);
                if(currentMenu) { inactive(currentMenu); }
                active(e.currentTarget); 
                currentMenu = e.currentTarget; 
                
                let targetValue = e.currentTarget.getAttribute('data-target'); 
                let targetContent = tab.querySelector("#"+targetValue)

                if(currentContent) { inactive(currentContent) }; 
                active(targetContent); 
                currentContent = targetContent; 
            })
        })      
    })
}

tabController(); 

function menuActive() { 
    let menu = document.querySelector(".gnb-menu")
    
    if(!menu) { return; }

    let menuItem = menu.querySelectorAll('.menu-box')
    let currentMenu;


    menuItem.forEach( function(box) {
        
        function deactive(elem) { 
            elem.classList.remove('active') 
        }

        function active(elem) { 
            elem.classList.add('active') 
            currentMenu = elem; 
        }

        box.addEventListener('click', function(e){
            if(currentMenu) { 
                deactive(currentMenu); 
            }
            active(e.currentTarget); 
        })

        box.querySelectorAll('ul li a').forEach( function(a) { 
            a.addEventListener('click', function(){
                menu.classList.remove('active')
            })
        })
    })
}

menuActive(); 

$("#language").ddslick({
    width: "105px", 
    imagePosition:"left", 
    selectText:"", 
}); 

$("#studyBoard").ddslick({
    width: "105px", 
}); 

$("#noticeBoard").ddslick({
    width: "105px", 
}); 

$("#mapBoard").ddslick({
    width: "105px", 
}); 