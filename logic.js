const draggable_list = document.querySelector('#draggable-list');
const check = document.querySelector('#check')

const bestPlayers = ["Ken Griffey JR", "Edgar Martinez", "Ichiro Suzuki", "Felix Hernandez", "Randy Johnson", "James Paxton", "Nelson Cruz", "Alex Rodriguez", "Edwin Diaz", "Dan Wilson"]

const listItems = [];

let dragStartIndex;

createList();

//Create list items into DOM
function createList() {

    [...bestPlayers]
        //Changes array into an object with a value and sort #
        .map(a => ({ value: a, sort: Math.random() }))
        //Then uses sort value of object with random number to scramble order
        .sort((a, b) => a.sort - b.sort)
        //Then put object back into an array of strings randomized
        .map(a => a.value)
        //Loops through strings and formats onto DOM
        .forEach((person, index) => {
            const listItem = document.createElement('li')
            listItem.setAttribute('data-index', index);
            listItem.innerHTML =
                `<span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>`;

            listItems.push(listItem)
            draggable_list.appendChild(listItem)
        })

    addEventListeners()
};

function dragStart() {
    // console.log('Event: ', 'dragstart')
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex)
}
function dragEnter() {
    // console.log('Event: ', 'dragEnter')
    this.classList.add('over')
}
function dragLeave() {
    // console.log('Event: ', 'dragLeave')
    this.classList.remove('over')
}
function dragDrop() {
    // console.log('Event: ', 'dragDrop')
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove('over');
}
//Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')
    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)

}

function dragOver(e) {
    e.preventDefault();
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}
//Check the order of list items on button click
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim()

        personName !== bestPlayers[index] ? listItem.classList.add('wrong') : listItem.classList.remove('wrong'), listItem.classList.add('right')
    })

}

check.addEventListener('click', checkOrder)