const firebaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
    storageBucket: ""
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


// Lógica da revelação da senha (usei a biblioteca de icons do Bootstrap)
function showPassword() {
    let inputPassword = document.getElementById('inputPassword');
    let eyeShowPassword = document.getElementById('eyePassword1');
    let inputPassword2 = document.getElementById('inputConfirmPassword');
    let eyeShowPassword2 = document.getElementById('eyePassword2');

    if (inputPassword.type === 'password') {
        inputPassword.setAttribute('type', 'text');
        inputPassword2.setAttribute('type', 'text');
        eyeShowPassword.setAttribute('class', 'bi bi-eye-slash');
        eyeShowPassword2.setAttribute('class', 'bi bi-eye-slash');
    } else {
        inputPassword.setAttribute('type', 'password');
        inputPassword2.setAttribute('type', 'password');
        eyeShowPassword.setAttribute('class', 'bi bi-eye');
        eyeShowPassword2.setAttribute('class', 'bi bi-eye');
    }
}

// Verificação se os inputs estão recebendo os dados corretamente

let nome = document.querySelector('#inputName');
let labelNome = document.querySelector('#labelName');
let validNome = false;

let email = document.querySelector('#inputEmail');
let labelEmail = document.querySelector('#labelEmail');
let validEmail = false;

let password = document.querySelector('#inputPassword');
let labelPassword = document.querySelector('#labelPassword');
let validPassword = false;

let password2 = document.querySelector('#inputConfirmPassword');
let labelPassword2 = document.querySelector('#labelPassword2');

nome.addEventListener('input', () => {
    if (nome.value.length <= 4) {
        labelNome.setAttribute('style', 'color: red');
        labelNome.innerText = 'Nome: *Mínimo 5 caracteres';
        validNome = false;
    } else {
        labelNome.setAttribute('style', 'color: green');
        labelNome.innerText = 'Nome:';
        validNome = true;
    }
})

email.addEventListener('input', () => {
    let emailValue = email.value;
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(emailValue)) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = 'E-mail: *Insira um e-mail válido';
        validEmail = false;
    } else {
        labelEmail.setAttribute('style', 'color: green');
        labelEmail.innerHTML = 'E-mail';
        validEmail = true;
    }
});

password.addEventListener('input', () => {
    if (password.value.length <= 5) {
        labelPassword.setAttribute('style', 'color: red');
        labelPassword.innerText = 'Senha: *Digite uma senha forte!';
        validPassword = false;
    }
    else if (password.value === password2.value) {
        labelPassword.setAttribute('style', 'color: green');
        labelPassword.innerText = 'Senha:';
        labelPassword2.setAttribute('style', 'color: green');
        validPassword = true;
    }
    else {
        labelPassword.setAttribute('style', 'color: red');
        labelPassword.innerText = 'Senha: *As senhas não são iguais';
        labelPassword2.setAttribute('style', 'color: red');
        validPassword = false;
    }
});

password2.addEventListener('input', () => {
    if (password2.value === password.value) {
        labelPassword.setAttribute('style', 'color: green');
        labelPassword.innerText = 'Senha:';
        labelPassword2.setAttribute('style', 'color: green');
        validPassword = true;
    }
    else {
        labelPassword.setAttribute('style', 'color: red');
        labelPassword.innerText = 'Senha: *As senhas não são iguais';
        labelPassword2.setAttribute('style', 'color: red');
        validPassword = false;
    }
});

// Validação dos inputs

function validation() {
    let loginName = document.getElementById('inputName').value;
    let loginEmail = document.getElementById('inputEmail').value;
    let loginPassword = document.getElementById('inputPassword').value;
    let loginPassword2 = document.getElementById('inputConfirmPassword').value;

    let allValid = false;

    if (validNome === true && validEmail === true && validPassword === true) {
        allValid = true;
    } else {
        allValid = false;
    }

    if (loginName.trim() !== '' && loginEmail.trim() !== '' && loginPassword.trim() !== '' && loginPassword2.trim() !== '' && allValid === true) {

        // Mensagem de sucesso
        msgSuccess.setAttribute('style', 'display: block');
        msgSuccess.innerText = 'Dados cadastrados com sucesso!';
        msgError.setAttribute('style', 'display: none');
        msgError.innerText = '';

        // Cadastrando no Firebase Authentication
        auth.createUserWithEmailAndPassword(loginEmail, loginPassword)
            .then((userCredential) => {
                const user = userCredential.user;

                // Cadastrando no Firestore Database
                db.collection('users').add({
                    name: loginName,
                    email: loginEmail,
                    password: loginPassword,
                    UserID: user.uid,
                    admin: false
                })
                    .then(() => {
                        console.log("Usuário cadastrado no banco de dados");
                    })
                    .catch((error) => {
                        console.error("Erro ao gravar o documento: ", error);
                    });

                setTimeout(() => {
                    window.location.href = "adminlist.html";
                }, 2000);

                return user.updateProfile({
                    displayName: loginName
                });
            })
            .then(() => {
                const updatedUser = firebase.auth().currentUser;
                console.log(updatedUser);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    }
    else {
        // Mensagem de erro
        msgError.setAttribute('style', 'display: block');
        msgError.innerText = 'Preencha todos os campos!';
        msgSuccess.innerText = '';
        msgSuccess.setAttribute('style', 'display: none');
    }
}