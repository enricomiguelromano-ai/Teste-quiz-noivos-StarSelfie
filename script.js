/* ========================================
   PERGUNTAS
   Banco com 30 perguntas — a cada partida,
   20 delas são sorteadas em ordem aleatória
======================================== */

const allQuestions = [

    {
        q: "Onde Arthur e Ana se conheceram?",
        a: ["Na escola", "No trabalho", "Em uma festa", "Pela internet"],
        correct: 2
    },
    {
        q: "Qual seria o destino perfeito para uma viagem do casal?",
        a: ["Praia", "Montanha", "Cidade grande", "Interior"],
        correct: 0
    },
    {
        q: "Quem provavelmente demora mais para se arrumar?",
        a: ["Arthur", "Ana", "Os dois", "Depende do evento"],
        correct: 1
    },
    {
        q: "Qual atividade combina mais com um domingo do casal?",
        a: ["Assistir filmes", "Fazer trilha", "Cozinhar juntos", "Viajar"],
        correct: 2
    },
    {
        q: "Quem provavelmente escolheria o restaurante?",
        a: ["Arthur", "Ana", "Os dois juntos", "Quem estiver com fome"],
        correct: 1
    },
    {
        q: "Qual dessas opções seria mais provável em uma comemoração?",
        a: ["Jantar especial", "Churrasco", "Festa surpresa", "Passeio"],
        correct: 0
    },
    {
        q: "Quem é mais organizado no dia a dia?",
        a: ["Arthur", "Ana", "Os dois", "Nenhum dos dois"],
        correct: 1
    },
    {
        q: "Qual estação do ano combina mais com o casal?",
        a: ["Verão", "Outono", "Inverno", "Primavera"],
        correct: 3
    },
    {
        q: "Quem cozinha melhor?",
        a: ["Arthur", "Ana", "Os dois", "Pedem delivery"],
        correct: 0
    },
    {
        q: "Qual seria o pet ideal do casal?",
        a: ["Cachorro", "Gato", "Pássaro", "Nenhum pet"],
        correct: 0
    },
    {
        q: "Quem dorme primeiro à noite?",
        a: ["Arthur", "Ana", "Os dois ao mesmo tempo", "Depende do dia"],
        correct: 3
    },
    {
        q: "Qual é o gênero de filme favorito do casal?",
        a: ["Comédia", "Romance", "Ação", "Terror"],
        correct: 1
    },
    {
        q: "Quem é mais competitivo em jogos?",
        a: ["Arthur", "Ana", "Os dois", "Nenhum dos dois"],
        correct: 0
    },
    {
        q: "Qual seria a bebida preferida em um brinde?",
        a: ["Vinho", "Champanhe", "Cerveja", "Suco"],
        correct: 1
    },
    {
        q: "Quem toma a iniciativa de marcar encontros?",
        a: ["Arthur", "Ana", "Os dois", "Depende do momento"],
        correct: 2
    },
    {
        q: "Qual seria o tema ideal para a festa de casamento?",
        a: ["Clássico e elegante", "Rústico", "Praia", "Moderno"],
        correct: 0
    },
    {
        q: "Quem é mais aventureiro?",
        a: ["Arthur", "Ana", "Os dois igualmente", "Nenhum dos dois"],
        correct: 2
    },
    {
        q: "Qual música não pode faltar na festa?",
        a: ["Uma romântica", "Uma animada pra dançar", "Um clássico", "Surpresa do DJ"],
        correct: 3
    },
    {
        q: "Quem chega primeiro nos compromissos?",
        a: ["Arthur", "Ana", "Os dois", "Depende do compromisso"],
        correct: 1
    },
    {
        q: "Qual seria o presente de casamento mais desejado?",
        a: ["Viagem", "Eletrodomésticos", "Dinheiro", "Uma experiência juntos"],
        correct: 3
    },
    {
        q: "Quem resolve imprevistos com mais calma?",
        a: ["Arthur", "Ana", "Os dois", "Nenhum dos dois"],
        correct: 0
    },
    {
        q: "Qual seria a lua de mel dos sonhos?",
        a: ["Praia paradisíaca", "Europa", "Aventura na natureza", "Cidade grande"],
        correct: 1
    },
    {
        q: "Quem é o mais romântico do casal?",
        a: ["Arthur", "Ana", "Os dois igualmente", "Depende do dia"],
        correct: 2
    },
    {
        q: "Qual doce não pode faltar na festa?",
        a: ["Bolo tradicional", "Brigadeiro", "Docinhos variados", "Todos eles"],
        correct: 3
    },
    {
        q: "Quem faz mais planos para o futuro?",
        a: ["Arthur", "Ana", "Os dois juntos", "Vão vendo com o tempo"],
        correct: 2
    },
    {
        q: "Qual seria o hobby que os dois fariam juntos?",
        a: ["Dançar", "Cozinhar", "Viajar", "Jogar"],
        correct: 2
    },
    {
        q: "Quem costuma ceder numa discussão?",
        a: ["Arthur", "Ana", "Os dois", "Depende do assunto"],
        correct: 3
    },
    {
        q: "Qual seria a decoração ideal da festa?",
        a: ["Flores e velas", "Luzes e brilho", "Simples e elegante", "Rústico e aconchegante"],
        correct: 0
    },
    {
        q: "Quem é mais caseiro?",
        a: ["Arthur", "Ana", "Os dois", "Nenhum dos dois"],
        correct: 1
    },
    {
        q: "Qual é o maior sonho do casal para o futuro?",
        a: ["Construir uma casa", "Viajar o mundo", "Formar uma família", "Todos acima"],
        correct: 3
    }

];


