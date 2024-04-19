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
const storage = firebase.storage();

// Utilizando dinamicamente a interface do usuário.
auth.onAuthStateChanged((user) => {
    if (user) {
        // Coletando informações do usuário autenticado.
        const displayName = user.displayName;

        // Buscando o ID da subcoleção no Firebase Database do usuário autenticado pelo Auth.
        const nameSearched = displayName;
        const usersCollectionRef = db.collection('users');

        usersCollectionRef.where('name', '==', nameSearched).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const docID = doc.id;

                    // Acessando o documento do usuário.
                    const userDocRef = usersCollectionRef.doc(docID);

                    userDocRef.get()
                        .then((userDoc) => {
                            if (userDoc.exists) {
                                const admin = userDoc.data().admin;

                                // Criando o "Botão" de Admin.
                                if (admin === true) {
                                    const navigation = document.querySelector('.main-navigation');
                                    const newdiv = document.createElement('div');
                                    const anchor = document.createElement('a');
                                    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                                    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                                    const backgroundImg = document.createElement('img');

                                    newdiv.className = 'admin';
                                    anchor.id = 'text-admin';
                                    anchor.href = 'admin.html';
                                    anchor.innerText = 'ADMIN';
                                    anchor.style.color = '#002794';
                                    icon.id = 'img-admin';
                                    icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                                    icon.setAttribute('width', '16');
                                    icon.setAttribute('height', '16');
                                    icon.setAttribute('fill', '#002794');
                                    icon.classList.add('bi', 'bi-person-gear');
                                    icon.setAttribute('viewBox', '0 0 16 16');
                                    iconPath.setAttribute('d', 'M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0');
                                    backgroundImg.src = 'images/nav-select.png';
                                    backgroundImg.className = 'background-adm';

                                    icon.append(iconPath);
                                    newdiv.append(anchor, icon, backgroundImg);
                                    navigation.appendChild(newdiv);

                                    // Admin responsividade Mobile
                                    const sidebar = document.querySelector('.sidebar');
                                    const newdiv2 = document.createElement('div');
                                    const anchor2 = document.createElement('a');
                                    const icon2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                                    const iconPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                                    newdiv2.className = 'admin2';
                                    anchor2.id = 'text-admin2';
                                    anchor2.href = 'adminlist.html';
                                    anchor2.innerText = 'ADMIN';
                                    icon2.id = 'img-admin2';
                                    icon2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                                    icon2.setAttribute('width', '16');
                                    icon2.setAttribute('height', '16');
                                    icon2.setAttribute('fill', '#fff');
                                    icon2.classList.add('bi', 'bi-person-gear');
                                    icon2.setAttribute('viewBox', '0 0 16 16');
                                    iconPath2.setAttribute('d', 'M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0');

                                    icon2.append(iconPath2);
                                    newdiv2.append(icon2, anchor2);
                                    sidebar.appendChild(newdiv2);

                                    handleNewDiv(newdiv2);

                                    // Lista de usuários
                                    usersCollectionRef.orderBy('name').get().then((querySnapshot) => {
                                        querySnapshot.forEach((doc) => {

                                            const tbody = document.querySelector('tbody');
                                            let names = doc.data().name;
                                            let emails = doc.data().email;
                                            const tr = document.createElement('tr');
                                            const tdNames = document.createElement('td');
                                            const tdEmails = document.createElement('td');
                                            const tdBtn = document.createElement('td');
                                            const showHolerite = document.createElement('button');

                                            showHolerite.id = 'showHolerite';
                                            showHolerite.innerText = 'Ver';

                                            const username = doc.data().name;

                                            showHolerite.addEventListener('click', () => {
                                                // Chamando uma função para lidar com o clique do botão e passando o UID
                                                ClickShowHolerite(username);
                                            });

                                            // Função para passar o username para a URL.
                                            function ClickShowHolerite() {
                                                window.location.href = `admin.html?username=${username}`;
                                            }

                                            tdEmails.innerText = emails;
                                            tdNames.innerText = names;
                                            
                                            tdBtn.appendChild(showHolerite);
                                            tr.append(tdNames, tdEmails, tdBtn);
                                            tbody.appendChild(tr);
                                        });
                                    });
                                }
                            }
                        })
                        .catch((error) => {
                            console.error('Erro ao obter documento da subcoleção:', error);
                        });
                });
            })
            .catch((error) => {
                console.error('Erro ao realizar a consulta:', error);
            });
    } else {
        window.location.href = 'restricted.html';
    }
});

// Deslogando do Firebase Authentication.

function logout() {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.log(error);
        })
}


// Sidebar

const menu = document.getElementById('menu');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay-menu');
const logoSidebar = document.getElementById('logo-sidebar');

let adminSidebar; // Variável para pegar a div do admin

// O elemento admin ele está sendo gerado dinamicamente pelo o JS (ele está em uma função assíncrona onAuthStateChanged, então o único jeito de eu conseguir acessar esse valor foi dessa forma, criando uma função que recebe o argumento lá da função assíncrona, e assim eu consegui setar o este valor do argumento na minha variável.)
function handleNewDiv(newdiv) {
    adminSidebar = newdiv; //Pegando a div do admin
}

//Abrir sidebar
menu.addEventListener('click', () => {
    sidebar.classList.add('open-sidebar');
    adminSidebar.style.display = 'block';
});

//Fechar a sidebar
function closeSidebar() {
    sidebar.classList.remove('open-sidebar');
    adminSidebar.style.display = 'none';
}

sidebar.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);


// Aniamção do ícone de loading, usando a biblioteca Vivus, && Preloader
var overlayPreloader = document.querySelector('.overlay-preloader');
var preloaderLogo = document.getElementById('asas-rsup');

var myVivus = new Vivus('asas-rsup', {
    start: 'autostart',
    animTimingFunction: Vivus.EASE
});

new Vivus('asas-rsup', {}, function (myVivus) {
    myVivus.play(myVivus.getStatus() === 'end' ? -1 : 1);
})

function exitPreloader() {
    // Função para verificar se os elementos foram carregados
    function checkElementsLoaded() {
        var overlayPreloader = document.querySelector('.overlay-preloader');
        var preloaderLogo = document.getElementById('asas-rsup');
        var dynamicElementsLoaded = document.querySelectorAll('.admin');

        // Verifica se os elementos dinâmicos foram carregados
        if (dynamicElementsLoaded.length > 0) {
            setTimeout(() => {
                overlayPreloader.style.display = 'none';
                preloaderLogo.style.display = 'none';
            },1490);
        } else {
            // Se os elementos ainda não foram carregados, aguarde e verifique novamente
            setTimeout(checkElementsLoaded, 100);
        }
    }

    // Inicie a verificação
    checkElementsLoaded();
}

// Levando para a página de cadastro

function registerPage() {
    window.location.href = 'register.html';
}