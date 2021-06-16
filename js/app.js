if('serviceWorker' in navigator){
    //console.log("yes");
    window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('../sw.js')
        .then((reg)=>console.log('sw registered',reg))
        .catch((err)=>console.log('sw not registered',err));
    })
}
gsap.registerPlugin(ScrollTrigger);
var tl = gsap.timeline();

    
    tl.to('.mini_flower', {
        scrollTrigger: {
            trigger: '.mini_flower',
            start: 'top center',
            //end: "+=500",
            end: () => `+=${'.mini_flower'.clientHeight }`,
            scrub: 4
            //markers:true
            
            
        },
        duration: 3, 
        x:450,
        y: 260,
        rotation: 360,
        ease: "ease"
        
    });
    //carousel-inner
    function page1() { 
        var tl = new TimelineMax()
        .from(".navbar",1,{
             opacity: "0",
             yPercent:-50,
             ease: "slow(0.7, 0.7, false)"
            },1)

            .staggerFrom(".hidden_txt",1,{
                y:"-100%",
                ease:"bounce.out"
            },2)

          

        .from(".inner-div",5,{
            opacity: "0",
            yPercent:50,
            //rotation:-360,
            ease:"elastic.out(1, 0.3)"
        },3)
    
       

        .from(".carousel-inner",1,{
            opacity: "0",
            yPercent:10,
            scale:3,
            ease:"power4.out"
        },3)

        
        

        .from(".img1",1,{
            opacity: "0",
            xPercent:10,
            scale:4,
            ease:"back.out(1.7)"
        },4)
    

        .from(".img2",1,{
            opacity: "0",
            xPercent:10,
            scale:4,
            ease:"back.out(1.7)"
        },4.1)

        .from(".img3",1,{
            opacity: "0",
            xPercent:10,
            scale:4,
            ease:"back.out(1.7)"
        },4.2)

        .from(".img4",1,{
            opacity: "0",
            left:100,
            scale:4,
            ease:"back.out(1.7)"
        },4.3)


    }// function ends here...

  
    page1()

    let sections = gsap.utils.toArray(".trainer_column");

