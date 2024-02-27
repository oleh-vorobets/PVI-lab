const maxRowsCount = 4;
const maxPagesCount = 6;
let currentPage = +document.querySelector('.pag-page-link--current').innerText;
let lastTriggeredStudent = null;

const tableBody = document.querySelector('.student-tbl--body');
const modalStudentForm = document.querySelector('.modal-student-content');
const modalStudentFormTitle = document.querySelector('.modal-title');
const modalDeleteWarning = document.querySelector('.modal-warning-content');

const exitBtns = document.querySelectorAll('.exit');
const cancelBtns = document.querySelectorAll('.cancel-btn');

const modalCreateOrEditBtn = document.querySelector('.create-btn');
const addStudentBtn = document.querySelector('.add-student-btn');
const modalDeleteStudentBtn = document.querySelector(
    '.modal-warning-content .delete-btn'
);

const paginationNumberBtns = document.querySelectorAll('.pag-page-link');
const paginationArrowBtns = document.querySelectorAll('.pag-btn');

// window.addEventListener('load', async () => {
//     if (navigator.serviceWorker) {
//         try {
//             const reg = await navigator.serviceWorker.register('../sw.js');
//             console.log('Service worker register success', reg);
//         } catch (err) {
//             console.log('Service worker register failed', err);
//         }
//     }

//     await configStudentsPage();
// });
async function configStudentsPage() {
    const serverResponse = await fetch(
        `/api/v1/students?page=${currentPage}&rowsCount=${maxRowsCount}`
    );

    const parsedResponse = await serverResponse.json();

    if (parsedResponse.status === 'fail') {
        return alert('Try again later!');
    }
    const parsedStudents = parsedResponse.data;

    fillTable(parsedStudents);

    modalDeleteStudentBtn.addEventListener('click', async () => {
        const serverResponse = await fetch(
            `/api/v1/students?page=${currentPage}&rowsCount=${maxRowsCount}`
        );
        fillTable(parsedStudents);
        modalDeleteWarning.style.display = 'none';
    });

    addStudentBtn.addEventListener('click', () => {
        modalStudentFormTitle.textContent = 'Add student';
        modalCreateOrEditBtn.innerText = 'Create';
        fillInputs();
        modalStudentForm.style.display = 'block';
    });

    modalCreateOrEditBtn.addEventListener('click', async () => {
        if (modalCreateOrEditBtn.innerText === 'Create') {
            const newStudent = {
                id: maxId,
                initials:
                    document.querySelector('.first-name--inp').value +
                    ' ' +
                    document.querySelector('.last-name--inp').value,
                group: document.querySelector('.group--inp').value,
                gender: document.querySelector('.gender--inp').value[0],
                birthday: document
                    .querySelector('.birthday--inp')
                    .value.split('-')
                    .reverse()
                    .join('.'),
            };
            const parsedResponse = await fetch('/api/v1/students/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            }).then((response) => response.json());
            if (parsedResponse.status === 'success') {
                ++maxId;
                parsedStudents.push(newStudent);
            } else {
                return alert(parsedResponse.message);
            }
        } else {
            const editedStudent = {
                id: +lastTriggeredStudent.cells[7].innerText,
                initials:
                    document.querySelector('.first-name--inp').value +
                    ' ' +
                    document.querySelector('.last-name--inp').value,
                group: document.querySelector('.group--inp').value,
                gender: document.querySelector('.gender--inp').value[0],
                birthday: document
                    .querySelector('.birthday--inp')
                    .value.split('-')
                    .reverse()
                    .join('.'),
            };
            const parsedResponse = await fetch('/api/v1/students/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedStudent),
            }).then((response) => response.json());
            if (parsedResponse.status === 'success') {
                parsedStudents = parsedStudents.map((student) => {
                    if (student.id === editedStudent.id) return editedStudent;
                    return student;
                });
            } else {
                return alert(parsedResponse.message);
            }
        }
        fillTable(parsedStudents);
        modalStudentForm.style.display = 'none';
    });

    exitBtns.forEach((exitButton) => {
        exitButton.onclick = () => {
            modalStudentForm.style.display = 'none';
            modalDeleteWarning.style.display = 'none';
        };
    });

    cancelBtns.forEach((cancelBtn) => {
        cancelBtn.onclick = () => {
            modalStudentForm.style.display = 'none';
            modalDeleteWarning.style.display = 'none';
        };
    });

    paginationNumberBtns.forEach((pageBtn) => {
        pageBtn.onclick = () => {
            document
                .querySelector('.pag-page-link--current')
                .classList.remove('pag-page-link--current');

            pageBtn.classList.add('pag-page-link--current');
            currentPage = +pageBtn.innerText;
            fillTable(parsedStudents);
        };
    });

    paginationArrowBtns.forEach((pageArrowBtn) => {
        pageArrowBtn.onclick = () => {
            if (pageArrowBtn.classList.contains('pag-btn-left')) {
                if (currentPage === 1) return;
                --currentPage;
                document
                    .querySelector('.pag-page-link--current')
                    .classList.remove('pag-page-link--current');

                paginationNumberBtns.forEach((btn) => {
                    if (+btn.innerText === currentPage) {
                        btn.classList.add('pag-page-link--current');
                    }
                });
            } else {
                if (currentPage === maxPagesCount) return;
                ++currentPage;
                document
                    .querySelector('.pag-page-link--current')
                    .classList.remove('pag-page-link--current');

                paginationNumberBtns.forEach((btn) => {
                    if (+btn.innerText === currentPage) {
                        btn.classList.add('pag-page-link--current');
                    }
                });
            }
            fillTable(parsedStudents);
        };
    });

    window.addEventListener(
        'click',
        (event) => {
            if (
                modalStudentForm.style.display === 'block' &&
                !modalStudentForm.contains(event.target)
            ) {
                modalStudentForm.style.display = 'none';
            } else if (
                modalDeleteWarning.style.display === 'block' &&
                !modalDeleteWarning.contains(event.target)
            ) {
                modalDeleteWarning.style.display = 'none';
            }
        },
        true
    );
}

