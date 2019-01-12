console.log("working anime")

$(document).ready(function () {
    // =====================
    // Index Page
    // =====================


    // =======================
    // AppNameFadesIn 1X1
    // =======================
    anime({
        targets:'#PsLogo',
        easing: 'easeInOutExpo',
        rotate:'1turn',
        opacity:[.5,1]
    })


    var logoTimeline = anime.timeline;
    logoTimeline({
        loop: false,
        // duration:3500,
        easing: 'easeInOutSine',
    })
        .add({
            targets: '#spice , #dinner',
            opacity: [0, 1],
            duration: 800
        })
        .add({
            targets: '#it',
            // translateY:[
            //     {vaule:80, duration:800},
            //     {vaule:0, duration:800}
            // ],
            opacity: [0, 1],
            duration: 800
        })
        .add({
            targets: '#up',
            opacity: [0, 1],
            duration: 500,
            offset: '-=200'
        })
        .add({
            targets: '.topbar-sign',
            translateX: { vaulue: 100, value: 0 },
            opacity: [.0, 1],
            // offset: '-=1000'
        })
        .add({
            targets: '#search-input , #search-btn',
            easing: 'linear',
            offset: '-= 2000',
            opacity: [0, 1],
        })

    // ============================
    // after Search Btn Is clicked
    // ============================
    var searchBtn = document.querySelector("#search-btn");
    $(document).on('click', '#search-btn', function () {
        console.log("anime clicked, add animations here")
        setTimeout(function () {
            var results = anime({
                targets: '.meal-card',
                opacity: [0, 1],
                duration: 7000,
            })
        }, 1000)
    })


    // ===========================
    // Recipe Page
    // ===========================
    var cardTimeline = anime.timeline;
    cardTimeline({
        loop: false,
        easing: 'linear'
    })
        .add({
            targets: '#recipe-name',
            // scale: [.5 , 1],
            opacity: [0, 1],
            duration: 500,
        })
        // .add({
        //     targets: '#recipe , #ingredients',
        //     scale: [.5, 1],
        //     backgroundColor: '#444',
        // })

    var recipeTimeline = anime.timeline;
    recipeTimeline({
        loop: false,
        easing: 'linear',
    })
        .add({
            targets: '#food-pic',
            opacity: [0, 1],
            duration: 800,
        })

})
