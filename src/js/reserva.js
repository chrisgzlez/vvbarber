const publishFormulario = () => {
    alert("Formulario publicado");
};

const loadAvailableHours = (xmlDoc) => {
    // Get Selected Date for Comparison
    let selectedDate = document.getElementsByName("fechaCita")[0];
    let [selYear, selMonth, selDay] = selectedDate.value.split("-");
    selectedDate = new Date(selYear, selMonth - 1, selDay);

    // Get Current date and time for comparison
    const today = new Date();
    let [day, hrs, min] = [today.getDay(), today.getHours(), today.getMinutes()];

    const isToday =
        today.getFullYear() === selectedDate.getFullYear() &&
        today.getMonth() === selectedDate.getMonth() &&
        today.getDate() === selectedDate.getDate();

    // Proccess XML Document
    let timeSlots = xmlDoc.querySelectorAll("weekday slot");
    if (selectedDate.getDay() === 6) {
        timeSlots = xmlDoc.querySelectorAll("saturday slot");
    }

    // Get selection form and empty it
    let selectionForm = document.getElementsByName("horaCita")[0];
    selectionForm.innerHTML = "<option selected>Selecciona Hora de la Cita</option>";

    let index = 0;
    for (slot of timeSlots) {
        let slot = timeSlots[index];
        let start = slot.querySelector("start").textContent;
        let [h, m] = start.split(":");

        // If is today
        // muestra horas superiores a la actual
        // En caso de ser igual, los minutos tienen que ser superiores
        if (isToday && (h < hrs || (h == hrs && m < min))) {
            continue;
        }
        let end = slot.querySelector("end").textContent;

        // Create option with new values and append it to selection form
        let option = document.createElement("option");
        option.setAttribute("value", `${start}-${end}`);
        option.innerText = `${start}-${end}`;
        selectionForm.appendChild(option);
        index++;
    }

    // If only one child means there are no available dates
    if (selectionForm.childNodes.length === 1) {
        selectionForm.innerHTML = "<option selected>No Available Hours on this date</option>";
        selectionForm.classList.add("disabled");
        selectionForm.setAttribute("disabled", "self");
    }
};

const enableFormField = (fieldName) => {
    let field = document.getElementsByName(fieldName)[0];
    if (!field.hasAttribute("disabled")) {
        field.setAttribute("disabled", "disabled");
    }
    field.removeAttribute("disabled");
    field.classList.remove("disabled");
    field.classList.add("flash");
    field.addEventListener("animationend", function () {
        field.classList.remove("flash");
    });
};

const isValidDate = (fieldName) => {
    let field = document.getElementsByName(fieldName)[0];
    let [year, month, day] = field.value.split("-");
    let inputDate = new Date(year, month - 1, day);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let isValid = inputDate >= today && inputDate.getDay() != 0;
    if (!isValid) {
        field.classList.add("error-shake");
        field.addEventListener("animationend", function (event) {
            field.classList.remove("error-shake");
        });
    }
    return isValid;
};

const hoursSelect = document.getElementsByName("horaCita")[0];
// Load Valid Hourse after day selection
// Create a MutationObserver instance
const observer = new MutationObserver(function (mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === "attributes") {
            // Check if the 'disabled' attribute has been modified
            if (mutation.attributeName === "disabled" && mutation.target.getAttribute("disabled") !== "self") {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "/data/hours.xml", true);

                // Set up a callback function to handle the response
                xhr.onreadystatechange = function () {
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(this.responseText, "application/xml");
                        loadAvailableHours(xmlDoc);
                    }
                };

                // Send the request
                xhr.send();
            }
        }
    }
});

observer.observe(hoursSelect, { attributes: true });

document.getElementsByTagName("form")[0].addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const form = new FormData(event.target); // Using 'this'
    const formValues = {};
    for (const [key, value] of form.entries()) {
        formValues[key] = value;
    }
    console.log(formValues);
    alert(`
    Reservada Cita para el ${formValues.fechaCita} a las ${formValues.horaCita}\n
    Cliente: ${formValues.clientName} ${formValues.clientApellidos}\n
    Barbero: ${formValues.barber}
    `);
});
