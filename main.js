import "./style.css";

class dateSlider {
  constructor(dateStart, dateEnd, container = "") {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.dates = this.loadDates();
    this.speed = 0.6;
    this.maxDuration = 3;
    this.gap = 20;
    this.datesImage = [];
    if (document.querySelector(container)) {
      this.container = document.querySelector(container);
      this.loadSlider();
      this.actualDate = dateStart;
      this.loadDatesImages();
    }
  }
  loadDates() {
    const dates = [];
    for (let date = this.dateStart; date <= this.dateEnd; date++) {
      dates.push(date);
    }
    return dates;
  }
  loadDatesImages() {
    this.datesImage = document.querySelectorAll('[data-dateImage]')
    this.datesImage[0].classList.add('image--active')
  };
  changeImage(date) {
    const imageToHide = document.querySelector('.image--active');
    const imageToShow = document.querySelector(`[data-dateImage="${date}"]`);

    imageToHide.classList.add('hide');
    imageToShow.classList.add('image--active');

    setTimeout(() => {
      imageToHide.classList.remove('hide');
      imageToHide.classList.remove('image--active');
    }, 2000);
  }
  loadSlider() {
    const container = document.createElement("div");
    container.setAttribute("class", "slider__container");

    this.wrapper = document.createElement("ul");
    this.wrapper.setAttribute("class", "slider__wrapper");
    this.wrapper.style.gap = `${this.gap}px`;

    this.container.appendChild(container);
    container.appendChild(this.wrapper);

    //ajout des dates
    this.dates.forEach((date) => {
      var li = document.createElement("li");
      li.setAttribute("class", "date");
      this.wrapper.appendChild(li);
      li.innerHTML = date;
    });

    //ajout du gap
    this.date_widht = this.wrapper.querySelector("li").offsetWidth + this.gap;
    container.style.width = `${this.date_widht * 5}px`;

    //centrage
    this.wrapper.querySelector("li").style.marginLeft = `${this.date_widht * 2
      }px`;
    this.wrapper.querySelector("li:last-child").style.marginRight = `${this.date_widht * 2
      }px`;
  }

  gotTo(date) {
    if (date !== this.actualDate) {
      //calcul du nombre de date pour le nombre de seconde à donner
      var dates_delta = Math.abs(
        this.dates.indexOf(date) - this.dates.indexOf(this.actualDate)
      );
      //calcul de la durée avec un max de secondes
      var duration = `${Math.min(this.speed * dates_delta, this.maxDuration)}s`;

      //changement du transition duration et transformation
      this.wrapper.style.transitionDuration = duration;
      this.wrapper.style.transform = `translateX(-${this.date_widht * this.dates.indexOf(date)
        }px)`;
      this.actualDate = date;
      setTimeout(() => {
        this.changeImage(date);
      }, Math.min(this.speed * dates_delta, this.maxDuration) * 1000 - 2000);
    }
  }
}

const date = new dateSlider(1871, 1924, "#app");

document.querySelectorAll("[data-date]").forEach((button) => {
  button.addEventListener("click", () => {
    date.gotTo(parseInt(button.getAttribute("data-date")));
  });
});