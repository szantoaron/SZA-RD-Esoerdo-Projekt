const quizQuestions = [
    { question: "Mi az esőerdők legjellemzőbb éghajlati jellemzője?", answers: ["Szárazság", "Magas páratartalom és sok csapadék", "Hideg időjárás", "Nagy szelek"], correctIndex: 1 },
    { question: "Melyik kontinensen található a legnagyobb esőerdő?", answers: ["Ázsia", "Afrika", "Dél-Amerika", "Ausztrália"], correctIndex: 2 },
    { question: "Mi a legismertebb dél-amerikai esőerdő?", answers: ["Kongói esőerdő", "Amazonasi esőerdő", "Borneói esőerdő", "Szumátrai esőerdő"], correctIndex: 1 },
    { question: "Milyen szerepe van az esőerdőknek a Föld légkörében?", answers: ["Csökkentik az oxigén mennyiségét", "Oxigént termelnek és szén-dioxidot kötnek meg", "Nem befolyásolják a légkört", "Csak a levegőt szennyezik"], correctIndex: 1 },
    { question: "Melyik állat nem él az esőerdőkben?", answers: ["Jaguar", "Lemúr", "Jegesmedve", "Papagáj"], correctIndex: 2 },
    { question: "Mi a leggyakoribb ok az esőerdők pusztulására?", answers: ["Árvíz", "Tűzvész", "Erőltetett fakitermelés és mezőgazdasági terjeszkedés", "Jég olvadása"], correctIndex: 2 },
    { question: "Milyen növényzet jellemző az esőerdőkre?", answers: ["Fenyőfák", "Tropikus, sűrű lombkorona és lianák", "Szavanna fűfélék", "Mocsári növények"], correctIndex: 1 },
    { question: "Hogyan nevezik az esőerdők legfelső lombkoronáját?", answers: ["Aljnövényzet", "Lombkorona", "Talajszint", "Bokorszint"], correctIndex: 1 },
    { question: "Milyen hatással van az esőerdők irtása a globális felmelegedésre?", answers: ["Csökkenti a globális felmelegedést", "Nincs hatása", "Növeli a szén-dioxid kibocsátást és így hozzájárul a felmelegedéshez", "Megszünteti a felmelegedést"], correctIndex: 2 },
    { question: "Melyik állat az esőerdők fontos beporzója?", answers: ["Szitakötő", "Kolibri", "Elefánt", "Cápa"], correctIndex: 1 }
  ];

  const startBtn = document.querySelector(".startBtn");
  const anwsers = document.querySelectorAll(".anwser");
  const questionContainer = document.querySelector(".questionContainer");
  const question = document.querySelector(".question");
  const nextBtn = document.querySelector(".nextBtn");
  const score = document.querySelector(".score");
  const resultContainer = document.querySelector(".resultContainer");
  const resultText = document.querySelector(".result");
  const messageText = document.querySelector(".message");
  const restartBtn = document.querySelector(".restartBtn");

  let points = 0;
  let index = 0;
  let answered = false;

  const toastElement = document.getElementById('successToast');
  const toast = new bootstrap.Toast(toastElement);

  startBtn.addEventListener("click", () => {
    shuffle(quizQuestions);
    index = 0;
    points = 0;
    score.textContent = points + " pont";
    questionContainer.classList.remove("none");
    resultContainer.classList.add("none");
    startBtn.classList.add("none");
    play();
  });

  anwsers.forEach((anwser, i) => {
    anwser.addEventListener("click", () => {
      if (answered) return; 
      answered = true;

      anwsers.forEach(a => a.classList.remove("selected", "correct", "wrong"));
      anwser.classList.add("selected");

      if (i === quizQuestions[index].correctIndex) {
        points++;
        score.textContent = points + " pont";
        anwser.classList.add("correct");
        toast.show(); 
      } else {
        anwser.classList.add("wrong");
        anwsers[quizQuestions[index].correctIndex].classList.add("correct");
      }
    });
  });

  nextBtn.addEventListener("click", () => {
    if (!answered) {
      alert("Kérlek, válassz egy választ mielőtt továbblépnél!");
      return;
    }
    index++;
    if (index >= quizQuestions.length) {
      showResult();
    } else {
      play();
    }
  });

  restartBtn.addEventListener("click", () => {
    resultContainer.classList.add("none");
    questionContainer.classList.remove("none");
    points = 0;
    index = 0;
    score.textContent = points + " pont";
    shuffle(quizQuestions);
    play();
  });

  function play() {
    answered = false;
    question.textContent = quizQuestions[index].question;

    anwsers.forEach((anwser, i) => {
      anwser.textContent = quizQuestions[index].answers[i];
      anwser.classList.remove("selected", "correct", "wrong");
    });
  }

  function showResult() {
    questionContainer.classList.add("none");
    resultContainer.classList.remove("none");

    resultText.textContent = `Összpontszám: ${points} / ${quizQuestions.length}`;

    if (points === quizQuestions.length) {
      messageText.textContent = "Tökéletes! Igazi esőerdő szakértő vagy!";
    } else if (points >= quizQuestions.length * 0.7) {
      messageText.textContent = "Ügyes vagy! Jó eredmény!";
    } else if (points >= quizQuestions.length * 0.4) {
      messageText.textContent = "Megvan az alap, de még lehet fejlődni.";
    } else {
      messageText.textContent = "Gyakorlás kell még, ne add fel!";
    }

    startBtn.classList.remove("none");
  }

  function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }
