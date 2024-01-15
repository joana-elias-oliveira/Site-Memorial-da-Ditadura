

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const navbar = document.querySelector(".header .navbar");
    const menuItems = navbar.querySelectorAll("a");

    menuBtn.addEventListener("click", function () {
        navbar.classList.toggle("active");
    });

    menuItems.forEach(function (item) {
        item.addEventListener("click", function () {
            navbar.classList.remove("active");
        });
    });
});


$(document).ready(function() {
    var currentIndex = 0;
    var images = $('.carousel-container img');
    var totalImages = images.length;
    var intervalId;
    
    function showImage(index) {
        images.hide();
        images.eq(index).fadeIn();
    }

    function setActiveIndicator(index) {
        $('.carousel-indicator').removeClass('active');
        $('.carousel-indicator').eq(index).addClass('active');
    }

    function nextImage() {
        var prevIndex = currentIndex;
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
        setActiveIndicator(currentIndex);
    }

    function prevImage() {
        var prevIndex = currentIndex;
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
        setActiveIndicator(currentIndex);
    }

    function startInterval() {
        clearInterval(intervalId);
        intervalId = setInterval(nextImage, 7000);
    }

    startInterval();

    $('.next').on('click', function() {
        clearInterval(intervalId);
        nextImage();
        startInterval();
    });

    $('.prev').on('click', function() {
        clearInterval(intervalId);
        prevImage();
        startInterval();
    });

    $('.carousel').hover(
        function() {
            clearInterval(intervalId);
        },
        function() {
            startInterval();
        }
    );

    for (var i = 0; i < totalImages; i++) {
        $('.carousel-indicators').append('<div class="carousel-indicator"></div>');
    }

    $('.carousel-indicator').eq(0).addClass('active');

    // Lidar com a troca de imagem quando um indicador é clicado
    $('.carousel-indicator').on('click', function() {
        var clickedIndex = $(this).index();
        if (clickedIndex !== currentIndex) {
            clearInterval(intervalId);
            currentIndex = clickedIndex;
            showImage(currentIndex);
            setActiveIndicator(currentIndex);
            startInterval();
        }
    });

    // Pausar o cronômetro quando o mouse está sobre as imagens
    images.on('mouseenter', function() {
        clearInterval(intervalId);
    });

    // Retomar o cronômetro quando o mouse sai das imagens
    images.on('mouseleave', function() {
        startInterval();
    });
});


 document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.box img');

        images.forEach(img => {
            img.addEventListener('click', function() {
                const fullscreenImageSrc = this.getAttribute('data-fullscreen');
                if (fullscreenImageSrc) {
                    const fullscreenOverlay = document.createElement('div');
                    fullscreenOverlay.classList.add('fullscreen-overlay');

                    const fullscreenImage = document.createElement('img');
                    fullscreenImage.src = fullscreenImageSrc;

                    fullscreenOverlay.appendChild(fullscreenImage);
                    document.body.appendChild(fullscreenOverlay);

                    fullscreenOverlay.addEventListener('click', function() {
                        document.body.removeChild(fullscreenOverlay);
                    });
                }
            });
        });
});  

var swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        },
        1200: {
            slidesPerView: 4
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

function handleGenreChange() {
    var genreSelect = document.getElementById("genre-select");
    var selectedGenre = genreSelect.value;

    var allCards = document.querySelectorAll(".swiper-card");
    allCards.forEach(function (card) {
        card.style.display = "none";
    });

    if (selectedGenre === "all") {
        allCards.forEach(function (card) {
            card.style.display = "block";
        });
    } else {
        var genreCards = document.querySelectorAll(".swiper-card." + selectedGenre);
        genreCards.forEach(function (card) {
            card.style.display = "block";
        });
    }

    // Atualize o carrossel
    swiper.update();
}

const searchBar = document.getElementById("search");
searchBar.addEventListener("input", function () {
    const searchText = searchBar.value.toLowerCase();
    filterItems(searchText);
});

function filterItems(text) {
    const swiperCards = document.querySelectorAll(".swiper-card");
    swiperCards.forEach(function (item) {
        const cardName = item.getAttribute("data-card-name").toLowerCase();
        if (cardName.includes(text)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}


const cards = document.querySelectorAll('.swiper-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.classList.add('clicked');
        });
        
        card.addEventListener('mouseout', () => {
            card.classList.remove('clicked');
        });
    });



    document.addEventListener("DOMContentLoaded", function() {
        const searchBar = document.getElementById("search");
        const cards = document.querySelectorAll(".swiper-card");

        searchBar.addEventListener("input", function() {
            const searchText = searchBar.value.toLowerCase();

            cards.forEach(function(card) {
                const cardName = card.getAttribute("data-card-name").toLowerCase();

                if (cardName.includes(searchText)) {
                    card.style.display = "block"; // Mostra o card
                } else {
                    card.style.display = "none"; // Esconde o card
                }
            });
        });
    });

var genreSelect = document.getElementById("genre-select");
genreSelect.addEventListener("change", handleGenreChange);
function searchCEP() {
    const cepInput = document.getElementById("cep");
    const ruaInput = document.getElementById("rua");
    const bairroInput = document.getElementById("bairro");
    const cidadeInput = document.getElementById("cidade");
    const estadoInput = document.getElementById("estado");

    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length === 8) {
        const apiUrl = `https://viacep.com.br/ws/${cep}/json`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert("CEP não encontrado");
                } else {
                    ruaInput.value = data.logradouro;
                    bairroInput.value = data.bairro;
                    cidadeInput.value = data.localidade;
                    estadoInput.value = data.uf;
                }
            })
            .catch(error => console.error(error));
    }
}

const cepInput = document.getElementById("cep");
const form = document.querySelector("form");

cepInput.addEventListener("input", function () {
    searchCEP();
});

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário (recarregamento da página)
});

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("myForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        if (form.checkValidity()) {
            alert("Formulário enviado com sucesso!");
            form.reset();
        } else {
            alert("Por favor, preencha todos os campos corretamente.");
        }
    });
});
