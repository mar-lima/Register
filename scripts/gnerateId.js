// Armazena os IDs gerados
let generatedIds = [];

function generateUniqueId() {
    let newId;

    // Gera um número aleatório entre 1000 e 9999
    do {
        newId = Math.floor(Math.random() * 9) + 1;
    } while (generatedIds.includes(newId)); 
    generatedIds.push(newId);

    return newId;
}

// Testando o gerador
console.log(generateUniqueId()); // Outro ID único