/*
    A cada partida, 20 dessas 30 perguntas
    são sorteadas em ordem aleatória
*/

let questions = [];


function shuffleArray(arr) {

    const copy = arr.slice();


    for (let i = copy.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];

    }


    return copy;

}


/* ========================================
   VARIÁVEIS
======================================== */

let current = 0;

let score = 0;

let player = "";

let audioCtx = null;

let timerInterval = null;

let timeLeft = 0;

const TIME_PER_QUESTION = 15;


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
            [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.5],
            0.15,
            "triangle",
            0.28
        );

    }

    else if (type === "whoosh") {

        playWhoosh();

    }

}


function playWhoosh() {

    try {

        const ctx = getAudioCtx();

        const osc = ctx.createOscillator();

        const gain = ctx.createGain();

        const filter = ctx.createBiquadFilter();


        filter.type = "lowpass";

        filter.frequency.value = 1200;


        osc.type = "sawtooth";

        osc.frequency.setValueAtTime(700, ctx.currentTime);

        osc.frequency.exponentialRampToValueAtTime(
            120,
            ctx.currentTime + 0.35
        );


        gain.gain.setValueAtTime(0.12, ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + 0.35
        );


        osc.connect(filter);

        filter.connect(gain);

        gain.connect(ctx.destination);


        osc.start();

        osc.stop(ctx.currentTime + 0.35);

    } catch (e) {

        /* áudio indisponível, ignora silenciosamente */

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


    const shapes = ["shape-circle", "shape-square", "shape-ribbon"];


    for (let i = 0; i < count; i++) {

        const piece = document.createElement("div");

        piece.className =
            "confetti-piece " +
            shapes[Math.floor(Math.random() * shapes.length)];

        piece.style.left = Math.random() * 100 + "%";

        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (1.6 + Math.random() * 1.4) + "s";

        piece.style.animationDelay =
            (Math.random() * 0.35) + "s";

        piece.style.setProperty(
            "--rot",
            (Math.random() * 360 + 180) + "deg"
        );

        piece.style.setProperty(
            "--sway",
            (Math.random() * 120 - 60) + "px"
        );

        container.appendChild(piece);

    }


    setTimeout(() => container.remove(), 3400);

}


/* ========================================
   FOGOS DE ARTIFÍCIO (canvas)
======================================== */

function launchFireworks(duration) {

    const canvas = document.getElementById("fireworksCanvas");

    if (!canvas) return;


    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

    canvas.style.display = "block";


    const colors = [
        "#C8A96B", "#E5D2A5", "#FFFFFF",
        "#4CAF50", "#E05353", "#F7F3EC"
    ];


    let particles = [];

    let running = true;

    const endTime = performance.now() + (duration || 2600);


    function burst(x, y) {

        const color =
            colors[Math.floor(Math.random() * colors.length)];

        const count = 34;


        for (let i = 0; i < count; i++) {

            const angle = (Math.PI * 2 * i) / count;

            const speed = 2 + Math.random() * 3.2;


            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color
            });

        }

    }


    const burstInterval = setInterval(() => {

        if (performance.now() > endTime) {

            clearInterval(burstInterval);

            return;

        }


        burst(
            canvas.width * (0.2 + Math.random() * 0.6),
            canvas.height * (0.18 + Math.random() * 0.35)
        );

    }, 420);


    burst(canvas.width * 0.5, canvas.height * 0.28);


    function frame() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);


        particles.forEach(p => {

            p.x += p.vx;

            p.y += p.vy;

            p.vy += 0.045;

            p.life -= 0.012;


            ctx.globalAlpha = Math.max(p.life, 0);

            ctx.fillStyle = p.color;

            ctx.beginPath();

            ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);

            ctx.fill();

        });


        particles = particles.filter(p => p.life > 0);


        ctx.globalAlpha = 1;


        if (running) {

            requestAnimationFrame(frame);

        }

    }


    frame();


    setTimeout(() => {

        running = false;

        clearInterval(burstInterval);


        setTimeout(() => {

            canvas.style.display = "none";

            ctx.clearRect(0, 0, canvas.width, canvas.height);

        }, 900);

    }, duration || 2600);

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

    startCursorTrail();

    setupCardTilt();


    setTimeout(() => playSound("whoosh"), 500);

});


/* ========================================
   RASTRO DE BRILHO DO CURSOR / TOQUE
======================================== */

