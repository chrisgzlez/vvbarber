const generatePriceList = (json) => {
    const main = document.getElementsByTagName("main")[0];
    let i = 0;
    for (obj of json) {
        let section = document.createElement("section");
        section.setAttribute("id", obj.id);

        let div = document.createElement("div");
        div.classList.add("texto");

        let h2 = document.createElement("h2");
        h2.innerText = obj.titulo;

        let ul = document.createElement("ul");
        for (svc of obj.servicios) {
            let li = document.createElement("li");
            li.innerHTML = `
        <p class="corte-title">${svc.titulo}</p>
        <p class="corte-precio">${svc.precio}</p>
      `;
            ul.appendChild(li);
        }

        div.appendChild(h2);
        div.appendChild(ul);

        let figure = document.createElement("figure");
        figure.innerHTML = `<img src="${obj.imagen}" alt="${obj.titulo}" width="500px" height="750px" />`;

        // Estilo para los pares (fondo claro)
        // e estilo para los impares (fomdo oscuro)
        if (i % 2 === 0) {
            section.appendChild(div);
            section.appendChild(figure);
        } else {
            section.classList.add("bg-dark");
            div.classList.add("light");
            section.appendChild(figure);
            section.appendChild(div);
        }

        main.appendChild(section);
        console.log("Processing index: ", i);
        console.log(section);
        i++;
    }
};

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const jsonData = JSON.parse(xhr.responseText);
        console.log(jsonData);
        generatePriceList(jsonData);
    }
};

xhr.open("GET", "/data/prices.json", true);
xhr.send();
