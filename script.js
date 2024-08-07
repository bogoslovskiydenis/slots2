const symbols = ['purple-shape', 'plum', 'watermelon', 'banana', 'heart', 'green-shape', 'grapes', 'lollipop', 'apple', 'blue-shape'];

function createSlotItems() {
    const columns = document.querySelectorAll('.slot-column');
    columns.forEach(column => {
        for (let i = 0; i < 5; i++) { // Увеличим количество элементов
            const item = document.createElement('div');
            item.classList.add('slot-item');
            item.classList.add(symbols[Math.floor(Math.random() * symbols.length)]);
            column.appendChild(item);
        }
    });
}

function spinSlots() {
    const columns = document.querySelectorAll('.slot-column');
    let delays = [0, 100, 200, 300, 400, 500]; // Задержки для каждой колонки

    columns.forEach((column, index) => {
        setTimeout(() => {
            let topPosition = 0;
            const finalPosition = -1000; // Конечная позиция прокрутки
            const duration = 2000; // Длительность анимации
            const startTime = performance.now();

            function animate(currentTime) {
                const elapsedTime = currentTime - startTime;
                if (elapsedTime < duration) {
                    topPosition = easeInOutQuad(elapsedTime, 0, finalPosition, duration);
                    column.style.transform = `translateY(${topPosition}px)`;
                    requestAnimationFrame(animate);
                } else {
                    column.style.transform = 'translateY(0)';
                    for (let i = 0; i < 10; i++) {
                        const item = column.children[0];
                        column.appendChild(item);
                    }
                    if (index === columns.length - 1) {
                        setTimeout(showWinModal, 500);
                    }
                }
            }

            requestAnimationFrame(animate);
        }, delays[index]);
    });
}

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

function showWinModal() {
    document.getElementById('winModal').style.display = 'block';
}
window.onclick = function(event) {
    const modal = document.getElementById('winModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

createSlotItems();
spinSlots();