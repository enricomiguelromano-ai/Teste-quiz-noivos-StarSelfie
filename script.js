/* ========================================
   PERGUNTAS
======================================== */

const questions = [

    {
        q: "Onde Arthur e Ana se conheceram?",

        a: [
            "Na escola",
            "No trabalho",
            "Em uma festa",
            "Pela internet"
        ],

        correct: 2
    },

    {
        q: "Qual seria o destino perfeito para uma viagem do casal?",

        a: [
            "Praia",
            "Montanha",
            "Cidade grande",
            "Interior"
        ],

        correct: 0
    },

    {
        q: "Quem provavelmente demora mais para se arrumar?",

        a: [
            "Arthur",
            "Ana",
            "Os dois",
            "Depende do evento"
        ],

        correct: 1
    },

    {
        q: "Qual atividade combina mais com um domingo do casal?",

        a: [
            "Assistir filmes",
            "Fazer trilha",
            "Cozinhar juntos",
            "Viajar"
        ],

        correct: 2
    },

    {
        q: "Quem provavelmente escolheria o restaurante?",

        a: [
            "Arthur",
            "Ana",
            "Os dois juntos",
            "Quem estiver com fome"
        ],

        correct: 1
    },

    {
        q: "Qual dessas opções seria mais provável em uma comemoração?",

        a: [
            "Jantar especial",
            "Churrasco",
            "Festa surpresa",
            "Passeio"
        ],

        correct: 0
    }

];


/* ========================================
   VARIÁVEIS
======================================== */

let current = 0;

let score = 0;

let player = "";

let audioCtx = null;


/* ========================================
   ÁUDIO (sons sintetizados, sem arquivos)
======================================== */

function getAudioCtx() {

    if (!audioCtx) {

        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    }

    if (audioCtx.state === "suspended") {

        audioCtx.resume();

    }

    return audioCtx;

}


function playTone(freqs, duration, wave, volume) {

    try {

        const ctx = getAudioCtx();

        freqs.forEach((freq, i) => {

            const osc = ctx.createOscillator();

            const gain = ctx.createGain();

            osc.type = wave || "sine";

            osc.frequency.value = freq;

            osc.connect(gain);

            gain.connect(ctx.destination);


            const start = ctx.currentTime + i * duration;

            gain.gain.setValueAtTime(volume || 0.22, start);

            gain.gain.exponentialRampToValueAtTime(0.001, start + duration);


            osc.start(start);

            osc.stop(start + duration);

        });

    } catch (e) {

        /* áudio indisponível, ignora silenciosamente */

    }

}


function playSound(type) {

    if (type === "correct") {

        playTone([523.25, 659.25, 783.99], 0.13, "sine", 0.25);

    }

    else if (type === "wrong") {

        playTone([196.0, 146.83], 0.2, "sawtooth", 0.2);

    }

    else if (type === "click") {

        playTone([440], 0.06, "sine", 0.14);

    }

    else if (type === "fanfare") {

        playTone(
            [523.25, 659.25, 783.99, 1046.5],
            0.16,
            "triangle",
            0.28
        );

    }

}


/* ========================================
   CONFETE
======================================== */

function launchConfetti(count, big) {

    const container = document.createElement("div");

    container.className = "confetti-container";

    document.body.appendChild(container);


    const colors = big

        ? ["#C8A96B", "#E5D2A5", "#F7F3EC", "#4CAF50", "#ffffff", "#E05353"]

        : ["#C8A96B", "#E5D2A5", "#4CAF50"];


    for (let i = 0; i < count; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti-piece";

        piece.style.left = Math.random() * 100 + "%";

        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (1.4 + Math.random() * 1.3) + "s";

        piece.style.animationDelay =
            (Math.random() * 0.35) + "s";

        piece.style.setProperty(
            "--rot",
            (Math.random() * 360 + 180) + "deg"
        );

        container.appendChild(piece);

    }


    setTimeout(() => container.remove(), 3200);

}


/* ========================================
   RIPPLE NOS BOTÕES
======================================== */

function addRipple(e) {

    const btn = e.currentTarget;

    const circle = document.createElement("span");

    const diameter = Math.max(btn.clientWidth, btn.clientHeight);

    const rect = btn.getBoundingClientRect();


    circle.style.width = circle.style.height = diameter + "px";

    circle.style.left = (e.clientX - rect.left - diameter / 2) + "px";

    circle.style.top = (e.clientY - rect.top - diameter / 2) + "px";

    circle.className = "ripple";


    const old = btn.querySelector(".ripple");

    if (old) old.remove();


    btn.appendChild(circle);

    setTimeout(() => circle.remove(), 650);

}


