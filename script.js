let input = document.getElementById("curp");
let boton = document.getElementById("boton_buscar");
let csvArray = [];

document.getElementById("fileInput").addEventListener("change", function (event) {
    const arch = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const csvString = e.target.result;
        csvArray = csvString
            .split('\n')
            .map(line => line.split(',')); 

        console.log(csvArray); 
    };

    reader.readAsText(arch);
});

boton.addEventListener("click", function() {
    let curpInput = input.value.toUpperCase().trim(); 

    if (curpInput.length > 18) {
        alert("El texto que introdujiste es demasiado largo.");
        return;
    } else if (curpInput.length < 18) {
        alert("El texto que introdujiste es demasiado corto.");
        return;
    }

    let izq = 0; 
    let der = csvArray.length - 1; 
    let encontrado = false;

    while (izq <= der) {
        let mid = Math.floor((izq + der) / 2);
        let curpActual = csvArray[mid][0].toUpperCase().trim(); 

        if (curpActual === curpInput) {
            alert("CURP encontrado en la línea " + (mid + 1) + ": " + csvArray[mid].join(', '));  
            encontrado = true;
            break;
        } else if (curpInput < curpActual) {
            der = mid - 1;
        } else {
            izq = mid + 1;
        }
    }

    if (!encontrado) {
        alert("CURP no encontrado.");
    }
});