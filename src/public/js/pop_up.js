'use strict'

const pop_up = document.getElementById('pop_up')

if(pop_up){
    setTimeout(()=>{
        pop_up.style.opacity = '0'
        setTimeout(()=>{
            pop_up.parentNode.removeChild(pop_up)
        },2000)
    },1000)
}