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
const storage = firebaseApp.storage();

let displayName;

// Utilizando dinamicamente a interface do usuário.
auth.onAuthStateChanged((user) => {
    if (user) {
        // Coletando informações do usuário autenticado.
        displayName = user.displayName;

        // Escrevendo o texto de boas-vindas no header.
        const divHeader = document.querySelector('.header-container');
        const welcomeMsg = document.createElement('p');
        welcomeMsg.style.overflowWrap = "break-word";
        welcomeMsg.innerText = 'Olá ' + displayName + ', aqui estão seus holerites do ano de 2024 :)';
        welcomeMsg.style.color = '#002794';
        divHeader.appendChild(welcomeMsg);

        // Texto de boas-vindas para mobile
        window.addEventListener('resize', () => {
            let screenWidth = window.innerWidth;

            if (screenWidth <= 660) {
                welcomeMsg.innerText = 'Olá ' + displayName + ', aqui estão seus\n holerites do ano de 2024 :)';
            } else {
                welcomeMsg.innerText = 'Olá ' + displayName + ', aqui estão seus holerites do ano de 2024 :)';
            }
        });

        window.dispatchEvent(new Event('resize'));


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

                                    // Admin responsividade desktop
                                    const navigation = document.querySelector('.main-navigation');
                                    const newdiv = document.createElement('div');
                                    const anchor = document.createElement('a');
                                    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                                    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                                    newdiv.className = 'admin';
                                    anchor.id = 'text-admin';
                                    anchor.href = 'adminlist.html';
                                    anchor.innerText = 'ADMIN';
                                    icon.id = 'img-admin';
                                    icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                                    icon.setAttribute('width', '16');
                                    icon.setAttribute('height', '16');
                                    icon.setAttribute('fill', '#fff');
                                    icon.classList.add('bi', 'bi-person-gear');
                                    icon.setAttribute('viewBox', '0 0 16 16');
                                    iconPath.setAttribute('d', 'M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0');

                                    icon.append(iconPath);
                                    newdiv.append(anchor, icon);
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
        // Se o usuário não for admin ele vai para a página de acesso restrito
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

// Download dos holerites

auth.onAuthStateChanged((user) => {
    if (user) {
        // Coletando informações do usuário autenticado.
        displayName = user.displayName;

        //============================================================================================

        const anchor1 = document.getElementById('download1');

        function downloadFile1() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Janeiro/Holerite-de-Janeiro.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor1.href = url;
                anchor1.click();

                anchor1.removeEventListener('click', downloadFile1);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor1.addEventListener('click', downloadFile1);

        //============================================================================================

        const anchor2 = document.getElementById('download2');

        function downloadFile2() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Fevereiro/Holerite-de-Fevereiro.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor2.href = url;
                anchor2.click();

                anchor2.removeEventListener('click', downloadFile2);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor2.addEventListener('click', downloadFile2);

        //============================================================================================

        const anchor3 = document.getElementById('download3');

        function downloadFile3() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Março/Holerite-de-Março.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor3.href = url;
                anchor3.click();

                anchor3.removeEventListener('click', downloadFile3);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor3.addEventListener('click', downloadFile3);

        //============================================================================================

        const anchor4 = document.getElementById('download4');

        function downloadFile4() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Abril/Holerite-de-Abril.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor4.href = url;
                anchor4.click();

                anchor4.removeEventListener('click', downloadFile4);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor4.addEventListener('click', downloadFile4);

        //============================================================================================

        const anchor5 = document.getElementById('download5');

        function downloadFile5() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Maio/Holerite-de-Maio.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor5.href = url;
                anchor5.click();

                anchor5.removeEventListener('click', downloadFile5);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor5.addEventListener('click', downloadFile5);

        //============================================================================================

        const anchor6 = document.getElementById('download6');

        function downloadFile6() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Junho/Holerite-de-Junho.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor6.href = url;
                anchor6.click();

                anchor6.removeEventListener('click', downloadFile6);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor6.addEventListener('click', downloadFile6);

        //============================================================================================

        const anchor7 = document.getElementById('download7');

        function downloadFile7() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Julho/Holerite-de-Julho.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor7.href = url;
                anchor7.click();

                anchor7.removeEventListener('click', downloadFile7);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor7.addEventListener('click', downloadFile7);

        //============================================================================================

        const anchor8 = document.getElementById('download8');

        function downloadFile8() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Agosto/Holerite-de-Agosto.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor8.href = url;
                anchor8.click();

                anchor8.removeEventListener('click', downloadFile8);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor8.addEventListener('click', downloadFile8);

        //============================================================================================

        const anchor9 = document.getElementById('download9');

        function downloadFile9() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Setembro/Holerite-de-Setembro.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor9.href = url;
                anchor9.click();

                anchor9.removeEventListener('click', downloadFile9);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor9.addEventListener('click', downloadFile9);

        //============================================================================================

        const anchor10 = document.getElementById('download10');

        function downloadFile10() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Outubro/Holerite-de-Outubro.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor10.href = url;
                anchor10.click();

                anchor10.removeEventListener('click', downloadFile10);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor10.addEventListener('click', downloadFile10);

        //============================================================================================

        const anchor11 = document.getElementById('download11');

        function downloadFile11() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Novembro/Holerite-de-Novembro.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor11.href = url;
                anchor11.click();

                anchor11.removeEventListener('click', downloadFile11);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor11.addEventListener('click', downloadFile11);

        //============================================================================================

        const anchor12 = document.getElementById('download12');

        function downloadFile12() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'Dezembro/Holerite-de-Dezembro.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchor12.href = url;
                anchor12.click();

                anchor12.removeEventListener('click', downloadFile12);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchor12.addEventListener('click', downloadFile12);

        //============================================================================================

        const anchorIRRF = document.getElementById('irrf-download');

        function downloadFileIRRF() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'IRRF/Holerite-de-IRRF.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchorIRRF.href = url;
                anchorIRRF.click();

                anchorIRRF.removeEventListener('click', downloadFileIRRF);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchorIRRF.addEventListener('click', downloadFileIRRF);

        //============================================================================================

        const anchorDecimoTerceiro1 = document.getElementById('download13ro1');

        function downloadFileDecimoTerceiro1() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'DecimoTerceiro1/Holerite-de-DecimoTerceiro1.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchorDecimoTerceiro1.href = url;
                anchorDecimoTerceiro1.click();

                anchorDecimoTerceiro1.removeEventListener('click', downloadFileDecimoTerceiro1);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchorDecimoTerceiro1.addEventListener('click', downloadFileDecimoTerceiro1);

        //============================================================================================

        const anchorDecimoTerceiro2 = document.getElementById('download13ro2');

        function downloadFileDecimoTerceiro2() {
            const storageRef = firebaseApp.storage().ref(displayName + '/' + 'DecimoTerceiro2/Holerite-de-DecimoTerceiro2.pdf');

            storageRef.getDownloadURL().then((url) => {
                anchorDecimoTerceiro2.href = url;
                anchorDecimoTerceiro2.click();

                anchorDecimoTerceiro2.removeEventListener('click', downloadFileDecimoTerceiro2);
            })
                .catch((error) => {
                    console.error(error);
                });
        }

        anchorDecimoTerceiro2.addEventListener('click', downloadFileDecimoTerceiro2);

    }

    //============================================================================================

    else {
        // Se o usuário não tiver logado ele vai pra essa página
        window.location.href = 'restricted.html';
    }
});

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
        var dynamicElementsLoaded = document.querySelectorAll('p');

        // Verifica se os elementos dinâmicos foram carregados
        if (dynamicElementsLoaded.length > 0) {
            setTimeout(() => {
                overlayPreloader.style.display = 'none';
                preloaderLogo.style.display = 'none';
            },2000);
        } else {
            // Se os elementos ainda não foram carregados, aguarde e verifique novamente
            setTimeout(checkElementsLoaded, 100);
        }
    }

    // Inicie a verificação
    checkElementsLoaded();
}