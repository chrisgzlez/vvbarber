const images = document.querySelectorAll('.card');

  images.forEach( (image) => {
    image.addEventListener('click', () => {
      const clickedCard = event.currentTarget;
      clickedCard.classList.toggle("card-active");
    });
  });
