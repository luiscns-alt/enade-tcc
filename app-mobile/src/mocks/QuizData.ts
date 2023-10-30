export const QuizDataMock = [
    {
        question: "What’s the biggest planet in our solar system?",
        options: ["Jupiter", "Saturn", "Neptune", "Mercury"],
        correct_option: "Jupiter"
    },
    {
        question: "What attraction in India is one of the famus in the world?",
        options: ["Chand Minar", "Taj Mahal", "Stadium"],
        correct_option: "Taj Mahal"
    },
    {
        question: "What land animal can open its mouth the widest?",
        options: ["Alligator", "Crocodile", "Baboon", "Hippo"],
        correct_option: "Hippo"
    },
    {
        question: "What is the largest animal on Earth?",
        options: [
            "The African elephant",
            "The blue whale",
            "The sperm whale",
            "The giant squid"
        ],
        correct_option: "The blue whale"
    },
    {
        question: "What is the only flying mammal?",
        options: ["The bat", "The flying squirrel", "The bald eagle", "The colugo"],
        correct_option: "The bat"
    }
];

const dd = {
    success: true,
    message: "QUIZ_RESPONSE_FIND_ALL_SUCCESS",
    data: [
        {
            id: "1bb13fc0-451c-4028-8382-b6ca083b709f",
            userId: "f03342c3-52af-4351-910b-b2f466934567",
            quizId: "c6a71446-c6a2-45dc-b7b1-da60c3c3403b",
            answeredAt: "2023-09-24T23:36:51.232Z",
            user: {
                id: "f03342c3-52af-4351-910b-b2f466934567",
                login: "luis_carlos",
                password: "$2b$10$j5WT",
                name: "Luis",
                surname: "Carlos",
                role: "CLIENT",
                createdAt: "2023-08-05T23:08:35.321Z",
                updatedAt: "2023-08-05T23:08:35.321Z",
                gamificationId: null
            },
            quiz: {
                id: "c6a71446-c6a2-45dc-b7b1-da60c3c3403b",
                title: "teste",
                description: "teste",
                published: true,
                createdAt: "2023-09-17T21:27:01.088Z",
                updatedAt: "2023-09-18T03:35:38.413Z",
                userId: null,
                categoryId: "a20d0888-f8c7-43a9-ab09-b2061fb479d1"
            },
            questionsResponse: [
                {
                    id: "2e4994df-ec4b-42de-bfa6-c544bffeee19",
                    quizResponseId: "1bb13fc0-451c-4028-8382-b6ca083b709f",
                    questionId: "31e57132-8b76-4cf0-8035-095634e48f42",
                    selectedAnswerId: "aa780c05-b8fe-45c5-8041-f0496a7aee44",
                    discursiveAnswer: null,
                    question: {
                        id: "31e57132-8b76-4cf0-8035-095634e48f42",
                        title: "Qual destes não é um tipo primitivo em Java?",
                        type: "OBJECTIVE",
                        image: null,
                        quizId: "c6a71446-c6a2-45dc-b7b1-da60c3c3403b",
                        answers: [
                            {
                                id: "208f7a8e-e892-4be0-a8e6-564aa6964da0",
                                text: "D) string",
                                isCorrect: true,
                                questionId: "31e57132-8b76-4cf0-8035-095634e48f42"
                            },
                            {
                                id: "2dea8f8b-b5ea-4506-89d1-488f755d69ed",
                                text: "B) float",
                                isCorrect: false,
                                questionId: "31e57132-8b76-4cf0-8035-095634e48f42"
                            },
                            {
                                id: "aa780c05-b8fe-45c5-8041-f0496a7aee44",
                                text: "A) int",
                                isCorrect: false,
                                questionId: "31e57132-8b76-4cf0-8035-095634e48f42"
                            },
                            {
                                id: "d48ac409-b703-4509-ab57-5cb59f1920da",
                                text: "E) boolean",
                                isCorrect: false,
                                questionId: "31e57132-8b76-4cf0-8035-095634e48f42"
                            },
                            {
                                id: "eac21f06-623d-4dce-9e58-44906e3ee80b",
                                text: "C) char",
                                isCorrect: false,
                                questionId: "31e57132-8b76-4cf0-8035-095634e48f42"
                            }
                        ]
                    }
                }
            ]
        }
    ],
    total: 8
};
