document.getElementById('addressForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const uf = document.getElementById('uf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const resultadoDiv = document.getElementById('resultado');
    const loading = document.getElementById('loading');

    // Limpa resultados anteriores e mostra carregamento
    resultadoDiv.innerHTML = '';
    loading.classList.remove('hidden');

    // A API do ViaCEP exige no mínimo 3 caracteres no nome da rua/cidade
    if (rua.length < 3) {
        alert("A rua deve ter pelo menos 3 caracteres.");
        loading.classList.add('hidden');
        return;
    }

    fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`)
        .then(response => response.json())
        .then(data => {
            loading.classList.add('hidden');
            
            if (data.length === 0) {
                resultadoDiv.innerHTML = '<p>Nenhum CEP encontrado para este endereço.</p>';
                return;
            }

            // Como pode retornar vários CEPs, fazemos um loop
            data.forEach(item => {
                const p = document.createElement('div');
                p.classList.add('result-item');
                p.innerHTML = `
                    <strong>CEP: ${item.cep}</strong><br>
                    ${item.logradouro} - ${item.bairro}<br>
                    ${item.localidade}/${item.uf}
                `;
                resultadoDiv.appendChild(p);
            });
        })
        .catch(error => {
            loading.classList.add('hidden');
            alert("Erro ao buscar os dados. Verifique a conexão ou os dados digitados.");
            console.error(error);
        });
});