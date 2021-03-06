import { BLOCK_SIZE, COLUMNS, ROWS } from "../script.js";

export class View {

    constructor(container) {
        this.container = container;
        this.preview();
    }

    colors = {
        J: 'red',
        I: 'orange',
        O: 'yellow',
        L: 'green',
        2: 'lightblue',
        T: 'blue',
        S: 'violet'
    }
    
    canvas = document.createElement('canvas');

    preview() {
        this.container.textContent = '';
        const preview = document.createElement('div');
        preview.innerHTML = 'Press "Enter" to start';
        preview.style.cssText = `
        border: 2px solid indigo;
        font-size: 20px;
        text-align: center;
        padding: 50px;
        grid-column: 1 / 3;
        color: indigo;
        `;
        this.container.append(preview);
    }
    
    createBlockScore() {
        const scoreBlock = document.createElement('div');
        scoreBlock.style.cssText = `
            border: 2px solid indigo;
            font-size: 20px;
            text-align: center;
            padding: 20px;
            grid-area: score;
        `;

        const linesElem = document.createElement('p');
        const scoreElem = document.createElement('p');
        const levelElem = document.createElement('p');
        const recordElem = document.createElement('p');

        scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);
        this.container.append(scoreBlock);

        return (lines, score, level, record) => {
            linesElem.textContent =`lines: ${lines}`;
            scoreElem.textContent =`score: ${score}`;
            levelElem.textContent =`level: ${level}`;
            recordElem.textContent =`record: ${record}`;
        }
    }

    createBlockNextTetramino() {
        const tetraminoBlock = document.createElement('div');
        tetraminoBlock.style.cssText = `
            width: ${BLOCK_SIZE * 4}px;
            height: ${BLOCK_SIZE * 4}px;
            border: 2px solid indigo;
            padding: 10px;
            grid-area: next;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        tetraminoBlock.append(canvas);
        this.container.append(tetraminoBlock);

        return (tetramino) => {
            canvas.width = BLOCK_SIZE * tetramino.length;
            canvas.height = BLOCK_SIZE * tetramino.length;
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let y = 0; y < tetramino.length; y++) {
                const line = tetramino[y];
        
                for (let x = 0; x < line.length; x++) {
                    const block = line[x];
                    if (block !== 'o') {
                        context.fillStyle = this.colors[block];
                        context.strokeStyle = 'white';
                        context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    }
                }
            }
        }
    }

    init() {
        this.container.textContent = '';
        this.canvas.style.gridArea = 'game';
        this.canvas.classList.add('game-area');
        this.container.append(this.canvas);
        this.canvas.width = BLOCK_SIZE * COLUMNS;
        this.canvas.height = BLOCK_SIZE *ROWS;
    }

    showArea(area) {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < area.length; y++) {
            const line = area[y];
    
            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                if (block !== 'o') {
                    context.fillStyle = this.colors[block];
                    context.strokeStyle = 'white';
                    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }
    }
}