let countId = 0;
let form = document.querySelector('.form');
form.addEventListener('submit', addExpenses);

let list = document.querySelector('#list');
list.addEventListener('click',updateList);


function addExpenses(event){
    event.preventDefault();
    let expenses = (event.target.expenses.value);
    let description = (event.target.description.value);
    let category = (event.target.category.value);

    let ul = document.querySelector('#list')
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = ++countId;
    // console.log(li);

    let li_expenses = document.createElement('span');
    li_expenses.className = 'li_expenses';
    li_expenses.appendChild(document.createTextNode(expenses));
    li.appendChild(li_expenses);

    let li_description = document.createElement('span');
    li_description.className = 'li_description mx-2';
    li_description.appendChild(document.createTextNode(description));
    li.appendChild(li_description);

    let li_category = document.createElement('span');
    li_category.className = 'li_category mx-2';
    li_category.appendChild(document.createTextNode(category));
    li.appendChild(li_category);

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger delete me-1 float-end';
    deleteBtn.appendChild(document.createTextNode('delete'));
    li.appendChild(deleteBtn);

    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn-primary edit me-1 float-end';
    editBtn.appendChild(document.createTextNode('edit'));
    li.appendChild(editBtn);

    ul.appendChild(li);
    let myExpense = {
        id: countId,
        expenses: expenses,
        description: description,
        category: category
    };
    localStorage.setItem(countId,JSON.stringify(myExpense));
    
    event.target.expenses.value=null;
    event.target.description.value=null;
    event.target.category.value=null;
}
function updateList(event){
    let id = event.target.parentElement.id;
    if(event.target.className.indexOf('delete')!=-1){
        list.removeChild(event.target.parentElement);
        let expenses = event.target.parentElement.querySelector('.li_expenses').textContent;
        localStorage.removeItem(id);
    }
    if(event.target.className.indexOf('edit')!=-1){
        let expenses = event.target.parentElement.querySelector('.li_expenses').textContent;
        let description = event.target.parentElement.querySelector('.li_description').textContent;
        let category = event.target.parentElement.querySelector('.li_category').textContent;

        document.querySelector('#expenses').value = expenses;
        document.querySelector('#description').value = description;
        document.querySelector('#category').value = category;
        list.removeChild(event.target.parentElement);
        localStorage.removeItem(id);
    }
}