document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("button").forEach(btn => {

        btn.addEventListener("click", addRipple);

    });


    startSparkles();

});


/* ========================================
   PARTÍCULAS FLUTUANTES DE FUNDO
======================================== */

function startSparkles() {

    const holder = document.getElementById("sparkles");

    if (!holder) return;


    function spawn() {

        const s = document.createElement("div");

        s.className = "sparkle";

        s.style.left = Math.random() * 100 + "%";

        s.style.setProperty(
            "--drift",
            (Math.random() * 80 - 40) + "px"
        );

        s.style.animationDuration = (6 + Math.random() * 6) + "s";

        holder.appendChild(s);


        setTimeout(() => s.remove(), 13000);

    }


    for (let i = 0; i < 6; i++) {

        setTimeout(spawn, i * 900);

    }


    setInterval(spawn, 1400);

}


/* ========================================
   TELA CHEIA
======================================== */

function toggleFullscreen() {

    playSound("click");

    const el = document.documentElement;

    const isFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;


    if (!isFullscreen) {

        const request =
            el.requestFullscreen ||
            el.webkitRequestFullscreen ||
            el.msRequestFullscreen;

        if (request) request.call(el);

    }

    else {

        const exit =
            document.exitFullscreen ||
            document.webkitExitFullscreen ||
            document.msExitFullscreen;

        if (exit) exit.call(document);

    }

}


["fullscreenchange", "webkitfullscreenchange", "msfullscreenchange"]
    .forEach(evt => {

        document.addEventListener(evt, () => {

            const btn = document.getElementById("fullscreenBtn");

            if (!btn) return;


            const isFullscreen =
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement;

            btn.textContent = isFullscreen ? "⤫" : "⛶";

        });

    });


/* ========================================
   CONTAGEM ANIMADA DE NÚMEROS
======================================== */

function animateNumber(el, target, duration) {

    const start = performance.now();

    const dur = duration || 900;


    function step(now) {

        const progress = Math.min((now - start) / dur, 1);

        const eased = 1 - Math.pow(1 - progress, 3);

        el.textContent = Math.round(target * eased);


        if (progress < 1) {

            requestAnimationFrame(step);

        }

        else {

            el.textContent = target;

        }

    }


    requestAnimationFrame(step);

}


/* ========================================
   TROCAR DE TELA
======================================== */

function show(id) {

    const currentScreen =
        document.querySelector(".screen.active");

    const nextScreen =
        document.getElementById(id);


    if (currentScreen === nextScreen) return;


    if (currentScreen) {

        currentScreen.classList.remove("active");

        currentScreen.classList.add("screen-exit");


        setTimeout(() => {

            currentScreen.classList.remove("screen-exit");

        }, 450);

    }


    nextScreen.classList.add("active", "screen-enter");


    setTimeout(() => {

        nextScreen.classList.remove("screen-enter");


        /*
            Reengancha o ripple em botões
            criados dinamicamente
        */

        nextScreen.querySelectorAll("button").forEach(btn => {

            btn.removeEventListener("click", addRipple);

            btn.addEventListener("click", addRipple);

        });

    }, 500);

}


/* ========================================
   PEGAR RANKING
======================================== */

function getRanking() {

    return JSON.parse(

        localStorage.getItem("quizRanking") || "[]"

    );

}


/* ========================================
   SALVAR PONTUAÇÃO
======================================== */

function saveScore() {

    const ranking = getRanking();


    ranking.push({

        nome: player,

        pontos: score,

        data: new Date().toISOString()

    });


    /*
        Ordena do maior para o menor
    */

    ranking.sort(

        (a, b) => b.pontos - a.pontos

    );


    /*
        Guarda somente os 50 melhores
    */

    localStorage.setItem(

        "quizRanking",

        JSON.stringify(
            ranking.slice(0, 50)
        )

    );

}


/* ========================================
   INICIAR QUIZ
======================================== */

function startQuiz() {

    player = document
        .getElementById("playerName")
        .value
        .trim();


    /*
        Se o jogador não colocar nome
    */

    if (player === "") {

        player = "Convidado";

    }


    current = 0;

    score = 0;


    renderQuestion();

    show("quiz");

}


/* ========================================
   MOSTRAR PERGUNTA
======================================== */

