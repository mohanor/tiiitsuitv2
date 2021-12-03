$('.my-slick').slick({
    rtl: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    responsive: [
        {
            breakpoint: 426,
            settings: {
                arrows: false,
                centerPadding: '40px',
                slidesToShow: 1,
            }
        }
    ]
});