function fillInputs(
    group = '',
    name = '',
    surname = '',
    gender = '',
    birthday = ''
) {
    document.querySelector('.group--inp').value = group;
    document.querySelector('.first-name--inp').value = name;
    document.querySelector('.last-name--inp').value = surname;
    document.querySelector('.gender--inp').value = gender;
    document.querySelector('.birthday--inp').value = birthday
        .split('.')
        .reverse()
        .join('-');
}

function fillTable(studentsArray) {
    tableBody.innerHTML = '';

    const row = document.createElement('tr');

    row.innerHTML = `    <tr>
    <th>
        <input
            type="checkbox"
            class="checkbox select-all"
            onClick="toggle(this)"
        />
        </th>
        <th>Group</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Birthday</th>
        <th>Status</th>
        <th>Options</th>
    </tr>`;

    tableBody.appendChild(row);

    for (let i = 0; i < maxRowsCount; ++i) {
        const student = studentsArray[i];

        const row = document.createElement('tr');

        if (!student) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td>
                    <input type="checkbox" class="checkbox" />
                </td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>`;
            tableBody.appendChild(emptyRow);
        } else {
            row.innerHTML = `
        <td>
            <input type="checkbox" class="checkbox" />
        </td>
        <td>${student.group}</td>
        <td>${student.first_name} ${student.last_name}</td>
        <td>${student.gender}</td>
        <td>${parseDate(student.birthday)}</td>

        <td><div class="status"></div></td>
        <td>
            <button class="edit-student">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                </svg>
            </button>
            <button class="delete-student">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </td>
        <td class="closed student-id">${student.student_id}</td>
        `;
            tableBody.appendChild(row);
        }
    }
    setTableBtnEvents();
}

function setTableBtnEvents() {
    const editBtns = document.getElementsByClassName('edit-student');
    const modalDeleteStudentBtns =
        document.getElementsByClassName('delete-student');

    Array.from(editBtns).forEach((button) => {
        button.addEventListener('click', function (event) {
            lastTriggeredStudent = event.currentTarget.closest('tr');
            modalStudentFormTitle.textContent = 'Edit student';
            modalCreateOrEditBtn.innerText = 'Save';
            fillInputs(
                lastTriggeredStudent.cells[1].innerText,
                lastTriggeredStudent.cells[2].innerText.split(' ')[0],
                lastTriggeredStudent.cells[2].innerText.split(' ')[1],
                lastTriggeredStudent.cells[3].innerText,
                lastTriggeredStudent.cells[4].innerText
            );
            modalStudentForm.style.display = 'block';
        });
    });

    Array.from(modalDeleteStudentBtns).forEach((button) => {
        button.addEventListener('click', function (event) {
            lastTriggeredStudent = event.currentTarget.closest('tr');
            const initials = lastTriggeredStudent.cells[2].innerText;

            document.querySelector(
                '.warning-text'
            ).innerText = `Are you sure you want to delete user ${initials}?`;

            modalDeleteWarning.style.display = 'block';
        });
    });
}

function parseDate(dateString) {
    let d = new Date(dateString);
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
    return d.toISOString().split('T')[0];
}

configStudentsPage();