function renderQuestion() {

    const item = questions[current];


    document
        .getElementById("progress")
        .textContent =
        `PERGUNTA ${current + 1} DE ${questions.length}`;


    const fill = document.getElementById("progressFill");

    if (fill) {

        fill.style.width =
            (current / questions.length) * 100 + "%";

    }


    document
        .getElementById("question")
        .textContent = item.q;


    const box =
        document.getElementById("answers");


    /*
        Limpa as respostas anteriores
    */

    box.innerHTML = "";


    /*
        Cria os botões
    */

    item.a.forEach((text, i) => {

        const btn =
            document.createElement("button");


        btn.className = "answer";

        btn.textContent = text;


        btn.addEventListener("click", addRipple);


        btn.onclick = (e) => {

            addRipple(e);

            answer(i, btn);

        };


        box.appendChild(btn);

    });

}


/* ========================================
   RESPONDER
======================================== */

function answer(choice, btnEl) {

    const correctIndex = questions[current].correct;

    const correct = choice === correctIndex;


    const allButtons =
        document.querySelectorAll("#answers .answer");


    /*
        Trava as respostas para não
        clicar duas vezes
    */

    allButtons.forEach(b => (b.disabled = true));


    if (correct) {

        btnEl.classList.add("correct-flash");

        playSound("correct");

        launchConfetti(18, false);

    }

    else {

        btnEl.classList.add("wrong-flash");


        /*
            Mostra qual era a resposta certa
        */

        if (allButtons[correctIndex]) {

            allButtons[correctIndex]
                .classList.add("correct-flash");

        }


        playSound("wrong");

    }


    /*
        Aguarda a animação antes de
        abrir o feedback
    */

    setTimeout(() => {

        if (correct) {

            /*
                Cada acerto vale 100 pontos
            */

            score += 100;


            showFeedback(
                true,
                100
            );

        }

        else {

            showFeedback(
                false,
                0
            );

        }

    }, 550);

}


/* ========================================
   MOSTRAR FEEDBACK
======================================== */

function showFeedback(correct, points) {

    const feedback =
        document.getElementById("feedback");


    const icon =
        document.getElementById("feedbackIcon");


    const title =
        document.getElementById("feedbackTitle");


    const pointsText =
        document.getElementById("feedbackPoints");


    if (correct) {

        icon.textContent = "✓";

        title.textContent = "Acertou!";

        pointsText.textContent =
            `+${points} pontos`;

    }

    else {

        icon.textContent = "✕";

        title.textContent = "Errou!";

        pointsText.textContent =
            "Você não ganhou pontos nesta rodada.";

    }


    feedback.classList.add("show");

}


/* ========================================
   CONTINUAR DEPOIS DO FEEDBACK
======================================== */

function continueAfterFeedback() {

    document
        .getElementById("feedback")
        .classList.remove("show");


    current++;


    /*
        Ainda existem perguntas?
    */

    if (current < questions.length) {

        renderQuestion();

    }

    else {

        /*
            Terminou o quiz.
            Salva a pontuação.
        */

        saveScore();


        document
            .getElementById("resultName")
            .textContent = player;


        show("result");


        const pointsEl =
            document.getElementById("resultPoints");


        setTimeout(() => {

            playSound("fanfare");

            launchConfetti(60, true);

            animateNumber(pointsEl, score, 1200);

        }, 350);

    }

}


/* ========================================
   RENDERIZAR RANKING
======================================== */

function renderRanking() {

    const ranking =
        getRanking();


    const list =
        document.getElementById("rankingList");


    /*
        Cabeçalho
    */

    list.innerHTML = `

        <div class="rank-row header">

            <span>#</span>

            <span>Jogador</span>

            <span>Pontos</span>

        </div>

    `;


    /*
        Se ainda não houver jogadores
    */

    if (ranking.length === 0) {

        list.innerHTML += `

            <div class="rank-row">

                <span>—</span>

                <span>
                    Nenhuma pontuação ainda
                </span>

                <strong>—</strong>

            </div>

        `;

        return;

    }


    /*
        Mostra os 10 primeiros
    */

    ranking
        .slice(0, 10)
        .forEach((item, index) => {

            list.innerHTML += `

                <div class="rank-row">

                    <span>
                        ${index + 1}
                    </span>

                    <span>
                        ${escapeHtml(item.nome)}
                    </span>

                    <strong>
                        ${item.pontos}
                    </strong>

                </div>

            `;

        });

}


/* ========================================
   PROTEGER O NOME DO JOGADOR
======================================== */

function escapeHtml(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}


/* ========================================
   MOSTRAR RANKING
======================================== */

function showRanking() {

    renderRanking();

    show("ranking");

}