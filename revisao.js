// Alternar entre os formulários de Login e Registro
function toggleRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
    document.getElementById("registerTitle").innerText = "Registro de usuário";
}

function toggleLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("loginTitle").innerText = "Login de Usuário";
    
    // Esconder todos os formulários e mostrar apenas o de login
    document.getElementById("forgotPasswordForm").classList.add("hidden");
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}

// Alternar entre Esqueceu a Senha e Login
function toggleForgotPassword() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("forgotPasswordForm").classList.remove("hidden");
}


function register() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("Usuário já registrado.");
    } else {
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registrado com sucesso!");
        toggleLogin();
    }
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Login bem-sucedido!");

        // Salva o e-mail do usuário no sessionStorage
        sessionStorage.setItem("loggedInUser", email);

        // Redireciona para fora do iframe
        window.top.location.href = "indexlogado.html";
    } else {
        alert("Credenciais inválidas.");
    }
}

function revealPassword() {
    const email = document.getElementById("forgotEmail").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === email);

    if (user) {
        alert(`Sua senha é: ${user.password}`);
    } else {
        alert("Usuário não encontrado.");
    }
}

function resetPassword() {
    const email = document.getElementById("forgotEmail").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(user => user.email === email);
    
    if (userIndex !== -1) {
        // Solicita que o usuário digite a nova senha
        const newPassword = prompt("Digite a nova senha:");

        // Valida se o usuário digitou uma nova senha
        if (newPassword && newPassword.trim() !== "") {
            users[userIndex].password = newPassword; // Atualiza a senha no banco de dados local (localStorage)
            localStorage.setItem("users", JSON.stringify(users));
            alert("Senha alterada com sucesso!");

            // Esconder todos os formulários e mostrar apenas o de login
            document.getElementById("forgotPasswordForm").classList.add("hidden");
            document.getElementById("registerForm").classList.add("hidden");
            document.getElementById("loginForm").classList.remove("hidden");
        } else {
            alert("Por favor, digite uma senha válida.");
        }
    } else {
        alert("Usuário não encontrado.");
    }
}

// Função para abrir o modal
function openModal() {
    document.getElementById('modal').style.display = 'flex'; // Abre o modal
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('modal').style.display = 'none'; // Fecha o modal
}

// Fecha o modal se o usuário clicar fora do conteúdo do modal
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function logout() {

    sessionStorage.removeItem("loggedInUser");

    // Atualizar o nome no header
    const headerLoginLink = document.getElementById('headerLoginLink');
    headerLoginLink.innerText = "Bem-vindo, Usuário"; 


    window.location.href = "index.html"; 
}


window.onload = function() {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const headerLoginLink = document.getElementById('headerLoginLink');

    if (loggedInUser) {
        headerLoginLink.innerText = `Bem-vindo, ${loggedInUser}`;
    } else {
        headerLoginLink.innerText = "Bem-vindo, Usuário"; 
    }
};
