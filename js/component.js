let slider = document.querySelectorAll('.slider-component');

slider.forEach( d => { 
    
    let pageBox = d.querySelector('.slider-box'),
        page = d.querySelectorAll('.slider-page'), 
        pageIndex = 0; 

    let dotBox = document.createElement('ul');  

    for(let i=0; i<page.length; i++){
        let list = document.createElement('li'); 
        list.setAttribute("name", i); 
        dotBox.appendChild(list); 
    }

    // slider dot button 
    d.querySelector('.slider-dot').appendChild(dotBox); 
    d.querySelector('li[name="0"]').classList.add('active'); 

    function setIndex() { 
        d.querySelectorAll('.slider-dot ul li').forEach( dot => { 
            dot.classList.remove('active');
        })
        pageBox.style.transform = "translate("+ (pageIndex) * -100 +"%)";
    }

    let indicatorParents = d.querySelector('.slider-dot ul');

    d.querySelectorAll('.slider-dot ul li').forEach((indicator, ind) => {
        indicator.addEventListener('click', function() { 
            pageIndex = ind; 
            setIndex();     
            indicator.classList.add('active'); 
        }); 
    }); 

    // slider arrow button 
    let leftArrow = d.querySelector('.arrow-btn.left'),
        rightArrow = d.querySelector('.arrow-btn.right');

    leftArrow.addEventListener('click', () => { 
        pageIndex = pageIndex > 0 ? pageIndex - 1 : 0; 
        setIndex(); 
        indicatorParents.children[pageIndex].classList.add('active');
    });

    rightArrow.addEventListener('click', () => { 
        pageIndex = pageIndex < page.length-1 ? pageIndex + 1 : page.length-1; 
        setIndex(); 
        indicatorParents.children[pageIndex].classList.add('active')
    });
    
    // slider timer 
    setInterval( function() { 
        pageIndex += 1
        if(pageIndex === page.length) pageIndex = 0; 
        setIndex(); 
        d.querySelectorAll('.slider-dot ul li')[pageIndex].classList.add('active'); 
    }, 8000); 
})


function DropDown(dropdownElem) { 
    const [toggler, menu] = dropdownElem.children; 

    const setValue = item => { 
        const value = item.textContent; 
        toggler.textContent = value; 
        this.value = value; 
        this.toggle(false); 
        this.element.dispatchEvent(new Event('change')); 
    }

    const handleClickOut = e => { 
        if(!this.element.contains(e.target)) { 
            this.toggle(false); 
        }
    }

    toggler.addEventListener('click', () => this.toggle());

    [...menu.children].forEach(item => {
        item.addEventListener('click', () => setValue(item)); 
    })

    document.addEventListener('click', handleClickOut); 

    this.element = dropdownElem; 

    this.value = toggler.textContent; 

    this.toggle = (expand = null) => { 
        expand = expand === null 
            ? menu.getAttribute('aria-expanded') !== 'true' 
            : expand;
        
            menu.setAttribute('aria-expanded', expand); 

            if(expand) { 
                toggler.classList.add('active'); 
            } else { 
                toggler.classList.remove('active')
            }
    }
}

let dropSelect = document.querySelectorAll('.dropdown')

dropSelect.forEach( d => {
    const dropdown = new DropDown(d); 
    dropdown.toggle(false); 
})

function tabController() { 
    let tabComponent = document.querySelectorAll(".tab-component")

    tabComponent.forEach( tab => { 

        let btn = tab.querySelectorAll('.tab-btn'); 
        let content = tab.querySelectorAll('.tab-content'); 

        let active = (elem) => { 
            elem.classList.add('active'); 
            return elem;  
        }
        let inactive = (elem) => { 
            elem.classList.remove('active'); 
            return elem; 
        }

        let currentMenu = active(btn[0]); 
        let currentContent = active(content[0]); 

        btn.forEach( target => {
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

function modalOpen(elem, event) {
    event.preventDefault(); 
    elem.classList.add('active'); 
    document.querySelector('body').classList.add('scroll-hidden'); 
}

function modalClose(elem) { 
    elem.classList.remove('active'); 
    document.querySelector('body').classList.remove('scroll-hidden');
}

function menuActive() { 
    let menu = document.querySelector(".gnb-menu")
    let menuItem = menu.querySelectorAll('.menu-box')
    let currentMenu;

    menuItem.forEach( box => {
        
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

        box.querySelectorAll('ul li a').forEach( a => { 
            a.addEventListener('click', function(){
                menu.classList.remove('active')
            })
        })
    })
}

menuActive(); 