function startCursorTrail() {

    let lastSpawn = 0;


    function spawnTrail(x, y) {

        const now = performance.now();

        if (now - lastSpawn < 45) return;

        lastSpawn = now;


        const dot = document.createElement("div");

        dot.className = "trail-sparkle";

        dot.style.left = x + "px";

        dot.style.top = y + "px";

        document.body.appendChild(dot);


        setTimeout(() => dot.remove(), 700);

    }


    window.addEventListener("pointermove", e => {

        spawnTrail(e.clientX, e.clientY);

    });

}


/* ========================================
   TILT 3D DO CARD
======================================== */

function setupCardTilt() {

    document.addEventListener("pointermove", e => {

        const card = document.querySelector(".screen.active .card");

        if (!card) return;


        const rect = card.getBoundingClientRect();

        const relX = (e.clientX - rect.left) / rect.width - 0.5;

        const relY = (e.clientY - rect.top) / rect.height - 0.5;


        /*
            Só aplica o tilt quando o
            ponteiro está sobre o card
        */

        if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        ) {

            card.style.setProperty("--tilt-x", relX * 6 + "deg");

            card.style.setProperty("--tilt-y", relY * -6 + "deg");

        }

        else {

            card.style.setProperty("--tilt-x", "0deg");

            card.style.setProperty("--tilt-y", "0deg");

        }

    });

}


/* ========================================
   EFEITO MÁQUINA DE ESCREVER
======================================== */

function typeWriter(el, text, speed) {

    el.textContent = "";

    const cursor = document.createElement("span");

    cursor.className = "typing-cursor";

    cursor.textContent = "\u00A0";


    let i = 0;


    function step() {

        if (i < text.length) {

            el.textContent = text.slice(0, i + 1);

            el.appendChild(cursor);

            i++;

            setTimeout(step, speed || 22);

        }

        else {

            cursor.remove();

        }

    }


    step();

}


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


    /*
        Sorteia 20 das 30 perguntas,
        em ordem aleatória
    */

    questions = shuffleArray(allQuestions).slice(0, 20);


    renderQuestion();

    show("quiz");

}


/* ========================================
   TEMPO POR PERGUNTA
======================================== */

function startTimer() {

    clearTimer();


    timeLeft = TIME_PER_QUESTION;

    updateTimerUI();


    timerInterval = setInterval(() => {

        timeLeft--;

        updateTimerUI();


        if (timeLeft <= 0) {

            clearTimer();

            handleTimeout();

        }

        else if (timeLeft <= 5) {

            playSound("click");

        }

    }, 1000);

}


function clearTimer() {

    if (timerInterval) {

        clearInterval(timerInterval);

        timerInterval = null;

    }

}


function updateTimerUI() {

    const fill = document.getElementById("timerFill");

    const text = document.getElementById("timerText");


    if (!fill || !text) return;


    const safeTime = Math.max(timeLeft, 0);

    const pct = (safeTime / TIME_PER_QUESTION) * 100;


    fill.style.width = pct + "%";

    text.textContent = safeTime + "s";


    fill.classList.toggle(
        "timer-warning",
        timeLeft <= 5 && timeLeft > 0
    );

    fill.classList.toggle(
        "timer-danger",
        timeLeft <= 0
    );

}


function handleTimeout() {

    const allButtons =
        document.querySelectorAll("#answers .answer");

    allButtons.forEach(b => (b.disabled = true));


    const card =
        document.querySelector(".screen.active .card");

    if (card) {

        card.classList.add("shake");

        setTimeout(() => card.classList.remove("shake"), 500);

    }


    playSound("wrong");


    setTimeout(() => {

        showFeedback(false, 0, true);

    }, 400);

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


    typeWriter(
        document.getElementById("question"),
        item.q,
        18
    );


    startTimer();


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

function spawnPointPopup(btnEl, text) {

    const rect = btnEl.getBoundingClientRect();

    const popup = document.createElement("div");

    popup.className = "point-popup";

    popup.textContent = text;

    popup.style.left = (rect.left + rect.width / 2 - 20) + "px";

    popup.style.top = (rect.top - 10) + "px";


    document.body.appendChild(popup);


    setTimeout(() => popup.remove(), 1050);

}

function answer(choice, btnEl) {

    clearTimer();


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

        spawnPointPopup(btnEl, "+100");

    }

    else {

        btnEl.classList.add("wrong-flash");


        const card = document.querySelector(".screen.active .card");

        if (card) {

            card.classList.add("shake");

            setTimeout(() => card.classList.remove("shake"), 500);

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

function showFeedback(correct, points, timedOut) {

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

    else if (timedOut) {

        icon.textContent = "⏰";

        title.textContent = "Tempo esgotado!";

        pointsText.textContent =
            "Você não ganhou pontos nesta rodada.";

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

            launchFireworks(2800);

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

    const medals = ["medal-gold", "medal-silver", "medal-bronze"];

    const medalIcons = ["🥇", "🥈", "🥉"];


    ranking
        .slice(0, 10)
        .forEach((item, index) => {

            const medalClass = medals[index] || "";

            const medalIcon = medalIcons[index] || (index + 1);


            list.innerHTML += `

                <div class="rank-row ${medalClass}" style="animation-delay:${index * 0.07}s">

                    <span>
                        ${medalIcon}
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