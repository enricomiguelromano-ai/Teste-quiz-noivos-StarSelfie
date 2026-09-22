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


/* ========================================
   TROCAR DE TELA
======================================== */

function show(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");

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


        btn.onclick = () => {

            answer(i);

        };


        box.appendChild(btn);

    });

}


/* ========================================
   RESPONDER
======================================== */

function answer(choice) {

    const correct =
        choice === questions[current].correct;


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


        document
            .getElementById("resultPoints")
            .textContent = score;


        show("result");

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