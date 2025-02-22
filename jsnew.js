const navSlide = () => {
   const burger = document.querySelector(".burger");
   const nav = document.querySelector(".nav-links");
   const navLinks = document.querySelectorAll(".nav-links li");

   burger.addEventListener("click", () => {
         nav.classList.toggle("nav-active");

         navLinks.forEach((link, index) => {
               if (link.style.animation) {
                     link.style.animation = '';
               } else {
                     link.style.animation = `navLinkFade 2s ease forwards ${index / 3}s`;
               }
         });
         burger.classList.toggle('toggle');
        

   });

   

};

navSlide();

function startTime() {
   const today = new Date();
   let h = today.getHours();
   let m = today.getMinutes();
   let s = today.getSeconds();
   m = checkTime(m);
   s = checkTime(s);
   document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
   setTimeout(startTime, 1000);
}

function checkTime(i) {
   if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
   return i;
}
