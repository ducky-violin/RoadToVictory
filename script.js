const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    //adds states from options and overrides existing, returns new object
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "Who are you?",
        options: [
            {
                text: "Main character",
                setState: { role: "main char"},
                nextText: 1.1
            },
            {
                text: "Side character",
                setState: { role: "side char"},
                nextText: 2.1
            },
            {
                text: "Nobody",
                setState: { role: "void char"},
                nextText: 3.1
            },
        ]
    },
    //SELECTION 2-------------------------------------------------------------
    {
        id: 1.1,
        text: "You're a main character? Great, go save the world! Here's a sword and some armor. \n[You obtained \"Edgy Sword\" and \"Plot Armor\"]",
        options: [
            {
                text: "[Explore]",
                nextText: 1.2
            },
        ]
    },
    {
        id: 2.1,
        text: "You're a side character? Cool. To become plot-relevant, start by becoming friends with potential main characters. Start by looking around town!",
        options: [
            {
                text: "[Look around town]",
                nextText: 2.2
            },
        ]
    },
    {
        id: 3.1,
        text: "Hey, don't say that about yourself! :c",
        options: [
            {
                text: "[Fine...]",
                nextText: 3.2,
            },
        ]
    },
    {
        id: 3.2,
        text: "You're kind of a spectator. Why don't you wander around town for a bit?",
        options: [
            {
                text: "[Explore town]",
                nextText: 3.3,
            },
        ]
    },
    //SELECTION 3-----------------ROLES BRANCH OUT---------------------------------------
    {
        id: 1.2,
        text: "There is a forest to the east of town and the river to the south. Where would you like to travel?",
        options: [
            {
                text: "Explore the forest.",
                //requiredState: (currentState) => (currentState.role == "main char"),
                nextText: 1.3
            },
            {
                text: "Head toward the river.",
                nextText: 1.4
            },
            {
                text: "Nothing, just wander around town.",
                setState: { initiative: -1 },
                nextText: 1.5
            },
        ]
    },
    {
        id: 1.3,
        text: "You enter the forest and you see a cat.",
        options: [
            {
                text: "Pet the cat",
                setState: { cat_friend: 1 },
                nextText: 1.6
            },
            {
                text: "Talk to the cat",
                setState: { cat_friend: 2 },
                nextText: 1.7
            },
            {
                text: "Ignore the cat",
                setState: { cat_friend: 0 },
                nextText: 1.8
            },
        ]
    },
    {
        id: 2.2,
        text: "You wander around town and see two potential main characters: "
            + "a confuddled Calculus student in a mage costume and a boisterous trumpet player in track spikes.",
        options: [
            {
                text: "Talk to the mage.",
                setState: { friend: "mage" },
                nextText: 2.3
            },
            {
                text: "Talk to the trumpet player.",
                setState: { friend: "trumpet player" },
                nextText: 2.4
            },
            {
                text: "Uhh, what? I'm not stepping a foot near those lunatics.",
                setState: { friend: "none" },
                nextText: 2.5
            },
        ]
    },
    {
        id: 3.3,
        text: "You wander around town and find a cat.",
        options: [
            {
                text: "Pet the cat",
                setState: { cat_friend: 1 },
                nextText: 3.4
            },
            {
                text: "Talk to the cat",
                setState: { cat_friend: 2 },
                nextText: 3.5
            },
            {
                text: "Ignore the cat",
                setState: { cat_friend: 0 },
                nextText: 3.6
            },
        ]
    },
]

startGame()